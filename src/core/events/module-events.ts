// HELP¨
// https://github.com/jherr/no-bs-ts/blob/master/series-2/episode-2-pubsub/basic/Subscribable-class.ts

class ModuleEventsStatic {
  private _handlers: Record<string, unknown | Function> = {};

  public publish(eventName: string, msg?: any): any {
    const event = this._handlers[eventName];
    if (!event) {
      console.log(`event ${eventName} doesn't exist`);
      return;
    }

    if (event instanceof Function) {
      event(msg);
    }

    return event;
  }

  public subscribe<T>(eventName: string, callback: T | Function) {
    if (this._handlers[eventName]) {
      console.warn(`event ${eventName} already exist`);
      return;
    }

    this._handlers[eventName] = callback;
  }

  public unsubscribe(eventName: string, callback: any) {
    if (!this._handlers[eventName]) {
      console.warn(`event ${eventName} doesn't exist`);
      return;
    }
    delete this._handlers[eventName];
  }
}

export type ModuleEventsType = ModuleEventsStatic;
export const ModuleEvents = new ModuleEventsStatic();
