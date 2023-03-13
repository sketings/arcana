import { ModuleEventsType } from './events/module-events.js';
import { IModuleConfig } from './interfaces/module.interface.js';
import { ModuleLoader, ModuleLoaderType } from './loader/module-loader.js';

/**
 * Represents the structure of a module
 */
export class Module {
  private readonly _moduleLoader = ModuleLoader;

  private _event: ModuleEventsType;

  //Configuration of the module
  private _moduleConf: IModuleConfig;

  private _moduleState: Object;

  //Name of the module
  private _name: string;

  /**
   * Constructor
   * @param modulesManager Parent manager
   * @param moduleConf NAme of the module
   */
  constructor(
    moduleConf: IModuleConfig,
    events: ModuleEventsType,
    moduleLoader: ModuleLoaderType
  ) {
    this._name = moduleConf.name;
    this._moduleConf = moduleConf;
    this._event = events;
    this._moduleLoader = moduleLoader;
    this.init();
  }

  public get moduleConf(): IModuleConfig {
    return this._moduleConf;
  }

  public get moduleState(): Object {
    return this._moduleState;
  }

  public get name(): string {
    return this._name;
  }

  public get event(): ModuleEventsType {
    return this._event;
  }

  public async stopModule() {}

  public async init(): Promise<void> {
    await this.loadConf();
  }

  /**
   * Loads the configuration file from the server
   */
  private async loadConf(): Promise<void> {
    try {
      await this._moduleLoader.loadConfig(this);
    } catch (e) {
      console.log(`An error occur while loading module : ${this._name}`);
      console.log(e);
    }
  }
}
