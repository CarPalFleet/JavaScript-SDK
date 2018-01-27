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
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'crossDomain': true,
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI5ZjgwZWRmMTQ1MmNlMzA4ZGY1ZDNiYTgwOWI3YzQ3NWFiZDE4MTQyOGY1NWMyNmY1ZTU0MGJkMTEwNWFmYTI2YThhMTBiZmViMWEzYmI5In0.eyJhdWQiOiIyIiwianRpIjoiYjlmODBlZGYxNDUyY2UzMDhkZjVkM2JhODA5YjdjNDc1YWJkMTgxNDI4ZjU1YzI2ZjVlNTQwYmQxMTA1YWZhMjZhOGExMGJmZWIxYTNiYjkiLCJpYXQiOjE1MTY5NTU0NzEsIm5iZiI6MTUxNjk1NTQ3MSwiZXhwIjoxNTE2OTU5MDcxLCJzdWIiOiIyNDA3Iiwic2NvcGVzIjpbImZ1bGwtYWNjZXNzIl19.J7ymPjviYnJaD8eIUcWPc5O_ts0hydhLMPcD3vC2EWb6exCjOBesx6K3noSZMjeFmIEbxrBVH_QrCeu_17HBDQJDXCAYGFy4m-tFPoMMB1PbzjqOpjIuVEBa088iR3iohmVwe9AyYl4xOZ1_Lev4Foc-EyRT6JTqKUDMAWfeFO9zyhT8hH81TmSOpzu9Zz1FeJgaN50vgW-t86b06nOrliP7gQk4JcWOVGj9BZRswOXdYQTI7MY9DVNlEtzGeRGbvV7aOLZeTMHEYcART87slV0LYq-iBDbZxntXJOkhOZTPLfXeGxU5wBiZxKk_7nqwXAFBTjxH7MG0GDOR_u6B2PXC7EpLqsVMoAtNKIPG4KVUPbNxiLcGqBtrdZmPXdenTAbSxbUvB3Xr4wXEF74fYNCWasY5DzyNDZ8g1iw7NT3eNiJPvRtzRTENLK3IddkKA7EMs8T5ECTxLGLUyHxZBj3NZ-3Lz9oogho-_7Euuw8EOA7X_vvueCGv07t7nV9A3NySIfwJGRYr-eowmYHYbGlOKQjZWCok_QHB-wIGv7jrShu_it2NNAnAl2Rr8QmUrmH2C13b6QTnUGK9FydHaL42R5TXEgKzuT-0yRzrlByAK4U3hT9KhqoE5P01xG-P0AcliISTu4EeTB4lRjFbQ5FxiVqV8u-aPtB6YBLkwso`
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
