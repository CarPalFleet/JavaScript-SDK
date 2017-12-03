import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import getMockData from './mockData';

export const getOrdersWithFilterAsync = async (filterObject = {}, token)=>{
    let paramString = Object.entries(filterObject).reduce((str, [key, value]) => (str += `&${key}=${value}`), '');

    /* Return Mock Data. After API is ready, remove this mock data and return actual result */
    return Promise.resolve(camelize(getMockData('ordersStatusIds', 'orders', filterObject.statusIds || [])));
    // try{
    //     const response = await axios({method: 'get',
    //                                   url: endpoints.ORDERS_WITH_FILTERS.replace('{0}', paramString).replace('{1}', paramString),
    //                                   headers: {'Authorization': token}})
    //     return camelize(response.data.data);
    // }catch(e){
    //     console.log("ERROR HERE", e);
    //     return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    // }
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
