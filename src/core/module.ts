import { IModuleConfig } from './interfaces/module.interface';
import { ModulesManager } from './modules-manager';

/**
 * Represents the structure of a module
 */
export class Module {
  //Manager of the module
  private _modulesManager: ModulesManager;

  private _moduleState: Object;
  public get moduleState(): Object {
    return this._moduleState;
  }
  //Name of the module
  private _name: string;
  public get name(): string {
    return this._name;
  }

  //Configuration of the module
  private _configuration: IModuleConfig;

  /**
   * Constructor
   * @param modulesManager Parent manager
   * @param module NAme of the module
   */
  constructor(modulesManager: ModulesManager, module: IModuleConfig) {
    this._modulesManager = modulesManager;
    this._name = module.name;
    this.startModule();
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
