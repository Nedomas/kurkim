import _ from 'lodash';

const cache = [];

const transformationPart = (transformations) => {
  if (_.isEmpty(transformations)) return '';

  if (_.has(transformations, 'ogImage')) {
    transformations.width = 1200;
    transformations.height = 630;
  }

  const transformationParts = _.map({ fit: 'crop', ..._.omit(transformations, 'ogImage', 'quality') }, (val, key) => {
    if (_.isNumber(val)) return `${key}:${val * 2}`;

    return `${key}:${val}`;
  });

  const quality = transformations.quality || 90;

  return `/output=format:jpg/resize=${transformationParts.join(',')}/quality=value:${quality}/compress`;
};

const cacheImage = (image, transformations) => {
  const sameHandleCacheImages = _.filter(cache, { handle: _.get(image, 'handle') });

  if (_.isEmpty(transformations)) {
    return _.find(sameHandleCacheImages, { transformations: [] });
  }

  return _.find(sameHandleCacheImages, (cacheImage) => {
    return _.get(cacheImage, 'transformations.width') >= transformations.width - transformations.width * 0.15 &&
      _.get(cacheImage, 'transformations.height') >= transformations.height - transformations.height * 0.15
  });
};

export default (image, transformations = [], exactCache) => {
  if (!image) return '';
  if (exactCache && cacheImage(image, transformations)) return cacheImage(image, transformations).url;

  const url = `https://media.graphcms.com${transformationPart(transformations)}/${_.get(image, 'handle')}`;
  cache.push({
    ...image,
    transformations,
    url,
  });

  return url;
};
