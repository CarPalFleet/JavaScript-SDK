## Constants

<dl>
<dt><a href="#getOrdersWithFiltersAsync">getOrdersWithFiltersAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get Order with filters for Dashboard</p>
</dd>
<dt><a href="#getOrderCountsAsync">getOrderCountsAsync</a> ⇒ <code>object</code></dt>
<dd><p>Retrieve All Order Counts</p>
</dd>
<dt><a href="#createDeliveryWindow">createDeliveryWindow</a> ⇒ <code>object</code></dt>
<dd><p>Create delivery window</p>
</dd>
<dt><a href="#getDeliveryWindows">getDeliveryWindows</a> ⇒ <code>object</code></dt>
<dd><p>Retrieve delivery window</p>
</dd>
<dt><a href="#fileUploadForOrderAsync">fileUploadForOrderAsync</a> ⇒ <code>object</code></dt>
<dd><p>Upload Excel file for orders</p>
</dd>
<dt><a href="#getUploadedOrderProgressionAsync">getUploadedOrderProgressionAsync</a> ⇒ <code>object</code></dt>
<dd><p>Check the progress of order file uplading process</p>
</dd>
<dt><a href="#getOrderAsync">getOrderAsync</a> ⇒ <code>object</code></dt>
<dd><p>Retrieve single order</p>
</dd>
<dt><a href="#getOrdersBasedOnSearchResult">getOrdersBasedOnSearchResult</a> ⇒ <code>object</code></dt>
<dd><p>Retrieve orders based on search result</p>
</dd>
<dt><a href="#getOrdersGroupByPickUpAddressAsync">getOrdersGroupByPickUpAddressAsync</a> ⇒ <code>object</code></dt>
<dd><p>Retrieve All Order Counts</p>
</dd>
<dt><a href="#mergeOldAndNewOrderRecords">mergeOldAndNewOrderRecords</a> ⇒ <code>object</code></dt>
<dd><p>Merge Order Records</p>
</dd>
<dt><a href="#concatDuplicateObjects">concatDuplicateObjects</a></dt>
<dd><p>Merge Two Objects which has the same id</p>
</dd>
<dt><a href="#findDuplicateIndexes">findDuplicateIndexes</a> ⇒ <code>object</code></dt>
<dd><p>Find duplicate indexes</p>
</dd>
<dt><a href="#getRemainingOrdersAsync">getRemainingOrdersAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get Remanining Orders</p>
</dd>
<dt><a href="#getOrdersAsync">getOrdersAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get orders</p>
</dd>
<dt><a href="#getErrorOrderContentsAsync">getErrorOrderContentsAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get upload order&#39;s error contents from Dynamodb</p>
</dd>
<dt><a href="#updateAndTruncateOrderErrorsAsync">updateAndTruncateOrderErrorsAsync</a> ⇒ <code>promise</code></dt>
<dd><p>Fixed error records in RDS
  and Truncate existing error records from Dynamodb
