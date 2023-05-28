import { Module } from "../../src/core/module";
export default class App {

    async start(app: Module){
        console.log(app.moduleConf.name)
        console.log('app.moduleConf.name')
        function numberValidator(nb: number){
            return isNaN(nb);
        }
        app.setState('monState', 'Coucou')
        app.event.subscribe('mon_premier_module:event', () => console.log('Hello world'), app, false);
        app.event.subscribe('mon_premier_module:event_deux', new Test(), app, true);
        app.event.subscribe('mon_premier_module:validddd', numberValidator, app, true);

        const { cb } = app.event.resolve('system:module_manager', app);
        app.setAppState('leStateDeLapp', 'Coucou je suis l application')
        const appState = app.getAppState('leStateDeLapp')
        // console.log(appState);
        const availaible_module = cb.getModulesAvailableName();
        
        // const cc = app.event.resolve('mon_premier_module:event_deux', app);
        const ffff = app.event.resolve('mon_premier_module:validddd', app, 'fg');
        console.log(app.event);
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