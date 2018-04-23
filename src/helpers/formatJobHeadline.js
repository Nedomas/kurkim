import _ from 'lodash';

export default (headline) => {
  return _.capitalize(headline).replace(/Ui(?=\W)/i, 'UI').replace(/Ux(?=\W)/i, 'UX');
};
