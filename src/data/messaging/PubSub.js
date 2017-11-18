import * as Ably from 'ably';

export default class PubSub{
    constructor(key){
        this.client = new Ably.Realtime(key);
    }

    publish(channel, event, message){
        const chan = this.client.channels.get(channel);
        chan.publish(event, message);
    }

    subscribe(channel, event, callback){
        const chan = this.client.channels.get(channel);
        chan.subscribe(event, callback);
    }
}

