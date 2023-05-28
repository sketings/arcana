import * as fs from 'fs';
import * as path from 'path';
import { Freeze } from '../decorator/app.decorator';
import { Module } from '../module';

const initFileName = 'loader';
@Freeze
class ModuleLoaderStatic {
  private projectType: ModuleProjectType;

  public loadConfig(module: Module): void {
    this.getLocalModulePath(module);
    return;
  }

  // TODO: add possibility to stop module
  private async getLocalModulePath(module: Module): Promise<void> {
    this.readFolder(module);
    if (!this.projectType) {
      return;
    }

    // TODO: remove this when we will have a build system
    if (process.env.ENV === 'PRODUCTION') {
      this.projectType = ModuleProjectType.JS;
    } else {
      this.projectType = ModuleProjectType.TS;
    }

    const modulePath = path.resolve(
      __dirname,
      `../../../modules/${module.moduleConf.folderName}/${initFileName}.${this.projectType}`
    );

    const moduleToImport: any = await import(`${modulePath}`);
    this.initModule(moduleToImport, module);
  }

  private readFolder(module: Module): void {
    fs.readdirSync(
      path.resolve(
        __dirname,
        `../../../modules/${module.moduleConf.folderName}`
      )
    ).forEach(file => {
      const files = file.split('.');
      if (
        files[files.length - 1] === ModuleProjectType.TS &&
        files[0] === `${initFileName}`
      ) {
        this.projectType = ModuleProjectType.TS;
        return;
      }
    });
  }

  private initModule(moduleConstructor: any, module: Module): void {
    try {
      const moduleToLoad = new moduleConstructor.default();
      moduleToLoad.start(module);
    } catch {
      console.log(`The module '${module.name}' doesn't have a default export`);
    }
  }
}

enum ModuleProjectType {
  TS = 'ts',
  JS = 'js'
}
export type ModuleLoaderType = ModuleLoaderStatic;
export const ModuleLoader = new ModuleLoaderStatic();
