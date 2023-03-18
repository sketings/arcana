import { Module } from '../module';

export class ModuleEvents {
  private _handlers: Record<
    string,
    {
      cb: unknown | Function;
      context?: Module;
      isPrivate: boolean;
    }
  > = {};

  /**
   * Resolve an event and return the value of the event
   * @param eventName Name of the event to resolve
   * @param msg Message to send to the event
   */
  public resolve(eventName: string, context?: Module, msg?: any): any {
    const event = this._handlers[eventName];
    if (!event) {
      console.warn(`event ${eventName} doesn't exist`);
      return;
    }

    // If event is in the same context as the module that call it
    // And it is private then we execute it
    // If it is not in the same context and it is private then we log a warning saying that the event is private
    // If it is not in the same context and it is public then we execute it
    if (
      event.context === context &&
      context instanceof Module &&
      event.isPrivate
    ) {
      return this.triggerEvent(eventName, msg);
    } else if (!event.isPrivate) {
      return this.triggerEvent(eventName, msg);
    } else {
      console.warn(`event ${eventName} is private`);
      return;
    }
  }

  /**
   *
   * @param eventName
   * @param msg
   */
  private triggerEvent(eventName: string, msg: any) {
    const event = this._handlers[eventName];

    if (event.cb instanceof Function) {
      return event.cb(msg);
    }

    return event;
  }

  /**
   * Subscribe to an event and add a callback to call when the event is triggered
   * @param eventName Name of the event to subscribe
   * @param cb Callback to call when the event is triggered
   */
  public subscribe<T>(
    eventName: string,
    cb: T | Function,
    context: Module,
    isPrivate?: boolean
  ) {
    if (this._handlers[eventName]) {
      console.warn(`event ${eventName} already exist`);
      return;
    }

    const handler = {
      cb,
      context,
      isPrivate: !!isPrivate
    };

    if (context) {
      if (context.name === 'system' || context instanceof Module) {
        handler.context = context;
      } else {
        console.warn(`event '${eventName}' context is not a module`);
      }
    }

    if (eventName.includes(context.name)) {
      this._handlers[eventName] = handler;
    } else {
      console.warn(
        `event '${eventName}' is not in the correct format : ${context.name}:event `
      );
    }
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
}

export type ModuleEventsType = ModuleEvents;
