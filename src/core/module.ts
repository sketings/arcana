import { IModuleConfig } from './interfaces/module.interface';
import { ModuleLoader } from './module-loader';
import { ModulesManager } from './modules-manager';

/**
 * Represents the structure of a module
 */
export class Module {
  //Manager of the module
  private _modulesManager: ModulesManager;

  private _moduleConf: IModuleConfig;
  public get moduleConf(): IModuleConfig {
    return this._moduleConf;
  }

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
   * @param moduleConf NAme of the module
   */
  constructor(modulesManager: ModulesManager, moduleConf: IModuleConfig) {
    this._modulesManager = modulesManager;
    this._name = moduleConf.name;
    this._moduleConf = moduleConf;
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
    try {
      await ModuleLoader.loadConfig(this);
    } catch (e) {
      console.log(`An error occur while loading module : ${this._name}`);
      console.log(e);
    }
  }
}
