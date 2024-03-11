import fastifyCors from "@fastify/cors";
import fastify from 'fastify';

import { env } from "@/env/env";

import { routes } from "./routes";

const app = fastify();

app.register(fastifyCors);

app.register(routes);

app.listen({ port: env.PORT })
  .then(() => console.log(`HTTP server running in :${env.PORT}`));