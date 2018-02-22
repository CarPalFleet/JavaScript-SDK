import * as Ably from 'ably';

export const pubsub = (key, channel, realtime=true)=>{
    letclient = realtime?new Ably.Realtime(key):new Ably.Rest(key);
    letchan = client.channels.get(channel);
    return {
        publish: (event, message)=>{
            chan.publish(event, message);
        },

        subscribe: (event, callback)=>{
            chan.subscribe(event, callback);
        },

        unsubscribe: (event, listener) => {
            chan.unsubscribe(event, listener);
        },

        history: (callback) => {
            chan.history(callback);
        }
    }
}
