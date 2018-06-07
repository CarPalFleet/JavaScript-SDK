## Constants

<dl>
<dt><a href="#getCustomerPreferenceSettingsAsync">getCustomerPreferenceSettingsAsync</a> ⇒ <code>object</code></dt>
<dd><p>Retriving whiteLabel (Logo and Background)
Return transaction customer&#39;s logo and Background if it is existed in database</p>
</dd>
<dt><a href="#getCustomerSettingsAsync">getCustomerSettingsAsync</a> ⇒ <code>object</code></dt>
<dd><p>Retriving Customer&#39;s settings
There&#39;re 3 setting types in the setting table</p>
<ol>
<li>routing, 2. my-order, 3. driver-list
In routing type, it includes customer time line setting (15 min, 30 min, 45 min etc.)
Retrieve table settings from my-order type OR driver-list.</li>
</ol>
</dd>
</dl>

<a name="getCustomerPreferenceSettingsAsync"></a>

## getCustomerPreferenceSettingsAsync ⇒ <code>object</code>

Retriving whiteLabel (Logo and Background)
Return transaction customer's logo and Background if it is existed in database

**Kind**: global constant  
**Returns**: <code>object</code> - promise (resolve/reject)

| Param  | Type                 | Description                      |
| ------ | -------------------- | -------------------------------- |
| domain | <code>integer</code> | # customer's webside domain name |
| token  | <code>string</code>  |                                  |

<a name="getCustomerSettingsAsync"></a>

## getCustomerSettingsAsync ⇒ <code>object</code>

Retriving Customer's settings
There're 3 setting types in the setting table

1.  routing, 2. my-order, 3. driver-list
    In routing type, it includes customer time line setting (15 min, 30 min, 45 min etc.)
    Retrieve table settings from my-order type OR driver-list.

**Kind**: global constant  
**Returns**: <code>object</code> - promise (resolve/reject)

| Param      | Type                 | Description                      |
| ---------- | -------------------- | -------------------------------- |
| customerId | <code>integer</code> |                                  |
| type       | <code>string</code>  | # routing, my-order, driver-list |
| token      | <code>string</code>  |                                  |
