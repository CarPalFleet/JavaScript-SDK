import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const searchAsync = async (keywords, fuzzy=true, fuzziness, token)=>{
    try{
        const response = await axios({method: 'get',
                                      url: `${endpoints.ELASTICSEARCH}?keyword=${keywords}&fuzzy=${fuzzy}&fuzziness=${fuzziness}`,
                                      headers: {'Authorization': token}})
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}