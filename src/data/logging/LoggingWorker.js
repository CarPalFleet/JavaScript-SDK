import axios from 'axios';

self.onmessage = (e) => {
  let interval = new Interval(checkConnection.bind(null, e), e.data.checkingTime);
  switch (e.data.event) {
    case 'startJob':
      interval.start(e);
      break;
    case 'stopJob':
      self.stop();
      interval.stop();
      break;
  }
}

function sendMessageToMainThread(e) {
  self.postMessage({errorCounts: e.data.errorCounts, event: 'finishedJob'});
}

let checkConnection = async(e) => {
  let token = e.data;
  let checkSocket = await axios({method: 'get', url: endpoints.CHECK_SOCKET_CONNECTION, header: {'Authorization': e.token}});
  errorCounts = 0;
  sendMessageToMainThread(e, true);
}

checkConnection().catch(handlerConnectionError);
handlerConnectionError().catch(handleSendNotiError)

async function handlerConnectionError(e) {
  //Send to Front-end and call wrapper to send message to slack
  errorCounts++;
  let payload = {
    'slackChannel': '',
    'channelId': channelId,
    'eventName': 'error.pubsub', // OR error.network
    'message': e.response.statusText
  }
  let checkSocket = await axios({method: 'get', url: endpoints.SEND_NOTI_TO_SLACK, header: {'Authorization': token}, body: payload});
  sendMessageToMainThread(e)
}

function handleSendNotiError(e) {
  return Promise.reject({statusCode: e.response.status, statusText: e.response.statusText});
}


function Interval(fn, time) {
    let timer = false;
    this.start = function() {
        if (!this.isRunning())
            timer = setInterval(fn, time);
    };

    this.stop = function() {
        clearInterval(timer);
        timer = false;
    };

    this.isRunning = function() {
        return timer !== false;
    };
}
