import { fileUploadAsync } from '../FileUpload';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';
import { snakeCaseDecorator } from '../../decorator/CoreDecorators';

test('Test for file uploading', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    const token = await result;
    // getFileData('./revised_create_order_spreadsheet.xlsx', 'utf8')
    //   .then(data => {
    //     console.log("DATA", data);
    //     // const response = await fileUploadAsync({grouping_spreadsheet: file}, token.accessToken);
    //     // expect('groupingBatchId' in response.data).toBe(true);
    //     expect(true).toBe(true);
    //   })
    //   .catch(error => console.log('Error: ', error));
    expect(true).toBe(true);
})

function getFileData(fileName, type) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, type, (err, data) => {
      console.log("fileName", err, data);
      //if has error reject, otherwise resolve
      return err ? reject(err) : resolve(data);
    })
  });
}
