import { ModuleEvents } from './events/module-events';
import { IAppState } from './interfaces/app.interface';
import { IModuleConfig } from './interfaces/module.interface';
import { ModulesManager } from './modules-manager';

/**
 * Represents an application using modules
 */
class ApplicationStatic {
  //Modules Manager of the application
  private _modulesManager: ModulesManager;

  private _event = ModuleEvents;

  //Will be the global state of the app
  private _appState: IAppState;
  public get appState(): Object {
    return this._appState;
  }

  public async create(modules: Array<IModuleConfig>) {
    this._event.on('cc', () => console.log('cc bg'));
    this._event.off('cc');
    console.log(this._event._eventStack);

    // this._modulesManager = new ModulesManager(modules);
  }
}

export const ApplicationFactory = new ApplicationStatic();
