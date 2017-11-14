import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const searchAsync = async (keywords, scope, fuzzy=true, token)=>{
    try{
        const response = await axios({method: 'get',
                                      url: `${endpoints.SEARCH}?keywords=${keywords}&scope=${scope}&fuzzy=${fuzzy}`,
                                      headers: {'Authorization': token}})
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}