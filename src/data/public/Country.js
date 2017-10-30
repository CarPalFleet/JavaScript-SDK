import axios from 'axios';
import endpoints, { cid, secret } from '../Endpoint';

export const getCountriesAsync = async ()=>{
    try{
        const response = await axios.get(endpoints.COUNTRIES)
        return response.data.data;               
    }catch(e){
        return null
    }
}            