const CONFIG = {
  email: 'alpha.test@carpal.me',
  password: '123456',
  clientId: '2',
  clientSecret: '8iQwaS8mJLvrW5KrGUrjDZ90bTrwk7frv4ygk7qt',
  groupingBatchId: '28088',
  orderWithErrorIds: ['56c719b7-93aa-420a-b9b1-140c4e03397b'],
  domain: 'ezbuy.sg',
  emptyString: '',
  invalidDomain: 'aa.com',
  identityId: 1,
  startPickupDate: '2017-11-06',
  endPickupDate: '2017-11-09',
  orderOptionIds: [],
  driverId: 2,
  productTypeIds: [],
  statusIds: [],
  fields: [],
  page: 1,
  limit: 20,
  promotionIds: [],
  showCustomerOrderNumber: true,
  showOrderOptions: false,
  transactionGroupIds: [],
  pickupDate: '2018-02-28',
  groupingLocationId: 27638,
  groupingLocationIds: [27638, 27644],
  batchId: 12,
  orderId: 27381,
  customerId: 14445,
  fuzzy: false,
  fuzziness: 1,
  createRoutePayload: [
    {
      driver_id: 2,
      pickup_date: '2018-03-30',
      route_settings: '{}',
      route_locations: [
        {
          sequence: 1,
          grouping_location_id: 1,
          location_type_id: 3,
          route_capacity: 10.5,
        },
      ],
    },
  ],
  scopes: {
    drivers: ['driverId', 'driverName'],
    jobs: ['orderId'],
    orders: ['groupingLocationId'],
  },
  searchResult: [
    {
      id: 1,
      groupingLocationId: 27638,
      orderId: null,
      driverId: null,
    },
    {
      id: 2,
      groupingLocationId: 27644,
      orderId: null,
      driverId: null,
    },
  ],
  fieldName: 'groupingLocationId',
  keywords: 14445,
  locationObject: {
    pickupLocationAddress: '22 Gim moh road',
    deliveryAddress: 'Holland Close',
    pickupDate: '28-02-2018',
    pickupTimeWindow: '14:35-16:00',
    deliveryDate: '28-02-2018',
    deliveryTimeWindow: '17:00-17:00',
    driverEmailId: null,
  },
  locationObjectFutureDate: {
    pickupLocationAddress: '22 Gim moh road',
    deliveryAddress: 'Holland Close',
    pickupDate: '28-02-2050',
    pickupTimeWindow: '14:35-16:00',
    deliveryDate: '28-02-2050',
    deliveryTimeWindow: '17:00-17:00',
    driverEmailId: null,
  },
  orderDataList: [
    {
      orderId: 27318,
      locationData: {
        pickupLocationAddress: '22 Gim moh road',
        deliveryAddress: 'Holland Close',
        pickupDate: '28-02-2018',
        pickupTimeWindow: '14:35-16:00',
        deliveryDate: '28-02-2018',
        deliveryTimeWindow: '17:00-17:00',
        driverEmailId: null,
      },
    },
    {
      orderId: 27312,
      locationData: {
        pickupLocationAddress: '22 Gim moh road',
        deliveryAddress: 'Holland Close',
        pickupDate: '28-02-2018',
        pickupTimeWindow: '14:35-16:00',
        deliveryDate: '28-02-2018',
        deliveryTimeWindow: '17:00-17:00',
        driverEmailId: null,
      },
    },
  ],
  groupingLocationData: {
    meta: {
      totalLocationCount: 48,
      validatedLocationCount: 30,
      failedLocationCount: 3,
    },
    data: [
      {
        id: 12345679,
        priority: 2,
        driverId: 200,
        groupingBatchId: 1697,
        pickupGroupId: 12345,
        orderId: 564257893,
        pickupBuildingName: 'Block 43',
        pickupUnitNumber: '02-345',
        pickupAddressId: 345678,
        pickupLocationAddress: 'Blk 43, Holland Drive',
        pickupPostalCode: '272006',
        pickupDate: '2017-12-31',
        pickupContactName: 'John Doe',
        pickupContactCompanyName: 'ABC',
        pickupContactEmail: 'john.doe@gmail.com',
        pickupContactPhone: '87492033',
        pickupTimeWindow: '07:30 - 09:30',
        deliveryContactName: 'Mary Jack',
        deliveryContactCompanyName: '',
        deliveryContactEmail: 'mary@example.com',
        deliveryContactPhone: '87392833',
        deliveryDate: '2017-12-31',
        deliveryTimeWindow: '11:30 - 12:30',
        deliveryAddressId: 345678,
        deliveryBuildingName: 'ABC building',
        deliveryUnitNumber: '#18-23',
        deliveryAddress: '6 Carpmael Rd, Singapore 429754',
        deliveryPostalCode: '345678',
        deliveryNotes: 'XXXXX',
        driverEmailId: 'test.driver@carpal.me',
        itemQuantity: 3,
        weightPerItem: 10,
        itemDescription: 'Cake',
        totalWeight: 12,
        customerOrderNumber: '123456',
        customWaybillNumber: '234567',
        cashOnDeliveryAmount: 90,
        team: 'Team A',
        groupingLocationStatusId: 4, // 1 for "pending", 2 for "validated", 3 for "grouped", 4 for "failed"
        driver: [],
      },
      {
        id: 12345680,
        priority: 2,
        driverId: 200,
        groupingBatchId: 1697,
        pickupGroupId: 12346,
        orderId: 564257893,
        pickupBuildingName: 'Block 43',
        pickupUnitNumber: '02-345',
        pickupAddressId: 345678,
        pickupLocationAddress: 'Blk 43, Holland Drive',
        pickupPostalCode: '272006',
        pickupDate: '2017-12-31',
        pickupContactName: 'John Doe',
        pickupContactCompanyName: 'ABC',
        pickupContactEmail: 'john.doe@gmail.com',
        pickupContactPhone: '87492033',
        pickupTimeWindow: '07:30 - 09:30',
        deliveryContactName: 'Mary Jack',
        deliveryContactCompanyName: '',
        deliveryContactEmail: 'mary@example.com',
        deliveryContactPhone: '87392833',
        deliveryDate: '2017-12-31',
        deliveryTimeWindow: '11:30 - 12:30',
        deliveryAddressId: 345678,
        deliveryBuildingName: 'ABC building',
        deliveryUnitNumber: '#18-23',
        deliveryAddress: '6 Carpmael Rd, Singapore 429754',
        deliveryPostalCode: '345678',
        deliveryNotes: 'XXXXX',
        driverEmailId: 'test.driver@carpal.me',
        itemQuantity: 3,
        weightPerItem: 10,
        itemDescription: 'Cake',
        totalWeight: 12,
        customerOrderNumber: '123456',
        customWaybillNumber: '234567',
        cashOnDeliveryAmount: 90,
        team: 'Team A',
        groupingLocationStatusId: 4, // 1 for "pending", 2 for "validated", 3 for "grouped", 4 for "failed"
        driver: [],
      },
      {
        id: 12345681,
        priority: 2,
        orderId: 564257893,
        driverId: 200,
        groupingBatchId: 1697,
        pickupGroupId: 12347,
        pickupBuildingName: 'Block 43',
        pickupUnitNumber: '02-345',
        pickupAddressId: 345678,
        pickupLocationAddress: 'Blk 43, Holland Drive',
        pickupPostalCode: '272006',
        pickupDate: '2017-12-31',
        pickupContactName: 'John Doe',
        pickupContactCompanyName: 'ABC',
        pickupContactEmail: 'john.doe@gmail.com',
        pickupContactPhone: '87492033',
        pickupTimeWindow: '07:30 - 09:30',
        deliveryContactName: 'Mary Jack',
        deliveryContactCompanyName: '',
        deliveryContactEmail: 'mary@example.com',
        deliveryContactPhone: '87392833',
        deliveryDate: '2017-12-31',
        deliveryTimeWindow: '11:30 - 12:30',
        deliveryAddressId: 345678,
        deliveryBuildingName: 'ABC building',
        deliveryUnitNumber: '#18-23',
        deliveryAddress: '6 Carpmael Rd, Singapore 429754',
        deliveryPostalCode: '345678',
        deliveryNotes: 'XXXXX',
        driverEmailId: 'test.driver@carpal.me',
        itemQuantity: 3,
        weightPerItem: 10,
        itemDescription: 'Cake',
        totalWeight: 12,
        customerOrderNumber: '123456',
        customWaybillNumber: '234567',
        cashOnDeliveryAmount: 90,
        team: 'Team A',
        groupingLocationStatusId: 4, // 1 for "pending", 2 for "validated", 3 for "grouped", 4 for "failed"
        driver: [],
      },
    ],
  },
  errorContents: {
    data: [
      {
        customerId: 2318,
        id: '08997f44-11c7-4e3b-997e-51976298d64c', // DynamoDB ID
        errorMessages: {
          priority: [],
          pickupLocationAddress: [],
          deliveryAddress: [],
          team: ['Team A error'],
          pickupDate: [],
          deliveryDate: [],
          pickupTimeWindow: [],
          deliveryTimeWindow: [],
          driverEmailId: [],
          itemQuantity: [],
          cashOnDeliveryAmount: [],
          pickupContactEmail: [],
          deliveryContactEmail: [],
          pickupContactPhone: ['Phone must contain the Country Code'],
          deliveryContactPhone: ['Phone must contain the Country Code'],
          deliveryNotes: [],
          pickupLocationAddressSuggestion: '', // Extra field
          deliveryAddressSuggestion: '', // Extra field
          totalWeight: '',
          weightPerItem: '',
        },
        pickupDate: '2018-12-17',
        groupingLocationId: 12345680, // id
      },
      {
        customerId: 2318,
        id: '08997f44-11c7-4e3b-997e-51976298d64c', // DynamoDB ID
        errorMessages: {
          priority: [],
          pickupLocationAddress: [],
          deliveryAddress: [],
          team: [],
          pickupDate: [],
          deliveryDate: [],
          pickupTimeWindow: [],
          deliveryTimeWindow: [],
          driverEmailId: ['Cannot find driver email or id in db'],
          itemQuantity: [],
          cashOnDeliveryAmount: [],
          pickupContactEmail: [],
          deliveryContactEmail: [],
          pickupContactPhone: ['Phone must contain the Country Code'],
          deliveryContactPhone: ['Phone must contain the Country Code'],
          deliveryNotes: [],
          pickupLocationAddressSuggestion: '', // Extra field
          deliveryAddressSuggestion: '', // Extra field
          totalWeight: '',
          weightPerItem: 'Shoulbe number',
        },
        pickupDate: '2018-12-17',
        groupingLocationId: 12345679, // id
      },
      {
        customerId: 2318,
        id: '08997f44-11c7-4e3b-997e-51976298d64c', // DynamoDB ID
        errorMessages: {
          priority: [3],
          pickupLocationAddress: ['pickupLocationAddress shouldn not be empty'],
          deliveryAddress: ['deliveryAddress should not be null'],
          team: ['Team A'],
          pickupDate: [],
          deliveryDate: ['Should be mm-dd-yyyy'],
          pickupTimeWindow: [],
          deliveryTimeWindow: [],
          driverEmailId: [],
          itemQuantity: [],
          cashOnDeliveryAmount: [],
          pickupContactEmail: [],
          deliveryContactEmail: [],
          pickupContactPhone: ['Phone must contain the Country Code'],
          deliveryContactPhone: ['Phone must contain the Country Code'],
          deliveryNotes: [],
          pickupLocationAddressSuggestion: 'Bla Bla 3 Pickup', // Extra field
          deliveryAddressSuggestion: 'Bla Bla 3 Delivery', // Extra field
          totalWeight: '',
          weightPerItem: '',
        },
        pickupDate: '2018-12-17',
        groupingLocationId: 12345681, // id
      },
    ],
  },
};

export default CONFIG;
