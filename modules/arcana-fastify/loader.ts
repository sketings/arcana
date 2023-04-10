import Fastify from "fastify";

export default class App {

    async start(app: any){
        const server = Fastify({ logger: true });
        server.get('/ping', async (request, reply) => {
            return 'pong\n'
          })
          
          server.listen({ port: 8080 }, (err, address) => {
            if (err) {
              console.error(err)
              process.exit(1)
            }
            console.log(`Server listening at ${address}`)
          })
        
    }

    async stop(){
        
    }
}