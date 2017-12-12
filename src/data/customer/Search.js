import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const searchAsync = async (keywords, scope, fuzzy=true, fuzziness=1, token)=>{
    try{
        const response = await axios({method: 'get',
                                      url: `${endpoints.SEARCH}?keyword=${keywords}&fuzzy=${fuzzy}&fuzziness=${fuzziness}`,
                                      headers: {'Authorization': token}})
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}