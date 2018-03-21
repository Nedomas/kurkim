import _ from 'lodash';
import uuidv1 from 'uuid/v1';

export default (event, properties) => {
  if (!window.analytics) return;

  window.analytics.track(event, properties);

  if (_.get(properties, 'email') && _.get(properties, 'firstName')) {
    window.analytics.identify(uuidv1(), properties);
  }
};
