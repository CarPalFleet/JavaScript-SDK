import axios from 'axios';
import endpoints from '../Endpoint';
import toCamelCase from '../CamelCase';

export const resetPasswordRequestAsync = async (email)=>{
    try{
        const response = await axios({method: 'post',
                                      url: endpoints.PASSWORD_RESET,
                                      headers: {'Content-Type': 'application/json'},
                                      data: {
                                        email
                                      }})
        console.log(response.data.data);
        const test = toCamelCase(response.data.data);
        console.log(test);
        return toCamelCase(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const resetPasswordAsync = async (token, email, password, confirmPassword) => {
    try{
        const response = await axios({method: 'put',
                                      url: endpoints.PASSWORD_RESET,
                                      headers: {'Content-Type': 'application/json'},
                                      data: {
                                          token,
                                          email,
                                          password,
                                          confirmPassword
                                      }})
        return toCamelCase(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getDriverJobsAsync = async (id, token, date)=>{
    try{
        const response = await axios({method: 'get',
                                      url: endpoints.MY_JOBS.replace('{1}', id).replace('{2}', date),
                                      headers: {'Authorization': token}});
        return toCamelCase(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}

export const getDriverLegsAsync = async(id, token, date)=>{
    try{
        const response = await axios({method: 'get',
                                      url: endpoints.MY_LEGS.replace('{1}', id).replace('{2}', date),
                                      headers: {'Authorization': token}});
        return toCamelCase(response.data.data);
    }catch(e){
        return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
    }
}
