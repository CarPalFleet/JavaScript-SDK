# JavaScript-SDK
The JavaScript SDK for developers(including third party developers/vendors) to create custom modules by using Carpal Fleet core services.

The SDK is under active development, we will release the latest version to npm as soon as we have new services ready.

The current version of this SDK is **0.0.29**

To install CarPal SDK: **npm i --save carpal**

If you were using webpack and had encountered the ***regeneratorRuntime is not defined*** error, you may need to include babel-polyfill to your project. For more info, you can find it from here https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined

We only tested it with ES6, theoretically it should work with ES5. Use it at your own risk for ES5.

# Methods

| Module                        | Method                                | Description                                                          |
| ----------------------------- |---------------------------------------| ---------------------------------------------------------------------|
| carpal/data/account/Auth      | getTokenAsync(email, password)        | This returns the both access token and refresh token                 |
| carpal/data/account/Account   | resetPasswordAsync(email)             | This will call the email service to send out a link                  |
| carpal/data/account/Account   | getDriverJobsAsync(id, token, date)   | This returns list of a driver's jobs for given date                  |
| carpal/data/account/Account   | getDriverLegsAsync(id, token, date)   | This returns list of a driver's legs for given date                  |
| carpal/data/public/Country    | getCountriesAsync()                   | This returns list of countries available for carpal services         |
| carpal/data/public/Identity   | getIdentitiesAsync()                  | This returns list of identities(cities) available for carpal services|
| carpal/data/public/Language   | getLanguagesAsync()                   | This returns list of languages supported by carpal system            |
| carpal/data/customer/Customer   | createNewCustomerAsync(customerObj) | This returns true/false for registration result. The **customerObj** payload example" {email:'xxx@example.com', password: '123456', firstName:'John', lastName:'Lennon', phone:'+6512345678', birthday:'d-m-y', identityId:1, coName:'ABC Pte ltd', coPhone:'+6512345678', coVatNo:'xxxxxx'}            |


License: MIT https://opensource.org/licenses/MIT
