<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { shortDateTime_ } from '@menus/date'
import { order_status_r_StatusID } from '@menus/web-config'
import type { ro_orders_ui_Ctx } from '../ro_orders_ui_Ctx.js'
import { OrderStatusHistoryModal_c } from './OrderStatusHistoryModal_c.js'
const ctx = getContext_ui_ctx() as ro_orders_ui_Ctx
export const _ = new OrderStatusHistoryModal_c(ctx)
const { is_modal_open$, order$ } = _
export const open = _.open, close = _.close
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
  <div class="modal order-status-history-modal fade d-block in OrderStatusHistoryModal"
			 on:click={evt => _.close()}
			 tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog" role="document" on:click|stopPropagation>
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close"
									on:click|stopPropagation={evt => _.close()}
					>
            <div class="delete-icon"></div>
          </button>
          <h4 class="modal-title">{ $order$.OrderNumber } History</h4>
        </div>
        <div class="modal-body modal-scrollable">
          <div class="table-responsive-xs customer-order-history-list">
            <table class="table table-center">
							<tbody>
								{#each $order$.StatusHistory || [] as status}
									<tr class="order-status"
											class:order-status-accepted={status.StatusID == order_status_r_StatusID.ORDER_ACCEPTED}
											class:order-status-cancelled-rest={status.StatusID == order_status_r_StatusID.ORDER_CANCELLED_BY_REST}
											class:order-status-queue-added={status.StatusID == order_status_r_StatusID.MENUS_AGENT_CALLRESTAURANT_ADD_QUEUE}
									>
										<td></td>
										<td>
											<div class="datetime-text">{ shortDateTime_(status.Date) }</div>
										</td>
										<td>
											<div class="status-text">{ status.Status }</div>
										</td>
									</tr>
								{:else}
									<tr class="no-record">
										<td colspan="3">No Records to display</td>
									</tr>
								{/each}
							</tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
					<div class="row">
						<button type="button"
										class="col-xs-12 btn btn-lg btn-success"
										on:click|stopPropagation={evt => _.close()}
						>OK</button>
					</div>
        </div>
      </div>
    </div>
  </div>
{/if}
<style type=text/scss>
@import "@menus/ro-shared-css/lib";
.order-status-history-modal {
	.customer-order-history-list {
		margin-top: 32px;
		.table {
			tr {
				&:first-child {
					td {
						border-top: none;
					}
				}
			}
		}
		.order-status {
			.status-text {
				font-weight: $lato-bold;
			}
			&.order-status-accepted {
				.datetime-text, .status-text {
					color: $brand-success;
				}
			}
			&.order-status-cancelled-rest {
				.datetime-text, .status-text {
					color: $brand-danger;
				}
			}
			&.order-status-queue-added {
				.datetime-text, .status-text {
					color: $dark-gray;
				}
			}
		}
	}
}
</style>
