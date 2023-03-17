import { ModuleEvents, ModuleEventsType } from './module-events';

describe('ModuleEventsStatic', () => {
  let event: ModuleEventsType;
  beforeEach(() => {
    event = new ModuleEvents();
  });

  it('should resolve an event that contain a function', () => {
    event.subscribe('eventName', () => {
      return 'test';
    });

    const resolvedEvent = event.resolve('eventName');
    expect(resolvedEvent).toBeDefined();
    expect(resolvedEvent).toEqual('test');
  });

  it('should resolve an event that contain a class', () => {
    class Test {
      public test() {
        return 'test';
      }
    }

    event.subscribe('eventName', new Test());
    const resolvedEvent = event.resolve('eventName');
    expect(resolvedEvent).toBeDefined();
    expect(resolvedEvent).toEqual(expect.any(Test));
    expect(resolvedEvent.test()).toEqual('test');
  });

  it('should return an warn when trying to resolve an event that does not exist', () => {
    console.warn = jest.fn();
    event.resolve('test');
    expect(console.warn).toHaveBeenCalledWith("event test doesn't exist");
  });

  it('should subscribe an event', () => {
    event.subscribe = jest.fn();
    event.subscribe('eventName', () => {
      return 'test';
    });
    expect(event.subscribe).toHaveBeenCalledWith(
      'eventName',
      expect.any(Function)
    );
  });

  it('should return an warn when trying to subscribe an event that already exist', () => {
    console.warn = jest.fn();
    event.subscribe('test', () => {
      return 'test';
    });
    event.subscribe('test', () => {
      return 'test';
    });

    expect(console.warn).toHaveBeenCalledWith('event test already exist');
  });

  it('should unsubscribe an event', () => {
    event.subscribe('test', () => {
      return 'test';
    });
    event.unsubscribe('test');
    expect(event.resolve('test')).toBeUndefined();
  });

  it('should return an warn when trying to unsubscribe an event that does not exist', () => {
    console.warn = jest.fn();
    event.unsubscribe('test');
    expect(console.warn).toHaveBeenCalledWith("event test doesn't exist");
  });
});
