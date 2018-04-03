## Constants

<dl>
<dt><a href="#exportFileAsync">exportFileAsync</a> ⇒ <code>object</code></dt>
<dd><p>Export File</p>
</dd>
<dt><a href="#getExportURL">getExportURL</a> ⇒ <code>string</code></dt>
<dd><p>Get export endpoint url</p>
</dd>
</dl>

<a name="exportFileAsync"></a>

## exportFileAsync ⇒ <code>object</code>

Export File

**Kind**: global constant  
**Returns**: <code>object</code> - promist (reject/resolve)

| Param   | Type                | Description                                                                                                                            |
| ------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| type    | <code>string</code> | (mandatory) # driver-list or routing                                                                                                   |
| payload | <code>string</code> | {recipientEmail, pickupDate} recipientEmail (mandatory) (string) pickupDate (optional) (string) #Pickupdate is need if type is routing |
| token   | <code>string</code> |                                                                                                                                        |

<a name="getExportURL"></a>

## getExportURL ⇒ <code>string</code>

Get export endpoint url

**Kind**: global constant  
**Returns**: <code>string</code> - url

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| type  | <code>string</code> | (mandatory) |
