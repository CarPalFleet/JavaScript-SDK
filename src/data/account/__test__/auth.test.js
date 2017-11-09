import { getTokenAsync } from '../Auth';
import CONFIG from './Config';

test('test for account demo@carpal.me', async ()=>{
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
<<<<<<< HEAD
    const token = await result; 
||||||| merged common ancestors
    const token = await result;
=======
    const token = await result;
    console.log(token);
>>>>>>> 45821fd233dc53272b24bbfdd590c2c4af6dba9d
    expect(token).not.toBeNull();
})

<<<<<<< HEAD
// test('test for account demo@carpal.me with wrong password', async()=>{ 
//     const result = getTokenAsync(CONFIG.email, 'carpaldemo2', CONFIG.clientId, CONFIG.token);
//     await expect(result).rejects.toHaveProperty('statusCode', 401);
// })
||||||| merged common ancestors
test('test for account demo@carpal.me with wrong password', async()=>{ 
    const result = getTokenAsync(CONFIG.email, 'carpaldemo2', CONFIG.clientId, CONFIG.token);
    await expect(result).rejects.toHaveProperty('statusCode', 401);
})
=======
test('test for account demo@carpal.me with wrong password', async()=>{
    const result = getTokenAsync(CONFIG.email, 'carpaldemo2', CONFIG.clientId, CONFIG.token);
    await expect(result).rejects.toHaveProperty('statusCode', 401);
})
>>>>>>> 45821fd233dc53272b24bbfdd590c2c4af6dba9d
