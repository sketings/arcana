import resolvePackagePath from 'resolve-package-path';
import { IModuleConfig } from './interfaces/module.interface';

export class ModuleLoader {
  private static moduleConfiguration: IModuleConfig;

  public static getModuleConfig() {
    resolvePackagePath(
      'rsvp',
      'base-dir/to/start/the/node_resolution-algorithm-from'
    ); // => /path/to/rsvp.json or null
    const { findUpPackagePath } = resolvePackagePath;
    return findUpPackagePath('base-dir/to/start');
  }
}
