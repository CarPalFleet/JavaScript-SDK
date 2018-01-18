import {
  getOrdersWithFilterAsync,
  getOrderDetailAsync,
  createNewDeliveryWindow,
  updateJobLiveData,
  getBatchOrderProgressAsync,
  getBatchLocationsAsync,
  fetchBatchLocationsErrorAsync,
  fetchBatchOrderCreateErrorMockUp,
  getGroupingLocationsAsync,
  groupLocations,
  retrieveErrors
} from '../Order';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';

// const ORDER_FILTERS = {
//   withoutMandentoryFields: [
//     { description: 'missing identityId', filters: {identityId: CONFIG.identityId}},
//     { description: 'missing pickupDate', filters: {pickupDate: CONFIG.pickupDate}}
//   ],
//   withMandentoryFields: [
//     { description: 'with mandentory fields', filters: {identityId: CONFIG.identityId, pickupDate: CONFIG.pickupDate}},
//     { description: 'with startPickupDate and endPickupDate', filters: {identityId: CONFIG.identityId, startPickupDate: CONFIG.startPickupDate, endPickupDate: CONFIG.endPickupDate}}
//   ]
// }
//
// describe('Test for customer orders with filters', () => {
//     ORDER_FILTERS.withoutMandentoryFields.forEach((value) => {
//         it(value.description, async () => {
//            const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//            const token = await result;
//            const response = getOrdersWithFilterAsync(value.filters, token.accessToken);
//            await expect(response).rejects.toHaveProperty('statusCode', 400)
//         })
//     });
//
//     ORDER_FILTERS.withMandentoryFields.forEach((value) => {
//         it(value.description, async () => {
//            const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//            const token = await result;
//            const response = await getOrdersWithFilterAsync(value.filters, token.accessToken);
//            expect(response instanceof Object).toBe(true);
//         })
//     });
// });

// const ORDER_FILTERS = {
//   withoutMandentoryFields: [
//     //{ description: 'missing identityId', filters: {identityId: CONFIG.identityId}},
//     { description: 'missing pickupDate', filters: {pickupDate: CONFIG.pickupDate}}
//   ],
//   withMandentoryFields: [
//     { description: 'with mandentory fields', filters: {pickupDate: CONFIG.pickupDate, orderStatusIds: CONFIG.statusIds}},
//     { description: 'with startPickupDate and endPickupDate', filters: {pickupDate: CONFIG.pickupDate, orderStatusIds: CONFIG.statusIds}}
//   ]
// }

// describe('Test for customer orders with filters', () => {
//     beforeAll(function() {
//         jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
//     });

//     ORDER_FILTERS.withoutMandentoryFields.forEach((value) => {
//         it(value.description, async () => {
//            const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//            const token = await result;
//            const response = await getOrdersWithFilterAsync(value.filters, 1, token.accessToken);

//             //expect(response instanceof Object).fail("Lack of mandentory fields");
//             expect(response instanceof Object).to.be.a('function');
//         })
//     });

//     ORDER_FILTERS.withMandentoryFields.forEach((value) => {
//         it(value.description, async () => {
//            const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//            const token = await result;
//            const response = await getOrdersWithFilterAsync(value.filters, 1, token.accessToken);

//              expect(response instanceof Array).toBeTruthy();
//         })
//     });
// });

// test('test for get order with filter', async ()=>{
//     const filterObj = {
//         pickupDate: 2017-10-30,
//         orderStatusIds: [1,2,3]
//     }
//
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await getOrdersWithFilterAsync(filterObj, 1, token.accessToken);
//
//     expect(response instanceof Object).toBeTruthy();
// })

test('Test for customer order detail', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    const token = await result;
    const response = await getOrderDetailAsync(1, 1, token.accessToken);
    expect('data' in response).toBe(true);
})

