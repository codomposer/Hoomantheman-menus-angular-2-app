<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { compact } from '@ctx-core/array'
import { currency_str_ } from '@ctx-core/currency'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import {
	HH_mm_meridian_, millis_, minute_millis_, minute_tick$_b, mm_dd_YY_, shortDate_, shortTime_
} from '@menus/date'
import { innerWidth_gt_SCREEN_XS_MIN$_b, innerWidth_lte_SCREEN_MD_MIN$_b } from '@menus/dom'
import { phone_str_ } from '@menus/phone'
import { can_edit_order_, can_print_order_, order_is_cancelled_, order_is_declined_, } from '@menus/ro-orders'
import type { restaurant_time_minutes_o_T } from '@menus/ro-restaurant'
import { restaurant_time_minutes_o_ } from '@menus/ro-restaurant'
import { MapCustomerRouteModal } from '@menus/ro-restaurant-ui'
import type { CustomerInfo, OrderDetail_I } from '@menus/ro-shared-models'
import { is_kitchen_role$_b } from '@menus/ro-user-common'
import { is_ServiceType_Deliverable_ } from '@menus/service-type'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import {
	is_DeliveryMode_DELIVERY_COMPANY_, is_DeliveryMode_restaurant_, order_status_r_StatusID,
} from '@menus/web-config'
import { OrderTransitionUI } from '../OrderTransitionUI/index.js'
import type { ro_orders_ui_Ctx } from '../ro_orders_ui_Ctx.js'
import { OrderDetails_c } from './OrderDetails_c.js'
const ctx = getContext_ui_ctx() as ro_orders_ui_Ctx
// const goto_order_edit = goto_order_edit$_b(ctx)
const innerWidth_gt_SCREEN_XS_MIN$ = innerWidth_gt_SCREEN_XS_MIN$_b(ctx)
const innerWidth_lte_SCREEN_MD_MIN$ = innerWidth_lte_SCREEN_MD_MIN$_b(ctx)
const is_kitchen_role$ = is_kitchen_role$_b(ctx)
const minute_tick$ = minute_tick$_b(ctx)
const dispatch = createEventDispatcher()
export const _ = new OrderDetails_c(ctx, dispatch)
const {
	back_url$, busy$, coupon_discount$, params_fireFlyID$, order$, mapCustomerRouteModal$, ro_restaurant$,
	offset_minutes$, /* params_orderID$,*/
} = _
export let fireFlyID:string, orderID: number
let offset_minutes:number
$: _.params_fireFlyID$.$ = fireFlyID
$: _.params_orderID$.$ = orderID
let OrderDetail:OrderDetail_I
$: OrderDetail = $order$?.OrderDetail
let CustomerInfo:CustomerInfo
$: CustomerInfo = $order$?.CustomerInfo
let restaurant_time_minutes_o:restaurant_time_minutes_o_T
$: restaurant_time_minutes_o = restaurant_time_minutes_o_(OrderDetail?.ServiceType, $ro_restaurant$)
let memo_restaurant_time_minutes_o:restaurant_time_minutes_o_T
let start_override_time_millis:number, override_elapsed_millis:number
$: {
	const minute_tick_millis = millis_($minute_tick$)
	if (OrderDetail) {
		if (restaurant_time_minutes_o !== memo_restaurant_time_minutes_o) {
			$offset_minutes$ = 0
			start_override_time_millis = minute_tick_millis
			override_elapsed_millis = 0
		} else {
			// const elapsed_millis = minute_tick_millis - start_override_time_millis
			// $offset_minutes$ =
			//   $offset_minutes$ - millis_minutes_(elapsed_millis - override_elapsed_millis)
			// override_elapsed_millis = elapsed_millis
		}
	} else {
		$offset_minutes$ = 0
		start_override_time_millis = null
		override_elapsed_millis = 0
	}
}
let is_ServiceType_Deliverable:boolean, is_DeliveryMode_restaurant:boolean
$: {
	is_ServiceType_Deliverable = OrderDetail && is_ServiceType_Deliverable_(OrderDetail.ServiceTypeID)
	is_DeliveryMode_restaurant = OrderDetail && is_DeliveryMode_restaurant_(OrderDetail.DeliveryModeID)
}
let delivery_contact_str:string
$: delivery_contact_str = OrderDetail ? (compact([
	OrderDetail.DeliveryCompany_Name, OrderDetail.DeliveryCompany_Phone_CS
]).join(', ')) : ''
let is_DeliveryMode_DELIVERY_COMPANY:boolean
$: is_DeliveryMode_DELIVERY_COMPANY = is_DeliveryMode_DELIVERY_COMPANY_(OrderDetail?.DeliveryModeID)
let cancel_order_disabled:boolean
$: cancel_order_disabled = OrderDetail?.Is_Accepted && is_DeliveryMode_DELIVERY_COMPANY
let deliver_text_label:string, deliver_text_value:string
$: {
	const deliver_text = $order$?.deliver_text || ''
	const deliver_text_a = deliver_text.split(': ')
	deliver_text_label = deliver_text_a[0] || ''
	deliver_text_value = deliver_text_a[1] || ''
}
let ORDER_READY_ETA_date:Date
$: ORDER_READY_ETA_date =
	OrderDetail
	? new Date(millis_(OrderDetail.ORDER_READY_ETA) + minute_millis_(offset_minutes))
	: undefined
