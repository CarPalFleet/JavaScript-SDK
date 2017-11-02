import axios from 'axios';
import endpoints from '../Endpoint';

export const createNewCustomerAsync = async ({email, password, firstName, lastName, phone, 
                                         birthday, identityId, coName, coPhone, coVatNo})=>{
    try{
        const response = await axios({method: 'post', 
                                      url: endpoints.NEW_CUSTOMER,
                                      headers: {'Content-Type': 'application/json'},
                                      data: {                                        
                                        email,
                                        password,
                                        first_name: firstName,
                                        last_name: lastName,
                                        phone,
                                        identity_id: identityId,
                                        birthday,
                                        company_name: coName,
                                        company_phone: coPhone,
                                        company_vat_number: coVatNo                                        
                                      }})
        return response.data.data;     
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}