<a name="sendLiveRouteDataAsync"></a>

## sendLiveRouteDataAsync ⇒ <code>object</code>

Send Live Data from driver app to Dynamodb

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param        | Type                | Description                                                                                                                                                                                                                                                                                                     |
| ------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| liveRouteObj | <code>object</code> | # {orderId, addressId, driverId, latitude, longitude, orderRouteType} orderId (mandatory)(string) = 1234 addressId (mandatory)(int) = 0 #pass 0 value if no addressId driverId (mandatory)(int) = 134 latitude = 1.344 (mandatory)(int) longitude = 102.33 (mandatory)(int) orderRouteType = 0 (mandatory)(int) |
| token        | <code>string</code> |                                                                                                                                                                                                                                                                                                                 |
