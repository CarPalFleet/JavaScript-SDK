import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import {apiResponseErrorHandler} from '../utility/Util';

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
      method: 'POST',
      url: endpoints.NEW_CUSTOMER,
      headers: {'Content-Type': 'application/json'},
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
    return apiResponseErrorHandler(e);
  }
};
