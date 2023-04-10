import { IModuleConfig } from '../../types';
import { ModuleEvents } from './events/module-events';
import { ModuleLoader } from './loader/module-loader';
import { Module } from './module';

const MODULE_CONF_MOCK = {
  name: 'test',
  version: '1.0.0',
  npmModule: false,
  isolated: false,
  folderName: 'test',
  peer: []
} as IModuleConfig;

describe('Module', () => {
  let module: Module;

  beforeEach(() => {
    module = new Module(MODULE_CONF_MOCK, new ModuleEvents(), ModuleLoader);
  });

  describe('state', () => {
    it('add a state', () => {
      module.setState('appTest', 'I am a test');
      expect(typeof module.state.appTest).toBe('string');
      expect(module.state.appTest).toEqual('I am a test');
    });

    it('Should console error an error because he is trying to add an existing state', () => {
      console.error = jest.fn();
      module.setState('appTest', 'I am a test');
      module.setState('appTest', 'I am a test');
      expect(console.error).toHaveBeenCalledWith(
        'Cannot add state : appTest because it already exist'
      );
    });

    it('update a state', () => {
      module.setState('appTest', 'I am a test');
      module.updateState('appTest', 'I am a new test');
      expect(typeof module.state.appTest).toBe('string');
      expect(module.state.appTest).toEqual('I am a new test');
    });

    it('Should console error an error because he is trying to update a non existing state', () => {
      console.error = jest.fn();
      module.updateState('appTest', 'I am a test');
      expect(console.error).toHaveBeenCalledWith(
        'Cannot update state : appTest because it does not exist'
      );
    });

    it('remove a state', () => {
      module.setState('appTest', 'I am a test');
      module.removeState('appTest');
      expect(module.state.appTest).toBeUndefined();
    });
  });

  describe('Properties', () => {
    it('should return the module configuration', () => {
      expect(module.moduleConf).toEqual(MODULE_CONF_MOCK);
    });

    it('should return the module name', () => {
      expect(module.name).toEqual(MODULE_CONF_MOCK.name);
    });

    it('should return the module events', () => {
      expect(module.event).toEqual(new ModuleEvents());
    });
  });

  describe('Module init', () => {
    it('should load the module configuration', () => {
      ModuleLoader.loadConfig = jest.fn();
      module.init();
      expect(ModuleLoader.loadConfig).toHaveBeenCalledWith(module);
    });

    it('should console error an error if the module configuration is not loaded', () => {
      console.error = jest.fn();
      ModuleLoader.loadConfig = jest.fn(() => {
        throw new Error('error');
      });
      module.init();
      expect(console.error).toHaveBeenCalledWith(
        `An error occur while loading module : ${MODULE_CONF_MOCK.name}`
      );
    });
  });
});
