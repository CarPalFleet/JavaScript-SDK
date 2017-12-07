import { getSchemaAsync, validate } from '../Schema';

test('Test for retrieving schema by service and schema name', async () =>{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const response = await getSchemaAsync('customer', 'dashboard-order');

    expect(response.domain).toBe('customer');
    expect(response.segment).toBe('dashboard-order');
    expect(response.properties).toBeTruthy();
})

test('Test for comparison of schema and payload', async () =>{
    let schema = {"order_id": "Number",
                    "order_status_id": "Number", 
                    "pickup_date": "String", 
                    "latitude": "String", 
                    "longitude": "String", 
                    "driver_id": "Number", 
                    "driver_name": "String"};

    const payload = {"order_id": 123,
                     "order_status_id": 1, 
                     "pickup_date": "2017-12-01", 
                     "latitude": "103.2340123", 
                     "longitude": "1.230491", 
                     "driver_id": 1, 
                     "driver_name": "Driver A"};
    expect(validate(schema, payload)).toBeTruthy();

    schema = {"order_id": "Number",
              "order_status_id": "Number", 
              "pickup_date": "String", 
              "latitude": "String", 
              "longitude": "String", 
              "driver_id": "Number", 
              "driver_name": "String",
              "customer_id": "Number"};
    expect(validate(schema, payload)).toBe(false);
})