This function call 2 API endpoints one after another
Call editOrdersAsync to edit the error grouping locations
if it&#39;s success, call removeOrderErrorRecordsAsync to truncate records from Dynamodb
if both API call is success, it will return isUpdatedOrder and isTruncateErrorReords as true</p>
</dd>
<dt><a href="#removeErrorOrderRecordAsync">removeErrorOrderRecordAsync</a> ⇒ <code>promise</code></dt>
<dd><p>Remove Order Error Record (single record) from Dynamodb</p>
</dd>
<dt><a href="#removeOrderErrorRecordsAsync">removeOrderErrorRecordsAsync</a> ⇒ <code>promise</code></dt>
<dd><p>Remove Order Error Records (multiple records) from Dynamodb</p>
</dd>
<dt><a href="#getUniquePickupAddressesAsync">getUniquePickupAddressesAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get pickup group</p>
</dd>
<dt><a href="#createOrderAsync">createOrderAsync</a> ⇒ <code>object</code></dt>
<dd><p>Create single order</p>
</dd>
<dt><a href="#editOrderAsync">editOrderAsync</a> ⇒ <code>object</code></dt>
<dd><p>Edit single order</p>
</dd>
<dt><a href="#editOrdersAsync">editOrdersAsync</a> ⇒ <code>object</code></dt>
<dd><p>Edit multiple orders</p>
</dd>
<dt><a href="#deleteOrderAsync">deleteOrderAsync</a> ⇒ <code>object</code></dt>
<dd><p>Delete single order</p>
</dd>
<dt><a href="#deleteOrdersAsync">deleteOrdersAsync</a> ⇒ <code>object</code></dt>
<dd><p>Delete Multiple Orders</p>
</dd>
<dt><a href="#cancelBatchFileProcessAsync">cancelBatchFileProcessAsync</a> ⇒ <code>object</code></dt>
<dd><p>API isn&#39;t ready yet
Cancel Batch File Process</p>
</dd>
<dt><a href="#getUpdatedJobLiveData">getUpdatedJobLiveData</a> ⇒ <code>object</code></dt>
<dd><p>Get Updated Job Live Data for Dashboard</p>
</dd>
<dt><a href="#categoriesCustomerOrders">categoriesCustomerOrders</a> ⇒ <code>object</code></dt>
<dd><p>Categories Customer Orders</p>
</dd>
<dt><a href="#groupLocations">groupLocations</a> ⇒ <code>object</code></dt>
<dd><p>Group Locations with error contents</p>
</dd>
<dt><a href="#mergeLocationDataWithErrors">mergeLocationDataWithErrors</a> ⇒ <code>array</code></dt>
<dd><p>Merge Location data with Errors</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#calculateCustomerOrderCounts">calculateCustomerOrderCounts(data)</a> ⇒ <code>object</code></dt>
<dd><p>Calculate Customer Order Counts</p>
</dd>
<dt><a href="#groupLocationByPickUpAddress">groupLocationByPickUpAddress(groups, location, errorContents)</a> ⇒ <code>object</code></dt>
<dd><p>Group Order by Pickup Address</p>
</dd>
</dl>

<a name="getOrdersWithFiltersAsync"></a>

## getOrdersWithFiltersAsync ⇒ <code>object</code>

Get Order with filters for Dashboard

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param            | Type                 | Description                                                                                                                                                                                |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| filterObject     | <code>object</code>  | # {pickupDate (mandatory), routeStatusIds, includeOrders, limit, offset}                                                                                                                   |
| customerId       | <code>int</code>     | # {pickupDate (mandatory), routeStatusIds, includeOrders, limit, offset}                                                                                                                   |
| token            | <code>string</code>  | # {pickupDate (mandatory), routeStatusIds, includeOrders, limit, offset}                                                                                                                   |
| validationStatus | <code>boolean</code> | pickupDate (optional)(string) = '2018-02-28' routeStatusIds (optional)(int) = 1,2 (csv) includeOrders (optional)(bollean) = true/false limit = 20 (optional)(int) page = 0 (optional)(int) |

<a name="getOrderCountsAsync"></a>

## getOrderCountsAsync ⇒ <code>object</code>

Retrieve All Order Counts

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param        | Type                | Description                                                                                                                      |
| ------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| filterObject | <code>object</code> | # {pickupDate, limit, offset} pickupDate (optional)(string) = '2018-02-28' limit = 20 (optional)(int) offset = 0 (optional)(int) |
| customerId   | <code>int</code>    |                                                                                                                                  |
| token        | <code>string</code> |                                                                                                                                  |

<a name="createDeliveryWindow"></a>

## createDeliveryWindow ⇒ <code>object</code>

Create delivery window

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param   | Type                | Description                                                                                                                                                                                                                                                                                                                                               |
| ------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| payload | <code>object</code> | {customerId, identityId, productTypeId, transactionGroupId, displayName, startTime, endTime} customerId (optional)(string) = '2018-02-28' identityId (optional)(int) = 20 productTypeId (optional)(int) = 20 transactionGroupId (optional)(int) = 20 displayName (optional)(string) = 20 startTime (optional)(string) = 20 endTime (optional)(string) = 0 |
| token   | <code>string</code> |                                                                                                                                                                                                                                                                                                                                                           |

<a name="getDeliveryWindows"></a>

## getDeliveryWindows ⇒ <code>object</code>

