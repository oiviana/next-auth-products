// controllers/upload.ts
import { put } from '@vercel/blob';
import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserIdByToken } from '@utils/getUserIdByToken';
import {parse} from 'papaparse'
import prisma from '@lib/prisma';
import { Prisma } from "@prisma-generated/prisma";

interface MultipartRequest extends FastifyRequest {
  file: () => Promise<import('@fastify/multipart').MultipartFile | undefined>;
}

interface CSVRow {
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
  stock?: string;
}

export async function uploadCSV(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = await getUserIdByToken(request);
    
    const userWithStore = await request.server.prisma.user.findUnique({
      where: { id: userId },
      include: { store: true },
    });

    if (!userWithStore?.store) {
      return reply.status(400).send({ error: 'Usuário não tem uma loja cadastrada' });
    }

    const multipartRequest = request as unknown as MultipartRequest;
    const data = await multipartRequest.file();
    
    if (!data) {
      return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
    }

    if (!data.filename.endsWith('.csv') && data.mimetype !== 'text/csv') {
      return reply.status(400).send({ error: 'Apenas arquivos CSV são permitidos' });
    }

    const buffer = await data.toBuffer();
    const uint8Array = new Uint8Array(buffer);
    const file = new File([uint8Array], data.filename, { type: data.mimetype });

    const blob = await put(data.filename, file, {
      access: 'public',
    });

    const job = await request.server.prisma.cSVImportJob.create({
      data: {
        userId: userId,
        fileUrl: blob.url,
        status: 'PENDING',
        progress: 0,
      },
    });

    await startCSVProcessing(job.id, userWithStore.store.id);

    return reply.send({
      success: true,
      jobId: job.id,
      message: 'CSV recebido e em processamento',
      blob: {
        url: blob.url,
        downloadUrl: blob.downloadUrl,
      }
    });

  } catch (error) {
    request.server.log.error(`Upload error: ${error}`);
    
    if (error instanceof Error && error.message.includes("Token inválido")) {
        return reply.status(401).send({ error: error.message });
    }
    
    return reply.status(500).send({ error: 'Erro no upload' });
  }
}

async function startCSVProcessing(jobId: string, storeId: string) {
  console.log(`Iniciando processamento do job ${jobId} para store ${storeId}`);

  const job = await prisma.cSVImportJob.findUnique({ where: { id: jobId } });
  if (!job) return;

  const response = await fetch(job.fileUrl);
  const csvText = await response.text();

  const { data, errors } = parse<CSVRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length) {
    console.error('Erro ao ler CSV:', errors);
    await prisma.cSVImportJob.update({
      where: { id: jobId },
      data: { status: 'FAILED', errorFileUrl: job.fileUrl },
    });
    return;
  }

  
const products: Prisma.ProductCreateManyInput[] = [];

  const errorRows: CSVRow[] = [];

  for (const row of data) {
    // Validação de tipos básica
    if (!row.name || !row.price) {
      errorRows.push(row);
      continue;
    }

    const price = parseFloat(row.price);
    const stock = row.stock ? parseInt(row.stock) : 0;

    if (isNaN(price) || isNaN(stock)) {
      errorRows.push(row);
      continue;
    }

    products.push({
      name: row.name,
      description: row.description || '',
      price,
      imageUrl: row.imageUrl || '',
      stock,
      soldCount: 0,
      storeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Insere apenas produtos válidos
  if (products.length > 0) {
    await prisma.product.createMany({ data: products });
  }

  // Atualiza job com progresso final e registro de erros
  await prisma.cSVImportJob.update({
    where: { id: jobId },
    data: {
      status: errorRows.length > 0 ? 'DONE' : 'DONE',
      progress: 100,
      totalRows: data.length,
      processedRows: products.length,
      errorFileUrl: errorRows.length > 0 ? job.fileUrl : null, // gerar CSV com linhas de erro
    },
  });

  console.log(`Job ${jobId} finalizado. Produtos válidos: ${products.length}, erros: ${errorRows.length}`);
}
