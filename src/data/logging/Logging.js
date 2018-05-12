import Worker from "worker";
export const Logging = async (errorLimit, interval, token) => {
  let worker = new Worker("./LoggingWorker.js");
  let errorCounts = 0;
  // Handle Message from web worker
  worker.addEventListener("callBack", catchErrorCounts.bind(null, errorCounts));

  // Send Message from web worker
  worker.postMessage("checkConnection", errorLimit, interval, token);

  // Stop Message to web worker;
  worker.close();
};

/**
 * CatchErrorCounts from worker
 * @param {int} errorCounts
 * @param {event} event
 */
function catchErrorCounts(errorCounts, event) {
  errorCounts = event.data;
}
