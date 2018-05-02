## Constants

<dl>
<dt><a href="#getJobDetailAsync">getJobDetailAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get Job Detail</p>
</dd>
<dt><a href="#getJobSummaryAsync">getJobSummaryAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get Job Summary</p>
</dd>
<dt><a href="#getRecommendedJobsAsync">getRecommendedJobsAsync</a> ⇒ <code>object</code></dt>
<dd><p>Get Recommended Jobs</p>
</dd>
</dl>

<a name="getJobDetailAsync"></a>

## getJobDetailAsync ⇒ <code>object</code>

Get Job Detail

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param | Type                |
| ----- | ------------------- |
| jobId | <code>int</code>    |
| token | <code>string</code> |

<a name="getJobSummaryAsync"></a>

## getJobSummaryAsync ⇒ <code>object</code>

Get Job Summary

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param | Type                |
| ----- | ------------------- |
| jobId | <code>int</code>    |
| token | <code>string</code> |

<a name="getRecommendedJobsAsync"></a>

## getRecommendedJobsAsync ⇒ <code>object</code>

Get Recommended Jobs

**Kind**: global constant  
**Returns**: <code>object</code> - Promise resolve/reject

| Param        | Type                | Description                            |
| ------------ | ------------------- | -------------------------------------- |
| filterObject | <code>object</code> | #{driverId, pickupDate, limit, offset} |
| token        | <code>string</code> |                                        |
