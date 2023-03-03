import resolvePackagePath from 'resolve-package-path';
import { ModuleConfiguration } from './module-configuration';

export class ModuleLoader {
  private static moduleConfiguration: ModuleConfiguration;

  public static getModuleConfig() {
    resolvePackagePath(
      'rsvp',
      'base-dir/to/start/the/node_resolution-algorithm-from'
    ); // => /path/to/rsvp.json or null
    const { findUpPackagePath } = resolvePackagePath;
    return findUpPackagePath('base-dir/to/start');
  }
}
