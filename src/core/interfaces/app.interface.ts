import { IModuleState } from './module.interface';

export interface IAppState {
  state: IApp;
  status: 'READY' | 'STARTING' | 'STOPPED';
}

interface IApp {
  modules: Array<IModuleState>;
  currentLoadLevel: 1 | 2 | 3;
}
