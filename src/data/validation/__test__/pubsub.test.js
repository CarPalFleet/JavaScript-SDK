import { getSchemaAsync } from '../PubSub';

test('test for Pub/Sub schema for orders', async ()=>{
    const result = getSchemaAsync('pubsub', 'orders');
    const schema = await result;
    expect(schema.fields).toBeTruthy();
})