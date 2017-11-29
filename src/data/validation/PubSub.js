import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const getSchemaAsync = async (service, schema_name)=>{
    try{
        const response = await axios.get(endpoints.SCHEMAS.replace('{0}', service).replace('{1}', schema_name));
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
