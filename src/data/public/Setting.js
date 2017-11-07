import axios from 'axios';
import endpoints from '../Endpoint';
import toCamelCase from '../CamelCase';

export const getWhiteLabelAsync = async (domain, token) => {
    try{
        const response = await axios({method: 'get',
                                      url: endpoints.WHITE_LABEL.replace('{0}', domain)});
        return toCamelCase(response.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
