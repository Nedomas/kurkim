import _ from 'lodash';

const cache = [];

const transformationPart = (transformations) => {
  if (_.isEmpty(transformations)) return '';

  if (_.has(transformations, 'ogImage')) {
    transformations.width = 1200;
    transformations.height = 630;
  }

  const transformationParts = _.map({ fit: 'crop', ..._.omit(transformations, 'ogImage') }, (val, key) => {
    if (_.isNumber(val)) return `${key}:${val * 2}`;

    return `${key}:${val}`;
  });

  return `/output=format:jpg/resize=${transformationParts.join(',')}/quality=value:80/compress`;
};

const cacheImage = (image, transformations) => {
  const sameHandleCacheImages = _.filter(cache, { handle: _.get(image, 'handle') });

  if (_.isEmpty(transformations)) {
    return _.find(sameHandleCacheImages, { transformations: [] });
  }

  return _.find(sameHandleCacheImages, (cacheImage) => {
    return _.get(cacheImage, 'transformations.width') >= transformations.width &&
      _.get(cacheImage, 'transformations.height') >= transformations.height
  });
};

export default (image, transformations = []) => {
  if (!image) return '';
  if (cacheImage(image, transformations)) return cacheImage(image, transformations).url;

  const url = `https://media.graphcms.com${transformationPart(transformations)}/${_.get(image, 'handle')}`;
  cache.push({
    ...image,
    transformations,
    url,
  });

  return url;
};