test('Test for creating new delivery window with product type 1', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
    const token = await result;
    const response = await createNewDeliveryWindow({customerId: 1,
                                                    identityId: 1,
                                                    productTypeId: 1,
                                                    displayName: makeid(),
                                                    startTime: '9:30',
                                                    endTime: '11:30'}, token.accessToken);
    expect('id' in response).toBe(true);
})

// test('Test for creating new delivery window with product type 3 and transaction user account', async () => {
//     const result = getTokenAsync(CONFIG.temail, CONFIG.tpassword, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await createNewDeliveryWindow({customerId: 1,
//                                                     identityId: 1,
//                                                     productTypeId: 3,
//                                                     transactionGroupId:1,
//                                                     displayName: makeid(),
//                                                     startTime: '9:30',
//                                                     endTime: '11:30'}, token.accessToken);
//     expect('id' in response).toBe(true);
// })

// test('Test for uploading batch order progression', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await getBatchOrderProgressAsync(1, '2018-01-13', token.accessToken);
//
//     expect('batchStatusId' in response).toBe(true);
//     // expect('batchStatusId' in response).toBe(true);
// })

// test('Test for Batch Order Data', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await getBatchLocationsAsync(1, '2018-01-13', token.accessToken);
//
//     expect(response.data instanceof Object).toBe(true);
//     // expect('batchStatusId' in response).toBe(true);
// })

// test('Test for fetching batch locations error', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await fetchBatchLocationsErrorAsync(1, '2018-01-03', token.accessToken);
//
//     expect(response.data instanceof Array).toBe(true);
// })

// test('Test for fetching batch locations error', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await fetchBatchLocationsErrorAsync(1, '2018-01-03', token.accessToken);
//
//     expect(response.data instanceof Array).toBe(true);
// })

// test('Test for fetching customer\'s driver list', async () => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.clientSecret);
//     const token = await result;
//     const response = await getCustomerDriverListAsync(1, '2018-01-03', token.accessToken);
//
//     expect(response.data instanceof Array).toBe(true);
// })

