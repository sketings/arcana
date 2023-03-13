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

  private _state: Object = {};

  //Name of the module<p
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
    Object.freeze(this);
  }

  public get moduleConf(): IModuleConfig {
    return this._moduleConf;
  }

  public get state(): Object {
    return this._state;
  }

  public get name(): string {
    return this._name;
  }

  public get event(): ModuleEventsType {
    return this._event;
  }

  public addState(stateName: string, valueToAdd: any) {
    console.log('trigger');

    if (this._state[stateName]) {
      console.error(`Cannot add state : ${stateName} because it already exist`);
    } else {
      this._state[stateName] = valueToAdd;
    }
  }

  public removeState(stateToRemove: string) {
    delete this._state[stateToRemove];
  }

  public updateState(stateName: string, value: any) {
    if (this._state[stateName]) {
      this._state[stateName] = value;
    } else {
      console.error(
        `Cannot update state : ${stateName} because it does not exist`
      );
    }
  }

  public async stopModule() {}

  public async init(): Promise<void> {
    try {
      this._moduleLoader.loadConfig(this);
    } catch (e) {
      console.log(`An error occur while loading module : ${this._name}`);
      console.log(e);
    }
  }
}
