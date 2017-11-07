import axios from 'axios';
import endpoints from '../Endpoint';
import toCamelCase from '../CamelCase';

export const getIdentitiesAsync = async ()=>{
    try{
        const response = await axios.get(endpoints.IDENTITIES)
        return toCamelCase(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
