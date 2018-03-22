import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

export const getSchemaAsync = async (service, schemaName) => {
  try {
    const response = await axios.get(
      endpoints.SCHEMAS.replace('{0}', service).replace('{1}', schemaName)
    );
    return camelize(response.data.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};

export const validateSchema = (schema, payload) => {
  const schemaKeys = Object.keys(schema);
  return Object.entries(payload).every(
    ([key, value]) => schemaKeys.includes(key) && typeof value === schema[key]
  );
};