test('Test for Group Locations', async () =>{
    const groupingLocationData = {
      successLocationCount: 30,
      failedLocationCount: 3,
      data: [
        {
          "id": 12345679,
          "priority": 2,
          "orderId": 564257893,
          "pickupBuildingName": "Block 43",
          "pickupUnitNumber": "02-345",
          "pickupAddressId": 345678,
          "pickupAddress": "Blk 43, Holland Drive",
          "pickupPostalCode": "272006",
          "pickupDate": "2017-12-31",
          "pickupContactName": "John Doe",
          "pickupContactCompanyName": "ABC",
          "pickupContactEmail": "john.doe@gmail.com",
          "pickupContactPhone": "87492033",
          "pickupTimeWindow": "07:30 - 09:30",
          "deliveryContactName": "Mary Jack",
          "deliveryContactCompanyName": "",
          "deliveryContactEmail": "mary@example.com",
          "deliveryContactPhone": "87392833",
          "deliveryDate": "2017-12-31",
          "deliveryTimeWindow": "11:30 - 12:30",
          "deliveryAddressId": 345678,
          "deliveryBuildingName": "ABC building",
          "deliveryUnitNumber": "#18-23",
          "deliveryAddress": "6 Carpmael Rd, Singapore 429754",
          "deliveryPostalCode": "345678",
          "deliveryNotes": "XXXXX",
          "driverEmailId": "test.driver@carpal.me",
          "itemQuantity": 3,
          "weightPerItem": 10,
          "itemDescription": "Cake",
          "totalWeight": 12,
          "customerOrderNumber": "123456",
          "customWaybillNumber": "234567",
          "cashOnDeliveryAmount": 90,
          "team": "Team A",
          "groupingLocationStatusId": 4 // 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
        },
        {
          "id": 12345680,
          "priority": 2,
          "orderId": 564257893,
          "pickupBuildingName": "Block 43",
          "pickupUnitNumber": "02-345",
          "pickupAddressId": 345678,
          "pickupAddress": "Blk 43, Holland Drive",
          "pickupPostalCode": "272006",
          "pickupDate": "2017-12-31",
          "pickupContactName": "John Doe",
          "pickupContactCompanyName": "ABC",
          "pickupContactEmail": "john.doe@gmail.com",
          "pickupContactPhone": "87492033",
          "pickupTimeWindow": "07:30 - 09:30",
          "deliveryContactName": "Mary Jack",
          "deliveryContactCompanyName": "",
          "deliveryContactEmail": "mary@example.com",
          "deliveryContactPhone": "87392833",
          "deliveryDate": "2017-12-31",
          "deliveryTimeWindow": "11:30 - 12:30",
          "deliveryAddressId": 345678,
          "deliveryBuildingName": "ABC building",
          "deliveryUnitNumber": "#18-23",
          "deliveryAddress": "6 Carpmael Rd, Singapore 429754",
          "deliveryPostalCode": "345678",
          "deliveryNotes": "XXXXX",
          "driverEmailId": "test.driver@carpal.me",
          "itemQuantity": 3,
          "weightPerItem": 10,
          "itemDescription": "Cake",
          "totalWeight": 12,
          "customerOrderNumber": "123456",
          "customWaybillNumber": "234567",
          "cashOnDeliveryAmount": 90,
          "team": "Team A",
          "groupingLocationStatusId": 4 // 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
        },
        {
          "id": 12345681,
          "priority": 2,
          "orderId": 564257893,
          "pickupBuildingName": "Block 43",
          "pickupUnitNumber": "02-345",
          "pickupAddressId": 345678,
          "pickupAddress": "Blk 43, Holland Drive",
          "pickupPostalCode": "272006",
          "pickupDate": "2017-12-31",
          "pickupContactName": "John Doe",
          "pickupContactCompanyName": "ABC",
          "pickupContactEmail": "john.doe@gmail.com",
          "pickupContactPhone": "87492033",
          "pickupTimeWindow": "07:30 - 09:30",
          "deliveryContactName": "Mary Jack",
          "deliveryContactCompanyName": "",
          "deliveryContactEmail": "mary@example.com",
          "deliveryContactPhone": "87392833",
          "deliveryDate": "2017-12-31",
          "deliveryTimeWindow": "11:30 - 12:30",
          "deliveryAddressId": 345678,
          "deliveryBuildingName": "ABC building",
          "deliveryUnitNumber": "#18-23",
          "deliveryAddress": "6 Carpmael Rd, Singapore 429754",
          "deliveryPostalCode": "345678",
          "deliveryNotes": "XXXXX",
          "driverEmailId": "test.driver@carpal.me",
          "itemQuantity": 3,
          "weightPerItem": 10,
          "itemDescription": "Cake",
          "totalWeight": 12,
          "customerOrderNumber": "123456",
          "customWaybillNumber": "234567",
          "cashOnDeliveryAmount": 90,
          "team": "Team A",
          "groupingLocationStatusId": 4 // 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
        }
      ]
    }

    const response = groupLocations(groupingLocationData, null);
    expect(response instanceof Object).toBe(true);
})

