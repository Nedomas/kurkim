import _ from 'lodash';

export default (that) => {
  if (_.isUndefined(that.props.windowWidth)) throw 'Import windowSize module please';

  return that.props.windowWidth <= 768;
};
