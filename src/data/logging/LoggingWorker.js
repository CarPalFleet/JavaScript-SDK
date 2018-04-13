import axios from 'axios';
import endpoints from './endpoints';
import {rejectPromise} from '../utility/Util';
import self from 'worker';

//TODO: consider deprecating all functions below as they are not implemented properly
//TODO: there are no unit tests

self.onmessage = (e) => {
  let interval = new Interval(
    checkConnection.bind(null, e),
    e.data.checkingTime
  );
  switch (e.data.event) {
    case 'startJob':
      interval.start(e);
      break;
    case 'stopJob':
      self.stop();
      interval.stop();
      break;
  }
};

export const sendMessageToMainThread = (e) => {
  self.postMessage({errorCounts: e.data.errorCounts, event: 'finishedJob'});
};

export const checkConnection = async (e) => {
  await axios({
    method: 'GET',
    //TODO: endpoint does not exist
    url: endpoints.CHECK_SOCKET_CONNECTION,
    header: {Authorization: e.data.token},
  });
  e.data.errorCounts = 0;
  sendMessageToMainThread(e, true);
};

/**
 * Handle Notification Error
 * @param {object} e
 * @return {object} Promise.reject with statusCode and statusText
 */
export const handlerConnectionError = async (e) => {
  // Send to Front-end and call wrapper to send message to slack
  try {
    e.data.errorCounts += 1;
    let payload = {
      slackChannel: '',
      channelId: e.data.channelId,
      eventName: 'error.pubsub', // OR error.network
      message: e.response.statusText,
    };

    await axios({
      method: 'GET',
      //TODO: endpoint does not exist
      url: endpoints.SEND_NOTI_TO_SLACK,
      header: {Authorization: e.data.token},
      body: payload,
    });
    return sendMessageToMainThread(e);
  } catch (e) {
    rejectPromise(e);
  }
};

/**
 * Interval
 * @param {function} fn
 * @param {int} time
 */
export const Interval = (fn, time) => {
  let timer = false;

  let start = function() {
    if (!isRunning()) timer = setInterval(fn, time);
  };

  let stop = function() {
    clearInterval(timer);
    timer = false;
  };

  let isRunning = function() {
    return timer !== false;
  };
};
