import uuidv1 from 'uuid/v1';

export default (event, properties) => {
  if (!window.analytics) return;

  window.analytics.track(event, properties);

  if (properties.email && properties.firstName) {
    window.analytics.identify(uuidv1(), properties);
  }
};
