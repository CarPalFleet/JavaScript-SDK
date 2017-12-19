function test(filterObject){
  let originalDriverDatum = {
     "activeStatusCounts":{
        "1": 1,
        "2": 0,
        "3": 0,
        "4": 0
     },
     "driverTypeCounts":{
        "1": 1,
        "2": 3,
        "3": 4
     },
     "totalStatusCounts":1,
     "data":{
        "1":[
           {
              "updatedAt":"2017-12-15 05:02:21",
              "driverStatusId":1,
              "addressId":2,
              "longitude":"103.7600326538086",
              "driverId":8,
              "customerId":2318,
              "orderId":23,
              "id":"8",
              "latitude":"1.3513647119405165",
              "driverTypeIds":[
                 1
              ],
              "orderRouteTypeId":1
           }
        ],
        "2":[
        ],
        "3":[
        ],
        "4":[
        ]
     }
  }

  pubSubPayload = {
      data: {
         "updatedAt":"2017-12-15 05:02:21",
         "driverStatusId": 4,
         "addressId":2,
         "longitude":"103.1",
         "driverId":12,
         "customerId":2318,
         "orderId":233,
         "id":"12",
         "latitude":"1.3",
         "driverTypeIds":[
            1
         ],
         "orderRouteTypeId":1
      },
      lastDriverStatusId: 1
  }

  // pubSubPayload = camelize(pubSubPayload);
  payload = pubSubPayload.data;
  const driverStatusIds = [1, 2, 3, 4];
  const driverTypeIds = [1, 2, 3];
  const isValidStatus = driverStatusIds.includes(payload.driverStatusId);
  const isIncludeInStatusIds = filterObject.driverStatusIds? filterObject.driverStatusIds.includes(payload.driverStatusId) : true;
  let isIncludeInDriverTypeIds = true;
  if (filterObject.driverTypeIds) {
    let hasDriverTypeId = payload.driverTypeIds.find((driverTypeId) => {
      return filterObject.driverTypeIds.includes(driverTypeId);
    });
    isIncludeInDriverTypeIds = hasDriverTypeId? true: false;
  } else isIncludeInDriverTypeIds = true

  if(!(isValidStatus && isIncludeInDriverTypeIds && isIncludeInStatusIds)) {
      return originalDriverDatum;
  }

  let driverStatusKeys = Object.keys(originalDriverDatum['data']);
  let matchedPayload = driverStatusKeys.reduce((matchedPayload, statusId) => {
    let index = originalDriverDatum['data'][statusId].findIndex((order) => {
      return payload.orderId == order.orderId; //orderId might be string/integer;
    })
    if (index >= 0) {
      matchedPayload.isDataExist = true;
      matchedPayload.statusId = pubSubPayload.lastDriverStatusId;
      matchedPayload.index = index;
      matchedPayload.data = originalDriverDatum['data'][statusId][index];
      matchedPayload.isDataExist = originalDriverDatum['data'][statusId][index];
    }
    return matchedPayload;
  }, {isDataExist: false, statusId: 0, index: -1, data: {}});

  if (matchedPayload.isDataExist) {
      // update activeStatusCounts
      originalDriverDatum['activeStatusCounts'][payload.driverStatusId] += 1;
      let currentStatusCounts = originalDriverDatum['activeStatusCounts'][matchedPayload.statusId];
      originalDriverDatum['activeStatusCounts'][matchedPayload.statusId] -= currentStatusCounts? 1: 0;
      delete originalDriverDatum['data'][matchedPayload.statusId].splice(matchedPayload.index, 1);
  } else {
    originalDriverDatum['totalStatusCounts'] += 1;
    filterObject.driverTypeIds.forEach((driverTypeId) => {
      originalDriverDatum['driverTypeCounts'][driverTypeId] += 1;
    });
    originalDriverDatum['activeStatusCounts'][payload.driverStatusId] += 1;
  }
  //update data Object
  originalDriverDatum['data'][payload.driverStatusId].push(payload);
  return originalDriverDatum;
}
