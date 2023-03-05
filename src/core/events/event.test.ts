import { ModuleEvents } from './module-events';

type events = {
  CreatedPerson: { id: string; name: string };
  DeletedPerson: { personId: string; reason: string };
};

const pubSub = ModuleEvents;

pubSub.publish('CreatedPerson', 'helo');
pubSub.subscribe('CreatedPerson', message => {
  console.log(message);
});
