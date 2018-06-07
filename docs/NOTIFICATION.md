## Constants

<dl>
<dt><a href="#getNotificationsAsync">getNotificationsAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get Notification</p>
</dd>
<dt><a href="#deleteNotificationAsync">deleteNotificationAsync</a> ⇒ <code>object</code></dt>
<dd><p>Delete Notification</p>
</dd>
</dl>

<a name="getNotificationsAsync"></a>

## getNotificationsAsync ⇒ <code>object</code>

Get Notification

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param      | Type                 | Description                                     |
| ---------- | -------------------- | ----------------------------------------------- |
| all        | <code>boolean</code> | true/false true mean retrieve all notifications |
| customerId | <code>string</code>  |                                                 |
| token      | <code>string</code>  |                                                 |

<a name="deleteNotificationAsync"></a>

## deleteNotificationAsync ⇒ <code>object</code>

Delete Notification

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param          | Type                |
| -------------- | ------------------- |
| notificationId | <code>int</code>    |
| customerId     | <code>string</code> |
| token          | <code>string</code> |
