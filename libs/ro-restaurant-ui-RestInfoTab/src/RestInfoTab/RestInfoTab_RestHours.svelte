<script lang="ts">
import { DateTime } from '@menus/form-ui'
import type { HourDayDetails, RestHours } from '@menus/ro-shared-models'
import type { refresh_writable_T } from '@menus/store'
import type { validation_args_T } from '@menus/validation'
import type { RestInfoTab_c } from './RestInfoTab_c.js'
import { strip_sec } from './strip_sec.js'
export let _:RestInfoTab_c, DayDetail:HourDayDetails, prop:keyof HourDayDetails, store:refresh_writable_T<RestHours[]>,
	validation:validation_args_T, disabled = false
const { WorkingHours$, WorkingHours_DayDetails_Opening_Time_errors_$ } = _
</script>


{#if DayDetail.edit_mode}
	<DateTime bind:value={DayDetail[prop]}
						{validation}
						options={{
							enableTime: true,
							noCalendar: true,
						}}
						{disabled}
	></DateTime>
{:else}
	<div on:click={evt => _.toggle_item_edit_mode(store, DayDetail)}
	>{ strip_sec(DayDetail[prop]) }</div>
{/if}
