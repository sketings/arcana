import { IAppState } from './interfaces/app.interface';
import { IModuleConfig } from './interfaces/module.interface';
import { ModulesManager } from './modules-manager';

/**
 * Represents an application using modules
 */
class ApplicationStatic {
  //Modules Manager of the application
  private _modulesManager: ModulesManager;

  //Will be the global state of the app
  private _appState: IAppState;
  public get appState(): Object {
    return this._appState;
  }

  public async create(modules: Array<IModuleConfig>) {
    this._modulesManager = new ModulesManager(modules);
  }

  public loadModules() {
    this._modulesManager.loadModules();
  }
}

export const ApplicationFactory = new ApplicationStatic();
