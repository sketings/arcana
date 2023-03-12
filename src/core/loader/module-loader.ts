import * as fs from 'fs';
import path from 'path';
import resolvePackagePath from 'resolve-package-path';
import { Module } from '../module';
import { isLocalConfig } from './module-loader.guard';

class ModuleLoaderStatic {
  private readonly initFileName = 'loader';
  private module: Module;
  private projectType: ModuleProjectType;

  public loadConfig(module: Module) {
    this.module = module;
    isLocalConfig(this.module.moduleConf)
      ? this.getLocalModulePath()
      : this.getNpmNodeModulePath();
    return;
  }

  private getNpmNodeModulePath() {
    resolvePackagePath(
      'rsvp',
      'base-dir/to/start/the/node_resolution-algorithm-from'
    ); // => /path/to/rsvp.json or null
    const { findUpPackagePath } = resolvePackagePath;
    return findUpPackagePath('base-dir/to/start');
  }

  private async getLocalModulePath() {
    this.readFolder(this.module.moduleConf.path);
    const modulePath = path.resolve(
      this.module.moduleConf.path,
      `./${this.initFileName}.${this.projectType}`
    );
    const module: any = await import(`file://${modulePath}`);
    this.initModule(module);
  }

  private readFolder(modulePath): void {
    fs.readdirSync(modulePath).forEach(file => {
      const files = file.split('.');
      if (
        files[files.length - 1] === ModuleProjectType.JS &&
        files[0] === `${this.initFileName}`
      ) {
        this.projectType = ModuleProjectType.JS;
        return;
      }
      if (
        files[files.length - 1] === ModuleProjectType.TS &&
        files[0] === `${this.initFileName}`
      ) {
        this.projectType = ModuleProjectType.TS;
        return;
      }
    });
  }

  private initModule(moduleConstructor: any) {
    try {
      const module = new moduleConstructor.default();
      module.start();
    } catch {
      console.log(
        `The module '${this.module.name}' doesn't have a default export`
      );
    }
  }
}

enum ModuleProjectType {
  JS = 'js',
  TS = 'ts'
}
export type ModuleLoaderType = ModuleLoaderStatic;
export const ModuleLoader = new ModuleLoaderStatic();
