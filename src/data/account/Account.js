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

export const getMyJobs = async (id, token)=>{
    try{
        const response = await axios({method: 'get', 
                                      url: endpoints.MY_JOBS.replace('{}', id),
                                      headers: {'Authorization': token}});
        return response.data.data;
    }catch(e){
        return null
    }    
}