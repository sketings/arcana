export interface IModuleState {
  name: string;
  state: Object;
}

export interface IModuleParams {
  name: string;
}

export interface IModuleConfig {
  name: string;
  version?: string;
  npmModule: boolean;
  isolated?: boolean;
  localPath?: string;
  peer?: Array<string>;
  author?: string;
  loadAsConfiguration?: boolean;
  // 1 first level will be loaded before everything
  // 2 second level will be load after level 1
  // 3 second level will be load after level 2 and then the app will start
  loadLevel?: 1 | 2 | 3;
}
