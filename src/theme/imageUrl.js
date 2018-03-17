import _ from 'lodash';

const transformationPart = (transformations) => {
  if (_.isEmpty(transformations)) return '';

  const transformationParts = _.map({ fit: 'crop', ...transformations }, (val, key) => {
    if (_.isNumber(val)) return `${key}:${val * 2}`;

    return `${key}:${val}`;
  });

  return `/resize=${transformationParts.join(',')}`;
};

export default (image, transformations) => {
  return `https://media.graphcms.com${transformationPart(transformations)}/${_.get(image, 'handle')}`
};
