import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const getCountriesAsync = async ()=>{
    try{
        const response = await axios.get(endpoints.COUNTRIES)
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