Retrieve delivery window

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param               | Type                |
| ------------------- | ------------------- |
| customerId          | <code>int</code>    |
| identityId          | <code>int</code>    |
| productTypeId       | <code>int</code>    |
| transactionGroupIds | <code>array</code>  |
| token               | <code>string</code> |

<a name="fileUploadForOrderAsync"></a>

## fileUploadForOrderAsync ⇒ <code>object</code>

Upload Excel file for orders

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param      | Type                |
| ---------- | ------------------- |
| fileObject | <code>object</code> |
| token      | <code>string</code> |

<a name="getUploadedOrderProgressionAsync"></a>

## getUploadedOrderProgressionAsync ⇒ <code>object</code>

Check the progress of order file uplading process

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param      | Type                |
| ---------- | ------------------- |
| customerId | <code>int</code>    |
| token      | <code>string</code> |

<a name="getOrderAsync"></a>

## getOrderAsync ⇒ <code>object</code>

Retrieve single order

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param              | Type                |
| ------------------ | ------------------- |
| groupingLocationId | <code>object</code> |
| token              | <code>string</code> |

<a name="getOrdersBasedOnSearchResult"></a>

## getOrdersBasedOnSearchResult ⇒ <code>object</code>

Retrieve orders based on search result

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param        | Type                | Description                                                                                                                    |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| customerId   | <code>int</code>    |                                                                                                                                |
| filterObject | <code>object</code> | {pickupDate, limit, offset} pickupDate (optional)(string) = '2018-02-28' limit = 20 (optional)(int) offset = 0 (optional)(int) |
| searchResult | <code>int</code>    |                                                                                                                                |
| token        | <code>string</code> |                                                                                                                                |

<a name="getOrdersGroupByPickUpAddressAsync"></a>

## getOrdersGroupByPickUpAddressAsync ⇒ <code>object</code>

Retrieve All Order Counts

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param        | Type                | Description                                                                                                                      |
| ------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| filterObject | <code>object</code> | # {pickupDate, limit, offset} pickupDate (optional)(string) = '2018-02-28' limit = 20 (optional)(int) offset = 0 (optional)(int) |
| customerId   | <code>int</code>    |                                                                                                                                  |
| token        | <code>string</code> |                                                                                                                                  |

<a name="mergeOldAndNewOrderRecords"></a>

## mergeOldAndNewOrderRecords ⇒ <code>object</code>

Merge Order Records

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject
Response merged order object

| Param     | Type               |
| --------- | ------------------ |
| oldValues | <code>array</code> |
| newValues | <code>array</code> |

<a name="concatDuplicateObjects"></a>

## concatDuplicateObjects

Merge Two Objects which has the same id

**Kind**: global constant

| Param     | Type                |
| --------- | ------------------- |
| oldValues | <code>object</code> |
| newValues | <code>object</code> |
| data      | <code>object</code> |

<a name="findDuplicateIndexes"></a>

## findDuplicateIndexes ⇒ <code>object</code>

Find duplicate indexes

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param       | Type                | Description                              |
| ----------- | ------------------- | ---------------------------------------- |
| newValues   | <code>object</code> |                                          |
| accumulator | <code>array</code>  | Example [{oldIndex: i, newIndex: index}] |
| oldValues   | <code>object</code> |                                          |
| i           | <code>int</code>    | # iterator                               |

<a name="getRemainingOrdersAsync"></a>

## getRemainingOrdersAsync ⇒ <code>object</code>

Get Remanining Orders

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param        | Type                | Description                                                                                                                                                                                                                                                                                                                                                              |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| filterObject | <code>object</code> | # {statusIds, pickupDate (mandatory), withOrder, withDriver, withRoute, sort, limit, offset} StatusIds = 1/2/3/4. 1 for 'pending', 2 for 'validated', 3 for 'grouped', 4 for 'failed' pickupDate (mandatory) = '2018-02-28' withOrder (optional) = 1 OR 0 driverId (optional) = 1234 sort (optional) = fieldName,asc OR desc limit = 20 (optional) offset = 0 (optional) |
| token        | <code>string</code> |                                                                                                                                                                                                                                                                                                                                                                          |

<a name="getOrdersAsync"></a>

## getOrdersAsync ⇒ <code>object</code>

