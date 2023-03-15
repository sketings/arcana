import { ModuleEventsType } from './events/module-events';
import { IModuleConfig } from './interfaces/module.interface';
import { ModuleLoader } from './loader/module-loader';
import { Module } from './module';

export class ModulesManager {
  //Available modules
  private _availableModules: Map<string, Module>;

  //Module loader
  private moduleLoader = ModuleLoader;

  //Events of the modules
  private _event: ModuleEventsType;

  //State of the modules
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

  /**
   * Parse the modules to load => create the modules
   * @param modules Array of modules to parse
   */
  private parseModules(modules: Array<IModuleConfig>) {
    for (const module of modules) {
      if (this._availableModules.get(module.name)) {
        throw new Error(`Cannot import module : ${module.name} twice`);
      }

      this._availableModules.set(
        module.name,
        new Module(module, this._event, this.moduleLoader)
      );

      this.initModule(module.name);
    }
  }

  /**
   * Init a module
   * @param moduleName Name of the module to init
   */
  private initModule(moduleName: string): void {
    const module = this._availableModules.get(moduleName);
    module.init();
  }

  /**
   * Get a module
   * @param moduleName Name of the module to get
   * @returns The module
   */
  public getModule(moduleName: string): Module {
    return this._availableModules.get(moduleName);
  }
}
