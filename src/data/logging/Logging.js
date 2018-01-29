let worker = new Worker('./LoggingWorker.js');

let errorCounts = 0;

export const Logging = async (errorLimit, interval, token) => {
  //Handle Message from web worker
  worder.addEventListener('callBack', handleMessageFromWorker)

  //Send Message from web worker
  worker.postMessage('checkConnection', errorLimit, interval, token);

  //Stop Message to web worker;
  worker.close();
}

function handleMessageFromWorker(e) {
  errorCounts = e.data;
}
