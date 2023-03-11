import { ModuleEvents } from './events/module-events';
import { IAppState } from './interfaces/app.interface';
import { IModuleConfig } from './interfaces/module.interface';
import { ModulesManager } from './modules-manager';
import { Logger } from './services/logger.service';

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

  constructor() {
    this.init();
  }

  public async create(modules: Array<IModuleConfig>) {
    // this._modulesManager = new ModulesManager(modules);
  }

  private init() {
    Logger.init(this._event);
  }
}

export const ApplicationFactory = new ApplicationStatic();
