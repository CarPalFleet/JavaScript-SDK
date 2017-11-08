import { resetPasswordRequestAsync, resetPasswordAsync, getDriverJobsAsync, getDriverLegsAsync } from '../Account';
import { getTokenAsync } from '../Auth';
import CONFIG from './Config';

test('Test for reset password request', async ()=>{
    const response = resetPasswordRequestAsync(CONFIG.email);
    const result = await response;
    expect(result).toBe(true);
})

// test('Test for reset password', async ()=>{
//     const response = resetPasswordAsync('6c328787ae0969bbde11be74ebbdcf1ba8d411d79502bb9bcc69729f5385370e', CONFIG.email, '123456', '123456');
//     const result = await result;
//     expect(result).toBe(true);
// })

test('Test for getting my jobs.', async ()=>{
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = getDriverJobsAsync(1, token.accessToken, CONFIG.date);
    const myJobs = await response;
    expect(myJobs instanceof Array).toBe(true);
})

test('Test for getting my legs.', async ()=>{
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = getDriverLegsAsync(1, token.accessToken, CONFIG.date);
    const myLegs = await response;
    expect(myLegs instanceof Array).toBe(true);
})
