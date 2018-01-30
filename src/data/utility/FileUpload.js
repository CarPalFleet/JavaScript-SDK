import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { snakeCaseDecorator } from '../decorator/CoreDecorators';
import FormData from 'form-data';

export const fileUploadAsync = async (fileObject, token) => {
  try {
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
  let rejectObj = {};
  if (e.response) {
    rejectObj = {statusCode: e.response.http_code, statusText: e.response.message}
  } else {
    /* Catch error of e.response
    That will be undefined when status code is 403 Forbidden */
    rejectObj = {statusCode: e.stat, statusText: }
  }
  return Promise.reject(rejectObj);
}
