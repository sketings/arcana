import { ModuleEvents } from './module-events';

const pubSub = ModuleEvents;

class Test {
  public init() {
    console.log("je suis entrain de m'init ");
  }
}

pubSub.subscribe('Premiere event', message => {
  console.log(message);
});

pubSub.subscribe<Test>('Second event', new Test());

// pubSub.publish("Premiere event", 'coucou')
const test = pubSub.publish('Second event');

console.log(test);
