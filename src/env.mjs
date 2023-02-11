/* eslint-disable @typescript-eslint/ban-ts-comment */
import { z } from 'zod';

const server = z.object({
  NODEMAILER_HOST: z.string().min(1),
  NODEMAILER_PORT: z
    .string()
    .min(1)
    .refine((value) => !isNaN(Number(value))),
  NODEMAILER_USER: z.string().email(),
  NODEMAILER_PASS: z.string().min(1),

  NODE_ENV: z.enum(['development', 'test', 'production']),
});

const client = z.object({});

/**
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NODEMAILER_HOST: process.env.NODEMAILER_HOST,
  NODEMAILER_PORT: process.env.NODEMAILER_PORT,
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,

  NODE_ENV: process.env.NODE_ENV,
};

const merged = server.merge(client);
/** @type z.infer<merged>
 *  @ts-ignore  */
let env = process.env;

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === 'undefined';

  const parsed = isServer ? merged.safeParse(processEnv) : client.safeParse(processEnv);

  if (parsed.success === false) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  /** @type z.infer<merged>
   *  @ts-ignore  */
  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined;
      if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
        throw new Error(
          process.env.NODE_ENV === 'production'
            ? '❌ Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        );
      /*  @ts-ignore  */
      return target[prop];
    },
  });
}

export { env };
