import { IModuleConfig } from '../interfaces/module.interface';

export function isNpmModule(module: IModuleConfig): boolean {
  return module.npmModule !== undefined;
}

export function isIsolatedModule(module: IModuleConfig): boolean {
  return module.isolated !== undefined;
}

export function isLocalConfig(module: IModuleConfig): boolean {
  return module.path !== undefined;
}

export function isPeerModule(module: IModuleConfig): boolean {
  return module.peer !== undefined;
}

export function isLoadAsConfigurationModule(module: IModuleConfig): boolean {
  return module.loadAsConfiguration !== undefined;
}

export function isLoadLevelModule(module: IModuleConfig): boolean {
  return module.loadLevel !== undefined;
}
