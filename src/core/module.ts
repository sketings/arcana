import { IModuleConfig } from '../../types';
import { Freeze } from './decorator/app.decorator';
import { ModuleEventsType } from './events/module-events';
import { ModuleLoaderType } from './loader/module-loader';

/**
 * Represents the structure of a module
 */
@Freeze
export class Module {
  private readonly _moduleLoader: ModuleLoaderType;

  private _event: ModuleEventsType;

  //Configuration of the module
  private _moduleConf: IModuleConfig;

  private _state: { [key: string]: any } = {};

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
  }

  public get moduleConf(): IModuleConfig {
    return this._moduleConf;
  }

  public get state(): { [key: string]: any } {
    return this._state;
  }

  public get name(): string {
    return this._name;
  }

  public get event(): ModuleEventsType {
    return this._event;
  }

  public setAppState(stateName: string, value: any) {
    this._event.resolve('system:app_state_handler', this, {
      action: 'set',
      stateName,
      value,
      reference: this._name
    });
  }

  public getAppState(stateName: string) {
    return this._event.resolve('system:app_state_handler', this, {
      action: 'get',
      stateName
    });
  }

  public setState(stateName: string, valueToAdd: any) {
    if (this._state[stateName]) {
      console.error(`Cannot add state : ${stateName} because it already exist`);
    } else {
      this._state[stateName] = valueToAdd;
    }
  }

  // TODO : Add a check to see if the state exist
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

  public initModule(module?: this): void {
    try {
      this._moduleLoader.loadConfig(module ? module : this);
    } catch (e) {
      console.error(`An error occur while loading module : ${this._name}`);
      console.error(e);
    }
  }
}
