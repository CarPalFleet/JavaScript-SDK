function test(filterObject){
  let originalJobDatum = {
    "activeStatusCounts":{
     "2":0,
     "5":0,
     "7":0,
     "9":0
    },
    "data":{
       "2":[
          // {
          //    "id":"8000c061d01619ba25cd7464d4ee9b0f",
          //    "orderId":62301,
          //    "orderStatusId":2,
          //    "statusName":"Pending",
          //    "pickupDate":"2017-12-25",
          //    "latitude":"1.2494041",
          //    "longitude":"103.8303209",
          //    "driverId":0,
          //    "customerId":2318
          // },
          // {
          //    "id":"01f13d8039554c4a347425c4d5ad913e",
          //    "orderId":62302,
          //    "orderStatusId":2,
          //    "statusName":"Pending",
          //    "pickupDate":"2017-12-25",
          //    "latitude":"1.2494041",
          //    "longitude":"103.8303209",
          //    "driverId":0,
          //    "customerId":2318
          // },
          // {
          //    "id":"7f3425bc7f3ebd0b324640fbaec0ec8b",
          //    "orderId":62303,
          //    "orderStatusId":2,
          //    "statusName":"Pending",
          //    "pickupDate":"2017-12-25",
          //    "latitude":"1.2494041",
          //    "longitude":"103.8303209",
          //    "driverId":0,
          //    "customerId":2318
          // },
          // {
          //    "id":"ed6d5ca5f2169bd18dda5fb58e1201a1",
          //    "orderId":62304,
          //    "orderStatusId":2,
          //    "statusName":"Pending",
          //    "pickupDate":"2017-12-25",
          //    "latitude":"1.3572022",
          //    "longitude":"103.8329746",
          //    "driverId":0,
          //    "customerId":2318
          // }
       ],
       "5":[

       ],
       "7":[
         {
           "id":"ed6d5ca5f2169bd18dda5fb58e1201a1",
           "orderId":62304,
           "orderStatusId":7,
           "statusName":"Pending",
           "pickupDate":"2017-12-25",
           "latitude":"1.3572022",
           "longitude":"103.8329746",
           "driverId":0,
           "customerId":2318
         }
       ],
       "9":[

       ]
    },
    "totalStatusCounts":0
  }
  pubSubPayload = {
     "id":"ed6d5ca5f2169bd18dda5fb58e1201a1",
     "orderId":62304,
     "orderStatusId":2,
     "statusName":"Pending",
     "pickupDate":"2017-12-19",
     "latitude":"1.3572022",
     "longitude":"103.8329746",
     "driverId":0,
     "customerId":2318
  }
  // If orderStatusId is 1, change into 2. #laraval side will handle it later.
  const orderStatusIds = [2, 5, 7, 9];
  if (pubSubPayload.orderStatusId == 1) pubSubPayload.orderStatusId = 2;

  // palyload orderStatusId must be includes in 2,5,7,9
  // payload date should be the same with today date
  // payload orderStatusId orderStatusIds must be one of orderStatusIds of filterObject
  // Else send return orginal Job Data
  const isValidStatus = orderStatusIds.includes(pubSubPayload.orderStatusId);
  const isSameDate = pubSubPayload.pickupDate === filterObject.pickupDate;
  const isInclude = filterObject.orderStatusIds && filterObject.orderStatusIds.includes(pubSubPayload.orderStatusId);

  if(!(isValidStatus && isSameDate && isInclude))
  {
      return originalJobDatum;
  }

  let jobStatusKeys = Object.keys(originalJobDatum['data']);
  let matchedPayload = jobStatusKeys.reduce((matchedPayload, statusId) => {
    let index = originalJobDatum['data'][statusId].findIndex((order) => {
      return pubSubPayload.orderId == order.orderId; //orderId might be string/integer;
    })
    if (index >= 0) {
      matchedPayload.isDataExist = true;
      matchedPayload.statusId = statusId;
      matchedPayload.index = index;
      matchedPayload.data = originalJobDatum['data'][statusId][index];
      matchedPayload.isDataExist = originalJobDatum['data'][statusId][index];
    }
    return matchedPayload;
  }, {isDataExist: false, statusId: 0, index: -1, data: {}});

  if (matchedPayload.isDataExist) {
      // update activeStatusCounts
      originalJobDatum['activeStatusCounts'][pubSubPayload.orderStatusId] += 1;
      let currentStatusCounts = originalJobDatum['activeStatusCounts'][matchedPayload.statusId];
      originalJobDatum['activeStatusCounts'][matchedPayload.statusId] -= currentStatusCounts? 1: 0;
      delete originalJobDatum['data'][matchedPayload.statusId].splice(matchedPayload.index, 1);
  } else {
    originalJobDatum['totalStatusCounts'] += 1;
    originalJobDatum['activeStatusCounts'][pubSubPayload.orderStatusId] += 1;
  }
  //update data Object
  originalJobDatum['data'][pubSubPayload.orderStatusId].push(pubSubPayload);
  return originalJobDatum;
}
