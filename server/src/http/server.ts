import fastifyCors from "@fastify/cors";
import fastify from 'fastify';

import { env } from "@/env/env";

const app = fastify();

app.register(fastifyCors);

app.listen({ port: env.PORT })
  .then(() => console.log(`HTTP server running in :${env.PORT}`));