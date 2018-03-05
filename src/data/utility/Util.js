/**
 * Convert Object into string as URL params
 * Example: &limit=10&offset=20
 * @param {object} filters
 * @return {string} urlString
 */
export const convertObjectIntoURLString = (filters) => {
  return Object.keys(filters).reduce(
    (str, key) => (str += `&${key}=${filters[key]}`),
    ''
  );
};
