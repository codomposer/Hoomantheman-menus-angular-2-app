<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { millis_, millis_minutes_, minute_tick$_b } from '@menus/date'
import { innerWidth_gt_SCREEN_XS_MIN$_b, innerWidth_lte_SCREEN_MD_MIN$_b } from '@menus/dom'
import { assign } from '@ctx-core/object'
import { ladda } from '@menus/ladda'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { params_fireFlyID$_b } from '@menus/page'
import type { API_ORDERS_cancel_payload_T, API_ORDERS_start_payload_T } from '@menus/ro-http'
import {
	API_ORDERS_accept_b, API_ORDERS_cancel_b, API_ORDERS_complete_b, API_ORDERS_ready_b, API_ORDERS_start_b,
	ro_httpClient_b, RoRequestQuery,
} from '@menus/ro-http'
import {
	can_transition_ORDER_ACCEPTED_, can_transition_ORDER_STARTED_, can_transition_ORDER_READY_,
	can_transition_ORDER_COMPLETED_, can_transition_ORDER_CANCELLED_BY_REST_, order_is_cancelled_
} from '@menus/ro-orders'
import type { restaurant_time_minutes_o_T } from '@menus/ro-restaurant'
import { restaurant_time_minutes_o_, ro_restaurant$_b } from '@menus/ro-restaurant'
import { is_ServiceType_Deliverable_ } from '@menus/service-type-common'
import type { Order } from '@menus/shared-order'
import { getContext_ui_ctx } from '@menus/ui'
import { is_DeliveryMode_DELIVERY_COMPANY_, STATUS_SUCCESS } from '@menus/web-config'
import type { ro_orders_ui_Ctx } from '../ro_orders_ui_Ctx.js'
import { minutes_human_text_ } from '@menus/date'
export let order:Order, btn_size_class = 'btn-sm', show_accept_order = true, show_cancel_order = true
const ctx = getContext_ui_ctx() as ro_orders_ui_Ctx, dispatch = createEventDispatcher()
const API_ORDERS_accept = API_ORDERS_accept_b(ctx)
const API_ORDERS_cancel = API_ORDERS_cancel_b(ctx)
const API_ORDERS_complete = API_ORDERS_complete_b(ctx)
const API_ORDERS_ready = API_ORDERS_ready_b(ctx)
const API_ORDERS_start = API_ORDERS_start_b(ctx)
const innerWidth_gt_SCREEN_XS_MIN$ = innerWidth_gt_SCREEN_XS_MIN$_b(ctx)
const innerWidth_lte_SCREEN_MD_MIN$ = innerWidth_lte_SCREEN_MD_MIN$_b(ctx)
const minute_tick$ = minute_tick$_b(ctx)
const notyf_error = notyf_error_b(ctx)
const notyf_success = notyf_success_b(ctx)
const params_fireFlyID$ = params_fireFlyID$_b(ctx)
const ro_httpClient = ro_httpClient_b(ctx)
const ro_restaurant$ = ro_restaurant$_b(ctx)
let btn_size_sibling_class:string
$: btn_size_sibling_class = `text-nowrap ${btn_size_class}-height`
let is_DeliveryMode_DELIVERY_COMPANY:boolean
$: is_DeliveryMode_DELIVERY_COMPANY = is_DeliveryMode_DELIVERY_COMPANY_(order?.DeliveryModeID)
let cancel_order_disabled:boolean
$: cancel_order_disabled =
	order?.Is_Accepted && can_transition_ORDER_COMPLETED_(order) && is_DeliveryMode_DELIVERY_COMPANY
let is_ServiceType_Deliverable
$:is_ServiceType_Deliverable = order && is_ServiceType_Deliverable_(order.ServiceTypeID)
let transition_order_busy_name:string
let ready_eta_minutes = 0, complete_eta_minutes = 0
$: ready_eta_minutes =
	millis_minutes_(millis_(order.ORDER_READY_ETA_UTC + 'Z') - millis_($minute_tick$))
$: complete_eta_minutes =
	millis_minutes_(millis_(order.ORDER_COMPLETED_ETA_UTC + 'Z') - millis_($minute_tick$))
