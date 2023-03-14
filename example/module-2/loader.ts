
export default class App {

    async start(app: any){
        app.addState('monState', 'Coucou')

        console.log(app);


        // // Declare a route
        // fastify.get('/', function (request, reply) {
        // reply.send({ hello: 'world' })
        // })

        // // Run the server!
        // fastify.listen({port: 3000}, function (err, address) {
        // if (err) {
        //     fastify.log.error(err)
        //     process.exit(1)
        // }
        // // Server is now listening on ${address}
        // })
    }

    async stop(){
        
    }
}