test('Test for Group Locations With Errors', async () =>{
    const groupingLocationData = {
      successLocationCount: 30,
      failedLocationCount: 3,
      data: [
        {
          "id": 12345679,
          "priority": 2,
          "orderId": 564257893,
          "pickupBuildingName": "Block 43",
          "pickupUnitNumber": "02-345",
          "pickupAddressId": 345678,
          "pickupAddress": "Blk 43, Holland Drive",
          "pickupPostalCode": "272006",
          "pickupDate": "2017-12-31",
          "pickupContactName": "John Doe",
          "pickupContactCompanyName": "ABC",
          "pickupContactEmail": "john.doe@gmail.com",
          "pickupContactPhone": "87492033",
          "pickupTimeWindow": "07:30 - 09:30",
          "deliveryContactName": "Mary Jack",
          "deliveryContactCompanyName": "",
          "deliveryContactEmail": "mary@example.com",
          "deliveryContactPhone": "87392833",
          "deliveryDate": "2017-12-31",
          "deliveryTimeWindow": "11:30 - 12:30",
          "deliveryAddressId": 345678,
          "deliveryBuildingName": "ABC building",
          "deliveryUnitNumber": "#18-23",
          "deliveryAddress": "6 Carpmael Rd, Singapore 429754",
          "deliveryPostalCode": "345678",
          "deliveryNotes": "XXXXX",
          "driverEmailId": "test.driver@carpal.me",
          "itemQuantity": 3,
          "weightPerItem": 10,
          "itemDescription": "Cake",
          "totalWeight": 12,
          "customerOrderNumber": "123456",
          "customWaybillNumber": "234567",
          "cashOnDeliveryAmount": 90,
          "team": "Team A",
          "groupingLocationStatusId": 4 // 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
        },
        {
          "id": 12345680,
          "priority": 2,
          "orderId": 564257893,
          "pickupBuildingName": "Block 43",
          "pickupUnitNumber": "02-345",
          "pickupAddressId": 345678,
          "pickupAddress": "Blk 43, Holland Drive",
          "pickupPostalCode": "272006",
          "pickupDate": "2017-12-31",
          "pickupContactName": "John Doe",
          "pickupContactCompanyName": "ABC",
          "pickupContactEmail": "john.doe@gmail.com",
          "pickupContactPhone": "87492033",
          "pickupTimeWindow": "07:30 - 09:30",
          "deliveryContactName": "Mary Jack",
          "deliveryContactCompanyName": "",
          "deliveryContactEmail": "mary@example.com",
          "deliveryContactPhone": "87392833",
          "deliveryDate": "2017-12-31",
          "deliveryTimeWindow": "11:30 - 12:30",
          "deliveryAddressId": 345678,
          "deliveryBuildingName": "ABC building",
          "deliveryUnitNumber": "#18-23",
          "deliveryAddress": "6 Carpmael Rd, Singapore 429754",
          "deliveryPostalCode": "345678",
          "deliveryNotes": "XXXXX",
          "driverEmailId": "test.driver@carpal.me",
          "itemQuantity": 3,
          "weightPerItem": 10,
          "itemDescription": "Cake",
          "totalWeight": 12,
          "customerOrderNumber": "123456",
          "customWaybillNumber": "234567",
          "cashOnDeliveryAmount": 90,
          "team": "Team A",
          "groupingLocationStatusId": 4 // 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
        },
        {
          "id": 12345681,
          "priority": 2,
          "orderId": 564257893,
          "pickupBuildingName": "Block 43",
          "pickupUnitNumber": "02-345",
          "pickupAddressId": 345678,
          "pickupAddress": "Blk 43, Holland Drive",
          "pickupPostalCode": "272006",
          "pickupDate": "2017-12-31",
          "pickupContactName": "John Doe",
          "pickupContactCompanyName": "ABC",
          "pickupContactEmail": "john.doe@gmail.com",
          "pickupContactPhone": "87492033",
          "pickupTimeWindow": "07:30 - 09:30",
          "deliveryContactName": "Mary Jack",
          "deliveryContactCompanyName": "",
          "deliveryContactEmail": "mary@example.com",
          "deliveryContactPhone": "87392833",
          "deliveryDate": "2017-12-31",
          "deliveryTimeWindow": "11:30 - 12:30",
          "deliveryAddressId": 345678,
          "deliveryBuildingName": "ABC building",
          "deliveryUnitNumber": "#18-23",
          "deliveryAddress": "6 Carpmael Rd, Singapore 429754",
          "deliveryPostalCode": "345678",
          "deliveryNotes": "XXXXX",
          "driverEmailId": "test.driver@carpal.me",
          "itemQuantity": 3,
          "weightPerItem": 10,
          "itemDescription": "Cake",
          "totalWeight": 12,
          "customerOrderNumber": "123456",
          "customWaybillNumber": "234567",
          "cashOnDeliveryAmount": 90,
          "team": "Team A",
          "groupingLocationStatusId": 4 // 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
        }
      ]
    }

    const errorContents = [
      {
        "customerId": 2318,
        "id": "08997f44-11c7-4e3b-997e-51976298d64c", //DynamoDB ID
        "errorMessages": {
          "priority": [],
          "pickupLocationAddress": [],
          "deliveryAddress": [],
          "team": ['Team A error'],
          "dimensions": [], //dimensions (no need it now)
          "pickupDate": [],
          "deliveryDate": [],
          "pickupTimeWindow": [],
          "deliveryTimeWindow": [],
          "driverEmailId": [],
          "itemQuantity": [],
          "cashOnDeliveryAmount": [],
          "pickupContactEmail": [],
          "deliveryContactEmail": [],
          "pickupContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryNotes": [],
          "pickupLocationAddressSuggestion": "", //Extra field
          "deliveryAddressSuggestion": "", //Extra field
          "totalWeight": "",
          "weightPerItem": ""
        },
        "pickupDate": "2018-12-17",
        "groupingLocationId": 12345680 // id
      },
      {
        "customerId": 2318,
        "id": "08997f44-11c7-4e3b-997e-51976298d64c", //DynamoDB ID
        "errorMessages": {
          "priority": [],
          "pickupLocationAddress": [],
          "deliveryAddress": [],
          "team": [],
          "dimensions": [], //dimensions (no need it now)
          "pickupDate": [],
          "deliveryDate": [],
          "pickupTimeWindow": [],
          "deliveryTimeWindow": [],
          "driverEmailId": ['Can\'t find driver\'s email or id in db'],
          "itemQuantity": [],
          "cashOnDeliveryAmount": [],
          "pickupContactEmail": [],
          "deliveryContactEmail": [],
          "pickupContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryNotes": [],
          "pickupLocationAddressSuggestion": "", //Extra field
          "deliveryAddressSuggestion": "", //Extra field
          "totalWeight": "",
          "weightPerItem": "Shoulbe number"
        },
        "pickupDate": "2018-12-17",
        "groupingLocationId": 12345679 // id
      },
      {
        "customerId": 2318,
        "id": "08997f44-11c7-4e3b-997e-51976298d64c", //DynamoDB ID
        "errorMessages": {
          "priority": [3],
          "pickupLocationAddress": ["pickupLocationAddress shouldn't be empty"],
          "deliveryAddress": ["deliveryAddress shouldn't be null"],
          "team": ['Team A'],
          "dimensions": [], //dimensions (no need it now)
          "pickupDate": [],
          "deliveryDate": ['Should be mm-dd-yyyy'],
          "pickupTimeWindow": [],
          "deliveryTimeWindow": [],
          "driverEmailId": [],
          "itemQuantity": [],
          "cashOnDeliveryAmount": [],
          "pickupContactEmail": [],
          "deliveryContactEmail": [],
          "pickupContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryNotes": [],
          "pickupLocationAddressSuggestion": "Bla Bla 3 Pickup", //Extra field
          "deliveryAddressSuggestion": "Bla Bla 3 Delivery", //Extra field
          "totalWeight": "",
          "weightPerItem": ""
        },
        "pickupDate": "2018-12-17",
        "groupingLocationId": 12345681 // id
      }
    ]
    const response = groupLocations(groupingLocationData, errorContents);
    expect(response instanceof Object).toBe(true);
})

