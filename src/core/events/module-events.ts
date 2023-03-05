// HELP¨
// https://github.com/jherr/no-bs-ts/blob/master/series-2/episode-2-pubsub/basic/Subscribable-class.ts
export class ModuleEventsStatic {
  private _handlers: Record<string, (...args: any[]) => any> = {};

  public publish(event: string, msg: any) {
    console.log(this._handlers);

    const handlers = this._handlers[event] ?? [];
    for (const [, handler] of Object.entries(handlers)) {
      handler(msg);
    }
  }

  public subscribe(eventName: string, callback: (...args: any[]) => any) {
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

export const ModuleEvents = new ModuleEventsStatic();
