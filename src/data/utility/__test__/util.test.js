import moment from 'moment-timezone';
import {
  convertObjectIntoURLString,
  convertObjectIntoKeyValueArray,
  customError,
  mergeArraysWithObjects,
  getUserDateTimefromUTC,
} from '../Util';

describe('Convert object key/value into url string', () => {
  it('should match the string values limit and offset', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    let data = {
      limit: 20,
      offset: 1,
    };

    const urlString = await convertObjectIntoURLString(data);
    expect(urlString).toMatch(/limit/);
    expect(urlString).toMatch(/offset/);
  });
});

/* describe("Handle API Error", () => {
  it("should return promise (reject) object with statusCode, statusText and errorMessage", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const errors = {
      response: {
        statusCode: 400,
        statusText: "Bad Request",
        errorMessage: {
          email: ["Duplicate Email"],
        },
      },
    };
    const result = await apiResponseErrorHandler(errors);

    expect("statusCode" in result).toBeTruthy();
    expect("statusText" in result).toBeTruthy();
    expect("errorMessage" in result).toBeTruthy();
    expect.arrayContaining(result.errorMessage);
  });
});*/

/* describe("Response Promise Reject", () => {
  it("should return promise (reject) object with stausCode, statusText and errorMessage", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    try {
      const errors = {
        response: {
          status: 400,
          statusText: "Bad Request",
          errorMessage: "Errror String",
        },
      };

      const result = await rejectPromise(errors);
      console.log(result);

      expect("statusCode" in result).toBeTruthy();
      expect("statusText" in result).toBeTruthy();
      expect("errorMessage" in result).toBeTruthy();
      } catch (error) {
      console.log(error);
      await expect(error).rejects.toHaveProperty("statusCode", 400);
    }
  });
});*/

/* describe("Format error messages into key value objects inside of array", () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  const errorMessage = {
    email: ["Duplicate Email"],
  };
  const expected = ["email", ["Duplicate Email"]];

  it("matches if the actual object contains expected key: value pairs", async () => {
    const result = getFormattedErrorArray(errorMessage);
    expect(result).toEqual(expect.objectContaining(expected));
  });
});*/

describe('Convert Object into key/value array.', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  const errorMessage = {
    email: ['Duplicate Email'],
  };
  const expected = [['email', ['Duplicate Email']]];

  it('matches if the actual object contains expected key: value pairs', async () => {
    const result = convertObjectIntoKeyValueArray(errorMessage);
    expect(result).toEqual(expect.objectContaining(expected));
  });
});

/* describe("Iterate the array and format by using ES 6 reduce method", () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  const data = [1, 2, 3];

  it("should response key/value elements inside of an array", async () => {
    const result = await arrayReduce(data, data.sort(), []);
    it("tests result value types correctly", () => {
      expect(result).toBeType("array");
    });
  });
});*/

/* describe("Store key/value element into array", () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it("should response new array with key/value elements", async () => {
    const [key, value] = ["key", "messages"];

    const result = await pushKeyAndMessageToArray([], [key, value]);
    expect(result).toBe("array");
  });
});*/

/* describe("Check the same object id in two params", () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it("true/false value in ", async () => {
    const objectA = {id: 1};
    const objectB = {id: 1};
    const result = await hasSameObjectId(objectA, objectB);
    expect(result).toBe("array");
  });
});*/

describe('Return error object from simple object', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it('should create error object ', () => {
    const object = { statusCode: 401, statusText: 'Unauthorized' };
    const result = customError(object);
    expect(result).toMatchSnapshot();
  });
});

describe('Union two arrays into one if ids are equal', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it('should merge test property of two arrays into one and return new array', () => {
    const a = [{ id: 1, test: [{ name: 'Bob' }] }];
    const b = [{ id: 1, test: [{ name: 'John' }] }];
    const union = [{ id: 1, test: [{ name: 'Bob' }, { name: 'John' }] }];
    const result = mergeArraysWithObjects(a, b, 'id', 'test');
    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toHaveLength(1);
    expect(result).toEqual(union);
    expect(result[0].test).toHaveLength(2);
  });

  it('should return first argument array', () => {
    const a = [{ id: 1, test: [{ name: 'Bob' }] }];
    const b = [];
    const result = mergeArraysWithObjects(a, b, 'id', 'test');
    expect(result).toEqual(a);
  });

  it('should return second argument array', () => {
    const a = [];
    const b = [{ id: 1, test: [{ name: 'John' }] }];
    const result = mergeArraysWithObjects(a, b, 'id', 'test');
    expect(result).toEqual(b);
  });

  it('should return empty array', () => {
    const a = [];
    const b = [];
    const result = mergeArraysWithObjects(a, b, 'id', 'test');
    expect(result).toEqual([]);
  });
});

describe('Return proper UTC datetime based on timezone and timestamp', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  it('convert timestamp', () => {
    const timestamp = moment('2018-11-11 20:30')
      .tz('Europe/Warsaw')
      .unix();
    const mockedUserIdentityId = 1;
    const mockedIdentities = [
      {
        id: 1,
        identityDetail: {
          timezone: 'Singapore',
        },
      },
    ];
    const utcDateTime = getUserDateTimefromUTC(
      timestamp,
      mockedUserIdentityId,
      mockedIdentities
    );
    expect(utcDateTime.format('YYYY-MM-DD HH:mm')).toEqual(
      moment(timestamp * 1000)
        .tz('Singapore')
        .format('YYYY-MM-DD HH:mm')
    );
  });
});
