import { IModuleConfig } from './interfaces/module.interface';
import { Module } from './module';

export class ModulesManager {
  //Array of available modules
  private _availableModules: Map<string, Module>;

  private _modulesState: Object;
  public get modulesState(): Object {
    return this._modulesState;
  }

  /**
   * Constructor
   * @param modules Names of the available modules to load
   */
  constructor(modules: Array<IModuleConfig>) {
    this._availableModules = new Map<string, Module>();

    for (const module of modules) {
      this._availableModules.set(module.name, new Module(this, module));
    }
  }

  /**
   * Gets configuration file for each module and loads their controllers
   */
  public async loadModules(): Promise<void> {
    for (const [, module] of this._availableModules) {
      await module.startModule();
    }
  }
}
