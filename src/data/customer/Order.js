import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import filterMockData from './mockData';

export const getOrdersWithFilterAsync = async (filterObject = {}, customerId, token)=>{
    let paramString = Object.keys(filterObject).reduce((str, key) => (str += `&${key}=${filterObject[key]}`), '');
    try{
         const response = await axios({method: 'get',
                                       url: endpoints.ORDERS_WITH_FILTERS.replace('{0}', customerId).replace('{1}', paramString),
                                       headers: {'Authorization': token}})
         return camelize(sortData(response.data));
    }catch(e){
         console.log("ERROR HERE", e);
         return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }    
}

export const getOrderDetailAsync = async (customerId, orderId, token)=>{
    try{
        const response = await axios({method: 'get',
                                      url: endpoints.ORDER_DETAIL.replace('{0}', customerId).replace('{1}', orderId),
                                      headers: {'Authorization': token}})
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const createNewDeliveryWindow = async ({customerId,
                                               identityId,
                                               productTypeId,
                                               transactionGroupId=null,
                                               displayName,
                                               startTime,
                                               endTime}, token) =>{
    try{
        let data = {
            identityId,
            productTypeId,
            displayName,
            startTime,
            endTime
        }

        if(productTypeId == 3){
            data.transactionGroupId = transactionGroupId;
        }
        const response = await axios({method: 'post',
                                      url: endpoints.DELIVERY_WINDOW.replace('{0}', customerId),
                                      headers: {'Authorization': token},
                                      data})
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getDeliveryWindows = async (customerId, identityId, productTypeId, transactionGroupIds)=>{
    try{
        const response = await axios({
            method: 'get',
            url: `${endpoints.DELIVERY_WINDOW.replace('{0}', customerId)}?identityId=${identityId}`,
            headers: {'Authorization': token}});

        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

function sortData(filteredOrders) {
    let index;
    let delayed = [];
    let delayedCount;
    let dispatching = [];
    let dispatchingCount;
    let panic = [];
    let panicCount;
    let pickedUp = [];
    let pickedUpCount;

    var counts = {};
    var concateDataObject = {};
    var combinedOrdersAndCounts = {};
    
    for(index = 0; index < filteredOrders["data"].length; index++) {
        let filteredOrder = filteredOrders["data"][index];
        switch (filteredOrder["status_name"]) {
            case "Delayed": delayed.push(filteredOrder);
            break;
            case "Dispatching": dispatching.push(filteredOrder);
            break;
            case "Panic": panic.push(filteredOrder);
            break;
            case "Picked-up": pickedUp.push(filteredOrder);
        }
    }

    dispatchingCount = dispatching.length;
    panicCount = panic.length;
    pickedUpCount = pickedUp.length;
    delayedCount = delayed.length;
    counts["Dispatching jobs"] = dispatchingCount;
    counts["Jobs en-route"] = pickedUpCount;
    counts["Requiring attention"] = panicCount;
    counts["Delayed Jobs"] = delayedCount;

    combinedOrdersAndCounts["activeStatusCounts"] = counts;
    
    concateDataObject["Dispatching jobs"] = dispatching;
    concateDataObject["Requiring attention"] = panic;
    concateDataObject["Jobs en-route"] = pickedUp;
    concateDataObject["Delayed Jobs"] = delayed;  

    combinedOrdersAndCounts["data"] = concateDataObject;

    return combinedOrdersAndCounts;
}
