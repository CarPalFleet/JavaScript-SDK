import { getOrderDetailAsync, createNewDeliveryWindow } from '../Order';
import { getTokenAsync } from '../../account/Auth';
import CONFIG from './Config';
// import DUMMY_ORDER_DATA from './dummyOrderData';

// describe('Test for customer orders with filters', () => {
//     DUMMY_ORDER_DATA.forEach((description, data) => {
//         it(description, async () => {
//            const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
//            const token = await result;
//            const response = await getOrdersWithFilterAsync(data.paramObject, token);
//            expect(data.expectedResult).toBe(true);
//         })
//     });
// })

test('Test for customer order detail', async () => {
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = await getOrderDetailAsync(1, 1, token.accessToken);
    expect('id' in response).toBe(true);
})

test('Test for creating new delivery window with product type 1', async () => {
    const result = getTokenAsync(CONFIG.email, CONFIG.password, CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = await createNewDeliveryWindow({customerId: 1, 
                                                    identityId: 1, 
                                                    productTypeId: 1, 
                                                    displayName: makeid(), 
                                                    startTime: '9:30', 
                                                    endTime: '11:30'}, token.accessToken);
    expect('id' in response).toBe(true);
})


test('Test for creating new delivery window with product type 3 and transaction user account', async () => {
    const result = getTokenAsync('transaction@carpal.me', 'transactioncustomer', CONFIG.clientId, CONFIG.token);
    const token = await result;
    const response = await createNewDeliveryWindow({customerId: 1, 
                                                    identityId: 1, 
                                                    productTypeId: 3, 
                                                    transactionGroupId:1, 
                                                    displayName: makeid(), 
                                                    startTime: '9:30', 
                                                    endTime: '11:30'}, token.accessToken);
    expect('id' in response).toBe(true);
})

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
