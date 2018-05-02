## Constants

<dl>
<dt><a href="#convertObjectIntoURLString">convertObjectIntoURLString</a> ⇒ <code>string</code></dt>
<dd><p>Convert Object into string as URL params
Example: &amp;limit=10&amp;offset=20</p>
</dd>
<dt><a href="#apiResponseErrorHandler">apiResponseErrorHandler</a> ⇒ <code>object</code></dt>
<dd><p>Handle API Error</p>
</dd>
<dt><a href="#rejectPromise">rejectPromise</a> ⇒ <code>object</code></dt>
<dd><p>Response Promise Reject
It is for normal function rejection (not ajax call) to front-end</p>
</dd>
<dt><a href="#getFormattedErrorArray">getFormattedErrorArray</a> ⇒ <code>array</code></dt>
<dd><p>Format error messages into key value objects inside of array</p>
</dd>
<dt><a href="#convertObjectIntoKeyValueArray">convertObjectIntoKeyValueArray</a> ⇒ <code>array</code></dt>
<dd><p>Convert Object into key/value array.
ES6 Object.entries method will convert object into key, value array.</p>
</dd>
<dt><a href="#arrayReduce">arrayReduce</a> ⇒ <code>array</code></dt>
<dd><p>Iterate the array and format by using ES 6 reduce method
Javascript ES Object.entries method will convert object into key, value array.</p>
</dd>
<dt><a href="#arrayMap">arrayMap</a> ⇒ <code>array</code></dt>
<dd><p>Iterate the array and format by using ES 6 reduce method
Javascript ES Object.entries method will convert object into key, value array.</p>
</dd>
<dt><a href="#pushKeyAndMessageToArray">pushKeyAndMessageToArray</a> ⇒ <code>array</code></dt>
<dd><p>Store key/value element into array</p>
</dd>
<dt><a href="#getCSVStringFromArrayObject">getCSVStringFromArrayObject</a> ⇒ <code>string</code></dt>
<dd><p>Manipulate the id of Array Object into CSV string</p>
</dd>
<dt><a href="#hasSameObjectId">hasSameObjectId</a> ⇒ <code>boolean</code></dt>
<dd><p>Find the the same id in the object</p>
</dd>
</dl>

<a name="convertObjectIntoURLString"></a>

## convertObjectIntoURLString ⇒ <code>string</code>

Convert Object into string as URL params
Example: &limit=10&offset=20

**Kind**: global constant  
**Returns**: <code>string</code> - urlString

| Param   | Type                |
| ------- | ------------------- |
| filters | <code>object</code> |

<a name="apiResponseErrorHandler"></a>

## apiResponseErrorHandler ⇒ <code>object</code>

Handle API Error

**Kind**: global constant  
**Returns**: <code>object</code> - Promise reject with statusCode and statusText

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| e     | <code>object</code> | #error object |

<a name="rejectPromise"></a>

## rejectPromise ⇒ <code>object</code>

Response Promise Reject
It is for normal function rejection (not ajax call) to front-end

**Kind**: global constant  
**Returns**: <code>object</code> - Promise reject with statusCode and statusText

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| e     | <code>object</code> | #error object |

<a name="getFormattedErrorArray"></a>

## getFormattedErrorArray ⇒ <code>array</code>

Format error messages into key value objects inside of array

**Kind**: global constant  
**Returns**: <code>array</code> - error array
If errorMessage is string,
return error string value as an element of array and key will be null value
Other wise, convert error objectes into key/value elements of an array.

| Param        | Type                | Description   |
| ------------ | ------------------- | ------------- |
| errorMessage | <code>object</code> | #error object |

<a name="convertObjectIntoKeyValueArray"></a>

## convertObjectIntoKeyValueArray ⇒ <code>array</code>

Convert Object into key/value array.
ES6 Object.entries method will convert object into key, value array.

**Kind**: global constant  
**Returns**: <code>array</code> - [key, value]

| Param  | Type                |
| ------ | ------------------- |
| object | <code>object</code> |

<a name="arrayReduce"></a>

## arrayReduce ⇒ <code>array</code>

Iterate the array and format by using ES 6 reduce method
Javascript ES Object.entries method will convert object into key, value array.

**Kind**: global constant  
**Returns**: <code>array</code> - reduced data array

| Param       | Type                | Description         |
| ----------- | ------------------- | ------------------- |
| array       | <code>object</code> |                     |
| cb          | <code>object</code> | #call back function |
| accumulator | <code>array</code>  |                     |

<a name="arrayMap"></a>

## arrayMap ⇒ <code>array</code>

Iterate the array and format by using ES 6 reduce method
Javascript ES Object.entries method will convert object into key, value array.

**Kind**: global constant  
**Returns**: <code>array</code> - reduced data array

| Param       | Type                | Description         |
| ----------- | ------------------- | ------------------- |
| array       | <code>object</code> |                     |
| cb          | <code>object</code> | #call back function |
| accumulator | <code>array</code>  |                     |

<a name="pushKeyAndMessageToArray"></a>

## pushKeyAndMessageToArray ⇒ <code>array</code>

Store key/value element into array

**Kind**: global constant  
**Returns**: <code>array</code> - new accumulator array

| Param    | Type               | Description   |
| -------- | ------------------ | ------------- |
| newArray | <code>array</code> | #error object |
| }        | <code>array</code> | [key, value]  |

<a name="getCSVStringFromArrayObject"></a>

## getCSVStringFromArrayObject ⇒ <code>string</code>

Manipulate the id of Array Object into CSV string

**Kind**: global constant  
**Returns**: <code>string</code> - comma seperated value string

| Param     | Type                |
| --------- | ------------------- |
| array     | <code>object</code> |
| fieldName | <code>object</code> |

<a name="hasSameObjectId"></a>

## hasSameObjectId ⇒ <code>boolean</code>

Find the the same id in the object

**Kind**: global constant  
**Returns**: <code>boolean</code> - true/falsea

| Param | Type               |
| ----- | ------------------ |
| a     | <code>array</code> |
| b     | <code>array</code> |