test('Test for retrieving Errors', async () =>{
    const groupingLocationData = {
      successLocationCount: 30,
      failedLocationCount: 3,
      data: [
        {
          "id": 12345679,
          "priority": 2,
          "orderId": 564257893,
          "pickupBuildingName": "Block 43",
          "pickupUnitNumber": "02-345",
          "pickupAddressId": 345678,
          "pickupAddress": "Blk 43, Holland Drive",
          "pickupPostalCode": "272006",
          "pickupDate": "2017-12-31",
          "pickupContactName": "John Doe",
          "pickupContactCompanyName": "ABC",
          "pickupContactEmail": "john.doe@gmail.com",
          "pickupContactPhone": "87492033",
          "pickupTimeWindow": "07:30 - 09:30",
          "deliveryContactName": "Mary Jack",
          "deliveryContactCompanyName": "",
          "deliveryContactEmail": "mary@example.com",
          "deliveryContactPhone": "87392833",
          "deliveryDate": "2017-12-31",
          "deliveryTimeWindow": "11:30 - 12:30",
          "deliveryAddressId": 345678,
          "deliveryBuildingName": "ABC building",
          "deliveryUnitNumber": "#18-23",
          "deliveryAddress": "6 Carpmael Rd, Singapore 429754",
          "deliveryPostalCode": "345678",
          "deliveryNotes": "XXXXX",
          "driverEmailId": "test.driver@carpal.me",
          "itemQuantity": 3,
          "weightPerItem": 10,
          "itemDescription": "Cake",
          "totalWeight": 12,
          "customerOrderNumber": "123456",
          "customWaybillNumber": "234567",
          "cashOnDeliveryAmount": 90,
          "team": "Team A",
          "groupingLocationStatusId": 4 // 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
        },
        {
          "id": 12345680,
          "priority": 2,
          "orderId": 564257893,
          "pickupBuildingName": "Block 43",
          "pickupUnitNumber": "02-345",
          "pickupAddressId": 345678,
          "pickupAddress": "Blk 43, Holland Drive",
          "pickupPostalCode": "272006",
          "pickupDate": "2017-12-31",
          "pickupContactName": "John Doe",
          "pickupContactCompanyName": "ABC",
          "pickupContactEmail": "john.doe@gmail.com",
          "pickupContactPhone": "87492033",
          "pickupTimeWindow": "07:30 - 09:30",
          "deliveryContactName": "Mary Jack",
          "deliveryContactCompanyName": "",
          "deliveryContactEmail": "mary@example.com",
          "deliveryContactPhone": "87392833",
          "deliveryDate": "2017-12-31",
          "deliveryTimeWindow": "11:30 - 12:30",
          "deliveryAddressId": 345678,
          "deliveryBuildingName": "ABC building",
          "deliveryUnitNumber": "#18-23",
          "deliveryAddress": "6 Carpmael Rd, Singapore 429754",
          "deliveryPostalCode": "345678",
          "deliveryNotes": "XXXXX",
          "driverEmailId": "test.driver@carpal.me",
          "itemQuantity": 3,
          "weightPerItem": 10,
          "itemDescription": "Cake",
          "totalWeight": 12,
          "customerOrderNumber": "123456",
          "customWaybillNumber": "234567",
          "cashOnDeliveryAmount": 90,
          "team": "Team A",
          "groupingLocationStatusId": 4 // 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
        },
        {
          "id": 12345681,
          "priority": 2,
          "orderId": 564257893,
          "pickupBuildingName": "Block 43",
          "pickupUnitNumber": "02-345",
          "pickupAddressId": 345678,
          "pickupAddress": "Blk 43, Holland Drive",
          "pickupPostalCode": "272006",
          "pickupDate": "2017-12-31",
          "pickupContactName": "John Doe",
          "pickupContactCompanyName": "ABC",
          "pickupContactEmail": "john.doe@gmail.com",
          "pickupContactPhone": "87492033",
          "pickupTimeWindow": "07:30 - 09:30",
          "deliveryContactName": "Mary Jack",
          "deliveryContactCompanyName": "",
          "deliveryContactEmail": "mary@example.com",
          "deliveryContactPhone": "87392833",
          "deliveryDate": "2017-12-31",
          "deliveryTimeWindow": "11:30 - 12:30",
          "deliveryAddressId": 345678,
          "deliveryBuildingName": "ABC building",
          "deliveryUnitNumber": "#18-23",
          "deliveryAddress": "6 Carpmael Rd, Singapore 429754",
          "deliveryPostalCode": "345678",
          "deliveryNotes": "XXXXX",
          "driverEmailId": "test.driver@carpal.me",
          "itemQuantity": 3,
          "weightPerItem": 10,
          "itemDescription": "Cake",
          "totalWeight": 12,
          "customerOrderNumber": "123456",
          "customWaybillNumber": "234567",
          "cashOnDeliveryAmount": 90,
          "team": "Team A",
          "groupingLocationStatusId": 4 // 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed'
        }
      ]
    }

    const errorContents = [
      {
        "customerId": 2318,
        "id": "08997f44-11c7-4e3b-997e-51976298d64c", //DynamoDB ID
        "errorMessages": {
          "priority": [],
          "pickupLocationAddress": [],
          "deliveryAddress": [],
          "team": ['Team A error'],
          "dimensions": [], //dimensions (no need it now)
          "pickupDate": [],
          "deliveryDate": [],
          "pickupTimeWindow": [],
          "deliveryTimeWindow": [],
          "driverEmailId": [],
          "itemQuantity": [],
          "cashOnDeliveryAmount": [],
          "pickupContactEmail": [],
          "deliveryContactEmail": [],
          "pickupContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryNotes": [],
          "pickupLocationAddressSuggestion": "", //Extra field
          "deliveryAddressSuggestion": "", //Extra field
          "totalWeight": "",
          "weightPerItem": ""
        },
        "pickupDate": "2018-12-17",
        "groupingLocationId": 12345680 // id
      },
      {
        "customerId": 2318,
        "id": "08997f44-11c7-4e3b-997e-51976298d64c", //DynamoDB ID
        "errorMessages": {
          "priority": [],
          "pickupLocationAddress": [],
          "deliveryAddress": [],
          "team": [],
          "dimensions": [], //dimensions (no need it now)
          "pickupDate": [],
          "deliveryDate": [],
          "pickupTimeWindow": [],
          "deliveryTimeWindow": [],
          "driverEmailId": ['Can\'t find driver\'s email or id in db'],
          "itemQuantity": [],
          "cashOnDeliveryAmount": [],
          "pickupContactEmail": [],
          "deliveryContactEmail": [],
          "pickupContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryNotes": [],
          "pickupLocationAddressSuggestion": "", //Extra field
          "deliveryAddressSuggestion": "", //Extra field
          "totalWeight": "",
          "weightPerItem": "Shoulbe number"
        },
        "pickupDate": "2018-12-17",
        "groupingLocationId": 12345679 // id
      },
      {
        "customerId": 2318,
        "id": "08997f44-11c7-4e3b-997e-51976298d64c", //DynamoDB ID
        "errorMessages": {
          "priority": [3],
          "pickupLocationAddress": ["pickupLocationAddress shouldn't be empty"],
          "deliveryAddress": ["deliveryAddress shouldn't be null"],
          "team": ['Team A'],
          "dimensions": [], //dimensions (no need it now)
          "pickupDate": [],
          "deliveryDate": ['Should be mm-dd-yyyy'],
          "pickupTimeWindow": [],
          "deliveryTimeWindow": [],
          "driverEmailId": [],
          "itemQuantity": [],
          "cashOnDeliveryAmount": [],
          "pickupContactEmail": [],
          "deliveryContactEmail": [],
          "pickupContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryContactPhone": [
            "Phone must contain the Country Code"
          ],
          "deliveryNotes": [],
          "pickupLocationAddressSuggestion": "Bla Bla 3 Pickup", //Extra field
          "deliveryAddressSuggestion": "Bla Bla 3 Delivery", //Extra field
          "totalWeight": "",
          "weightPerItem": ""
        },
        "pickupDate": "2018-12-17",
        "groupingLocationId": 12345681 // id
      }
    ]
    const response = retrieveErrors(errorContents, groupingLocationData);
    expect(response instanceof Array).toBe(true);
})


function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
