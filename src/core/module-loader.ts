import resolvePackagePath from 'resolve-package-path';
import { Module } from './module';

class ModuleLoaderStatic {
  public loadConfig(module: Module) {}

  public static getNpmNodeModulePath() {
    resolvePackagePath(
      'rsvp',
      'base-dir/to/start/the/node_resolution-algorithm-from'
    ); // => /path/to/rsvp.json or null
    const { findUpPackagePath } = resolvePackagePath;
    return findUpPackagePath('base-dir/to/start');
  }
}

export const ModuleLoader = new ModuleLoaderStatic();
