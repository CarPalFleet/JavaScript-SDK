import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const getSchemaAsync = async (service, schemaName)=>{
    try{
        const response = await axios.get(endpoints.SCHEMAS.replace('{0}', service).replace('{1}', schemaName));
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const validate = (schema, payload)=>{
    const payloadKeys = Object.keys(payload);
    //To further enhance this function, we need to validate the data type
    //of the value according to schema
    return !Object.keys(schema).some((val)=>payloadKeys.indexOf(val) === -1);    
}
