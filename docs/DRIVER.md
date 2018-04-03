## Constants

<dl>
<dt><a href="#createDriverAsync">createDriverAsync</a> ⇒ <code>object</code></dt>
<dd><p>Create Driver</p>
</dd>
<dt><a href="#getDriverDetailAsync">getDriverDetailAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get Driver Detail</p>
</dd>
<dt><a href="#getDriversAsync">getDriversAsync</a> ⇒ <code>promise</code></dt>
<dd><p>Get Driver List</p>
</dd>
<dt><a href="#updateDriverAsync">updateDriverAsync</a> ⇒ <code>promise</code></dt>
<dd><p>Update Driver</p>
</dd>
<dt><a href="#getDriversBasedOnSearchResult">getDriversBasedOnSearchResult</a> ⇒ <code>promise</code></dt>
<dd><p>Retrieve specific driver based on the search result</p>
</dd>
<dt><a href="#deleteDriversAsync">deleteDriversAsync</a> ⇒ <code>promise</code></dt>
<dd><p>API is not ready yet
Retrieve specific driver based on the search result</p>
</dd>
<dt><a href="#getDriversWithFiltersAsync">getDriversWithFiltersAsync</a> ⇒ <code>promise</code></dt>
<dd><p>Get Driver with filters</p>
</dd>
<dt><a href="#getDriverCountsAsync">getDriverCountsAsync</a> ⇒ <code>promise</code></dt>
<dd><p>Get Driver Counts for Dashboard</p>
</dd>
<dt><a href="#getDriverRoutesAsync">getDriverRoutesAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get Routes</p>
</dd>
<dt><a href="#getUpdatedDriverLiveData">getUpdatedDriverLiveData</a> ⇒ <code>promise</code></dt>
<dd><p>Get updated driver live data for Dashboard
This function will calculate all of driver counts</p>
</dd>
<dt><a href="#updateDriverScheduleAsync">updateDriverScheduleAsync</a> ⇒ <code>Object</code></dt>
<dd><p>Update driver time slot</p>
</dd>
<dt><a href="#deleteDriverScheduleAsync">deleteDriverScheduleAsync</a> ⇒ <code>object</code></dt>
<dd><p>deleteDriverScheduleAsync</p>
</dd>
<dt><a href="#createDriverScheduleAsync">createDriverScheduleAsync</a> ⇒ <code>Object</code></dt>
<dd><p>Add new driver time slot</p>
</dd>
<dt><a href="#iterateDriverArrays">iterateDriverArrays</a> ⇒ <code>object</code></dt>
<dd><p>Calculate Customer Driver Counts</p>
</dd>
<dt><a href="#getActiveStatusCountsAndTotalCounts">getActiveStatusCountsAndTotalCounts</a></dt>
<dd><p>Categories Customer Drivers for Count</p>
</dd>
<dt><a href="#categoriesCustomerDriversForCount">categoriesCustomerDriversForCount</a> ⇒ <code>object</code></dt>
<dd><p>Categories Customer Drivers for Count</p>
</dd>
<dt><a href="#categoriesCustomerDrivers">categoriesCustomerDrivers</a> ⇒ <code>object</code></dt>
<dd><p>Categories Customer Drivers</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#calculateCustomerDriverCounts">calculateCustomerDriverCounts(data, driverTypeIds)</a> ⇒ <code>object</code></dt>
<dd><p>Calculate Customer Driver Counts</p>
</dd>
</dl>

<a name="createDriverAsync"></a>

## createDriverAsync ⇒ <code>object</code>

Create Driver

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param      | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| driverInfo | <code>object</code> | {} birthday (mandatory) (string) driverTypeIds (mandatory) (string) #csv Eg. 2,3 email (mandatory) (string) existingUserEmail (optional) (boolean) firstName (mandatory) (string) identityId (mandatory) (string) isNewUser (optional) (boolean) lastName (mandatory) (string) password (mandatory) (string) phone (mandatory) (string) productTypeId (mandatory) (int) sendConfirmationSms (optional) (boolean) transactionGroupId (int) (int) vehicleBrand (optional) (string) vehicleColor (optional) (string) vehicleLicenseNumber (optional) (int) vehicleModel (optional) (string) vehicleModelYear (optional) (int) vehicleTypeId (optional) (int) |
| customerId | <code>int</code>    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| token      | <code>string</code> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

<a name="getDriverDetailAsync"></a>

## getDriverDetailAsync ⇒ <code>object</code>

Get Driver Detail

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param      | Type                |
| ---------- | ------------------- |
| customerId | <code>int</code>    |
| identityId | <code>int</code>    |
| driverId   | <code>int</code>    |
| token      | <code>string</code> |

<a name="getDriversAsync"></a>

## getDriversAsync ⇒ <code>promise</code>

Get Driver List

**Kind**: global constant  
**Returns**: <code>promise</code> - reject/resolve
Will return [] array if there's no drivers

