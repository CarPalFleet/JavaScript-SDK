import axios from 'axios';
import endpoints from '../Endpoint';
import toCamelCase from '../CamelCase';

export const getTokenAsync = async (email, password, clientId, secret)=>{
    try{
        const response = await axios({method: 'post',
                                      url: endpoints.OAUTH,
                                      headers: {'Content-Type': 'application/json'},
                                      data: {
                                          username: email,
                                          password,
                                          grant_type: "password",
                                          client_id: clientId,
                                          client_secret: secret,
                                          scope: "full-access"
                                      }})
        return toCamelCase(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
