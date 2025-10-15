import Fastify from "fastify";
import { app } from "./app";

const server = Fastify({ logger: true });

const start = async () => {
  try {
 
    await app(server); 
    await server.listen({ port: 3333, host: "0.0.0.0" });

    console.info("🚀 Server running on http://localhost:3333");

  } catch (err) {
    console.error("erro: ",err);
    server.log.error(err);
    process.exit(1);
  }
};

start();