Get orders

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param        | Type                | Description                                                                                                                                |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| filterObject | <code>object</code> | # {pickupDate (mandatory), limit, offset} pickupDate (optional)(string) = '2018-02-28' limit = 20 (optional)(int) page = 0 (optional)(int) |
| token        | <code>string</code> |                                                                                                                                            |

<a name="getErrorOrderContentsAsync"></a>

## getErrorOrderContentsAsync ⇒ <code>object</code>

Get upload order's error contents from Dynamodb

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param      | Type                | Description                                                             |
| ---------- | ------------------- | ----------------------------------------------------------------------- |
| pickupDate | <code>object</code> | # {pickupDate (mandatory)} pickupDate (optional)(string) = '2018-02-28' |
| customerId | <code>int</code>    |                                                                         |
| token      | <code>string</code> |                                                                         |

<a name="updateAndTruncateOrderErrorsAsync"></a>

## updateAndTruncateOrderErrorsAsync ⇒ <code>promise</code>

Fixed error records in RDS
and Truncate existing error records from Dynamodb
This function call 2 API endpoints one after another
Call editOrdersAsync to edit the error grouping locations
if it's success, call removeOrderErrorRecordsAsync to truncate records from Dynamodb
if both API call is success, it will return isUpdatedOrder and isTruncateErrorReords as true

**Kind**: global constant  
**Returns**: <code>promise</code> - reject/resolve
In resolve, it will return object. Example. {data, isUpdatedOrder, isTruncateErrorReords}
data = response object from edit endpoint
isUpdatedOrder = true means successfullly edited the orders
isTruncateErrorReords = true means successfully truncated errors

| Param            | Type                |
| ---------------- | ------------------- |
| errorIds         | <code>array</code>  |
| locationDataList | <code>array</code>  |
| token            | <code>string</code> |

<a name="removeErrorOrderRecordAsync"></a>

## removeErrorOrderRecordAsync ⇒ <code>promise</code>

Remove Order Error Record (single record) from Dynamodb

**Kind**: global constant  
**Returns**: <code>promise</code> - reject/resolve
if resolve, will return {data: true}

| Param              | Type                |
| ------------------ | ------------------- |
| groupingLocationId | <code>int</code>    |
| token              | <code>string</code> |

<a name="removeOrderErrorRecordsAsync"></a>

## removeOrderErrorRecordsAsync ⇒ <code>promise</code>

Remove Order Error Records (multiple records) from Dynamodb

**Kind**: global constant  
**Returns**: <code>promise</code> - reject/resolve
if resolve, will return {data: true}

| Param    | Type                | Description                                      |
| -------- | ------------------- | ------------------------------------------------ |
| errorIds | <code>array</code>  | Example ['56c719b7-93aa-420a-b9b1-140c4e03397b'] |
| token    | <code>string</code> |                                                  |

<a name="getUniquePickupAddressesAsync"></a>

## getUniquePickupAddressesAsync ⇒ <code>object</code>

Get pickup group

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param        | Type                | Description                                                                                                      |
| ------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| filterObject | <code>object</code> | # {pickupDate (mandatory), withOrder} pickupDate (optional)(string) = '2018-02-28' withOrder (optional)(int) = 0 |
| token        | <code>string</code> |                                                                                                                  |

<a name="createOrderAsync"></a>

## createOrderAsync ⇒ <code>object</code>

Create single order

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param          | Type                | Description                                                                                                                                                                                                                     |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| locationObject | <code>object</code> | { pickupLocationAddress: '22 Gim moh road', deliveryAddress: 'Holland Close', pickupDate: '28-02-2018', pickupTimeWindow: '14:35-16:00', deliveryDate: '28-02-2018', deliveryTimeWindow: '17:00-17:00', driverEmailId: null, }, |
| token          | <code>string</code> |                                                                                                                                                                                                                                 |

<a name="editOrderAsync"></a>

## editOrderAsync ⇒ <code>object</code>

Edit single order

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param              | Type                | Description                                                                                                                                                                                                                     |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| groupingLocationId | <code>int</code>    |                                                                                                                                                                                                                                 |
| locationObject     | <code>object</code> | { pickupLocationAddress: '22 Gim moh road', deliveryAddress: 'Holland Close', pickupDate: '28-02-2018', pickupTimeWindow: '14:35-16:00', deliveryDate: '28-02-2018', deliveryTimeWindow: '17:00-17:00', driverEmailId: null, }, |
| token              | <code>string</code> |                                                                                                                                                                                                                                 |

