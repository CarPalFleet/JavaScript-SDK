import * as Ably from 'ably';

// export default class PubSub{
//     constructor(key){
//         this.client = new Ably.Realtime(key);
//         console.log(this.client);
//     }

//     publish(channel, event, message){
//         const chan = this.client.channels.get(channel);
//         chan.publish(event, message);
//     }

//     subscribe(channel, event, callback){
//         const chan = this.client.channels.get(channel);
//         chan.subscribe(event, callback);
//     }

//     history(channel, callback){
//         const chan = this.client.channels.get(channel);
//         chan.history(callback);
//     }
// }

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

        history: (callback) => {
            chan.history(callback);
        }
    }
}

