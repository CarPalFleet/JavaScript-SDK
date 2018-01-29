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
        'Content-Type': `multipart/form-data;charset=utf-8;boundary=${fileObject.groupingSpreadsheet}`
      },
      data: {grouping_spreadsheet: fileObject.groupingSpreadsheet}
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
