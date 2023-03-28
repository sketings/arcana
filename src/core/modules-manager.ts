import { IModuleConfig } from '../../types';
import { SYSTEM } from './constant';
import { Freeze } from './decorator/app.decorator';
import { ModuleEventsType } from './events/module-events';
import { ModuleLoader } from './loader/module-loader';
import { Module } from './module';

@Freeze
export class ModulesManager {
  //Available modules
  private _availableModules: Map<string, Module> = new Map<string, Module>();

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
  constructor(events: ModuleEventsType) {
    this._event = events;
  }

  /**
   * Parse and create the modules to load
   * @param modules Array of modules to parse
   */
  public parseModules(modules: Array<IModuleConfig>) {
    for (const module of modules) {
      if (this._availableModules.get(module.name)) {
        throw new Error(`Cannot import module : ${module.name} twice`);
      }

      // Check if the module name match the snake_case pattern
      if (!module.name.match(/^[a-z]+(?:_[a-z]+)*$/)) {
        throw new Error(
          `Cannot import module : ${module.name} with an invalid name (we only accept snake_case)`
        );
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

  /**
   * Get the name of the available modules
   * @returns The name of the available modules
   */
  public getModulesAvailableName(): Array<string> {
    const modulesName: Array<string> = [];

    for (const module of this._availableModules) {
      modulesName.push(module[0]);
    }

    return modulesName;
  }

  /**
   * Subscribe the modules manager to the app events
   * @param event Events of the app
   */
  init(event: ModuleEventsType) {
    event.subscribe(`${SYSTEM.SYSTEM_METHOD}:module_manager`, this, {
      name: SYSTEM.SYSTEM_METHOD
    } as Module);
  }
}
