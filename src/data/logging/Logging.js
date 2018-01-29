

export const Logging = async (errorLimit, interval, token) => {
  let worker = new Worker('./LoggingWorker.js');
  let errorCounts = 0;
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
