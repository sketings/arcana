import { IModuleConfig } from '../../../types';
import { ModuleLoaderType } from '../loader/module-loader';
import { Module } from '../module';
import { ModuleEvents, ModuleEventsType } from './module-events';

describe('ModuleEventsStatic', () => {
  let event: ModuleEventsType;
  let module: Module;
  beforeEach(() => {
    event = new ModuleEvents();
    module = new Module(
      {
        name: 'module_test'
      } as IModuleConfig,
      event,
      {} as ModuleLoaderType
    );
  });

  it('should resolve an event that contain a function', () => {
    event.subscribe(
      'module_test:eventName',
      () => {
        return 'test';
      },
      module
    );

    const resolvedEvent = event.resolve('module_test:eventName');
    expect(resolvedEvent).toBeDefined();
    expect(resolvedEvent).toEqual('test');
  });

  it('should resolve an event that contain a class', () => {
    class Test {
      public test() {
        return 'test';
      }
    }

    event.subscribe('module_test:eventName', new Test(), module);
    const resolvedEvent = event.resolve('module_test:eventName');
    expect(resolvedEvent).toBeDefined();
    expect(resolvedEvent.cb).toEqual(expect.any(Test));
    expect(resolvedEvent.cb.test()).toEqual('test');
  });

  it('should return an warn when trying to resolve an event that does not exist', () => {
    console.warn = jest.fn();
    event.resolve('module_test:test');
    expect(console.warn).toHaveBeenCalledWith(
      "event module_test:test doesn't exist"
    );
  });

  it('should subscribe an event', () => {
    event.subscribe = jest.fn();
    event.subscribe(
      'module_test:eventName',
      () => {
        return 'test';
      },
      module
    );
    expect(event.subscribe).toHaveBeenCalledWith(
      'module_test:eventName',
      expect.any(Function),
      module
    );
  });

  it('should return an warn when trying to subscribe an event that already exist', () => {
    console.warn = jest.fn();
    event.subscribe(
      'module_test:test',
      () => {
        return 'test';
      },
      module
    );
    event.subscribe(
      'module_test:test',
      () => {
        return 'test';
      },
      module
    );

    expect(console.warn).toHaveBeenCalledWith(
      'event module_test:test already exist'
    );
  });

  it('should unsubscribe an event', () => {
    event.subscribe(
      'module_test:test',
      () => {
        return 'test';
      },
      module
    );
    event.unsubscribe('module_test:test');
    expect(event.resolve('module_test:test')).toBeUndefined();
  });

  it('should return an warn when trying to unsubscribe an event that does not exist', () => {
    console.warn = jest.fn();
    event.unsubscribe('module_test:test');
    expect(console.warn).toHaveBeenCalledWith(
      "event module_test:test doesn't exist"
    );
  });
});
