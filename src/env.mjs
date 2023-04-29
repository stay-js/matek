import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  server: {
    NODEMAILER_HOST: z.string().min(1),
    NODEMAILER_PORT: z
      .string()
      .min(1)
      .refine((value) => !isNaN(Number(value))),
    NODEMAILER_USER: z.string().min(1),
    NODEMAILER_PASS: z.string().min(1),

    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  client: {},
  runtimeEnv: {
    NODEMAILER_HOST: process.env.NODEMAILER_HOST,
    NODEMAILER_PORT: process.env.NODEMAILER_PORT,
    NODEMAILER_USER: process.env.NODEMAILER_USER,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS,

    NODE_ENV: process.env.NODE_ENV,
  },
});
