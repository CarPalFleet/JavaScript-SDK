import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { snakeCaseDecorator } from '../decorator/CoreDecorators';

export const fileUploadAsync = async (fileObject, token) => {
  try {
    // fileObject = snakeCaseDecorator(fileObject);
    let response = await axios(endpoints.BATCH_FILE_UPLOAD, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {grouping_preadsheet: JSON.stringify(fileObject.groupingSpreadsheet)}
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