let ORDER_COMPLETED_ETA_date:Date
$: ORDER_COMPLETED_ETA_date =
	OrderDetail
	? new Date(millis_(OrderDetail.ORDER_COMPLETED_ETA) + minute_millis_(offset_minutes))
	: undefined
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
let show_accept_button_no_cancel_balloon:boolean
let accept_button_no_cancel_balloon_position_style:string
let show_cancel_contact_order_balloon:boolean
let cancel_contact_order_balloon_style:string
</script>

{#if $busy$}
	<PageLoader center="page"></PageLoader>
{:else}
	<!-- <div class="breadcrumb-container">
	<Breadcrumb></Breadcrumb>
	</div> -->
{/if}
<div class="OrderDetails">
	<MapCustomerRouteModal bind:this={$mapCustomerRouteModal$}></MapCustomerRouteModal>
	{#if !$busy$ && OrderDetail}
	<div>
		<div class="page-title-section">
		<a href={$back_url$} class="page-title-text">
			<div class="arrow-left-icon" on:click={evt => _.hide_order_details()}></div>
			<span class="customer-name">{ $order$.CustomerInfo.FullName }</span>
			<span class="order-number">{ OrderDetail.OrderNumber }</span>
			<span class="order-items-count">{ $order$.MenuDetail.length } items</span>
			<span class="order-eta">
				{ OrderDetail.ServiceType } @ 
				{#if is_ServiceType_Deliverable_(OrderDetail.ServiceType)}
					{ mm_dd_YY_(ORDER_COMPLETED_ETA_date, '/') } {HH_mm_meridian_(ORDER_COMPLETED_ETA_date)}
				{:else}
					{ mm_dd_YY_(ORDER_READY_ETA_date, '/') } {HH_mm_meridian_(ORDER_READY_ETA_date)}
				{/if}
			</span>
		</a>
		</div>
			<OrderTransitionUI
				order={OrderDetail}
				btn_size_class="btn-lg"
				bind:offset_minutes
				bind:show_accept_button_no_cancel_balloon
				bind:accept_button_no_cancel_balloon_position_style
				bind:show_cancel_contact_order_balloon
				bind:cancel_contact_order_balloon_style
				on:transition={()=>order$.refresh()}
			>
				{#if order_is_declined_(OrderDetail)}
					<div class="status-declined">{OrderDetail.Status}</div>
				{/if}
				{#if is_ServiceType_Deliverable}
					<button class="btn btn-lg btn-success btn-inverse btn-map-customer-route"
									class:no-side-margin={order_is_cancelled_(OrderDetail)}
									on:click={evt => _.open_MapCustomerRouteModal()}
					>Map{$innerWidth_gt_SCREEN_XS_MIN$ ? ' Route' : ''}</button>
				{/if}
				{#if can_print_order_(OrderDetail)}
					<button class="btn btn-lg btn-success btn-inverse btn-print-order"
									on:click={evt => _.print_order()}
					>Print{$innerWidth_gt_SCREEN_XS_MIN$ ? ' Order' : ''}</button>
				{/if}
				{#if can_edit_order_(OrderDetail)}
<!--          TODO: readd when Edit Order is supported-->
					<!--          <button-->
					<!--            class="btn btn-lg btn-success btn-inverse btn-edit-order"-->
					<!--            on:click={evt => goto_order_edit($params_fireFlyID$, $params_orderID$)}-->
					<!--          >Edit Order</button>-->
				{/if}
			</OrderTransitionUI>
			{#if show_accept_button_no_cancel_balloon}
				<div class="balloon text-danger"
				>PLEASE NOTE: After accepting, you may be charged a third party cancellation fee if you cancel this order later</div>
			{/if}
			{#if show_cancel_contact_order_balloon}
				<div class="balloon">{
					$innerWidth_lte_SCREEN_MD_MIN$
					? `To cancel, contact ${delivery_contact_str} then menu.com support. Cancellation fee may apply.`
					: `If you want to cancel this order please contact ${delivery_contact_str} and then menu.com support. There may be a cancellation fee.`
				}
				</div>
			{/if}
		<div class="order-details-section">
		<div class="order-details-title">Order Details</div>
		<div class="order-details-list">
			<table class="table table-striped table-responsive-xs">
			<thead>
				<tr>
				<th>Item Name</th>
				<th>Qty</th>
								{#if !$is_kitchen_role$}
					<th>Price</th>
					<th>Item Total</th>
				{/if}
								<th>Size</th>
				<th>Options</th>
				</tr>
			</thead>
			<tbody>
				{#if !$busy$}
				{#each $order$.MenuDetail || [] as menuDetail}
					<tr class="tr-item">
					<td class="f-bold">
											<div class="table-responsive-label">Item Name</div>
											<div class="table-responsive-value">
												<div>{ menuDetail.ItemName }</div>
												<div class="menu-detail-instructions">{ menuDetail.Instructions || '' }</div>
											</div>
										</td>
					<td>
											<div class="table-responsive-label">Qty</div>
											<div class="table-responsive-value">{ menuDetail.Qty }</div>
										</td>
										{#if !$is_kitchen_role$}
						<td>
												<div class="table-responsive-label">Price</div>
												<div class="table-responsive-value">${ menuDetail.Price }</div>
											</td>
						<td>
												<div class="table-responsive-label">Item Total</div>
												<div class="table-responsive-value">${ menuDetail.Amount }</div>
											</td>
					{/if}
										<td>
											<div class="table-responsive-label">Size</div>
											<div class="table-responsive-value">{ menuDetail.SizeName || '' }</div>
										</td>
					<td class="option">
											<div class="table-responsive-label">Options</div>
											<div class="table-responsive-value">
												{#each menuDetail.OptionDetails || [] as option_detail}
													<div class="OptionDetail">
														<div class="header OptionDetailMenuoptionitemName">{option_detail.OptionItemName}</div>
														{#each option_detail.OptionItem || [] as menuoptionitem}
															<div class="Menuoptionitem">
																<div class="MenuoptionitemMenuoptionitemName">
																	{menuoptionitem.OptionItemName}
																</div>
																{#if !$is_kitchen_role$}
																	<div class="MenuoptionitemTotal">
																		${menuoptionitem.Total}
																	</div>
																{/if}
															</div>
														{/each}
													</div>
												{/each}
											</div>
					</td>
					</tr>
				{:else}
					<tr>
					<td colspan="7">No Records to display</td>
					</tr>
				{/each}
				{/if}
			</tbody>
			</table>
					{#if !$is_kitchen_role$}
						<table class="totals">
							<tbody>
								<tr>
									<td class="td-labels charge label">Subtotal:</td>
									<td class="number-sign plus-sign charge">+</td>
									<td class="td-values charge">
										<span>{ currency_str_(OrderDetail.SubTotal + $coupon_discount$, 'USD') }</span>
									</td>
								</tr>
								{#if $coupon_discount$}
									{#each (OrderDetail.CouponDetail || []) as coupon_detail}
										<tr>
											<td class="td-labels charge label">Coupon Discount({ coupon_detail.CouponCode }):</td>
											<td class="number-sign minus-sign charge">-</td>
											<td class="td-values charge">{ currency_str_(coupon_detail.DiscountPrice, 'USD') }</td>
										</tr>
									{/each}
								{/if}
								{#if is_ServiceType_Deliverable}
									<tr>
										<td class="td-labels charge label">Delivery Fee:</td>
										<td class="number-sign plus-sign charge">+</td>
										<td class="td-values charge">{ currency_str_(OrderDetail.DeliveryCharge || 0, 'USD') }</td>
									</tr>
									<tr>
										<td class="td-labels charge label">Driver Tip ({ OrderDetail.Driver_Tip_Percent }%):</td>
										<td class="number-sign plus-sign charge">+</td>
										<td class="td-values charge">{ currency_str_(OrderDetail.Driver_Tip || 0, 'USD') }</td>
									</tr>
								{/if}
								<tr>
									<td class="td-labels charge label">Tax ({ (OrderDetail.Tax_Rate * 100) }%):</td>
									<td class="number-sign plus-sign charge">+</td>
									<td class="td-values charge">{ currency_str_(OrderDetail.Tax, 'USD') }</td>
								</tr>
								<tr>
									<td class="td-labels charge label total-label aggregate-label">Total (Customer Paid):</td>
									<td class="number-sign equal-sign charge">=</td>
									<td class="td-values charge total-value aggregate-value">
										{ currency_str_(OrderDetail.GrandTotal, 'USD') }
									</td>
								</tr>
								<tr>
									<td class="td-labels charge label">Service Charge:</td>
									<td class="number-sign minus-sign charge">-</td>
									<td class="td-values charge">{ currency_str_(OrderDetail.ServiceFee || 0, 'USD') }</td>
								</tr>
								{#if is_ServiceType_Deliverable && !is_DeliveryMode_restaurant}
									<tr>
										<td class="td-labels charge label">Delivery Charge (by Delivery Co.):</td>
										<td class="number-sign minus-sign charge">-</td>
										<td class="td-values charge">
											{ currency_str_(OrderDetail.Owner_DeliveryCharge_Restaurant, 'USD') }
										</td>
									</tr>
									<tr>
										<td class="td-labels charge label">Tip ({ OrderDetail.Driver_Tip_Percent }%) (Paid to Driver):</td>
										<td class="number-sign minus-sign charge">-</td>
										<td class="td-values charge">{ currency_str_(OrderDetail.Driver_Tip || 0, 'USD') }</td>
									</tr>
								{/if}
								<tr>
									<td class="td-labels charge label net-account-label aggregate-label">Net Account Credit:</td>
									<td class="number-sign equal-sign charge">=</td>
									<td class="td-values charge net-account-value aggregate-value">
										{ currency_str_(OrderDetail.Owner_NetAccountCredit || 0, 'USD') }
									</td>
								</tr>
							</tbody>
						</table>
					{/if}
		</div>
		</div>

		<div class="row">
		<div class="col-md-6">
			<div class="info-section">
			<div class="info-title">Customer Info</div>
			<div class="info-details">
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Name</div>
				<div class="info-field-value f-black">{ $order$.CustomerInfo.FullName }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Phone</div>
				<div class="info-field-value">{ $order$.CustomerInfo.Phone ? phone_str_($order$.CustomerInfo.Phone) : 'N/A' }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Email</div>
				<div class="info-field-value">{ $order$.CustomerInfo.Email || 'N/A' }</div>
				</div>
				<div class="info-field clearfix delivery-address-field">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Delivery Address</div>
				<div class="info-field-value">{ OrderDetail.DeliveryAddress || 'N/A' }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Apt/Suite</div>
				<div class="info-field-value">{ OrderDetail.Apartment_Suite || 'N/A' }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Delivery Instructions</div>
				<div class="info-field-value">{ OrderDetail.Instructions || 'N/A' }</div>
				</div>
			</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="info-section">
			<div class="info-title">Order Info</div>
			<div class="info-details">
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Status</div>
				<div class="info-field-value f-black"
											class:text-success={OrderDetail.Is_Accepted && !order_is_cancelled_(OrderDetail)}
											class:text-danger={order_is_cancelled_(OrderDetail)}
											class:text-dark-gray={OrderDetail.StatusID == order_status_r_StatusID.MENUS_AGENT_CALLRESTAURANT_ADD_QUEUE}
								>{ OrderDetail.Status }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">ID</div>
				<div class="info-field-value">{ OrderDetail.ID }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Order Number</div>
				<div class="info-field-value">{ OrderDetail.OrderNumber }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Date of Order</div>
				<div class="info-field-value">{ shortDate_(OrderDetail.OrderDate) }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Time of Order</div>
				<div class="info-field-value">{ shortTime_(OrderDetail.OrderDate) }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Service Type</div>
				<div class="info-field-value f-black">{ OrderDetail.ServiceType }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Subscription</div>
				<div class="info-field-value f-black">{ OrderDetail.SubscriptionName }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-label">Customer Sold out action</div>
				<div class="info-field-value f-black">{ OrderDetail.SoldOutAction || 'None' }</div>
				</div>
				<div class="info-field clearfix">
				<div class="info-field-label f-black">
					{is_DeliveryMode_DELIVERY_COMPANY_(OrderDetail.DeliveryModeID) ? deliver_text_label : 'Ready By'}
				</div>
				<div class="info-field-dots">&nbsp;</div>
				<div class="info-field-value f-black">
					{ mm_dd_YY_(ORDER_READY_ETA_date, '/') } {HH_mm_meridian_(ORDER_READY_ETA_date)}
				</div>
				</div>
							{#if is_ServiceType_Deliverable_(OrderDetail.ServiceType)}
				<div class="info-field clearfix">
					<div class="info-field-label f-black">Delivery ETA</div>
					<div class="info-field-dots">&nbsp;</div>
					<div class="info-field-value f-black">
					{ mm_dd_YY_(ORDER_COMPLETED_ETA_date, '/') } {HH_mm_meridian_(ORDER_COMPLETED_ETA_date)}
					</div>
				</div>
				{/if}
							{#if is_ServiceType_Deliverable_(OrderDetail.ServiceType)}
				<div class="info-field clearfix">
					<div class="info-field-dots">&nbsp;</div>
					<div class="info-field-label">Delivery Status</div>
					<div class="info-field-value f-black">{ OrderDetail.DeliveryCompany_Status || 'None' }</div>
				</div>
								{#if delivery_contact_str}
					<div class="info-field clearfix">
					<div class="info-field-label f-black"
										>For any delivery inquiries, please call { delivery_contact_str }</div>
					</div>
				{/if}
								<div class="info-field clearfix">
					<div class="info-field-dots">&nbsp;</div>
					<div class="info-field-label">Driver Name</div>
					<div class="info-field-value f-black">{ OrderDetail.DeliveryCompany_Driver_Name || 'None' }</div>
				</div>
				{/if}
			</div>
			</div>
		</div>
		</div>
	</div>
	{/if}
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.OrderDetails {
	.page-title-section {
		.page-title-text {
			font-size: 24px;
			margin-bottom: 16px;
			cursor: unset;

			.order-number, .order-eta {
				color: $brand-success;
			}

			.customer-name, .order-number, .order-items-count {
				margin-right: 8px;
			}
		}

		// @media (max-width: $screen-xs-max) {
		// 	.page-title-text {
		// 		font-size: 19px;
		// 	}
		// 	.arrow-left-icon {
		// 		vertical-align: sub;
		// 	}
		// }
	}
	.OrderTransitionUI {
		position: relative;
		overflow: hidden;
		@media (max-width: $screen-xs-max) {
			margin-top: 16px;
			.offset {
				display: block;
			}
			.action-buttons {
				display: flex;
				flex-direction: row;
			}
			button.btn {
				flex: 1;
				margin-right: 0;
			}
		}
		@media (max-width: 356px) {
			text-align: center;
		}
		.OrderTransitionUI {
			float: left;
			text-align: left;
		}
		.action-buttons {
			.btn {
				&.btn-map-customer-route {
					@media (min-width: $screen-lg-min) {
						&.no-side-margin {
							margin-left: 0;
						}
					}
				}
			}
			@media (max-width: $screen-xs-max) {
				display: flex;
				flex-direction: row;
				.btn {
					min-width: auto;
					margin-right: 0;
				}
			}
		}
		.status-declined {
			color: $brand-danger;
			line-height: 40px;
		}
	}
	.info-section {
		.info-title {
			margin-top: 24px;
			font-weight: $lato-black;
			font-size: 18px;
			@media (max-width: $screen-xs-max) {
				margin-top: 16px;
			}
		}
		.info-details {
			padding: 26px;
			border: 1px solid rgba(#455A64, .3);
			border-radius: 3px;
			.info-field {
				position: relative;
				margin-top: 6px;
				@media (max-width: $screen-xs-max) {
					margin-top: 8px;
				}
				.info-field-dots {
					position: absolute;
					left: 0;
					bottom: 4px;
					border-top: 1px dotted rgba(38, 50, 56, 0.30);
					width: 100%;
					height: 1px;
					@media (max-width: $screen-xs-max) {
						display: none;
					}
				}
				.info-field-label {
					position: relative;
					float: left;
					background-color: white;
					padding-right: 6px;
					@media (max-width: $screen-xs-max) {
						width: 100%;
					}
				}
				.info-field-value {
					position: relative;
					float: right;
					background-color: white;
					@media (min-width: $screen-sm-min) {
						padding-left: 6px;
					}
					@media (max-width: $screen-xs-max) {
						float: left;
						width: 100%;
						font-weight: $lato-black;
						padding-top: 8px;
						padding-bottom: 8px;
						border-bottom: 1px dotted rgba(38, 50, 56, 0.30);
					}
				}
			}
		}
	}
	.order-details-section {
		.order-details-title {
			margin: 24px 0 0;
			font-weight: $lato-black;
			font-size: 18px;
		}
		.order-details-list {
			@media(max-width: $screen-xs-max) {
				table tbody tr {
					&.tr-item td {
						display: flex;
						flex-direction: row;
						.table-responsive-label {
							flex: 0;
							min-width: 100px;
							max-width: 100px;
						}
						.table-responsive-value {
							flex: 1;
						}
					}
				}
			}
			.tr-item {
				vertical-align: top;
				td {
					vertical-align: top;
					.menu-detail-instructions {
						color: $brand-primary;
						margin-top: 4px;
					}
				}
				.OptionDetail {
					.OptionDetailMenuoptionitemName {
						font-weight: bold;
					}
					.Menuoptionitem {
						display: flex;
						flex-direction: row;
						padding: 0 0 0 2rem;
						.MenuoptionitemMenuoptionitemName {
							flex-grow: 1;
							text-align: left;
						}
						.MenuoptionitemTotal {
							width: 2rem;
							text-align: right;
						}
					}
				}
			}
		}
		.totals {
			margin: 0 0 0 auto;
			tr {
				td {
					padding: 6px 12px;
					&.td-labels {
						text-align: left;
						padding-right: 0;
					}
					&.td-values {
						text-align: right;
						padding-left: 0;
					}
				}
				.value {
					margin-top: 3px;
					text-align: right;
					&.aggregate-value {
						margin: 11px 0;
						font-weight: $lato-black;
						&.total-value {
							border-bottom: 1px solid #DBDBDB;
							border-radius: 0;
							padding-bottom: 11px;
						}
						&.net-account-value {
							font-size: 18px;
						}
					}
					.number-sign {
						display: inline-block;
						font-weight: $lato-black;
						width: 20px;
						text-align: center;
					}
					.plus-sign {
						color: $brand-success;
					}
					.minus-sign {
						color: $brand-danger;
					}
				}
				.charge {
					margin: 0 0 11px;
					text-align: right;
					&.aggregate-label {
						font-weight: $lato-black;
						&.total-label {
							border-bottom: 1px solid #DBDBDB;
							border-radius: 0;
						}
						&.net-account-label {
							font-size: 18px;
						}
					}
				}
			}
		}
	}
}
</style>
	