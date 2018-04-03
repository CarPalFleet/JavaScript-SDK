## Constants

<dl>
<dt><a href="#snakeToCamel">snakeToCamel</a> ⇒ <code>Object</code> | <code>String</code></dt>
<dd></dd>
<dt><a href="#camelToSnake">camelToSnake</a> ⇒ <code>Object</code> | <code>String</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#snakelize">snakelize(key)</a> ⇒ <code>string</code></dt>
<dd><p>snakelize a string formed in underscore</p>
</dd>
<dt><a href="#camelize">camelize(key)</a> ⇒ <code>string</code></dt>
<dd><p>camelize a string formed in underscore</p>
</dd>
<dt><a href="#processKeys">processKeys(obj, processer, depth)</a> ⇒ <code>int</code></dt>
<dd><p>camelize/snakelize keys of an object
depth to which level of keys should it process</p>
</dd>
</dl>

<a name="snakeToCamel"></a>

## snakeToCamel ⇒ <code>Object</code> \| <code>String</code>

**Kind**: global constant  
**Returns**: <code>Object</code> \| <code>String</code> - string or keys of object are named in form of camel case

| Param | Type                                       | Description                                         |
| ----- | ------------------------------------------ | --------------------------------------------------- |
| data  | <code>Object</code> \| <code>String</code> | string or keys of object are named in form of snake |
| depth | <code>number</code>                        | to which level of keys should it process            |

<a name="camelToSnake"></a>

## camelToSnake ⇒ <code>Object</code> \| <code>String</code>

**Kind**: global constant  
**Returns**: <code>Object</code> \| <code>String</code> - string or keys of object are named in form of snake

| Param | Type                                       | Description                                              |
| ----- | ------------------------------------------ | -------------------------------------------------------- |
| data  | <code>Object</code> \| <code>String</code> | string or keys of object are named in form of camel case |
| depth | <code>number</code>                        | to which level of keys should it process                 |

<a name="snakelize"></a>

## snakelize(key) ⇒ <code>string</code>

snakelize a string formed in underscore

**Kind**: global function  
**Returns**: <code>string</code> - key

| Param | Type                    | Description      |
| ----- | ----------------------- | ---------------- |
| key   | <code>int/string</code> | The first param. |

<a name="camelize"></a>

## camelize(key) ⇒ <code>string</code>

camelize a string formed in underscore

**Kind**: global function  
**Returns**: <code>string</code> - key

| Param | Type                    | Description       |
| ----- | ----------------------- | ----------------- |
| key   | <code>int/string</code> | The frist number. |

<a name="processKeys"></a>

## processKeys(obj, processer, depth) ⇒ <code>int</code>

camelize/snakelize keys of an object
depth to which level of keys should it process

**Kind**: global function  
**Returns**: <code>int</code> - result

| Param     | Type             |
| --------- | ---------------- |
| obj       | <code>int</code> |
| processer | <code>int</code> |
| depth     | <code>int</code> |
