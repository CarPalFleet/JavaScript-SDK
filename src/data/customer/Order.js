import axios from 'axios';
import endpoints from '../Endpoint';
import toCamelCase from '../CamelCase';

export const getOrdersWithFilterAsync = async (paramObject = {}, token)=>{
    let paramString = Object.entries(paramObject).reduce((str, [key, value]) => (str += `&${key}=${value}`), '');
    try{
        const response = await axios({method: 'get',
                                      url: endpoints.ORDERS_WITH_FILTERS.replace('{0}', customerId).replace('{1}', paramString),
                                      headers: {'Authorization': token}})

        return toCamelCase(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getOrderDetailAsync = async (customerId, orderId, token)=>{
    try{
        const response = await axios({method: 'get',
                                      url: endpoints.ORDER_DETAIL.replace('{0}', customerId).replace('{1}', orderId),
                                      headers: {'Authorization': token}})
        return toCamelCase(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
