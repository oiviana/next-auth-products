import Fastify from "fastify";
import { app } from "./app";

const serverPort = parseInt(process.env.SERVER_PORT || '3333', 10);

const server = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid',
      }
    }
  }
});

const start = async () => {
  try {

    await app(server);
    await server.listen({ port: serverPort, host: "0.0.0.0" });

    console.info(`index.ts: Server running at localhost on port ${serverPort}`);

  } catch (err) {
    console.error("erro: ", err);
    server.log.error(err);
    process.exit(1);
  }
};

start();
