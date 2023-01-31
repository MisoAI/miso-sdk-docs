import _groups from './groups.yml';
import _props from './props.yml';

const props = Object.freeze(_props);

function getEventProps(name) {
  return props.filter((prop) => 
    (!prop.used_by && !prop.used_by_except) ||
    (prop.used_by && prop.used_by.includes(name)) ||
    (prop.used_by_except && !prop.used_by_except.includes(name))
  );
}

const groups = Object.freeze(_groups.map(group => Object.freeze({
  ...group,
  events: group.events.map(event => Object.freeze({
    ...event,
    props: getEventProps(event.name)
  })),
})));

export default Object.freeze({ props, groups });
