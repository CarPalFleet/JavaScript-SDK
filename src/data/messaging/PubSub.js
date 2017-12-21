import * as Ably from 'ably';

export const pubsub = (key, channel, realtime=true)=>{
    var client = realtime?new Ably.Realtime(key):new Ably.Rest(key);
    var chan = client.channels.get(channel);
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