export let offset_minutes = 0
$: if (offset_minutes < 0) offset_minutes = 0
let restaurant_time_minutes_o:restaurant_time_minutes_o_T
$: restaurant_time_minutes_o = restaurant_time_minutes_o_(
	order?.ServiceType, $ro_restaurant$
)
let offset_min_time:number, offset_max_time:number
$: offset_min_time = restaurant_time_minutes_o?.min_time + offset_minutes
$: offset_max_time = restaurant_time_minutes_o?.max_time + offset_minutes
async function transition_order(API_ORDERS_fn, name:string):Promise<void> {
	const requestData = new RoRequestQuery()
	requestData.ff = params_fireFlyID$.$
	requestData.oid = order.ID
	if (API_ORDERS_fn === API_ORDERS_accept) requestData.eta = offset_minutes
	let payload:API_ORDERS_start_payload_T|API_ORDERS_cancel_payload_T
	try {
		transition_order_busy_name = name
		payload = await API_ORDERS_fn(requestData)
		if (payload.Status === STATUS_SUCCESS) {
			const payload_order = payload.Data
			if (typeof payload_order.StatusHistory === 'string') {
				payload_order.StatusHistory = JSON.parse(payload_order.StatusHistory)
			}
			assign(order, payload_order)
			dispatch('transition', { order })
			notyf_success(`Order ${name} successful.`)
			offset_minutes = 0
		} else {
			notyf_error(`Unable to ${name} order. Please try later...`)
		}
	} finally {
		transition_order_busy_name = undefined
	}
}
function eta_minutes_text_(innerWidth_lte_SCREEN_MD_MIN:boolean, name:string, minutes:number):string {
	const prefix = innerWidth_lte_SCREEN_MD_MIN ? '' : `${name} `
	const minutes_human_text = minutes_human_text_(Math.abs(minutes))

	return (
		minutes > 0
		? `${prefix}in ${minutes_human_text}`
		: `${prefix}behind ${innerWidth_lte_SCREEN_MD_MIN ? '' : 'by '}${minutes_human_text}`
	)
}
export let show_accept_button_no_cancel_balloon:boolean
let accept_button:HTMLButtonElement
$: show_accept_button_no_cancel_balloon =
	can_transition_ORDER_ACCEPTED_(order) && show_accept_order && is_DeliveryMode_DELIVERY_COMPANY
export let show_cancel_contact_order_balloon:boolean
let OrderTransitionUI:HTMLDivElement
$: show_cancel_contact_order_balloon =
	!order_is_cancelled_(order) && order.Is_Accepted && !order.Is_Completed && is_DeliveryMode_DELIVERY_COMPANY
let auxiliary_text:string, show_ORDER_READY_auxiliary_text:boolean, show_ORDER_COMPLETED_auxiliary_text:boolean
$: show_ORDER_READY_auxiliary_text = !!(can_transition_ORDER_READY_(order) && order.ORDER_READY_ETA)
$: show_ORDER_COMPLETED_auxiliary_text =
	!!(can_transition_ORDER_COMPLETED_(order) && !is_DeliveryMode_DELIVERY_COMPANY && order.ORDER_COMPLETED_ETA)
$: auxiliary_text =
	show_ORDER_READY_auxiliary_text
	? eta_minutes_text_($innerWidth_lte_SCREEN_MD_MIN$, 'Ready', ready_eta_minutes)
	: show_ORDER_COMPLETED_auxiliary_text
		? eta_minutes_text_($innerWidth_lte_SCREEN_MD_MIN$, 'Complete', complete_eta_minutes)
		: ''
let has_text_danger_class:boolean
$: has_text_danger_class =
	show_ORDER_READY_auxiliary_text
	? ready_eta_minutes <= 5
	: show_ORDER_COMPLETED_auxiliary_text
		? complete_eta_minutes <= 5
		: false

let has_text_primary_class:boolean
$: has_text_primary_class =
	show_ORDER_READY_auxiliary_text
	? ready_eta_minutes > 5 && ready_eta_minutes <= 10
	: show_ORDER_COMPLETED_auxiliary_text
		? complete_eta_minutes > 5 && complete_eta_minutes <= 10
		: false
</script>

