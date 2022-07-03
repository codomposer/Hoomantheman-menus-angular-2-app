<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { currency_str_ } from '@ctx-core/currency'
import { PageLoader } from '@menus/shared-ui'
import { innerWidth_gt_SCREEN_SM_MIN$_b, innerWidth_lte_SCREEN_SM_MIN$_b } from '@menus/dom'
import { getContext_ui_ctx } from '@menus/ui'
import { CrMainDashboard } from '@menus/consumer-layout-ui'
import { userAddress_text_short_ } from '@menus/user-address-common'
import { Profile } from '@menus/user-address-ui'
import { ThankYouPointsModal, WriteReviewModal, write_review } from '@menus/consumer-order-ui'
import { PROFILE_ORDERS_TAB, order_status_r_StatusID } from '@menus/web-config'
import { shortDate_, shortTime_ } from '@menus/date'
import { is_ServiceType_Deliverable_, ServiceTypeId } from '@menus/service-type-common'
import type { past_orders_ui_Ctx } from '../past_orders_ui_Ctx.js'
import { PastOrder_c } from './PastOrder_c.js'
export let orderID:number
const ctx = getContext_ui_ctx() as past_orders_ui_Ctx
const innerWidth_gt_SCREEN_SM_MIN$ = innerWidth_gt_SCREEN_SM_MIN$_b(ctx)
const innerWidth_lte_SCREEN_SM_MIN$ = innerWidth_lte_SCREEN_SM_MIN$_b(ctx)
export const _ = new PastOrder_c(ctx)
const { busy$, coupon_discount$, delivery_address$, order$, order_items$ } = _
$: _.orderID$.$ = orderID
let ThankYouPointsModal_i:ThankYouPointsModal, WriteReviewModal_i:WriteReviewModal
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
let is_ServiceType_Deliverable
$: is_ServiceType_Deliverable = is_ServiceType_Deliverable_(ServiceTypeId[$order$?.ServiceType])
</script>

