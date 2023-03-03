import { AbstractModule } from './abstract/module.abstract';
import { ModuleConfiguration } from './module-configuration';
import { ModulesManager } from './modules-manager';

/**
 * Represents the structure of a module
 */
export class Module implements AbstractModule {
  //Manager of the module
  private _modulesManager: ModulesManager;

  //Name of the module
  private _name: string;
  public get name(): string {
    return this._name;
  }

  //Configuration of the module
  private _configuration: ModuleConfiguration;

  /**
   * Constructor
   * @param modulesManager Parent manager
   * @param moduleName NAme of the module
   */
  constructor(modulesManager: ModulesManager, moduleName: string) {
    this._modulesManager = modulesManager;
    this._name = moduleName;
    this.loadConfiguration();
  }

  public async stopModule() {}

  public async startModule(): Promise<any> {
    this.loadConfiguration();
  }

  /**
   * Loads the configuration file from the server
   */
  private async loadConfiguration(): Promise<any> {
    // TODO Load la config du module npm
  }
}
