import axios from 'axios';

const changeLanguage = (language) =>
  (axios.defaults.headers.common['Accept-Language'] = language);

export default changeLanguage;
