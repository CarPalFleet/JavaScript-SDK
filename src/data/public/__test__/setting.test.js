import { getTokenAsync } from '../../account/Auth';
import { getWhiteLabelAsync } from '../Setting';
import CONFIG from './Config';

test('Test for getting WhiteLabel for customer', async () =>{
    const response = getWhiteLabelAsync(CONFIG.domain);
    const whiteLabel = await response;
    expect(whiteLabel instanceof Object).toBe(true);
})
