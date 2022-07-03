<script lang="ts">
import { flatten } from '@ctx-core/array'
import { Row } from '@menus/bootstrap'
import { shortDateTime_ } from '@menus/date'
import { innerWidth_gt_SCREEN_XS_MIN$_b, innerWidth_lte_SCREEN_XS_MIN$_b } from '@menus/dom'
import { CheckBox, DateTime } from '@menus/form-ui'
import type { ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { errors_2, required_errors_, ValidationMessages } from '@menus/validation'
import type { RestInfoTab_c } from './RestInfoTab_c.js'
export let _:RestInfoTab_c
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx
const innerWidth_gt_SCREEN_XS_MIN$ = innerWidth_gt_SCREEN_XS_MIN$_b(ctx)
const innerWidth_lte_SCREEN_XS_MIN$ = innerWidth_lte_SCREEN_XS_MIN$_b(ctx)
const { Holidays$ } = _
let Holiday_name_errors_a:string[]
$: Holiday_name_errors_a = flatten($Holidays$?.map(
	Holiday=>errors_2(['Holiday Name', required_errors_])(Holiday.Name)
)) as string[]
export let Holidays_errors:string[] = []
$: Holidays_errors = [...Holiday_name_errors_a]
</script>

<div id="RestInfoTab_Holidays" class="time-section RestInfoTab_Holidays">
  <Row>
    <div class="col-lg-8">
      <div class="section-heading">Holidays</div>
      <table class="table table-striped table-responsive-xs">
				<thead>
					<tr>
						<td>Weekdays</td>
						<td>Closed From</td>
						<td>Closed To</td>
						<td>Add More Time</td>
						<td>Active</td>
					</tr>
				</thead>
				<tbody>
					{#each $Holidays$ || [] as Holidays_item,index}
						<tr class:edit_mode={Holidays_item.edit_mode}>
							<td class="f-bold">
								{#if Holidays_item.edit_mode}
									<div class:has-error={Holiday_name_errors_a[index]}>
										<input
											type="text" class="form-control" name="HolidayName"
											required
											bind:value={Holidays_item.Name}
										/>
										<ValidationMessages
											errors={Holiday_name_errors_a[index]}
											input_tooltip={true}
										></ValidationMessages>
									</div>
								{:else}
									<div on:click={evt => _.toggle_item_edit_mode(Holidays$, Holidays_item)}
									>{ Holidays_item.Name }</div>
								{/if}
							</td>
							<td>
								<Row class="table-responsive-value">
									{#if Holidays_item.edit_mode}
										<DateTime
											bind:value={Holidays_item.Date_Start}
											validation={['', Holidays_item.start_date_error]}
											options={{
												enableTime: true,
											}}
											on:change={evt => _.validate_dates_Holidays()}
										></DateTime>
										{#if $innerWidth_lte_SCREEN_XS_MIN$}
											<DateTime
												bind:value={Holidays_item.Date_End}
												validation={['', Holidays_item.end_date_error]}
												options={{
													enableTime: true,
												}}
												on:change={evt => _.validate_dates_Holidays()}
											></DateTime>
										{/if}
									{:else}
										<div
											class:col-xs-6={$innerWidth_lte_SCREEN_XS_MIN$}
											on:click={evt => _.toggle_item_edit_mode(Holidays$, Holidays_item)}
										>{ shortDateTime_(Holidays_item.Date_Start) }</div>
										{#if $innerWidth_lte_SCREEN_XS_MIN$}
											<div
												class:col-xs-6={$innerWidth_lte_SCREEN_XS_MIN$}
												on:click={evt => _.toggle_item_edit_mode(Holidays$, Holidays_item)}
											>{ shortDateTime_(Holidays_item.Date_End) }</div>
										{/if}
									{/if}
								</Row>
							</td>
							{#if $innerWidth_gt_SCREEN_XS_MIN$}
								<td>
									{#if Holidays_item.edit_mode}
										<DateTime
											bind:value={Holidays_item.Date_End}
											validation={['', Holidays_item.end_date_error]}
											options={{
												enableTime: true,
											}}
											on:change={evt => _.validate_dates_Holidays()}
										></DateTime>
									{:else}
										<div on:click={evt => _.toggle_item_edit_mode(Holidays$, Holidays_item)}
										>{ shortDateTime_(Holidays_item.Date_End) }</div>
									{/if}
								</td>
							{/if}
							<td>
								<Row class="table-responsive-value">
									{#if Holidays_item.ID > 0}
										<div
											class="fa fa-plus-circle" class:col-xs-6={$innerWidth_lte_SCREEN_XS_MIN$}
											on:click={evt => _.add_Holiday(index, true)}
										><span>Add Time</span></div>
									{:else}
										<div
											class="text-danger" class:col-xs-6={$innerWidth_lte_SCREEN_XS_MIN$}
											on:click={evt => _.delete_Holiday(index)}
										>DELETE</div>
									{/if}
									{#if $innerWidth_lte_SCREEN_XS_MIN$}
										<CheckBox
											class="col-xs-6" toggle={true} text="Active"
											bind:value={Holidays_item.Enabled}
										></CheckBox>
									{/if}
								</Row>
							</td>
							{#if $innerWidth_gt_SCREEN_XS_MIN$}
								<td>
									<CheckBox toggle={true} bind:value={Holidays_item.Enabled}></CheckBox>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
      </table>
      <div>
        <button
					class="btn btn-success btn-sm" type="button"
					on:click={evt => _.push_Holiday()}
				>Add Holiday</button>
      </div>
    </div>
  </Row>
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
#RestInfoTab_Holidays {
	.section-heading {
		margin-top: 0;
	}
}
</style>
