import { ModuleEventsType } from './events/module-events.js';
import { IModuleConfig } from './interfaces/module.interface.js';
import { ModuleLoader } from './loader/module-loader.js';
import { Module } from './module.js';

export class ModulesManager {
  //Array of available modules
  private _availableModules: Map<string, Module>;

  private moduleLoader = ModuleLoader;

  private _event: ModuleEventsType;

  private _modulesState: Object;
  public get modulesState(): Object {
    return this._modulesState;
  }

  /**
   * Constructor
   * @param modules Names of the available modules to load
   */
  constructor(modules: Array<IModuleConfig>, events: ModuleEventsType) {
    this._event = events;
    this._availableModules = new Map<string, Module>();
    this.parseModules(modules);
  }

  private parseModules(modules: Array<IModuleConfig>) {
    for (const module of modules) {
      if (this._availableModules.get(module.name)) {
        throw new Error(`Cannot import module : ${module.name} twice`);
      }

      this._availableModules.set(
        module.name,
        new Module(module, this._event, this.moduleLoader)
      );
    }
  }
}
