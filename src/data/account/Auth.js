import axios from 'axios';
import endpoints, { cid, secret } from '../Endpoint';

export const getTokenAsync = async (email, password)=>{
    try{
        const response = await axios({method: 'post', 
                                      url: endpoints.OAUTH,
                                      headers: {'Content-Type': 'application/json'},
                                      data: {
                                        username: email,
                                        password,
                                        grant_type: "password",
                                        client_id: cid,
                                        client_secret: secret,
                                        scope: ""
                                      }})
        return response.data.data;     
    }catch(e){
        return null
    }
}            