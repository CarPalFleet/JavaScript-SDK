import axios from 'axios';
import endpoints, { cid, secret } from '../Endpoint';

export const resetPasswordAsync = async (email)=>{
    try{
        const response = await axios({method: 'post', 
                                      url: endpoints.PASSWORD_RESET,
                                      headers: {'Content-Type': 'application/json'},
                                      data: {
                                        email
                                      }})
        return response.data;
                
    }catch(e){
        return null
    }
}  

export const getMyJobsAsync = async (id, token, date)=>{
    try{
        const response = await axios({method: 'get', 
                                      url: endpoints.MY_JOBS.replace('{1}', id).replace('{2}', date),
                                      headers: {'Authorization': token}});
        return response.data.data;
    }catch(e){
        return null
    }    
}