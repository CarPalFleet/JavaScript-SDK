import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import filterMockData from './mockData';

export const createNewCustomerWithAsync = async ({email, password, firstName, lastName, phone,
                                         birthday, identityId, coName, coPhone, coVatNo})=>{
    try{
        const response = await axios({method: 'post',
                                      url: endpoints.NEW_CUSTOMER,
                                      headers: {'Content-Type': 'application/json'},
                                      data: {
                                        email,
                                        password,
                                        firstName,
                                        lastName,
                                        phone,
                                        identityId,
                                        birthday,
                                        companyName: coName,
                                        companyPhone: coPhone,
                                        companyVatNumber: coVatNo
                                      }})
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const createNewDriverAsync = async ({identityId, productTypeId, transactionGroupId=null,
                                            firstName, lastName, email, password, birthday, phone,
                                            existingUserEmail=null, sendConfirmationSms=false,
                                            isNewUser=true}, customerId, token) =>{
    try{
        const payload = {
            identityId,
            productTypeId,
            transactionGroupId,
            isNewUser,
        };

        if(isNewUser){
            var newPayload = {...payload, firstName, lastName, email, password, birthday: birthday || '', phone: phone || ''};
        }else{
            newPayload = {...payload, existingUserEmail, sendConfirmationSms};
        }
        const response = await axios({method: 'post',
                                      url: endpoints.CUSTOMER_DRIVERS.replace('{0}', customerId),
                                      headers: {'Content-Type': 'application/json',
                                                'Authorization': token},
                                      data: newPayload})

        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getCustomerDriversWithFiltersAsync = async (filterObject = {}, customerId, token, validationStatus = false) =>{
    let paramString = Object.keys(filterObject).reduce((str, key) => (str += `&${key}=${filterObject[key]}`), '');
    try{
         const response = await axios({method: 'get',
                                       url: endpoints.CUSTOMER_DRIVERS.replace('{0}', customerId) + `?${paramString}`,
                                       headers: {'Authorization': token}})
        return camelize(categoriesCustomerDrivers(response));
    }catch(e){
         return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getCustomerDriversCountsAsync = async (filterObject = {}, customerId, token, validationStatus = false) =>{
    let paramString = Object.keys(filterObject).reduce((str, key) => (str += `&${key}=${filterObject[key]}`), '');
    try{
         const response = await axios({method: 'get',
                                       url: endpoints.CUSTOMER_DRIVERS.replace('{0}', customerId),
                                       headers: {'Authorization': token}})
        return calculateCustomerDriverCounts(response);
    }catch(e){
         return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

function calculateCustomerDriverCounts(data) {
  // Calcuate Counts
  return {
    totalStatusCounts: 12,
    activeStatusCounts: {
      1: 4,
      2: 2,
      3: 3,
      4: 3
    },
    driverTypeCounts: {
      1: 12,
      2: 10,
      3: 13
    }
  }
}

function categoriesCustomerDrivers(filteredOrders) {
    const driverStatusActive = 1;
    const driverStatusWithRoute = 2;
    const driverStatusIdle = 3;
    const driverStatusInactive = 4;

    var driverStatusActiveObj = [];
    var driverStatusWithRouteObj = [];
    var driverStatusIdleObj = [];
    var driverStatusInactiveObj = [];
    var concateDataObject = {};

    filteredOrders["data"].forEach( (value, key) =>{
        switch (value["driver_status_id"]) {
            case driverStatusActive: driverStatusActiveObj.push(value);
            break;
            case driverStatusWithRoute: driverStatusWithRouteObj.push(value);
            break;
            case driverStatusIdle: driverStatusIdleObj.push(value);
            break;
            case driverStatusInactive: driverStatusInactiveObj.push(value);
        }
    });

    concateDataObject[driverStatusActive] = driverStatusActiveObj;
    concateDataObject[driverStatusWithRoute] = driverStatusWithRouteObj;
    concateDataObject[driverStatusIdle] = driverStatusIdleObj;
    concateDataObject[driverStatusInactive] = driverStatusInactiveObj;
    return {data: concateDataObject}
}
