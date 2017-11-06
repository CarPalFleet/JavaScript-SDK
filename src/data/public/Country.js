import axios from 'axios';
import endpoints from '../Endpoint';
import toCamelCase from '../CamelCase';

export const getCountriesAsync = async ()=>{
    try{
        const response = await axios.get(endpoints.COUNTRIES)
        return toCamelCase(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
