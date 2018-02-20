import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { snakeCaseDecorator } from '../decorator/CoreDecorators';
import FormData from 'form-data';

export const fileUploadAsync = async (fileObject, token) => {
  try {
    var form = new FormData();
    form.append('grouping_spreadsheet', fileObject);

    let response = await axios(endpoints.API_V3.BATCH_FILE_UPLOAD, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      data: form
    });

    return camelize(response.data);
  } catch (e) {
    return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
  }
}
