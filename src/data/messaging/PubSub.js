/**
 * @fileoverview This file contains all general messaging related functions that are triggered by various users
 */

import * as Ably from 'ably';
import camelize from 'camelize';

/**
 * Declare Pub/Sub (Ably)
 * @param {string} key
 * @param {string} channel
 * @param {boolean} realtime
 * @return {object} {publish, subscribe, unsubscribe, history}
 */
export const pubsub = (key, channel, realtime = true) => {
  let client = realtime ? new Ably.Realtime(key) : new Ably.Rest(key);
  let chan = client.channels.get(channel);
  return {
    publish: (event, message) => {
      chan.publish(event, camelize(message));
    },

    subscribe: (event, callback) => {
      chan.subscribe(event, (message) => {
        camelize(JSON.parse(message.data));
      });
    },

    unsubscribe: (event, listener) => {
      chan.unsubscribe(event, listener);
    },

    history: (callback) => {
      chan.history(callback);
    },
  };
};
