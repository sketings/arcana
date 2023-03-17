// HELP¨
// https://github.com/jherr/no-bs-ts/blob/master/series-2/episode-2-pubsub/basic/Subscribable-class.ts

export class ModuleEvents {
  // TODO ajouter un system d'event public / private et accessibilité dans certains context
  private _handlers: Record<string, unknown | Function> = {};

  /**
   * Resolve an event and return the value of the event
   * @param eventName Name of the event to resolve
   * @param msg Message to send to the event
   */
  public resolve(eventName: string, msg?: any): any {
    const event = this._handlers[eventName];
    if (!event) {
      console.warn(`event ${eventName} doesn't exist`);
      return;
    }

    if (event instanceof Function) {
      return event(msg);
    }

    return event;
  }

  /**
   * Subscribe to an event and add a callback to call when the event is triggered
   * @param eventName Name of the event to subscribe
   * @param callback Callback to call when the event is triggered
   */
  public subscribe<T>(eventName: string, callback: T | Function) {
    if (this._handlers[eventName]) {
      console.warn(`event ${eventName} already exist`);
      return;
    }

    this._handlers[eventName] = callback;
  }

  /**
   * Unsubscribe to an event
   * @param eventName Name of the event to unsubscribe
   */
  public unsubscribe(eventName: string) {
    if (!this._handlers[eventName]) {
      console.warn(`event ${eventName} doesn't exist`);
      return;
    }
    delete this._handlers[eventName];
  }

  //TODO ajouter un systeme de broadcast public / private et accessibilité dans certains context
  /**
   * Broadcast an event to a specific subscriber
   * @param eventToTrigger Name of the event to trigger
   * @param payload Payload to send to the event
   */
  public broadcast(eventToTrigger: string, payload?: any) {
    const event = this._handlers[eventToTrigger];
    if (!event) {
      console.warn(`event ${eventToTrigger} doesn't exist`);
      return;
    }

    if (event instanceof Function) {
      return event(payload);
    }

    return event;
  }
}

export type ModuleEventsType = ModuleEvents;