<div bind:this={OrderTransitionUI} class="OrderTransitionUI">
	{#if can_transition_ORDER_ACCEPTED_(order)}
		{#if show_accept_order}
			<div class="offset">
				Offset order
				<button class="diff_time_minutes_ctl" on:click|preventDefault={evt =>{
					offset_minutes = (Math.ceil(offset_minutes / 5.0) - 1) * 5
				}}>-</button>
				<input class="diff_time_minutes" type="number" bind:value={offset_minutes}>
				<button class="diff_time_minutes_ctl" on:click|preventDefault={evt =>
					offset_minutes = (Math.floor(offset_minutes / 5.0) + 1) * 5
				}>+</button>
				minutes.
				{#if restaurant_time_minutes_o}
					Preparation {offset_min_time} minutes
				{/if}
			</div>
		{/if}
	{/if}
	<div class="action-buttons">
		{#if can_transition_ORDER_ACCEPTED_(order)}
			{#if show_accept_order}
				<button use:ladda={transition_order_busy_name === 'accept'}
								bind:this={accept_button}
								class="btn btn-success {btn_size_class} accept-order"
								title={
									`Accept Order${
										is_DeliveryMode_DELIVERY_COMPANY_(order?.DeliveryModeID)
										? ' - Accepting this order will process a payment to the Delivery Company and cannot be cancelled'
										: ''
									}`
								}
								on:click|preventDefault={evt => transition_order(API_ORDERS_accept, 'accept')}
				>Accept</button>
			{/if}
		{/if}
		{#if can_transition_ORDER_STARTED_(order)}
			<button use:ladda={transition_order_busy_name === 'start'}
							class="btn btn-success {btn_size_class}"
							title={ `Start Order` }
							on:click|preventDefault={evt => transition_order(API_ORDERS_start, 'start')}
			>Start</button>
		{/if}
		{#if can_transition_ORDER_READY_(order)}
			<button use:ladda={transition_order_busy_name === 'ready'}
							class="btn btn-success {btn_size_class}"
							title={ `Ready Order` }
							on:click|preventDefault={evt => transition_order(API_ORDERS_ready, 'ready')}
			>Ready</button>
		{/if}
		{#if can_transition_ORDER_COMPLETED_(order)}
			{#if is_DeliveryMode_DELIVERY_COMPANY}
				<div class={btn_size_sibling_class}>Out for delivery</div>
			{:else}
				<button use:ladda={transition_order_busy_name === 'complete'}
								class="btn btn-success {btn_size_class}"
								title={ `Complete Order` }
								on:click|preventDefault={evt => transition_order(API_ORDERS_complete, 'complete')}
				>Complete</button>
			{/if}
		{/if}
		{#if show_cancel_order && can_transition_ORDER_CANCELLED_BY_REST_(order) }
			<button use:ladda={transition_order_busy_name === 'cancel'}
							class="btn btn-danger btn-inverse {btn_size_class}"
							disabled={cancel_order_disabled}
							title={
								cancel_order_disabled
								? 'Orders sent to a Delivery Company cannot be cancelled'
								: $innerWidth_gt_SCREEN_XS_MIN$
									? 'Cancel Order'
									: 'Cancel'
							}
							on:click|preventDefault={evt => transition_order(API_ORDERS_cancel, 'cancel')}
			>Cancel Order</button>
		{/if}
		<slot></slot>
	</div>
	{#if auxiliary_text}
		<div class="auxiliary-text" class:text-danger={has_text_danger_class} class:text-primary={has_text_primary_class}>{ auxiliary_text }</div>
	{/if}
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.OrderTransitionUI {
	display: inline-block;
	@media (max-width: $screen-xs-max) {
		display: block;
		width: 100%;
		margin-top: 0;
	}
	> * {
		padding: 0 8px 0 0;
		// @media (max-width: $screen-xs-max) {
		// 	padding: 0;
		// }
		&.offset {
			float: left;
			margin-bottom: 12px;
			.diff_time_minutes {
				width: 4em;
				height: 40px;
				line-height: 36px;
				text-align: right;
				border: 0;
				@media (max-width: $screen-xs-max) {
					width: 2em;
				}
			}
			.diff_time_minutes_ctl {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				height: 40px;
				width: 22px;
				border: 0;
				@media (max-width: $screen-xs-max) {
					width: 16px;
				}
			}
		}
		&.action-buttons {
			float: left;
			width: 100%;
			@media (max-width: $screen-xs-max) {
				display: flex;
				flex-direction: row;
			}
			button.btn {
				flex: 1;
				margin-right: 0;
			}
		}
		&.auxiliary-text {
			padding-top: 4px;
			display: block;
			overflow: hidden;
			width: 100%;
		}
	}
	.btn {
		@media (max-width: $screen-xs-max) {
			min-width: 110px;
		}
		&.accept-order {
			position: relative;
			overflow: visible;
		}
	}
}
</style>
