<script lang="ts">
import type { HourDayDetails } from '@menus/ro-shared-models'
import type { RestInfoTab_c } from './RestInfoTab_c.js'
import RestInfoTab_RestHours from './RestInfoTab_RestHours.svelte'
export let _:RestInfoTab_c, DayDetail:HourDayDetails, no_delivery:boolean
const { DeliveryHours$, DeliveryHours_DayDetails_Opening_Time_errors_$ } = _
</script>


<RestInfoTab_RestHours
	{_}
	{DayDetail}
	prop={'Opening_Time'}
	store={DeliveryHours$}
	validation={[''], $DeliveryHours_DayDetails_Opening_Time_errors_$?.(DayDetail)}
	disabled={no_delivery}
></RestInfoTab_RestHours>
