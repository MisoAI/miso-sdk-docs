import { workflows, events, properties } from './events.yml';

const propertyMap = properties.reduce((map, property) => {
  map[property.name] = property;
  return map;
}, {});

const eventMap = events.reduce((map, event) => {
  map[event.name] = {
    ...event,
    propertyNames: event.properties,
    properties: event.properties.map(name => propertyMap[name]),
  };
  return map;
}, {});

export default Object.freeze(workflows.reduce((map, workflow) => {
  map[workflow.name] = workflow.events.map(name => eventMap[name]);
  return map;
}, {}));