| Param        | Type                | Description                                                                            |
| ------------ | ------------------- | -------------------------------------------------------------------------------------- |
| filterObject | <code>object</code> | {limit, page} limit (optional) (int) page (optional) (int) #offset, start from 1 value |
| token        | <code>string</code> |                                                                                        |

<a name="updateDriverAsync"></a>

## updateDriverAsync ⇒ <code>promise</code>

Update Driver

**Kind**: global constant  
**Returns**: <code>promise</code> - reject/resolve

| Param        | Type                |
| ------------ | ------------------- |
| filterObject | <code>object</code> |
| token        | <code>string</code> |

<a name="getDriversBasedOnSearchResult"></a>

## getDriversBasedOnSearchResult ⇒ <code>promise</code>

Retrieve specific driver based on the search result

**Kind**: global constant  
**Returns**: <code>promise</code> - reject/resolve
Will return [] array if there's no drivers

| Param        | Type                | Description                                                                            |
| ------------ | ------------------- | -------------------------------------------------------------------------------------- |
| filterObject | <code>object</code> | {limit, page} limit (optional) (int) page (optional) (int) #offset, start from 1 value |
| searchResult | <code>array</code>  |                                                                                        |
| token        | <code>string</code> |                                                                                        |

<a name="deleteDriversAsync"></a>

## deleteDriversAsync ⇒ <code>promise</code>

API is not ready yet
Retrieve specific driver based on the search result

**Kind**: global constant  
**Returns**: <code>promise</code> - reject/resolve
Will return [] array if there's no drivers

| Param      | Type                |
| ---------- | ------------------- |
| driverIds  | <code>object</code> |
| customerId | <code>int</code>    |
| token      | <code>string</code> |

<a name="getDriversWithFiltersAsync"></a>

## getDriversWithFiltersAsync ⇒ <code>promise</code>

Get Driver with filters

**Kind**: global constant  
**Returns**: <code>promise</code> - reject/resolve
Will return [] array if there's no drivers

| Param            | Type                 | Description                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filterObject     | <code>object</code>  | {orderRouteTypeIds, driverTypeIds, driverStatusId} orderRouteTypeIds (string) (optinal) 1,2 #csv string _ 1 means Live, 2 means POD driverTypeIds (string) (optinal) 1 #csv string _ 1 means Inhouse, 2 means Public, 3 means Service Provider driverStatusIds (string) (optinal) 1,2,3,4 #csv string \* 1 means Active, 2 means With Route, 3 means Idle, 4 means Inactive driver |
| customerId       | <code>int</code>     |                                                                                                                                                                                                                                                                                                                                                                                    |
| token            | <code>string</code>  |                                                                                                                                                                                                                                                                                                                                                                                    |
| validationStatus | <code>boolean</code> | (optional)                                                                                                                                                                                                                                                                                                                                                                         |

<a name="getDriverCountsAsync"></a>

## getDriverCountsAsync ⇒ <code>promise</code>

Get Driver Counts for Dashboard

**Kind**: global constant  
**Returns**: <code>promise</code> - reject/resolve
Will return [] array if there's no drivers

| Param        | Type                 | Description                                                                                                                                                                                                                                                                                                                                                                        |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filterObject | <code>object</code>  | {orderRouteTypeIds, driverTypeIds, driverStatusId} orderRouteTypeIds (string) (optinal) 1,2 #csv string _ 1 means Live, 2 means POD driverTypeIds (string) (optinal) 1 #csv string _ 1 means Inhouse, 2 means Public, 3 means Service Provider driverStatusIds (string) (optinal) 1,2,3,4 #csv string \* 1 means Active, 2 means With Route, 3 means Idle, 4 means Inactive driver |
| customerId   | <code>string</code>  |                                                                                                                                                                                                                                                                                                                                                                                    |
| token        | <code>boolean</code> | (optional)                                                                                                                                                                                                                                                                                                                                                                         |

<a name="getDriverRoutesAsync"></a>

## getDriverRoutesAsync ⇒ <code>object</code>

Get Routes

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param        | Type                | Description                                                                                                                                                                                                                                          |
| ------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filterObject | <code>object</code> | # {pickupDate (mandatory), withAvailability, withSchedule, limit, offset} pickupDate (optional)(string) = '2018-02-28' withAvailability (optional)(int) = 1/0 withSchedule (optional)(int) = 1/0 limit = 20 (optional)(int) page = 0 (optional)(int) |
| token        | <code>string</code> |                                                                                                                                                                                                                                                      |

<a name="getUpdatedDriverLiveData"></a>

## getUpdatedDriverLiveData ⇒ <code>promise</code>

Get updated driver live data for Dashboard
This function will calculate all of driver counts

**Kind**: global constant  
**Returns**: <code>promise</code> - reject/resolve
Will return [] array if there's no drivers

| Param               | Type                 |
| ------------------- | -------------------- |
| originalDriverDatum | <code>object</code>  |
| pubSubPayload       | <code>string</code>  |
| filterObject        | <code>boolean</code> |

<a name="updateDriverScheduleAsync"></a>

## updateDriverScheduleAsync ⇒ <code>Object</code>

Update driver time slot

