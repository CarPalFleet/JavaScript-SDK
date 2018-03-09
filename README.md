# JavaScript-SDK

The JavaScript SDK for developers(including third party developers/vendors) to create custom modules by using Carpal Fleet core services.

![Alt text](https://user-images.githubusercontent.com/26168452/33137078-e387aa18-cfe1-11e7-96e0-b489079ae4a3.jpg 'Optional title')

The SDK is under active development, we will release the latest version to npm as soon as we have new services ready.

The current version of this SDK is 0.1.47


To install CarPal SDK: **npm i --save carpal**

If you were using webpack and had encountered the **_regeneratorRuntime is not defined_** error, you may need to include **babel-polyfill** to your project(**npm install --save babel-polyfill**). For more info, you can find it from here https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined

**We only tested it with ES6, theoretically it should work with ES5. Use it at your own risk for ES5.**

# Algo

| Module                   | Method                                                          | Description                                                                                                                                                                                                           |
| ------------------------ | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| carpal/dist/algo/Routing | optimizeRouteAsync({date, routeSettingId, routingScope}, token) | This returns a Promise object (reject/resolve). <br />Example. **date (mandatory)(string) = '2018-02-28'** <br />\*\*routeSettingId (mandatory)(integer) = 124** <br />**routingScope (mandatory)(string) = 'all'\*\* |

# Account

| Module                           | Method                                                      | Description                                                                                                 |
| -------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| carpal/dist/data/account/Auth    | getTokenAsync(email, password, clientId, secret)            | This returns a Promise object with both access token and refresh token.                                     |
| carpal/dist/data/account/Auth    | refreshTokenAsync(refreshToken, clientId, secret)           | This returns a Promise object with both new access token and refresh token by using existing refresh token. |
| carpal/dist/data/account/Account | resetPasswordRequestAsync(email)                            | This will call the email service to send out a link and return a Promise object with true/false             |
| carpal/dist/data/account/Account | resetPasswordAsync(token, email, password, confirmPassword) | This will actually update a user's password and return a Promise object with true/false                     |
| carpal/dist/data/account/Account | validateResetPasswordTokenAsync(token)                      | This returns a Promise object, if return true the token is valid, otherwise an error occurs.                |

# Customer

| Module                             | Method                                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| carpal/dist/data/customer/Customer | createNewCustomerAsync(customerObj)                                                  | This returns a Promise object with true/false for registration result. The **customerObj** payload example {email:'xxx@example.com', password: '123456', firstName:'John', lastName:'Lennon', phone:'+6512345678', birthday:'d-m-y', identityId:1, coName:'ABC Pte ltd', coPhone:'+6512345678', coVatNo:'xxxxxx'}                                                                                                                                                                                                   |
| carpal/dist/data/customer/Setting  | getCustomerPreferenceSettingsAsync(domain, token)                                    | This returns a Promise object with Logo and Background Image URL for Customer                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| carpal/dist/data/customer/Job      | getJobDetailAsync(orderId, token)                                                    | This returns a Promise object with Job Detail with given orderId                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| carpal/dist/data/customer/Job      | getJobSummaryAsync(orderId, token)                                                   | This returns a Promise Summary with Job Summary with given orderId                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| carpal/dist/data/customer/Order    | createNewDeliveryWindow(deliveryWindowObj, token)                                    | This returns a Promise object with delivery window Detail. <br /><br />The **deliveryWindowObj** payload example {customerId: 1, identityId: 1, productTypeId: 1, transactionGroupId: 'optional', displayName: 'xxx', startTime: '12:00', endTime: '16:00'}                                                                                                                                                                                                                                                         |
| carpal/dist/data/customer/Order    | getCustomerOrdersWithFiltersAsync(filterObject, customerId, token, validateSchema)   | To use getCustomerOrdersWithFiltersAsync, validateSchema has to be set to `true`, else by default it is set to `false`. Currently, validateSchema is not handled yet. This returns a Promise object with all customer's orders. <br /><br />The **filterObject** payload example {pickupDate: '2017-11-06', orderStatusIds: [1, 2, 3]} <br /><br />**To utilize the function, customerId and token must be provided.**                                                                                              |
| carpal/dist/data/customer/Order    | getCustomerOrderCountsAsync(filterObject, customerId, token)                         | This returns a Promise object with all customer's order counts. <br /><br />To utilize the function, filterObject(pickupDate: '2017-12-31'), customerId and token must be provided.\*\*                                                                                                                                                                                                                                                                                                                             |
| carpal/dist/data/customer/Order    | updateJobLiveData(originalJobDatum, pubSubPayload, filterObject)                     | This returns update Jobs with both activeStatusCounts and totalStatusCounts counts. Can add orderStatusId and pickupDate fields inside of filterObject. This function will response new data for the today pickupDate, otherwise it will response the existing data. <br /><br />                                                                                                                                                                                                                                   |
| carpal/dist/data/customer/Driver   | getCustomerDriverDetailAsync(customerId, identityId, driverId, token)                | This returns a Promise object with customer's driver detail. <br /><br />                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| carpal/dist/data/customer/Driver   | getCustomerDriverListAsync(fileterObject, token)                                     | This returns a Promise object with customer's driver list. (V2 Endpoint)<br /><br />                                                                                                                                                                                                                                                                                                                                                                                                                                |
| carpal/dist/data/customer/Driver   | getDriverListAsync(fileterObject, token)                                             | This returns a Promise object with customer's driver list. (V3 Endpoint)<br /><br /> fileterObject = { limit: 20, page: 1}                                                                                                                                                                                                                                                                                                                                                                                          |
| carpal/dist/data/customer/Driver   | exportDriverListFileAsync(fileType, token)                                           | This returns a Promise object with download link url. Example of fileType param - csv or pdf or excel<br /><br />                                                                                                                                                                                                                                                                                                                                                                                                   |
| carpal/dist/data/customer/Driver   | deleteCustomerDriversAsync(driverIds, token)                                         | Example of driverIds param- [123, 456, 672] <br /><br />                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| carpal/dist/data/customer/Driver   | createNewDriverAsync(driverInfo, customerId, token)                                  | This returns a Promise object with new driver detail. <br /><br />The **driverInfo** payload example {identityId: 1, productTypeId: 3, transactionGroupId: [180], firstName: 'String', lastName: 'String', email: 'String', password: 'String', birthday: 'yyyy-mm-dd', phone: '+65xxxxxxxx', existingUserEmail=false, sendConfirmationSms=false, isNewUser=true, vehicleTypeId: 1, vehicleBrand: 'String', vehicleModel: 'String', vehicleLicenseNumber: 'String', vehicleModelYear: 2018, vehicleColor: 'String'} |
| carpal/dist/data/customer/Driver   | getCustomerDriversWithFiltersAsync(filterObj, customerId, token, validateSchema)     | To use getCustomerDriversWithFiltersAsync, validateSchema has to be set to `true`, else by default it is set to `false`. Currently, validateSchema is not handled yet. This is an example of filterObj to be passed to getCustomerDriversAsync: const filterObj = {driverStatusIds: [2], orderRouteTypeIds: [1,2], driverTypeIds: [1,2,3]}                                                                                                                                                                          |
| carpal/dist/data/customer/Order    | updateDriverLiveData(originalDriverDatum, pubSubPayload, filterObject)               | This returns update Drivers with both activeStatusCounts and totalStatusCounts counts. Can add driverStatusIds and driverTypeIds fields inside of filterObject. <br /><br />                                                                                                                                                                                                                                                                                                                                        |
| carpal/dist/data/customer/Order    | getBatchOrderProgressAsync(customerId, token)                                        | This returns a Promise object with batch order progress. <br /><br />                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| carpal/dist/data/customer/Order    | getGroupingLocationAsync(groupingLocationId, token)                                  | This returns a Promise object with all locations grouped by pickupGroupID. <br /><br />                                                                                                                                                                                                                                                                                                                                                                                                                             |
| carpal/dist/data/customer/Order    | getGroupingLocationsAsync({statusIds, pickupDate, limit, offset}, customerId, token) | This returns a Promise object with all locations grouped by pickupGroupID. <br /><br /> **statusId 1 means MyOrders, 2 means Locations with Errors.** pickupDate format should be 'yyyy-mm-dd'\*\*                                                                                                                                                                                                                                                                                                                  |
| carpal/dist/data/customer/Order    | createGroupingLocationAsync(locationObject, token)                                   | Example of locationObject = {"pickupLocationAddress":"22 Gim moh road","deliveryAddress":"Holland Close"}                                                                                                                                                                                                                                                                                                                                                                                                           |
| carpal/dist/data/customer/Order    | editGroupingLocationAsync(groupingLocationId, locationObject, token)                 | pass updated fields into the locationData Object. Example of locationObject = {"pickupLocationAddress":"22 Gim moh road","deliveryAddress":"Holland Close"}                                                                                                                                                                                                                                                                                                                                                         |
| carpal/dist/data/customer/Order    | editGroupingLocationsAsync(locations, token)                                         | locations params must be array. Can pass multiple edited locations with groupingLocationId into this array. <br /><br />Example. [groupingLocationId: 1, locationData: {pickupLocationAddress: 'xxxx'}]                                                                                                                                                                                                                                                                                                             |
| carpal/dist/data/customer/Order    | updateAndTruncateOrderErrorsAsync(locationDataList = [], errorIds = [], token)       | locationDataList param must be array. Can pass multiple edited locations with groupingLocationId into this array. <br /><br />Example. [groupingLocationId: 1, locationData: {pickupLocationAddress: 'xxxx'}]. It is the same as edit grouping location function. errorIds param must be array .                                                                                                                                                                                                                    |
| carpal/dist/data/customer/Order    | removeOrderErrorRecordAsync(groupingLocationId, token)                               | This function will delete one order record with errors from Dynamodb <br /><br />                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| carpal/dist/data/customer/Order    | removeOrderErrorRecordsAsync(errorIds = [], token)                                   | This function will delete the list of order records with errors from Dynamodb <br /><br />                                                                                                                                                                                                                                                                                                                                                                                                                          |
| carpal/dist/data/customer/Order    | deleteGroupingLocationAsync(groupingLocationId, token)                               | This function will delete specific groupingLocationId from params. <br /><br />                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| carpal/dist/data/customer/Order    | deleteGroupingLocationsAsync(groupingLocationIds = [], token)                        | This function will delete the list of groupingLocationIds <br /><br />                                                                                                                                                                                                                                                                                                                                                                                                                                              |

| carpal/dist/data/customer/Order | getUniquePickupAddressesAsync(filterObject, token) | This returns a Promise object with all unique pickupLocationAddresses. **Example of fileterObject:: pickupDate = "YYYY-MM-DD", with_order=0 ** <br /><br /> |
| carpal/dist/data/customer/Order | cancelBatchFileProcessAsync(groupingBatchId, token) | This returns a Promise object with data true if the batch file is actually deleted.\*\* |
| carpal/dist/data/customer/Order | fetchBatchLocationsErrorAsync(pickupDate, customerId, token) | This returns a Promise object with error and its message from Dynamodb. <br /><br /> pickupDate format should be 'yyyy-mm-dd'\*\* |
| carpal/dist/data/customer/Order | fetchBatchLocationsErrorAsync( pickupDate, customerId, token) | This returns a Promise object with order progress data. <br /><br /> pickupDate format should be 'yyyy-mm-dd'\*\* |
| carpal/dist/data/customer/Order | fetchMyOrderColumNames(type, customerId, token) | This returns a Promise object with my order table column headers filtered by customerId and type<br /><br /> type = my-order\*\* |
| carpal/dist/data/customer/Order | getCustomerDriverCountsAsync(filterObject, customerId, token) | This returns a Promise object with all customer's driver counts. <br /><br />To utilize the function, filterObject(driverTypeIds: [1,2]), customerId and token must be provided.\*\* |
| carpal/dist/data/customer/Search | searchAsync(keywords, scope, fuzzy=true, fuzziness=1, token) | The available options for scope:drivers, orders<br /><br />This returns a Promise object with search results. (for scope argument, please leave it as empty string for now) |

# Driver

| Module                            | Method                                      | Description                                                                                                                                        |
| --------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| carpal/dist/data/driver/LiveRoute | sendLiveRouteDataAsync(liveRouteObj, token) | This returns a Promise object with sns message. The liveRouteObj consists of {orderId, addressId, driverId, latitude, longitude, orderRouteTypeId} |
| carpal/dist/data/driver/Vehicles  | getVehicleTypesAsync(token)                 | This returns a Promise object with all vehicles types                                                                                              |

# Routing

| Module                         | Method                                    | Description                                                                                                                                        |
| ------------------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| carpal/dist/ui/routing/Routing | getOrderListWithoutRoutes(filters, token) | This returns a Promise object with sns message. The liveRouteObj consists of {orderId, addressId, driverId, latitude, longitude, orderRouteTypeId} |

# Messaging

| Module                            | Method                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Description                                                                                                                                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| carpal/dist/data/messaging/PubSub | Initializing connection: **pubsub**('APP\*PUBSUB_KEY', 'CHANNEL_ID', realtime?) \*\*\_By default, realtime is set to true to establish a socket connection. For transactional mode, you should set it to false**\*<br /><br />**subscribe**(eventName, callback)<br /><br />**publish**(eventName, messageObj)<br /><br /> **unsubscribe**(eventName, listener) **listener\*\* is the callback listener function that was previously subscribed.<br /><br /> | Example:<br /><br />`const ps = pubsub(API_KEY, CHANNEL_ID);`<br /><br />`pubSub.subscribe(eventName, callback);`<br /><br />`pubSub.unsubscribe(eventName, listener)`<br /><br />`pubSub.publish(eventName, listener)` |

# Notification

| Module                                     | Method                                                 | Description                                                                                                                             |
| ------------------------------------------ | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| carpal/dist/data/notification/Notification | getNotificationsAsync(all = true/false, userId, token) | This returns a Promise object with notifications. Param **all=true/false** to indicate if show only unread or all notification messages |
| carpal/dist/data/notification/Notification | deleteNotificationAsync(notificationId, userId, token) | This returns true if requested notificationId is deleted.                                                                               |

# Data validation

**This is a special set of functions to verify the inbound data from Pub/Sub against the schemas predefined by CarPal. You can choose not to use these functions at your own risk**

| Module                             | Method                              | Description                                                                                                                                                       |
| ---------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| carpal/dist/data/validation/Schema | getSchemaAsync(service, schemaName) | This returns a Promise object with the a schema. This function should be called before calling the **validate** function                                          |
| carpal/dist/data/validation/Schema | validate = (schema, payload)        | This returns true if all fields in **schema** are covered by **payload** object, otherwise it returns false. This function checks both field names and data types |

# Public

| Module                           | Method                                        | Description                                                                                   |
| -------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| carpal/dist/data/public/Country  | getCountriesAsync()                           | This returns a Promise object with a list of countries available for carpal services          |
| carpal/dist/data/public/Identity | getIdentitiesAsync()                          | This returns a Promise object with a list of identities(cities) available for carpal services |
| carpal/dist/data/public/Language | getLanguagesAsync()                           | This returns a Promise object with a list of languages supported by carpal system             |
| carpal/dist/data/public/Setting  | getCustomerPublicProfileSettingsAsync(domain) | This returns a Promise object with Logo and Background Image URL                              |

# Utility

| Module                              | Method                               | Description                                        |
| ----------------------------------- | ------------------------------------ | -------------------------------------------------- |
| carpal/dist/data/utility/FileUpload | fileUploadAsync({fileObject}, token) | This returns a Promise object with groupingBatchId |

# Tutorials

This is a simple tutorial to show you how to use CarPal JavaScript SDK to quickly build a web based fleet management application.

First, you need to request for your **client ID** and **secret**.

Then you can start with Customer registration(we use ReactJS here):

```javascript
import React ...
import { getTokenAsync } from 'carpal/dist/data/account/Auth ';
import { createNewCustomerAsync } from 'carpal/dist/data/customer/Customer';

export default Class Registration extends Component{

  register = async (formData)=>{
    try{
      const result = await createNewCustomerAsync(formData); //This function will return a promise with result true if registration successful

      //user login immediately after registration success
      if(result){
        const authResult = await getTokenAsync('xxx@example.com', 'xxxxxx', 1, 'secret string...');

        //Store the tokens in localstorage
        localStorage.setItem('auth', {accessToken: authResult.accessToken,
                                      refreshToken: authResult.refreshToken,
                                      customerId: authResult.customerId});

        //Navigate to other page...
      }
    }catch(e){
      //Handle error here
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

# Utilizing Realtime dashboard

We implemented Pub/Sub messaging architecture in the SDK so that your application can take the advantage of Realtime dashboard features.

You need to use Pub/Sub module in **carpal/dist/data/messaging/PubSub**

Let's take ReactJS as example here:

```javascript
import React ...;
import { pubsub } from 'carpal/dist/data/messaging/PubSub';


export default class Dashboard extends Component{
  constructor(props){
    super(pros);
    ...

    //You will get an APP_KEY after registered with Carpal
    const ps = pubsub('APP_PUBSUB_KEY', 'CHANNEL_ID');

    //subscribe to a channel here.
    //handle your logics in callback function and pass it as an argument.
    ps.subscribe('event_name', function (message) {
      //process the message object
    });
  }
}
```

License: MIT https://opensource.org/licenses/MIT
