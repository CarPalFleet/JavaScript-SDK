import { resetPasswordAsync, getMyJobs } from '../Account';
import { getTokenAsync } from '../Auth';

test('Test for reset password', async ()=>{    
    const response = resetPasswordAsync('demo@carpal.me');
    const result = await result;
    expect(result).not.toBeNull();
})

test('Test for getting my jobs.', async ()=>{    
    const result = getTokenAsync('demo@carpal.me', 'carpaldemo');
    const token = await result;
    const response = getMyJobs(1, token.access_token);
    const myJobs = await response;
    expect(myJobs instanceof Array).toBe(true);
})

