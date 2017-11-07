import axios from 'axios';
import endpoints from '../Endpoint';
import toCamelCase from '../CamelCase';

export const getWhiteLabelAsync = async (domain) => {
    try{
        const response = await axios({method: 'get',
                                      url: endpoints.WHITE_LABEL.replace('{1}', domain)});
        return toCamelCase(response.data);
    }catch(e){
        console.log("ERROR", e.response.status);
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
