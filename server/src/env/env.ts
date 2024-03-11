import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchame = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url()
});

export const env = envSchame.parse(process.env);