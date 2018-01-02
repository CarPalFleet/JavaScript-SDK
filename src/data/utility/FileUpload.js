import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const fileUploadAsync = async ({file, customerId, showProgress}, token) => {
  let axiosData = {
    method: 'POST',
    url: endpoints.FILE_UPLOAD.replace('{0}', customerId),
    header: {'Authorization': `Bearer ${token}`, 'X-Requested-With': 'XMLHttpRequest'},
    data: file
  }

  if (showProgress) {
    axiosData.config = { onUploadProgress: progressEvent => console.log(progressEvent.loaded) }
  }

  let response = await axios(axiosData);
  return camelize(response);
}

fileUploadAsync().catch(handleFileUploadError);

function handleFileUploadError(e) {
  return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
}
