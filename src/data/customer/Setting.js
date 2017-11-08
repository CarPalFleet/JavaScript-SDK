import axios from 'axios';
import endpoints from '../Endpoint';
import toCamelCase from '../CamelCase';

export const getCustomerPreferenceSettingsAsync = async (domain, token) => {
    try{
        const response = await axios({method: 'get',
                                      url: endpoints.TRANSACTION_GROUP_SETTING.replace('{1}', domain),
                                      headers: {'Authorization': token}});
        return toCamelCase(response.data);
    }catch(e){
        let rejectObj = {};
        if (e.response) {
          rejectObj = {statusCode: e.response.status, statusText: e.response.statusText}
        } else {
          /* Catch error of e.response
          That will be undefined when status code is 403 Forbidden */
          rejectObj = {statusCode: 403, statusText: 'Forbidden'}
        }
        return Promise.reject(rejectObj);
    }
}
