# JavaScript-SDK
The JavaScript SDK for developers(including third party developers/vendors) to create custom modules by using Carpal Fleet core services.

The SDK is under active development, we will release the latest version to npm as soon as we have new services ready.

The current version of this SDK is **0.0.32**

To install CarPal SDK: **npm i --save carpal**

If you were using webpack and had encountered the ***regeneratorRuntime is not defined*** error, you may need to include **babel-polyfill** to your project(**npm install --save babel-polyfill**). For more info, you can find it from here https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined

**We only tested it with ES6, theoretically it should work with ES5. Use it at your own risk for ES5.**

# Methods

| Module                             | Method                                            | Description                                                          |
| ---------------------------------- |---------------------------------------------------| ---------------------------------------------------------------------|
| carpal/dist/data/account/Auth      | getTokenAsync(email, password, clientId, secret)  | This returns the both access token and refresh token.                |
| carpal/dist/data/account/Account   | resetPasswordAsync(email)                         | This will call the email service to send out a link                  |
| carpal/dist/data/account/Account   | getDriverJobsAsync(id, token, date)               | This returns list of a driver's jobs for given date                  |
| carpal/dist/data/account/Account   | getDriverLegsAsync(id, token, date)               | This returns list of a driver's legs for given date                  |
| carpal/dist/data/public/Country    | getCountriesAsync()                               | This returns list of countries available for carpal services         |
| carpal/dist/data/public/Identity   | getIdentitiesAsync()                              | This returns list of identities(cities) available for carpal services|
| carpal/dist/data/public/Language   | getLanguagesAsync()                               | This returns list of languages supported by carpal system            |
| carpal/dist/data/customer/Customer | createNewCustomerAsync(customerObj)               | This returns true/false for registration result. The **customerObj** payload example" {email:'xxx@example.com', password: '123456', firstName:'John', lastName:'Lennon', phone:'+6512345678', birthday:'d-m-y', identityId:1, coName:'ABC Pte ltd', coPhone:'+6512345678', coVatNo:'xxxxxx'}            |


# Tutorial
This is a simple tutorial to show you how to use CarPal JavaScript SDK to quickly build a web based fleet management application.

First, you need to request for your **client ID** and **secret**.

Then you can start with Customer registration(we use ReactJS here):

```javascript
import React ...
import { getTokenAsync } from 'carpal/dist/data/account/Auth ';
import { createNewCustomerAsync } from 'carpal/dist/data/customer/Customer';

export default Class Registration extends Component{
  
  register = (formData)=>{
    const result = createNewCustomerAsync(formData); //This will return true if registration successful
    
    //user login immediately after registration success
    if(result){
      const authResult = getTokenAsync('xxx@example.com', 'xxxxxx', 1, 'secret string...');
      
      //Store the tokens in localstorage
      localStorage.setItem('auth', {accessToken: authResult.access_token, 
                                    refreshToken: authResult.refreshToken, 
                                    customerId: authResult.customer_id);
      
      //Navigate to other page...
    }
  }
  render(){
    return (
      ...
      <Button onPress={()=>this.register(formData)}>
        <Text>Register</Text>
      </Button>
      ...
    )
  }
}

```


License: MIT https://opensource.org/licenses/MIT