<a name="editOrdersAsync"></a>

## editOrdersAsync ⇒ <code>object</code>

Edit multiple orders

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param            | Type                | Description                                                                                                                                                                                                                                                                       |
| ---------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| locationDataList | <code>array</code>  | [ { groupingLocationId: 27318, locationData: { pickupLocationAddress: '22 Gim moh road', deliveryAddress: 'Holland Close', pickupDate: '28-02-2018', pickupTimeWindow: '14:35-16:00', deliveryDate: '28-02-2018', deliveryTimeWindow: '17:00-17:00', driverEmailId: null, }, }, ] |
| token            | <code>string</code> |                                                                                                                                                                                                                                                                                   |

<a name="deleteOrderAsync"></a>

## deleteOrderAsync ⇒ <code>object</code>

Delete single order

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject
return {data: true} if deleting is success

| Param              | Type                |
| ------------------ | ------------------- |
| groupingLocationId | <code>array</code>  |
| token              | <code>string</code> |

<a name="deleteOrdersAsync"></a>

## deleteOrdersAsync ⇒ <code>object</code>

Delete Multiple Orders

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject
return {data: true} if deleting is success

| Param               | Type                |
| ------------------- | ------------------- |
| groupingLocationIds | <code>array</code>  |
| token               | <code>string</code> |

<a name="cancelBatchFileProcessAsync"></a>

## cancelBatchFileProcessAsync ⇒ <code>object</code>

API isn't ready yet
Cancel Batch File Process

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param   | Type                |
| ------- | ------------------- |
| batchId | <code>int</code>    |
| token   | <code>string</code> |

<a name="getUpdatedJobLiveData"></a>

## getUpdatedJobLiveData ⇒ <code>object</code>

Get Updated Job Live Data for Dashboard

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param            | Type                | Description                                                |
| ---------------- | ------------------- | ---------------------------------------------------------- |
| originalJobDatum | <code>object</code> |                                                            |
| pubSubPayload    | <code>object</code> |                                                            |
| filterObject     | <code>string</code> | {pickupDate, routeStatusIds, includeOrders, limit, offset} |

<a name="categoriesCustomerOrders"></a>

## categoriesCustomerOrders ⇒ <code>object</code>

Categories Customer Orders

**Kind**: global constant  
**Returns**: <code>object</code> - data

| Param  | Type                |
| ------ | ------------------- |
| orders | <code>object</code> |

<a name="groupLocations"></a>

## groupLocations ⇒ <code>object</code>

Group Locations with error contents

**Kind**: global constant  
**Returns**: <code>object</code> - { data: [0], groupId: [2]}

| Param         | Type                |
| ------------- | ------------------- |
| locations     | <code>object</code> |
| errorContents | <code>object</code> |

<a name="mergeLocationDataWithErrors"></a>

## mergeLocationDataWithErrors ⇒ <code>array</code>

Merge Location data with Errors

**Kind**: global constant  
**Returns**: <code>array</code> - errorList
if there's no error for this location, it will response empty array.

| Param         | Type                | Description       |
| ------------- | ------------------- | ----------------- |
| errorContents | <code>object</code> | # Error object    |
| location      | <code>object</code> | # location object |

<a name="calculateCustomerOrderCounts"></a>

## calculateCustomerOrderCounts(data) ⇒ <code>object</code>

Calculate Customer Order Counts

**Kind**: global function  
**Returns**: <code>object</code> - data # retrun count of data object

| Param | Type                |
| ----- | ------------------- |
| data  | <code>object</code> |

<a name="groupLocationByPickUpAddress"></a>

## groupLocationByPickUpAddress(groups, location, errorContents) ⇒ <code>object</code>

Group Order by Pickup Address

**Kind**: global function  
**Returns**: <code>object</code> - groupped addresses

| Param         | Type                | Description              |
| ------------- | ------------------- | ------------------------ |
| groups        | <code>object</code> |                          |
| location      | <code>object</code> |                          |
| errorContents | <code>object</code> | The errorContent number. |
