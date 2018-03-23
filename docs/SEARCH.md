## Constants

<dl>
<dt><a href="#searchAsync">searchAsync</a> ⇒ <code>object</code></dt>
<dd><p>Elastic Search</p>
</dd>
<dt><a href="#generalSearch">generalSearch</a> ⇒ <code>object</code></dt>
<dd><p>General Search</p>
</dd>
</dl>

<a name="searchAsync"></a>

## searchAsync ⇒ <code>object</code>

Elastic Search

**Kind**: global constant  
**Returns**: <code>object</code> - Promise (resolve/reject)

| Param     | Type                |
| --------- | ------------------- |
| keyword   | <code>string</code> |
| scope     | <code>object</code> |
| fuzzy     | <code>int</code>    |
| fuzziness | <code>int</code>    |
| token     | <code>string</code> |

<a name="generalSearch"></a>

## generalSearch ⇒ <code>object</code>

General Search

**Kind**: global constant  
**Returns**: <code>object</code> - response

| Param      | Type                 | Description                                                                                                                                                                                                    |
| ---------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| customerId | <code>int</code>     |                                                                                                                                                                                                                |
| fuzzy      | <code>boolean</code> |                                                                                                                                                                                                                |
| fuzziness  | <code>int</code>     |                                                                                                                                                                                                                |
| keywords   | <code>string</code>  |                                                                                                                                                                                                                |
| scopes     | <code>object</code>  | There are 3 scopes # drivers, jobs, orders. Can search any of these scope Example of scopes object scopes = { "drivers" : ["driverId","driverName"], "jobs" : ["orderId"], "orders" : ["groupingLocationId"] } |
| pickupDate | <code>string</code>  | (optional) # yyyy-mm-dd                                                                                                                                                                                        |
| token      | <code>string</code>  |                                                                                                                                                                                                                |
