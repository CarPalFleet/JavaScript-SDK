import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const getSchemaAsync = async (service, schemaName) => {
  try {
    const response = await axios.get(
      endpoints.SCHEMAS.replace('{0}', service).replace('{1}', schemaName)
    );
    return camelize(response.data.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};

export const validate = (schema, payload) => {
  const schemaKeys = Object.keys(schema);
  return Object.entries(payload).every(
    ([key, value]) => schemaKeys.includes(key) && typeof value === schema[key]
  );
};
