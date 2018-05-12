import PubSubError from "../PubSubError";

/**
 * A function will throw new PubSubError
 */
function doPubSubError() {
  throw new PubSubError();
}

describe("Create new pubsub error", () => {
  it("should recognize pubsub error", async () => {
    expect(() => {
      doPubSubError();
    }).toThrowError();
  });
});
