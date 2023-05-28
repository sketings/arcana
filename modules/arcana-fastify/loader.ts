import Fastify from "fastify";
import { Module } from "src/core/module";

export default class App {

  async start(app: Module) {
    const cc = app.event.resolve('mon_premier_module:event', app);
    const server = Fastify({ logger: true });
    server.get('/ping', async (request, reply) => {
      return 'pong\n'
    })

    server.listen({ port: app.moduleConf.port ?? 3001, host: '0.0.0.0' }, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })

  }

  async stop() {

  }
}