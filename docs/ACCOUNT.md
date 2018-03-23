## Constants

<dl>
<dt><a href="#resetPasswordRequestAsync">resetPasswordRequestAsync</a> ⇒ <code>object</code></dt>
<dd><p>Request reset password</p>
</dd>
<dt><a href="#resetPasswordAsync">resetPasswordAsync</a> ⇒ <code>object</code></dt>
<dd><p>Reset password with valid refresh token</p>
</dd>
<dt><a href="#validateResetPasswordTokenAsync">validateResetPasswordTokenAsync</a> ⇒ <code>object</code></dt>
<dd><p>Validate Reset Password Token</p>
</dd>
<dt><a href="#getDriverJobsAsync">getDriverJobsAsync</a> ⇒ <code>object</code></dt>
<dd><p>Retrieve Driver&#39;s jobs for driver app
Old code for driver app (Should move to carpal driver sdk)</p>
</dd>
<dt><a href="#getDriverLegsAsync">getDriverLegsAsync</a> ⇒ <code>object</code></dt>
<dd><p>Retrieve Driver&#39;s legs route for driver app
Old code for driver app (Should move to carpal driver sdk)</p>
</dd>
</dl>

<a name="resetPasswordRequestAsync"></a>

## resetPasswordRequestAsync ⇒ <code>object</code>

Request reset password

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param | Type                |
| ----- | ------------------- |
| email | <code>string</code> |

<a name="resetPasswordAsync"></a>

## resetPasswordAsync ⇒ <code>object</code>

Reset password with valid refresh token

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param           | Type                |
| --------------- | ------------------- |
| token           | <code>string</code> |
| email           | <code>string</code> |
| password        | <code>string</code> |
| confirmPassword | <code>string</code> |

<a name="validateResetPasswordTokenAsync"></a>

## validateResetPasswordTokenAsync ⇒ <code>object</code>

Validate Reset Password Token

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param | Type                |
| ----- | ------------------- |
| token | <code>string</code> |

<a name="getDriverJobsAsync"></a>

## getDriverJobsAsync ⇒ <code>object</code>

Retrieve Driver's jobs for driver app
Old code for driver app (Should move to carpal driver sdk)

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param | Type                |
| ----- | ------------------- |
| id    | <code>int</code>    |
| token | <code>string</code> |
| date  | <code>string</code> |

<a name="getDriverLegsAsync"></a>

## getDriverLegsAsync ⇒ <code>object</code>

Retrieve Driver's legs route for driver app
Old code for driver app (Should move to carpal driver sdk)

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param | Type                |
| ----- | ------------------- |
| id    | <code>string</code> |
| token | <code>string</code> |
| date  | <code>string</code> |
