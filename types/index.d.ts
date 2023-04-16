// TODO: add to definitly typed
// https://levelup.gitconnected.com/publishing-typings-to-definitelytyped-d4e0777e40f5

// #region App
export interface IAppState {
  state: {
    [key: string]: any
  };
  status: 'READY' | 'STARTING' | 'STOPPED';
  env: 'DEV' | 'PRODUCTION';
}

// #endregion  

// #region Module
export interface IModuleState {
  name: string;
  state: Object;
}

export interface IModuleParams {
  name: string;
}

export interface IModuleConfig {
  name: string;
  folderName: string;
  port?: number;
  isolated?: boolean;
  peer?: Array<string>;
  loadAsConfiguration?: boolean;
  // 1 first level will be loaded before everything
  // 2 second level will be load after level 1
  // 3 second level will be load after level 2 and then the app will start
  loadLevel?: 1 | 2 | 3;
}

export interface IModuleMessages {
  name: string;
  message?: string;
  cb?: any;
  uid?: string;
  createdAt?: Date;
}
// #endregion  

// TODO: update this to be more generic
// #region Module Event
export { ModuleEventsType } from './src/core/events/module-events';
// #endregion  

// #region Module Loader
export { ModuleLoaderType } from './src/core/loader/module-loader';
// #endregion
