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

    let response = axios({
      method: 'GET',
      url: 'https://api-test.carpal.me/v3/identities',
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
