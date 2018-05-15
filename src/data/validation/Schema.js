import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { apiResponseErrorHandler } from '../utility/Util';

/**
 * Retrieve Schema
 * @param {object} service
 * @param {string} schemaName
 * @return {object} Promise reject with statusCode and statusText
 * @deprecated since version 0.1.77
 */
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

/**
 * Validate Schema
 * Example: &limit=10&offset=20
 * @param {object} schema
 * @param {string} payload
 * @return {boolean} true/false
 * @deprecated since version 0.1.77
 */
export const validateSchema = (schema, payload) => {
  const schemaKeys = Object.keys(schema);
  return Object.entries(payload).every(
    ([key, value]) => schemaKeys.includes(key) && typeof value === schema[key]
  );
};