**Kind**: global constant  
**Returns**: <code>Object</code> - Promise resolve/reject
If resolve, return value: boolean(To indicate update successful or failed)
remarks: the API endpoint will return one of the following status:
400: Validation Error
400: Driver Schedule with same values exists
200: Success

| Param      | Type                | Description                                                                                                                                                                                                                                   |
| ---------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scheduleId | <code>int</code>    |                                                                                                                                                                                                                                               |
| payload    | <code>object</code> | {driverId, transactionGroupId, startTime, endTime, startDate} scheduleId (optional)(int) transactionGroupId (optional)(int) startTime (optional)(date_format:H:i) endTime (optional)(date_format:H:i) startDate (optional)(date_format:Y-m-d) |
| token      | <code>string</code> | {driverId, transactionGroupId, startTime, endTime, startDate}                                                                                                                                                                                 |

<a name="deleteDriverScheduleAsync"></a>

## deleteDriverScheduleAsync ⇒ <code>object</code>

deleteDriverScheduleAsync

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject
return value: boolean(To indicate delete successful or failed)
remarks: the API endpoint will return one of the following status:
404: Driver Schedule does not exists
204: Success with no content

| Param      | Type                |
| ---------- | ------------------- |
| scheduleId | <code>int</code>    |
| token      | <code>string</code> |

<a name="createDriverScheduleAsync"></a>

## createDriverScheduleAsync ⇒ <code>Object</code>

Add new driver time slot

**Kind**: global constant  
**Returns**: <code>Object</code> - Promise resolve/reject
If resolve, return value: boolean(To indicate update successful or failed)
remarks: the API endpoint will return one of the following status:
400: Validation Error
400: Driver Schedule with same values exists
200: Success

| Param   | Type                | Description                                                                                                                                                                                                                                      |
| ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| payload | <code>object</code> | {driverId, transactionGroupId, startTime, endTime, startDate} driverId (mandatory)(int) transactionGroupId (mandatory)(int) startTime (mandatory)(date_format:H:i) endTime (mandatory)(date_format:H:i) startDate (mandatory)(date_format:Y-m-d) |
| token   | <code>string</code> | resolve/reject                                                                                                                                                                                                                                   |

<a name="iterateDriverArrays"></a>

## iterateDriverArrays ⇒ <code>object</code>

Calculate Customer Driver Counts

**Kind**: global constant  
**Returns**: <code>object</code> - promise reject/resolve

| Param         | Type                | Description                                                                                                                                                              |
| ------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| drivers       | <code>object</code> |                                                                                                                                                                          |
| driverTypeIds | <code>array</code>  |                                                                                                                                                                          |
| counts        | <code>object</code> | #{driverTypeCounts, activeStatusCounts, totalStatusCounts} driverTypeCounts: (int) 10, activeStatusCounts: (object) {1: 0, 2: 1, 3: 0, 4: 2} totalStatusCounts: (int) 20 |
| value         | <code>int</code>    |                                                                                                                                                                          |

<a name="getActiveStatusCountsAndTotalCounts"></a>

## getActiveStatusCountsAndTotalCounts

Categories Customer Drivers for Count

**Kind**: global constant

| Param         | Type                | Description                                                                                                                                  |
| ------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| drivers       | <code>object</code> |                                                                                                                                              |
| driverTypeIds | <code>array</code>  | # [1,2,3]                                                                                                                                    |
| value         | <code>int</code>    | # actual filter value 2                                                                                                                      |
| counts        | <code>object</code> | This counts will be increased values Example driverTypeCounts: 10, activeStatusCounts: { 1: 10, 2: 10, 3: 10, 4: 10, } totalStatusCounts: 10 |
| key           | <code>string</code> | #iteration key                                                                                                                               |

<a name="categoriesCustomerDriversForCount"></a>

## categoriesCustomerDriversForCount ⇒ <code>object</code>

Categories Customer Drivers for Count

**Kind**: global constant  
**Returns**: <code>object</code> - drivers
Example Response
{
1: {1: [], 2: [], 3: [], 4: []},
2: {1: [], 2: [], 3: [], 4: []},
3: {1: [], 2: [], 3: [], 4: []},
};

| Param   | Type                |
| ------- | ------------------- |
| drivers | <code>object</code> |

<a name="categoriesCustomerDrivers"></a>

## categoriesCustomerDrivers ⇒ <code>object</code>

Categories Customer Drivers

**Kind**: global constant  
**Returns**: <code>object</code> - drivers
Example Response
{
1: [], 2: [], 3: [], 4: []
};

| Param   | Type                |
| ------- | ------------------- |
| drivers | <code>object</code> |

<a name="calculateCustomerDriverCounts"></a>

## calculateCustomerDriverCounts(data, driverTypeIds) ⇒ <code>object</code>

Calculate Customer Driver Counts

**Kind**: global function  
**Returns**: <code>object</code> - total count object of live driver data

| Param         | Type                |
| ------------- | ------------------- |
| data          | <code>object</code> |
| driverTypeIds | <code>array</code>  |