<CrMainDashboard>
<div class="PastOrder">
	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a href="/past-orders">« My Orders</a>
			</li>
			<li class="breadcrumb-item active">
				<span>Order { $order$?.OrderNumber || '' }</span>
			</li>
		</ul>
	</div>

	<Profile activeTab={PROFILE_ORDERS_TAB}></Profile>
	<div class="profile-order-details">
		<WriteReviewModal bind:this={WriteReviewModal_i}></WriteReviewModal>
		<ThankYouPointsModal bind:this={ThankYouPointsModal_i}></ThankYouPointsModal>
		<div class="top-section">
			<div class="row">
			<div class="col-sm-6">
				<div class="order-number" on:click={_.goBack}>
				<div class="arrow-left-icon"></div>
				Order { $order$?.OrderNumber || '' }
				</div>
			</div>
			<div class="col-sm-6"
							class:text-right={$innerWidth_gt_SCREEN_SM_MIN$}
					>
				<button class="btn btn-primary btn-write-review"
										class:btn-xlg={$innerWidth_gt_SCREEN_SM_MIN$}
										class:btn-sm={$innerWidth_lte_SCREEN_SM_MIN$}
										on:click={write_review($order$, WriteReviewModal_i, ThankYouPointsModal_i)}
						>{ $order$?.IsReviewed ? 'Edit' : 'Write' } Review
				</button>
						<!-- <button class="btn btn-primary btn-inverse btn-reorder">Reorder</button> -->
			</div>
			</div>
		</div>
		<div class="main-section">
			<div class="row">
			{#if $busy$}
				<PageLoader center="parent"></PageLoader>
			{:else}
				<div class="col-sm-6">
				<div class="info-section">
					<div class="info-title">
					Order Info
					</div>
					<div class="info-details">
					<div class="info-field clearfix">
						<div class="info-field-dots">&nbsp;</div>
						<div class="info-field-label">Status</div>
						<div class="info-field-value f-black"
												class:text-success={$order$?.OrderStatusID === order_status_r_StatusID.ORDER_ACCEPTED}
												class:text-danger={$order$?.OrderStatusID === order_status_r_StatusID.ORDER_CANCELLED_BY_REST}
												class:text-dark-gray={$order$?.OrderStatusID === order_status_r_StatusID.MENUS_AGENT_CALLRESTAURANT_ADD_QUEUE}
										>{ $order$?.ConsumerOrderStatusText || '' }</div>
					</div>
					<div class="info-field clearfix">
						<div class="info-field-dots">&nbsp;</div>
						<div class="info-field-label">Order Number</div>
						<div class="info-field-value">{ $order$?.OrderNumber }</div>
					</div>
					<div class="info-field clearfix">
						<div class="info-field-dots">&nbsp;</div>
						<div class="info-field-label">Date of Order</div>
						<div class="info-field-value">{ shortDate_($order$?.OrderDate_ISO) }</div>
					</div>
					<div class="info-field clearfix">
						<div class="info-field-dots">&nbsp;</div>
						<div class="info-field-label">Time of Order</div>
						<div class="info-field-value">{ shortTime_($order$?.OrderDate_ISO) }</div>
					</div>
					<div class="info-field clearfix">
						<div class="info-field-dots">&nbsp;</div>
						<div class="info-field-label">Service Type</div>
						<div class="info-field-value f-black">{ $order$?.ServiceType }</div>
					</div>
									{#if $delivery_address$}
						<div class="info-field clearfix">
						<div class="info-field-dots">&nbsp;</div>
						<div class="info-field-label">Address</div>
						<div class="info-field-value f-black">
							<div>{
													(userAddress_text_short_($delivery_address$.Address, false) || '')
														.replace(`, ${$delivery_address$.City}`, '')
												}</div>
												{#if $delivery_address$.Address2}
							<div>{$delivery_address$.Address2}</div>
							{/if}
												<div>
							{$delivery_address$.City || ''},
													{$delivery_address$.State || ''}
													{$delivery_address$.Zip || ''}
							</div>
						</div>
						</div>
					{/if}
					</div>
				</div>
				</div>
				<div class="col-sm-6">
				<div class="order-details-section">
					<div class="order-details-title">
					Order Details
					</div>
					<div class="order-details-list">
					<table class="table table-striped table-center">
										<thead>
											<tr>
												<th>Item Name</th>
												<th>Qty</th>
												<th>Price</th>
												<th>Item Total</th>
											</tr>
										</thead>
										<tbody>
											{#each $order_items$ || [] as item}
												<tr>
													<td class="f-bold">{ item.ItemName }</td>
													<td>{ item.Qty }</td>
													<td>${ item.Price }</td>
													<td>${ item.Amount }</td>
												</tr>
											{/each}
											<tr class="tr-totals">
												<td>&nbsp;</td>
												<td>&nbsp;</td>
												<td class="td-labels">
													<div class="charge-label">Subtotal:</div>
													{#if $coupon_discount$}
														{#each $order$?.Coupons || [] as Coupon}
															<div class="charge-label">
																Coupon Discount({ Coupon.CouponCode }):
															</div>
														{/each}
														<div class="charge-label">
															Discounted Subtotal:
														</div>
													{/if}
													{#if is_ServiceType_Deliverable}
														<div class="charge-label">Delivery Charge:</div>
													{/if}
													<div class="charge-label">Tax ({ ($order$?.Tax_Rate * 100) }%):</div>
													{#if is_ServiceType_Deliverable}
														<div class="charge-label">Driver Tip ({ $order$?.Driver_Tip_Percent }%):</div>
													{/if}
													<div class="charge-label total-label">Total:</div>
												</td>
												<td class="td-values">
													<div class="charge-value">
														<span>{ currency_str_($order$?.SubTotal + $coupon_discount$ || 0, 'USD') }</span>
														<span class="c-success">+</span>
													</div>
													{#if $coupon_discount$}
														{#each $order$?.Coupons || [] as Coupon}
															{#if $coupon_discount$}
																<div class="charge-value">{ currency_str_(Coupon?.DiscountPrice || 0, 'USD') }
																	<span class="c-danger">-</span>
																</div>
															{/if}
														{/each}
														<div class="charge-value">
															<span>{ currency_str_($order$?.SubTotal || 0, 'USD') }</span>
															<span class="c-success">+</span>
														</div>
													{/if}
													{#if is_ServiceType_Deliverable}
														<div
															class="charge-value">{ currency_str_($order$?.DeliveryCharge || 0, 'USD') }
															<span class="c-success">+</span></div>
													{/if}
													<div class="charge-value">{ currency_str_($order$?.Tax || 0, 'USD') } <span
														class="c-success">+</span></div>
													{#if is_ServiceType_Deliverable}
														<div
															class="charge-value">{ currency_str_($order$?.Driver_Tip || 0, 'USD') }
															<span class="c-success">+</span></div>
													{/if}
													<div
														class="charge-value total-value">{ currency_str_($order$?.GrandTotal || 0, 'USD') }
														<span class="equal-sign">=</span></div>
												</td>
											</tr>
										</tbody>
					</table>
					</div>
				</div>
				</div>
			{/if}
			</div>
		</div>
	</div>
</div>
</CrMainDashboard>

<style type=text/scss global>
@import "@menus/css/lib";
.PastOrder {
	.breadcrumb-container {
		@include breadcrumb-container-default;
	}

	.profile-order-details {
		padding: 0 24px;
		@media (min-width: $screen-sm-min) {
			padding-left: 48px;
			padding-right: 48px;
		}
		.top-section {
			padding: 0 0 12px;
			border-bottom: 1px solid #DBDBDB;
			.order-number {
				font-weight: $lato-black;
				font-size: 18px;
				margin-top: 8px;
				cursor: pointer;
				.arrow-left-icon {
					display: block;
					float: left;
				}
			}
			.btn-primary {
				min-width: 200px;
			}
			.btn-write-review {
				margin-right: 24px;
				@media (max-width: $screen-sm-max) {
					margin-top: 12px;
				}
			}
		}
		.main-section {
			.row {
				min-height: 400px;
				.info-section {
					.info-title {
						margin-top: 12px;
						font-weight: $lato-black;
						font-size: 18px;
					}
					.info-details {
						margin-top: 20px;
						padding: 26px;
						border: 1px solid rgba(#455A64, .3);
						border-radius: 3px;
						.info-field {
							position: relative;
							margin-top: 6px;
							&.delivery-address-field {
								margin-top: 22px;
							}
							.info-field-dots {
								position: absolute;
								top: 12px;
								left: 0;
								bottom: 4px;
								border-top: 1px dotted rgba(38, 50, 56, 0.30);
								width: 100%;
								height: 1px;
							}
							.info-field-label {
								position: relative;
								float: left;
								background-color: white;
								padding-right: 6px;
							}
							.info-field-value {
								position: relative;
								float: right;
								background-color: white;
								padding-left: 6px;
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
						.tr-totals {
							td {
								&.td-labels {
									padding-right: 0;
									.charge-label {
										margin-top: 3px;
										text-align: right;
										&.total-label, &.net-account-label {
											margin: 11px 0;
											font-weight: $lato-black;
										}
										&.total-label {
											border-top: 1px solid #DBDBDB;
											border-radius: 0;
											padding-top: 11px;
										}
										&.net-account-label {
											font-size: 18px;
										}
									}
								}
								&.td-values {
									padding-left: 0;
									.charge-value {
										margin-top: 3px;
										text-align: right;
										&.total-value, &.net-account-value {
											margin: 11px 0;
											font-weight: $lato-black;
										}
										&.total-value {
											border-top: 1px solid #DBDBDB;
											border-radius: 0;
											padding-top: 11px;
										}
										&.net-account-value {
											font-size: 18px;
										}
										.equal-sign, .plus-sign, .minus-sign {
											display: inline-block;
											font-weight: $lato-black;
											width: 20px;
											text-align: center;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
