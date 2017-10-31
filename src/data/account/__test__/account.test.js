import { resetPasswordAsync, getDriverJobsAsync, getDriverLegsAsync } from '../Account';
import { getTokenAsync } from '../Auth';

test('Test for reset password', async ()=>{    
    const response = resetPasswordAsync('demo@carpal.me');
    const result = await result;
    expect(result).not.toBeNull();
})

test('Test for getting my jobs.', async ()=>{    
    const result = getTokenAsync('demo@carpal.me', 'carpaldemo');
    const token = await result;
    const response = getDriverJobsAsync(1, token.access_token, '2017-11-01');
    const myJobs = await response;
    expect(myJobs instanceof Array).toBe(true);
})

test('Test for getting my legs.', async ()=>{    
    const result = getTokenAsync('demo@carpal.me', 'carpaldemo');
    const token = await result;
    const response = getDriverLegsAsync(1, token.access_token, '2017-11-01');
    const myLegs = await response;
    expect(myLegs instanceof Array).toBe(true);
})


