import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { snakeCaseDecorator } from '../decorator/CoreDecorators';

export const fileUploadAsync = async (fileObject, token) => {
  try {
    fileObject = snakeCaseDecorator(fileObject);
    let axiosData = {
      method: 'POST',
      url: endpoints.BATCH_FILE_UPLOAD,
      header: {'Authorization': `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest'},
      data: fileObject
    }

    let response = await axios(axiosData);
    return camelize(response);
  } catch (e) {
    handleFileUploadError(e);
  }
}


function handleFileUploadError(e) {
  return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
}
