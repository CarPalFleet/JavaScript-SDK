import { getSchemaAsync } from '../Schema';

test('Test for retrieving schema by service and schema name', async () =>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const response = await getSchemaAsync('pubsub', 'orders');

    expect(response.fields).toBeTruthy();
})