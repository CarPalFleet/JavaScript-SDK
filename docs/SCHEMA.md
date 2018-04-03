## Constants

<dl>
<dt><a href="#getSchemaAsync">getSchemaAsync</a> ⇒ <code>object</code></dt>
<dd><p>Retrieve Schema</p>
</dd>
<dt><a href="#validateSchema">validateSchema</a> ⇒ <code>boolean</code></dt>
<dd><p>Validate Schema
Example: &amp;limit=10&amp;offset=20</p>
</dd>
</dl>

<a name="getSchemaAsync"></a>

## getSchemaAsync ⇒ <code>object</code>

Retrieve Schema

**Kind**: global constant  
**Returns**: <code>object</code> - Promise reject with statusCode and statusText

| Param      | Type                |
| ---------- | ------------------- |
| service    | <code>object</code> |
| schemaName | <code>string</code> |

<a name="validateSchema"></a>

## validateSchema ⇒ <code>boolean</code>

Validate Schema
Example: &limit=10&offset=20

**Kind**: global constant  
**Returns**: <code>boolean</code> - true/false

| Param   | Type                |
| ------- | ------------------- |
| schema  | <code>object</code> |
| payload | <code>string</code> |
