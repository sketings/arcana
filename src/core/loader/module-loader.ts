import * as fs from 'fs';
import * as path from 'path';
import { Freeze } from '../decorator/app.decorator';
import { Module } from '../module';

@Freeze
class ModuleLoaderStatic {
  private readonly initFileName = 'loader';
  private module: Module;
  private projectType: ModuleProjectType;

  public loadConfig(module: Module): void {
    this.module = module;
    this.getLocalModulePath();
    return;
  }

  private async getLocalModulePath(): Promise<void> {
    this.readFolder();
    if (!this.projectType) {
      return;
    }

    if (process.env.ENV === 'PRODUCTION') {
      this.projectType = ModuleProjectType.JS;
    } else {
      this.projectType = ModuleProjectType.TS;
    }

    const modulePath = path.resolve(
      __dirname,
      `../../../modules/${this.module.moduleConf.folderName}/${this.initFileName}.${this.projectType}`
    );

    const module: any = await import(`${modulePath}`);
    this.initModule(module);
  }

  private readFolder(): void {
    fs.readdirSync(
      path.resolve(
        __dirname,
        `../../../modules/${this.module.moduleConf.folderName}`
      )
    ).forEach(file => {
      const files = file.split('.');
      if (
        files[files.length - 1] === ModuleProjectType.TS &&
        files[0] === `${this.initFileName}`
      ) {
        this.projectType = ModuleProjectType.TS;
        return;
      }
    });
  }

  private initModule(moduleConstructor: any): void {
    try {
      const module = new moduleConstructor.default();
      module.start(this.module);
    } catch {
      console.log(
        `The module '${this.module.name}' doesn't have a default export`
      );
    }
  }
}

enum ModuleProjectType {
  TS = 'ts',
  JS = 'js'
}
export type ModuleLoaderType = ModuleLoaderStatic;
export const ModuleLoader = new ModuleLoaderStatic();
