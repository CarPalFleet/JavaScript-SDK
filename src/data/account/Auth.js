import axios from 'axios';
import endpoints from '../Endpoint';
import camelize from 'camelize';

export const getTokenAsync = async (email, password, clientId, secret)=>{
    try{
        const response = await axios({method: 'post',
                                      url: endpoints.OAUTH,
                                      headers: {'Content-Type': 'application/json'},
                                      data: {
                                          username: email,
                                          password,
                                          grantType: "password",
                                          clientId,
                                          clientSecret: secret,
                                          scope: "full-access"
                                      }})
        return camelize(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
