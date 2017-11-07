import { resetPasswordAsync, getDriverJobsAsync, getDriverLegsAsync } from '../Account';
import { getTokenAsync } from '../Auth';
import CONFIG from './Config';

test('Test for reset password', async ()=>{
    const response = resetPasswordAsync(CONFIG.email);
    const result = await result;
    expect(result).not.toBeNull();
})

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
