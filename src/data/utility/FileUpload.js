import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { snakeCaseDecorator } from '../decorator/CoreDecorators';

export const fileUploadAsync = async (fileObject, token) => {
  try {
    fileObject = snakeCaseDecorator(fileObject);
    console.log("Token", token);
    // let axiosData = {
    //   method: 'POST',
    //   url: endpoints.BATCH_FILE_UPLOAD,
    //   header: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //           },
    //   data: {"grouping_spreadsheet": JSON.stringify(fileObject.grouping_spreadsheet)}
    // }
    //

    let response = await axios('https://api-test.carpal.me/v3/customer/grouping-location?pickup_date=2018-01-30&status_ids=4&limit=100&offset=200', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'crossDomain': true,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true,
      credentials: 'same-origin',
    });

    // let response = await axios(axiosData);
    console.log("RES", response);
    return camelize(response);
  } catch (e) {
    handleFileUploadError(e);
  }
}

function handleFileUploadError(e) {
  console.log("http_code", e);
  return Promise.reject({statusCode: 'xxx', statusText: 'xxx'});
  // return Promise.reject({statusCode: e.response.http_code, statusText: e.response.message});
}
