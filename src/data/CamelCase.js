import _ from 'lodash';

const CamelCase = (data) => {
  let camelCaseObject;
  if (_.isArray(data)) {
    camelCaseObject = [];
  } else if (_.isPlainObject(data)) {
    camelCaseObject = {};
  } else {
    return data;
  }
  _.forEach(
    data,
    function(value, key) {
      /* Check whether the value is Object OR Array */
      if (_.isPlainObject(value) || _.isArray(value)) {
        /* Update the keys of value(Object/Array) recursively */
        value = CamelCase(value);
      }
      camelCaseObject[_.camelCase(key)] = value;
    }
  )
  return camelCaseObject;
}

export default CamelCase;
