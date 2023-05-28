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
  // Name of the module
  name: string;
  // Name of the folder that the module is located in
  folderName: string;
  // The port that the module will be exposed on
  port?: number;
  // If set true the module will be isolated from the rest of the app
  isolated?: boolean;
  // peer is a list of modules that will depend on this module and be loaded with it
  peers?: Array<IModuleConfig>;
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
