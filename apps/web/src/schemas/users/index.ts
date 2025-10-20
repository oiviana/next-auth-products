// schemas/user-schemas.ts
import { z } from 'zod'

export const userSignupSchema = z
  .object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
    role: z
      .string()
      .refine((val) => val === 'CLIENT' || val === 'SELLER', {
        message: 'Selecione o tipo de conta',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  })

export type UserSignupData = z.infer<typeof userSignupSchema>
