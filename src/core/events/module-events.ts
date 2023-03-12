// HELP¨
// https://github.com/jherr/no-bs-ts/blob/master/series-2/episode-2-pubsub/basic/Subscribable-class.ts

class ModuleEventsStatic {
  // TODO ajouter un system d'event public / private et accessibilité dans certains context
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

  public broadcast(name: string, eventToTrigger: string, payload?: any) {
    for (const [eventName, handler] of Object.entries(this._handlers)) {
      if (eventToTrigger === eventName) {
        console.log(`${name} has been broadcast`);
        if (handler instanceof Function) {
          handler(payload);
        }

        return handler;
      }
    }
  }
}

export type ModuleEventsType = ModuleEventsStatic;
export const ModuleEvents = new ModuleEventsStatic();
