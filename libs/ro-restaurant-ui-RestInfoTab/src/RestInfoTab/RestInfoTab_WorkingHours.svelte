<script lang="ts">
import { Row } from '@menus/bootstrap'
import { innerWidth_gt_SCREEN_XS_MIN$_b, innerWidth_lte_SCREEN_XS_MIN$_b } from '@menus/dom'
import { CheckBox } from '@menus/form-ui'
import type { ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { WEEK_DAYS } from '@menus/web-config'
import type { RestInfoTab_c } from './RestInfoTab_c.js'
import { WorkingHours_label } from './RestInfoTab_c.js'
import RestInfoTab_WorkingHours_Closing_Time from './RestInfoTab_WorkingHours_Closing_Time.svelte'
import RestInfoTab_WorkingHours_Opening_Time from './RestInfoTab_WorkingHours_Opening_Time.svelte'
export let _:RestInfoTab_c
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx
const innerWidth_gt_SCREEN_XS_MIN$ = innerWidth_gt_SCREEN_XS_MIN$_b(ctx)
const innerWidth_lte_SCREEN_XS_MIN$ = innerWidth_lte_SCREEN_XS_MIN$_b(ctx)
const {
	WorkingHours$, WorkingHours_DayDetails_Opening_Time_errors_$, WorkingHours_DayDetails_Closing_Time_errors_$
} = _
</script>

<div id="RestInfoTab_WorkingHours" class="time-section RestInfoTab_WorkingHours">
  <div class="row">
    <div class="col-lg-8">
      <div class="section-heading">{WorkingHours_label}</div>
      <table class="table table-striped table-responsive-xs">
				<thead>
					<tr>
						<td>From</td>
						<td>Open Time</td>
						<td>To</td>
						<td>Close Time</td>
						<td>Add More Time</td>
						<td>Active</td>
					</tr>
				</thead>
				<tbody>
					{#each $WorkingHours$ || [] as WorkingHours_item}
						{#each WorkingHours_item.DayDetails as DayDetail,index}
							<tr class:edit_mode={DayDetail.edit_mode}>
								{#if $innerWidth_gt_SCREEN_XS_MIN$}
									<td>
										<div>{ DayDetail.dayIDFrom ? WEEK_DAYS[DayDetail.dayIDFrom] : '' }</div>
									</td>
									<td>
										<RestInfoTab_WorkingHours_Opening_Time {_} {DayDetail}></RestInfoTab_WorkingHours_Opening_Time>
									</td>
									<td>
										<div>{ DayDetail.dayIDTo ? WEEK_DAYS[DayDetail.dayIDTo] : '' }</div>
									</td>
									<td>
										<RestInfoTab_WorkingHours_Closing_Time {_} {DayDetail}></RestInfoTab_WorkingHours_Closing_Time>
									</td>
								{:else}
									<td>
										<Row>
											<div class="col-xs-6">
												<div>{ DayDetail.dayIDFrom ? WEEK_DAYS[DayDetail.dayIDFrom] : '' }</div>
												<RestInfoTab_WorkingHours_Opening_Time {_} {DayDetail}></RestInfoTab_WorkingHours_Opening_Time>
											</div>
											<div class="col-xs-6">
												<div>{ DayDetail.dayIDTo ? WEEK_DAYS[DayDetail.dayIDTo] : '' }</div>
												<RestInfoTab_WorkingHours_Closing_Time {_} {DayDetail}></RestInfoTab_WorkingHours_Closing_Time>
											</div>
										</Row>
									</td>
								{/if}
								<td>
									{#if index}
										<div class="text-danger" class:col-xs-6={$innerWidth_lte_SCREEN_XS_MIN$}
												 on:click={evt => _.delete_hour(WorkingHours$, index, WorkingHours_item)}
										>DELETE</div>
									{:else}
										<div class="fa fa-plus-circle" class:col-xs-6={$innerWidth_lte_SCREEN_XS_MIN$}
												 on:click={evt => _.add_restHour(WorkingHours$, index, WorkingHours_item, true)}
										>{#if $innerWidth_lte_SCREEN_XS_MIN$}<span>Add Time</span>{/if}</div>
									{/if}
									{#if $innerWidth_lte_SCREEN_XS_MIN$}
										<CheckBox class="col-xs-6" toggle={true} text="Active" bind:value={DayDetail.Enabled}></CheckBox>
									{/if}
								</td>
								{#if $innerWidth_gt_SCREEN_XS_MIN$}
									<td>
										<CheckBox toggle={true} bind:value={DayDetail.Enabled}></CheckBox>
									</td>
								{/if}
							</tr>
						{/each}
					{/each}
				</tbody>
      </table>
    </div>
  </div>
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
#RestInfoTab_WorkingHours {
	.section-heading {
		margin-top: 0;
	}
}
</style>
