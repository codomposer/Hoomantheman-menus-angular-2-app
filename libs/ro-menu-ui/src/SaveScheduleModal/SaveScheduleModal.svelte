<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { WEEK_DAYS } from '@menus/web-config'
import { CheckBox, DateTime } from '@menus/form-ui'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import {
	SaveScheduleModal_c, TAB_DELIVERY_HOURS, TAB_PICKUP_HOURS, TAB_CATERING_HOURS, TAB_DINING_HOURS, dt_options,
} from './SaveScheduleModal_c.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
export const _ = new SaveScheduleModal_c(ctx)
const {
	schedule_DayDetails_Opening_Time_errors_2$, schedule_DayDetails_Closing_Time_errors$, activeTab$, busy$,
	invalidTabs$, is_modal_open$, ro_masterheading$, schedule$
} = _
export const open = _.open, close = _.close
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
  <div class="modal schedule-form fade d-block in"
			 on:click={evt => _.close()}
			 tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog modal-lg" role="document" on:click|stopPropagation>
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close"
									on:click={evt => _.close()}
									aria-label="Close"
					>
            <div class="delete-icon"></div>
          </button>
          <h4 class="modal-title">Schedule Form</h4>
        </div>
				{#if $busy$ || !$ro_masterheading$}
          <PageLoader></PageLoader>
        {:else}
          <div class="modal-body modal-scrollable">
            <!-- Nav tabs -->
            <ul class="nav nav-pills scrollable">
              {#if $ro_masterheading$.IsDelivery}
                <li class:active={$activeTab$ === TAB_DELIVERY_HOURS}
										class:has-error={$invalidTabs$[TAB_DELIVERY_HOURS]}
										on:click={evt => activeTab$.$ = TAB_DELIVERY_HOURS}
								><a href="." on:click|preventDefault>Delivery time</a></li>
              {/if}
							{#if $ro_masterheading$.IsPickup}
                <li class:active={$activeTab$ === TAB_PICKUP_HOURS}
										class:has-error={$invalidTabs$[TAB_PICKUP_HOURS]}
										on:click={evt => activeTab$.$ = TAB_PICKUP_HOURS}
								><a href="." on:click|preventDefault>Pickup time</a></li>
              {/if}
							{#if $ro_masterheading$.IsCatering}
                <li class:active={$activeTab$ === TAB_CATERING_HOURS}
										class:has-error={$invalidTabs$[TAB_CATERING_HOURS]}
										on:click={evt => activeTab$.$ = TAB_CATERING_HOURS}
								><a href="." on:click|preventDefault>Catering time</a></li>
              {/if}
							{#if $ro_masterheading$.IsDiningIn}
                <li class:active={$activeTab$ === TAB_DINING_HOURS}
										class:has-error={$invalidTabs$[TAB_DINING_HOURS]}
										on:click={evt => activeTab$.$ = TAB_DINING_HOURS}
								><a href="." on:click|preventDefault>Dining-In time</a></li>
              {/if}
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active">
                <div class="table-responsive-xs">
                  <p class="f-black">
                    (Note: If service types have different timing need to add here otherwise it's follow
                    Restaurant Working/Delivery Hours.)
                  </p>
                  <table class="table table-striped">
										<thead>
											<tr>
												<th>From</th>
												<th>Open Time</th>
												<th>Close Time</th>
												<th>Add<span class="hidden-xs"> more Time</span></th>
												<th>Active</th>
											</tr>
										</thead>
										<tbody>
											{#each $schedule$?.[$activeTab$] || [] as item}
                        {#each item.DayDetails as dayDetail,index}
                          <tr>
                            <td>
                              <div>{ dayDetail.dayIDFrom ? WEEK_DAYS[dayDetail.dayIDFrom] : '' }</div>
                            </td>
                            <td>
                              {#if dayDetail.edit_mode}
                                <DateTime bind:value={dayDetail.Opening_Time}
																					validation={['', $schedule_DayDetails_Opening_Time_errors_2$?.[$activeTab$]]}
																					options={dt_options}
																></DateTime>
                              {:else}
                                <div on:click={evt => dayDetail.edit_mode = !dayDetail.edit_mode}
																>{ dayDetail.Opening_Time }</div>
                              {/if}
                            </td>
                            <td>
                              <div>{ dayDetail.dayIDTo ? WEEK_DAYS[dayDetail.dayIDTo] : '' }</div>
                            </td>
                            <td>
                              {#if dayDetail.edit_mode}
                                <DateTime bind:value={dayDetail.Closing_Time}
																					validation={['', $schedule_DayDetails_Closing_Time_errors$?.[$activeTab$]]}
																					options={dt_options}
																></DateTime>
                              {:else}
                                <div on:click={evt => dayDetail.edit_mode = !dayDetail.edit_mode}
																>{ dayDetail.Closing_Time }</div>
                              {/if}
                            </td>
                            <td>
                              {#if index}
                                <div class="text-danger"
																		 on:click={evt => _.deleteHour(index, item)}
																>DELETE</div>
                              {:else}
                                <div class="add-time-icon"
																		 on:click={evt => _.add_restHour(index, item, true)}
																></div>
                              {/if}
                            </td>
                            <td>
                              <CheckBox toggle={true}
																				bind:value={dayDetail.Enabled}
																				on:change={evt => _.save()}
															></CheckBox>
                            </td>
                          </tr>
                        {/each}
  	                  {/each}
										</tbody>
                </table>
              </div>
            </div>
          </div>
          </div>
          <div class="modal-footer">
						<div class="row">
							<button type="button" class="col-xs-6 btn btn-lg btn-success"
											on:click={evt => _.save(true)}
							>Save</button>
							<button type="button" class="col-xs-6 btn btn-lg btn-success btn-inverse"
											on:click={evt => _.close()}
							>Cancel</button>
						</div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style type=text/scss global>
.modal {
	&.schedule-form {
		.page-loader {
			margin-top: 40px;
		}
		.table-responsive-xs {
			padding: 40px 0 0;
		}
		.modal-footer {
			padding-top: 40px;
			border-top: 1px solid #DBDBDB;
		}
	}
}
</style>
