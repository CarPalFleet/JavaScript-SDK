import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';
import { getMockData, ordersStatusIds } from './mockData';

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

export const getCustomerDriversAsync = async (filterObject = {}, token) =>{
  /* Return Mock Data. After API is ready, remove this mock data and return actual result */
  return Promise.resolve(camelize(getMockData('driverStatusIds', 'drivers', filterObject.driverStatusIds|| [], filterObject.resourceIds[filterObject.resourceIds-1] || 'In-house')));
    // try{
    //
    //     const response = await axios({method: 'get',
    //                                   url: `${endpoints.CUSTOMER_DRIVERS.replace('{0}', filterObject.customerId)}?identityId=${filterObject.identityId}&productTypeId=${filterObject.productTypeId}&transactionGroupId=${filterObject.transactionGroupId || null}&driverStatusIds=${filterObject.driverStatusIds}&showDriversWithOrders=${filterObject.showDriversWithOrders}`,
    //                                   headers: {'Authorization': token}})
    //
    //     return camelize(response.data.data);
    // }catch(e){
    //     return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    // }
}
