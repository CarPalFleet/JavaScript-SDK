import axios from 'axios';
import endpoints from '../Endpoint';

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
        console.log(e);
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}  

export const getDriverJobsAsync = async (id, token, date)=>{
    try{
        const response = await axios({method: 'get', 
                                      url: endpoints.MY_JOBS.replace('{1}', id).replace('{2}', date),
                                      headers: {'Authorization': token}});
        return response.data.data;
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }    
}

export const getDriverLegsAsync = async(id, token, date)=>{
    try{
        const response = await axios({method: 'get', 
                                      url: endpoints.MY_LEGS.replace('{1}', id).replace('{2}', date),
                                      headers: {'Authorization': token}});
        return response.data.data;
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}