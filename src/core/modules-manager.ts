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
   * TODO: map all modules and then init them
   * Parse and create the modules to load
   * @param modules Array of modules to parse
   */
  public parseModules(modules: Array<IModuleConfig>) {
    const sortedModules = this.sortModules(modules);
    for (const module of sortedModules) {
      if (this._availableModules.get(module.name)) {
        throw new Error(`Cannot import module : ${module.name} twice`);
      }

      // Check if the module name match the snake_case pattern
      this.checkModuleName(module);

      this._availableModules.set(
        module.name,
        new Module(module, this._event, this.moduleLoader)
      );

      // Init module
      this.initModule(module.name);

      //Init peers modules
      if (module.peers) {
        for (const modulePeer of module.peers) {
          this.checkModuleName(module);
          this._availableModules.set(
            modulePeer.name,
            new Module(modulePeer, this._event, this.moduleLoader)
          );
          this.initModule(modulePeer.name);
        }
      }
    }
  }

  /**
   * Sort the modules to load by loadAsConfig property
   * @param modules Array of modules to sort
   */
  private sortModules(modules: Array<IModuleConfig>): Array<IModuleConfig> {
    return modules.sort((a, b) => {
      if (a.loadAsConfig && !b.loadAsConfig) {
        return -1;
      }

      if (!a.loadAsConfig && b.loadAsConfig) {
        return 1;
      }

      return 0;
    });
  }

  /**
   * Init a module
   * @param moduleName Name of the module to init
   */
  private initModule(moduleName: string): void {
    const module = this._availableModules.get(moduleName);
    module.initModule();
  }

  /**
   * Check if the module name match the snake_case pattern
   * @param module Module to check
   */
  private checkModuleName(module: IModuleConfig): void {
    if (!module.name.match(/^[a-z]+(?:_[a-z]+)*$/)) {
      throw new Error(
        `Cannot import module : ${module.name} with an invalid name (we only accept snake_case)`
      );
    }
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
