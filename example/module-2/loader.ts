
export default class App {

    async start(app: any){
        app.addState('monState', 'Coucou')
        app._event.subscribe('module_test_coucou', () => console.log('Hello world'), true, app);
        const logger = app._event.resolve('system_logger', app);
        console.log(logger);
        logger.cb.log('Hello world');
        

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