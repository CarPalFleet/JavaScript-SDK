import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import filterMockData from './mockData';

export const createNewCustomerAsync = async ({email, password, firstName, lastName, phone,
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

export const getCustomerDriversAsync = async (filterObject = {}, customerId, token, validationStatus = false) =>{
    let paramString = Object.keys(filterObject).reduce((str, key) => (str += `&${key}=${filterObject[key]}`), '');
    try{
         const response = await axios({method: 'get',
                                       url: endpoint.CUSTOMER_DRIVERS.replace('{0}', customerId) + "?" + paramString,
                                       headers: {'Authorization': token}}) 
        return camelize(sortData(response));
    }catch(e){
         console.log("ERROR HERE", e);
         return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

function sortData(filteredOrders) {
    const driverTypeInHouse = 1;
    const driverTypePublic = 2;
    const driverTypeServiceProvider = 3;
    
    const driverStatusActive = 1;
    const driverStatusWithRoute = 2;
    const driverStatusIdle = 3;
    const driverStatusInactive = 4;

    var statusCount;
    
    var driverStatusActiveObj = [];
    var driverStatusWithRouteObj = [];
    var driverStatusIdleObj = [];
    var driverStatusInactiveObj = [];
    var driverTypeInHouseObj = [];
    var driverTypePublicObj = [];
    var driverTypeServiceProviderObj = [];

    var driverStatusCounts = {};
    var driverTypeCounts = {};
    var concateDataObject = {};
    var combinedDriversAndCounts = {};
    
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
    })

    filteredOrders["data"].forEach( (value, key) =>{
         value["driver_type_ids"].forEach((value, key) =>{
            switch(value){
                case driverTypeInHouse: driverTypeInHouseObj.push(value);
                break;
                case driverTypePublic: driverTypePublicObj.push(value);
                break;
                case driverTypeServiceProvider: driverTypeServiceProviderObj.push(value);
             }
         }) 
    })

    driverStatusCounts[driverStatusActive] = driverStatusActiveObj.length;
    driverStatusCounts[driverStatusWithRoute] = driverStatusWithRouteObj.length;
    driverStatusCounts[driverStatusIdle] = driverStatusIdleObj.length;
    driverStatusCounts[driverStatusInactive] = driverStatusInactiveObj.length;

    combinedDriversAndCounts["driverStatusCounts"] = driverStatusCounts;

    driverTypeCounts[driverTypeInHouse] = driverTypeInHouseObj.length;
    driverTypeCounts[driverTypePublic] = driverTypePublicObj.length;
    driverTypeCounts[driverTypeServiceProvider] = driverTypeServiceProviderObj.length;

    combinedDriversAndCounts["driverTypeCounts"] = driverTypeCounts;

    statusCount = driverStatusActiveObj.length + driverStatusWithRouteObj.length + driverStatusIdleObj.length + driverStatusInactiveObj.length;

    combinedDriversAndCounts["totalStatusCounts"] = statusCount;    

    concateDataObject[driverStatusActive] = driverStatusActiveObj;
    concateDataObject[driverStatusWithRoute] = driverStatusWithRouteObj;
    concateDataObject[driverStatusIdle] = driverStatusIdleObj;
    concateDataObject[driverStatusInactive] = driverStatusInactiveObj;  

    combinedDriversAndCounts["data"] = concateDataObject;
    
    return combinedDriversAndCounts;
}