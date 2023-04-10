import { IAppState, IModuleConfig } from '../../types';
import { SYSTEM } from './constant';
import { Freeze } from './decorator/app.decorator';
import { ModuleEvents, ModuleEventsType } from './events/module-events';
import { Module } from './module';
import { ModulesManager } from './modules-manager';
import { Logger } from './services/logger.service';

/**
 * Represents an application using modules
 */
@Freeze
export class ApplicationFactory {
  //Modules Manager of the application
  private _modulesManager: ModulesManager;

  private readonly _event: ModuleEventsType;

  //Will be the global state of the app
  private _appState: IAppState;

  constructor() {
    this._event = new ModuleEvents();
  }

  public get appState(): Object {
    return this._appState;
  }

  public async create(modules: Array<IModuleConfig>) {
    this._modulesManager = new ModulesManager(this._event);
    this._modulesManager.parseModules(modules);
  }

  public async init() {
    this._initAppEvent();
    this._modulesManager.init(this._event);
    Logger.init(this._event);
  }

  private _initAppEvent() {
    this._event.subscribe(
      `${SYSTEM.SYSTEM_METHOD}:app_state_handler`,
      this._stateActionHandler,
      {
        name: SYSTEM.SYSTEM_METHOD
      } as Module
    );
  }

  private _stateActionHandler({
    action,
    stateName,
    value,
    reference
  }: {
    action: string;
    stateName: string;
    value?: any;
    reference?: any;
  }) {
    switch (action) {
      case 'set':
        if (!this._appState)
          this._appState = {
            state: {}
          } as IAppState;
        this._appState.state[stateName] = {
          value,
          reference
        };
        break;
      case 'get':
        return this._appState.state[stateName] ?? null;
      case 'delete':
        delete this._appState.state[stateName];
        break;
      default:
        break;
    }
  }
}
