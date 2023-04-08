
export default class App {

    async start(app: any){
        function numberValidator(nb: number){
            return isNaN(nb);
        }
        
        app.setState('monState', 'Coucou')
        app._event.subscribe('mon_premier_module:event', () => console.log('Hello world'), app, false);
        app._event.subscribe('mon_premier_module:event_deux', new Test(), app, true);
        app._event.subscribe('mon_premier_module:validddd', numberValidator, app, true);

        const { cb } = app._event.resolve('system:module_manager', app);
        app.setAppState('leStateDeLapp', 'Coucou je suis l application')
        const appState = app.getAppState('leStateDeLapp')
        // console.log(appState);
        const availaible_module = cb.getModulesAvailableName();
        
        const cc = app._event.resolve('mon_premier_module:event_deux', app);
        const ffff = app._event.resolve('mon_premier_module:validddd', app, 'fg');
        console.log(app._event);
        console.log(ffff);
        // console.log(cc.cb.init());
        // logger.cb.log('Hello world');
    
    }

    async stop(){
        
    }
}

class Test {
    constructor(){
        console.log('je suis bien');
    }

    init(){
        return ":)";
    }
}