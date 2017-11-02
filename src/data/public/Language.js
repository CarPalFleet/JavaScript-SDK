import axios from 'axios';
import endpoints, { cid, secret } from '../Endpoint';

export const getLanguagesAsync = async ()=>{
    try{
        const response = await axios.get(endpoints.LANGUAGES)
        return response.data.data;           
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}            