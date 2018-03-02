import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const createNewCustomerAsync = async ({
  email,
  password,
  firstName,
  lastName,
  phone,
  birthday,
  identityId,
  coName,
  coPhone,
  coVatNo,
}) => {
  try {
    const response = await axios({
      method: 'post',
      url: endpoints.NEW_CUSTOMER,
      headers: { 'Content-Type': 'application/json' },
      data: {
        email,
        password,
        firstName,
        lastName,
        phone,
        identityId,
        birthday,
        companyName: coName,
        companyPhone: coPhone,
        companyVatNumber: coVatNo,
      },
    });
    return camelize(response.data.data);
  } catch (e) {
    return Promise.reject({
      statusCode: e.response.status,
      statusText: e.response.statusText,
    });
  }
};
