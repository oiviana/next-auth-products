import Fastify from "fastify";
import { app } from "./app";

const server = Fastify({
  logger: true,
});

app(server);

const start = async () => {
  try {
    await server.listen({ port: 3333, host: "0.0.0.0" });
    console.log("🚀 Server running on http://localhost:3333");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();