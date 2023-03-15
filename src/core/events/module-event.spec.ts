import { ModuleEvents, ModuleEventsType } from './module-events';

describe('ModuleEventsStatic', () => {
  let event: ModuleEventsType;
  beforeEach(() => {
    event = ModuleEvents;
  });

  it('should resolve an event', () => {
    event.resolve('test');
    // expect(event).toBeUndefined();
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

    event.subscribe('eventName', () => {
      return 'test';
    });
    event.subscribe('eventName', () => {
      return 'test';
    });
    expect(console.warn).toHaveBeenCalledWith('event eventName already exist');
  });

  it('should unsubscribe an event', () => {
    event.resolve('test');
    event.unsubscribe = jest.fn();
    event.unsubscribe('test');
    expect(event.unsubscribe).toHaveBeenCalledWith('test');
  });

  it('should return an warn when trying to unsubscribe an event that does not exist', () => {
    console.warn = jest.fn();
    event.unsubscribe('test');
    expect(console.warn).toHaveBeenCalledWith("event test doesn't exist");
  });
});
