import config from './config';
import {getTokenAsync} from '../Auth';

jest.unmock('axios');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Authenfication integration test', () => {
  it('verifies that the token data is correct when all parameters are correct', async () => {
    const response = await getTokenAsync(
      config.temail,
      config.tpassword,
      config.clientId,
      config.clientSecret
    );

    // Data should look like
    // data: {
    //   token_type: 'Bearer',
    //   expires_in: 3600,
    //   access_token:
    //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRmZDI2NjVjNWYwNTdhMzkyMzcyMGJkMTNmYzZiMjIxNjhhZTJkODZiNTQ5NWQ2OTM3YzAyN2U3OGI1YTQ3MGUxZWQyNTQ4YTEwYWNiY2Y0In0.eyJhdWQiOiIyIiwianRpIjoiNGZkMjY2NWM1ZjA1N2EzOTIzNzIwYmQxM2ZjNmIyMjE2OGFlMmQ4NmI1NDk1ZDY5MzdjMDI3ZTc4YjVhNDcwZTFlZDI1NDhhMTBhY2JjZjQiLCJpYXQiOjE1MjA1NjQ5MTQsIm5iZiI6MTUyMDU2NDkxNCwiZXhwIjoxNTIwNTY4NTE0LCJzdWIiOiIyNTE0MyIsInNjb3BlcyI6WyJmdWxsLWFjY2VzcyJdfQ.K4hLyz4sci0Hh_tcvWASV6mdK1uDThtp6uJahwjqdOM8RTw8kjkvyQlUeiAsLTj5thbqDqI7Rgx3hOOpcWLQ3MZciG5ucEN9NuaHEfWBUkD-ZP1I5aljFZ5ZZuuMD69z0bVhXZs6eaXt1XLdIuOOXJQiyBnvktE2YTRUxG8qFPLeFyGPjcfrj8Do9-pOfW3MzOQSONjP1CsRYRWvvNwPWOdyGpcxbkjiLrfJFFQlMt9-a2PedDJ7GBJb-Kc0nTOyE9S_5j4tmFI1Rk3haRhm_9EMY8YvNXhqzZ9m9qqjVtJjMFTFwe7kLVwbvVHj0x7jmeFEjOTVHRbqJ3gJNmfGiCFdXJNv2RItyW9B9Aciob2b1bC1pa3E1RME5QzQToRWtfBs_1PBgZCJNpyho_axH5yMmfJ8UNvh8tBVESt073O0OVMo_yCmGsZDiGmXxfNJKVI65EJsIaZyVEwtEZooM1nkn1a8l1fqP9Y_gWuxFLGFEVO3PcrofOVa1wViu3wXyW_Fa19cWbJY_Z36LlEgJH3HfJ6QaBbMFE7qnxznowSApfR_atWWAPeKpejnNJCVT6Xz2wgILhIor_TRI3_3F744HeeV2aC2flVSRxQHuMoulX4uj7TQGH5YsrFU584PgftsxKG3NIBGuKGghfmwDJ28leGxKnL1krzkDFAZ_Ns',
    //   refresh_token:
    //     'def50200167742cd97601125b21c4b26be9405fc63890f3b14ccaa12896d0a3e42bbde444ab7da74c374660da04b094f531c43f2095b2f59d058d2f8d7360b02d27f3ad0ca5a8438814b1a91a0c586bcf81c5f54f582ac787728d9cbfd03d8b301e28d0fd2b7e08af40321de026b9e86a79287e0e030aad5c463e0e41d4d8eb141832f94847283b3e934fe30e08a2309db5d610115ce8ffc32be00ad220df752c2bcb4cc4e1c7ec089008ac87cc39e636ee291e7ac4fc4824c74534ec4b647b678b16470feaa3c52307c7e2bdef0e78dba0d40ff94729f9d3bd6462239068deee242619a3315912913dacf866e96e064a4354e10fb5e7c8638f919677a10a85efab3710b00b6d1ed10ea55891fad1684ad7b0c08e27fe4e5316415bee41be3b7cf15e31f9758d9077f47e08ae538248996523d6465c7134b1bf109dc65a8d5dfb90d3a6202e46a9862be2c00b436a7ef18466c6873e316c9a53b403def946a13ef04ed7dcbb2a2097292c69bd0a0a1fd658d',
    //   customer_id: 14445,
    //   identity_id: 1,
    //   country_code: 'SG',
    //   channel_id: '13264e1c6812911b999a92bb89d1001792a02940',
    //   events: ['notification', 'driverTracking', 'orderTracking'],
    //   default_transaction_group_ids: [180],
    // }

    // You could improve that but I don't know what is mutable or not in this data
    const expected = {
      accessToken: expect.stringMatching(/[A-Za-z0-9\-\._~\+\/]*/),
      tokenType: expect.stringMatching('Bearer'),
      channelId: expect.stringMatching(/[a-z0-9]*/),
      countryCode: expect.stringMatching('SG'),
      customerId: expect.any(Number),
      refreshToken: expect.stringMatching(/[a-z0-9]*/),
      expiresIn: expect.any(Number),
      identityId: expect.any(Number),
      defaultTransactionGroupIds: expect.any(Array),
      events: expect.any(Array),
    };

    expect(response).toEqual(expected);
  });

  it('verifies that when there is a wrong password it throws an error with status code and text', async () => {
    try {
      const response = await getTokenAsync(
        config.temail,
        'wrong-password',
        config.clientId,
        config.clientSecret
      );
      expect(response).toBeNull(); // Should not trigger, only if is there is no exception which is not expected behavior
    } catch (error) {
      const expected = {statusCode: 401, statusText: 'Unauthorized'};
      expect(error).toEqual(expected);
    }
  });
});
