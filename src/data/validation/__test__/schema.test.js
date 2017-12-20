import { getSchemaAsync, validate } from '../Schema';

// describe('Test for retrieving schema by service and schema name', () => {
//   jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//   const schemaTypes = [{domain: 'customer', type: 'dashboard-order'}];
//   schemaTypes.forEach((element) => {
//     it(`${element.domain} - ${element.type}`, async () => {
//        const response = await getSchemaAsync(element.domain, element.type);
//        expect(response.properties).toBeTruthy();
//     });
//   });
// });

test('Test for comparison of schema and payload', async () =>{
    let schema = {"order_id": "number",
                    "order_status_id": "number",
                    "pickup_date": "string",
                    "latitude": "string",
                    "longitude": "string",
                    "driver_id": "number",
                    "driver_name": "string"};

    const payload = {"order_id": 123,
                     "order_status_id": 1,
                     "pickup_date": "2017-12-01",
                     "latitude": "103.2340123",
                     "longitude": "1.230491",
                     "driver_id": 1,
                     "driver_name": "Driver A"};

    expect(validate(schema, payload)).toBeTruthy();

    schema = {"order_id": "string",
              "order_status_id": "number",
              "pickup_date": "string",
              "latitude": undefined,
              "longitude": "string",
              "driver_id": "number",
              "driver_name": "string"};
    expect(validate(schema, payload)).toBe(false);
})
