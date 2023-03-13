import { IModuleState } from './module.interface.js';

export interface IAppState {
  state: IApp;
  status: 'READY' | 'STARTING' | 'STOPPED';
}

interface IApp {
  modules: Array<IModuleState>;
  currentLoadLevel: 1 | 2 | 3;
}
