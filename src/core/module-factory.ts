import { ModuleEvents, ModuleEventsType } from './events/module-events';
import { IAppState } from './interfaces/app.interface';
import { IModuleConfig } from './interfaces/module.interface';
import { ModulesManager } from './modules-manager';
import { Logger } from './services/logger.service';

/**
 * Represents an application using modules
 */
export class ApplicationFactory {
  //Modules Manager of the application
  private _modulesManager: ModulesManager;

  private readonly _event: ModuleEventsType;

  //Will be the global state of the app
  private _appState: IAppState;

  constructor() {
    this._event = new ModuleEvents();
  }

  public get appState(): Object {
    return this._appState;
  }

  public async create(modules: Array<IModuleConfig>) {
    this._modulesManager = new ModulesManager(modules, this._event);
  }

  public async init() {
    Logger.init(this._event);
  }
}
