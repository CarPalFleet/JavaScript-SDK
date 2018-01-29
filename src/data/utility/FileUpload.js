import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { snakeCaseDecorator } from '../decorator/CoreDecorators';
import FormData from 'form-data';

export const fileUploadAsync = async (fileObject, token) => {
  try {
    // fileObject = snakeCaseDecorator(fileObject);
    console.log("SDK file obj", fileObject);
    var form = new FormData();
    form.append('grouping_spreadsheet', fileObject);

    let response = await axios(endpoints.BATCH_FILE_UPLOAD, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      data: form
    });

    return camelize(response.data);
  } catch (e) {
    handleFileUploadError(e);
  }
}

function handleFileUploadError(e) {
  if (e.response) {
    return Promise.reject({statusCode: e.response.http_code, statusText: e.response.message});
  } else {
    return {statusCode: 500, statusText: 'Error in file Upload'}
  }
}
