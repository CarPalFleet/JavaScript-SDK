## Constants

<dl>
<dt><a href="#getRoutesAsync">getRoutesAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get Routes</p>
</dd>
<dt><a href="#storeRouteAsync">storeRouteAsync</a> ⇒ <code>object</code></dt>
<dd><p>Create Routes</p>
</dd>
<dt><a href="#removeRouteAsync">removeRouteAsync</a> ⇒ <code>object</code></dt>
<dd><p>Remove Route</p>
</dd>
<dt><a href="#createRouteLocationAsync">createRouteLocationAsync</a> ⇒ <code>Object</code></dt>
<dd><p>Create Route Location</p>
</dd>
<dt><a href="#updateRouteLocationAsync">updateRouteLocationAsync</a> ⇒ <code>Object</code></dt>
<dd><p>Update Route Location</p>
</dd>
<dt><a href="#removeRouteLocationsAsync">removeRouteLocationsAsync</a> ⇒ <code>Object</code></dt>
<dd><p>Remove route schedule from driver</p>
</dd>
<dt><a href="#getRouteSettingAsync">getRouteSettingAsync</a> ⇒ <code>Promise</code></dt>
<dd><p>Retrieving Route Setting for specific transaction group</p>
</dd>
<dt><a href="#getRouteSettingsAsync">getRouteSettingsAsync</a> ⇒ <code>Promise</code></dt>
<dd><p>Retrieving Route Settings</p>
</dd>
</dl>

<a name="getRoutesAsync"></a>

## getRoutesAsync ⇒ <code>object</code>

Get Routes

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param        | Type                | Description                                                                                                                                                                                                                                                         |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filterObject | <code>object</code> | # {pickupDate (mandatory), routeStatusIds, includeOrders, limit, offset} pickupDate (optional)(string) = '2018-02-28' routeStatusIds (optional)(int) = 1,2 (csv) includeOrders (optional)(bollean) = true/false limit = 20 (optional)(int) page = 0 (optional)(int) |
| token        | <code>string</code> |                                                                                                                                                                                                                                                                     |

<a name="storeRouteAsync"></a>

## storeRouteAsync ⇒ <code>object</code>

Create Routes

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param   | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| payload | <code>object</code> | pickupDate (mandatory) (string), driverId (optional) (int), routeSettings (optional) (json string), routeLocations (mandatory) (array), sequence (mandatory) (int), groupingLocationId (mandatory) (int) locationTypeId (mandatory) (int) routeCapacity (optional) (decimal) Example payload [ { "driverId": 2, "pickupDate": "2018-03-30", "routeSettings": "{}", "routeLocations": [ { "sequence": 1, "groupingLocationId": 1, "locationTypeId": 3, "routeCapacity": 10.5 } ] } ] |
| token   | <code>string</code> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

<a name="removeRouteAsync"></a>

## removeRouteAsync ⇒ <code>object</code>

Remove Route

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param    | Type                | Description  |
| -------- | ------------------- | ------------ |
| routeIds | <code>string</code> | # string csv |
| token    | <code>string</code> |              |

<a name="createRouteLocationAsync"></a>

## createRouteLocationAsync ⇒ <code>Object</code>

Create Route Location

**Kind**: global constant  
**Returns**: <code>Object</code> - Promise resolve/reject

| Param   | Type                | Description                                                                                                                                                                                                                                                                          |
| ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| routeId | <code>int</code>    |                                                                                                                                                                                                                                                                                      |
| payload | <code>array</code>  | [{sequence, groupingLocationId, locationTypeId}] sequence (mandatory)(int) groupingLocationId (optional)(int) eg. 1 locationTypeId (optional)(int) 2 for Delivery Location, 3 for Pickup Location Exaple payload [ { "sequence": 1, "groupingLocationId": 1, "locationTypeId": 3 } ] |
| token   | <code>string</code> |                                                                                                                                                                                                                                                                                      |

<a name="updateRouteLocationAsync"></a>

## updateRouteLocationAsync ⇒ <code>Object</code>

Update Route Location

**Kind**: global constant  
**Returns**: <code>Object</code> - Promise resolve/reject

| Param   | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                 |
| ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| routeId | <code>int</code>    |                                                                                                                                                                                                                                                                                                                                                                                             |
| payload | <code>array</code>  | Example of palyload [ { "routeLocationId": 4, "pickupWindowStart": "09:00", "pickupWindowEnd": "19:00" }, { "routeLocationId": 8, "deliveryWindowStart": "09:00", "deliveryWindowEnd": "12:00" } ] routeLocationId (mandatory)(int) pickupWindowStart (mandatory)(string) pickupWindowEnd (mandatory)(string) deliveryWindowStart (mandatory)(string) deliveryWindowEnd (mandatory)(string) |
| token   | <code>string</code> |                                                                                                                                                                                                                                                                                                                                                                                             |

<a name="removeRouteLocationsAsync"></a>

## removeRouteLocationsAsync ⇒ <code>Object</code>

Remove route schedule from driver

**Kind**: global constant  
**Returns**: <code>Object</code> - Promise resolve/reject
If resolve, return { data: true }

| Param            | Type                | Description     |
| ---------------- | ------------------- | --------------- |
| routeId          | <code>int</code>    |                 |
| routeLocationIds | <code>string</code> | # csv eg. 1,2,3 |
| token            | <code>string</code> |                 |

<a name="getRouteSettingAsync"></a>

## getRouteSettingAsync ⇒ <code>Promise</code>

Retrieving Route Setting for specific transaction group

**Kind**: global constant  
**Returns**: <code>Promise</code> - settingObject

| Param        | Type                | Description                                     |
| ------------ | ------------------- | ----------------------------------------------- |
| filterObject | <code>Object</code> | {identityId, productTypeId, transactionGroupId} |
| token        | <code>string</code> |                                                 |

<a name="getRouteSettingsAsync"></a>

## getRouteSettingsAsync ⇒ <code>Promise</code>

Retrieving Route Settings

**Kind**: global constant  
**Returns**: <code>Promise</code> - settingObject

| Param | Type                |
| ----- | ------------------- |
| token | <code>string</code> |
