import { Module } from './module';

export class ModulesManager {
  //Array of available modules
  private _availableModules: Map<string, Module>;

  // Array of loaded modules
  private _loadedModules: Map<string, Module>;

  /**
   * Constructor
   * @param modulesNames Names of the available modules to load
   */
  constructor(modulesNames: Array<string>, loadModules?: boolean) {
    this._availableModules = new Map<string, Module>();

    for (const moduleName of modulesNames) {
      this._availableModules.set(moduleName, new Module(this, moduleName));
    }

    if (loadModules) {
      this.loadModules();
    }
  }

  /**
   * Gets configuration file for each module and loads their controllers
   */
  public loadModules(): void {
    let loadingPromises = new Array<Promise<any>>();

    for (const [, module] of this._availableModules) {
      loadingPromises.push(module.loadModule());
    }
  }

  public loadModule(moduleName: string): void {
    if (!this._availableModules.get(moduleName)) {
      throw new Error('Module not found');
    }

    if (this._loadedModules.get(moduleName)) {
      throw new Error('Module already loaded');
    }

    this._loadedModules.get(moduleName).loadModule();
  }

  async removeModule() {}
}
