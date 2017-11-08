import CONFIG from './Config';

const DUMMY_ORDER_DATA = {
  missingRequiredFields: {
    expectedResult: 'xxx', paramObject: { driverId: CONFIG.driverId, limit: CONFIG.limit }
  },
  missingIdentityId: {
    expectedResult: 'xxx', paramObject: { pickupDate: CONFIG.pickupDate }
  },
  missingPickupDate: {
    expectedResult: 'xxx', paramObject: { identityId: CONFIG.identityId }
  },
  withPickupDate: {
    expectedResult: 'xxx', paramObject: { identityId: CONFIG.identityId, pickupDate: CONFIG.pickupDate }
  },
  withStartAndEndPic: {
    expectedResult: 'xxx', paramObject: { startPickupDate: CONFIG.startPickupDate, endPickupDate: CONFIG.endPickupDate }
  },
  withAllFields: {
    expectedResult: 'xxx',
    paramObject: {
      identityId: CONFIG.identityId, pickupDate: CONFIG.pickupDate, startPickupDate: CONFIG.startPickupDate, endPickupDate: CONFIG.endPickupDate, orderOptionIds: CONFIG.orderOptionIds, driverId: CONFIG.driverId, productTypeIds: CONFIG.productTypeIds, statusIds: CONFIG.statusIds, fields: CONFIG.fields, page: CONFIG.page, limit: CONFIG.limit, promotionIds: CONFIG.promotionIds, showCustomerOrderNumber: CONFIG.showCustomerOrderNumber, showOrderOptions: CONFIG.showOrderOptions, transactionGroupIds: CONFIG.transactionGroupIds
    }
  }
}

export defult DUMMY_ORDER_DATA;
