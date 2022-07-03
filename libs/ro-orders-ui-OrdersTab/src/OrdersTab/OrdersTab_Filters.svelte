<script lang="ts">
import { DateTime } from '@menus/form-ui'
import {
	ro_orders_API_ORDERS_list_payload$_b, ro_orders_filter_date_range$_b, ro_orders_filter_order_StatusID$_b,
	ro_orders_filter_orders_date_range$_b, ro_orders_filter_serviceTypeId$_b, ro_orders_last_requestData$_b
} from '@menus/ro-orders'
import {
	CATERING_SERVICE_TYPE_ID, DELIVERY_SERVICE_TYPE_ID, DINEIN_SERVICE_TYPE_ID, PICKUP_SERVICE_TYPE_ID,
	ServiceTypeID_r_title
} from '@menus/service-type-common'
import { getContext_ui_ctx } from '@menus/ui'
import { order_status_r_StatusID } from '@menus/web-config'
import type { ro_orders_ui_OrdersTab_Ctx } from '../ro_orders_ui_OrdersTab_Ctx.js'
import type { OrdersTab_c } from './OrdersTab_c.js'
export let _:OrdersTab_c
const { show_filters$ } = _
const ctx = getContext_ui_ctx() as ro_orders_ui_OrdersTab_Ctx
const ro_orders_API_ORDERS_list_payload$ = ro_orders_API_ORDERS_list_payload$_b(ctx)
const ro_orders_filter_date_range$ = ro_orders_filter_date_range$_b(ctx)
const ro_orders_filter_order_StatusID$ = ro_orders_filter_order_StatusID$_b(ctx)
const ro_orders_filter_orders_date_range$ = ro_orders_filter_orders_date_range$_b(ctx)
const ro_orders_filter_serviceTypeId$ = ro_orders_filter_serviceTypeId$_b(ctx)
const ro_orders_last_requestData$ = ro_orders_last_requestData$_b(ctx)
async function apply_filters() {
	await ro_orders_API_ORDERS_list_payload$.load()
	await close_filters()
}
async function reset_filters() {
	const last_requestData = ro_orders_last_requestData$.$
	let date_range = ro_orders_filter_date_range$.$
	ro_orders_filter_serviceTypeId$.$ = last_requestData?.mtype || -1
	ro_orders_filter_order_StatusID$.$ = last_requestData?.sid || -1
	if (last_requestData && last_requestData.ds && last_requestData.de) {
		date_range = date_range || []
		if (date_range.length >= 2) {
			date_range[0] = last_requestData.ds
			date_range[1] = last_requestData.de
		} else {
			ro_orders_filter_orders_date_range$.$.clear()
		}
	} else {
		ro_orders_filter_orders_date_range$.$.clear()
	}
	ro_orders_filter_order_StatusID$.$ = last_requestData?.sid || -1
}
async function cancel_filters() {
	await reset_filters()
	await close_filters()
}
async function close_filters() {
	show_filters$.$ = false
}
</script>

<div class="row filters-section OrdersTab_Filters">
  <div class="col-lg-4">
    <div class="form-group select-type select-dates">
      <label for="orders_date_range">Select Dates</label>
      <div id="orders_date_range">
        <DateTime bind:this={$ro_orders_filter_orders_date_range$}
									bind:value={$ro_orders_filter_date_range$}
									options={{ mode: 'range' }}
				></DateTime>
      </div>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="form-group select-type select-service-type">
      <label for="serviceTypeId">Service Type</label>
      <select class="form-control" id="serviceTypeId"
							bind:value={$ro_orders_filter_serviceTypeId$}
			>
        <option value={-1}>All Service Types</option>
        <option value={DELIVERY_SERVICE_TYPE_ID}>{ServiceTypeID_r_title[DELIVERY_SERVICE_TYPE_ID]}</option>
        <option value={PICKUP_SERVICE_TYPE_ID}>{ServiceTypeID_r_title[PICKUP_SERVICE_TYPE_ID]}</option>
        <option value={CATERING_SERVICE_TYPE_ID}>{ServiceTypeID_r_title[CATERING_SERVICE_TYPE_ID]}</option>
        <option value={DINEIN_SERVICE_TYPE_ID}>{ServiceTypeID_r_title[DINEIN_SERVICE_TYPE_ID]}</option>
      </select>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="form-group select-type select-status">
      <label for="order_status">Status</label>
      <select id="order_status" class="form-control" bind:value={$ro_orders_filter_order_StatusID$}>
        <option value={-1}>All</option>
        <option value={order_status_r_StatusID.ORDER_ACCEPTED}>Accepted</option>
        <option value={order_status_r_StatusID.CC_PRE_APPROVED}>Pending</option>
        <option value={order_status_r_StatusID.ORDER_CANCELLED_BY_REST}>Cancelled By Rest</option>
      </select>
    </div>
  </div>
  <div class="col-sm-12">
    <div class="filter-buttons-wrapper">
      <button class="btn btn-lg btn-success filter-button apply-button"
							on:click={evt => apply_filters()}
			>Apply</button>
      <button class="btn btn-lg btn-success filter-button reset-button"
							on:click={evt => reset_filters()}
			>Reset</button>
      <button class="btn btn-lg btn-success filter-button cancel-button"
							on:click={evt => cancel_filters()}
			>Cancel</button>
    </div>
  </div>
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.OrdersTab_Filters {
	display: block;
	.form-group {
		input, select {
			border: 1px solid $brand-success;
			color: white;
			background-color: rgba(#FFFFFF, .1);
		}
		select {
			option {
				color: $gray; // color of all the other options
			}
		}
	}
	.select-type {
		margin-bottom: 0;
		@media (max-width: 1100px) {
			width: 100%;
			margin-bottom: 16px;
		}
	}
	.filter-buttons-wrapper {
		display: block;
		width: 100%;
		margin-top: 24px;
		overflow: hidden;
		.filter-button {
			margin-right: 24px;
			@media (max-width: $screen-md-max) {
				margin-bottom: 16px;
			}
		}
		.cancel-button {
			background-color: $gray;
			color: $brand-success;
		}
		@media (max-width: $screen-xs-max) {
			display: flex;
			flex-direction: row;
			.filter-button.btn {
				flex: 1;
				margin-right: 0;
				min-width: auto;
			}
		}
	}
}
</style>
