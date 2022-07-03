<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { Row } from '@menus/bootstrap'
import {
	innerWidth_gt_SCREEN_XS_MIN$_b, innerWidth_lte_SCREEN_MD_MIN$_b, innerWidth_lte_SCREEN_XS_MIN$_b,
} from '@menus/dom'
import { ro_orders_OrderList_a$_b } from '@menus/ro-orders'
import { OrderTransitionUI } from '@menus/ro-orders-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_orders_ui_OrdersTab_Ctx } from '../ro_orders_ui_OrdersTab_Ctx.js'
import type { OrdersTab_c } from './OrdersTab_c.js'
import OrdersTab_OrderList_Ribbon from './OrdersTab_OrderList_Ribbon.svelte'
import OrdersTab_OrderList_Status from './OrdersTab_OrderList_Status.svelte'
const ctx = getContext_ui_ctx() as ro_orders_ui_OrdersTab_Ctx
const innerWidth_lte_SCREEN_MD_MIN$ = innerWidth_lte_SCREEN_MD_MIN$_b(ctx)
const innerWidth_lte_SCREEN_XS_MIN$ = innerWidth_lte_SCREEN_XS_MIN$_b(ctx)
const innerWidth_gt_SCREEN_XS_MIN$ = innerWidth_gt_SCREEN_XS_MIN$_b(ctx)
const ro_orders_OrderList_a$ = ro_orders_OrderList_a$_b(ctx)
export let _:OrdersTab_c
const { busy$, filtered_view_order_a$, params_fireFlyID$, selected_order$ } = _
let navigating_away = false, scrollTop:number
const dispatch = createEventDispatcher()
</script>

<div class="OrdersTab_OrderList">
	<div class="order-list">
			<!-- <table class="table table-striped table-responsive-xs">
				<thead>
					<tr>
						<th>Order Number</th>
						<th><div class="CustomerName">Customer</div></th>
						<th>Service Type</th>
						<th><div class="Status">Status</div></th>
						<th>{$innerWidth_lte_SCREEN_MD_MIN$ ? '' : 'History'}</th>
						<th></th>
						<th>Instructions</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each $filtered_view_order_a$ as order}
						<tr on:click={evt => _.goto_order_details($params_fireFlyID$, order.ID)}
								on:click={evt => navigating_away = true}
						>
							{#if $innerWidth_lte_SCREEN_XS_MIN$}
								<td class="overflow-visible">
									<OrdersTab_OrderList_Ribbon {order}></OrdersTab_OrderList_Ribbon>
								</td>
							{/if}
							<td class="f-bold" title={order.OrderNumber}>{order.OrderNumber}</td>
							<td title={order.CustomerName}>
								{order.CustomerName}
							</td>
							<td>{ order.ServiceType }</td>
							<td>
								{#if $innerWidth_gt_SCREEN_XS_MIN$}
									<OrdersTab_OrderList_Status {order}></OrdersTab_OrderList_Status>
								{:else}
									<Row>
										<OrdersTab_OrderList_Status class="col-xs-6" {order}></OrdersTab_OrderList_Status>
										<a href="." class="col-xs-6 history" on:click|preventDefault>
											<div class="fa fa-history"></div>
										</a>
									</Row>
								{/if}
							</td>
							{#if $innerWidth_gt_SCREEN_XS_MIN$}
								<td class="history-container"
										on:click|stopPropagation={evt => _.open_order_status_history_modal(evt, order)}
								>
									<a href="." class="history" on:click|preventDefault>
										<div class="fa fa-history"></div>
									</a>
								</td>
							{/if}
							<td on:click|stopPropagation>
								<OrderTransitionUI
									{order}
									btn_size_class="btn-sm"
									show_accept_order={false}
									show_cancel_order={false}
									on:transition={()=>ro_orders_OrderList_a$.refresh()}
								></OrderTransitionUI>
							</td>
							<td on:click={evt => _.open_order_status_history_modal(evt, order)}>{ order.Instructions }</td>
							{#if $innerWidth_gt_SCREEN_XS_MIN$}
								<td>
									<OrdersTab_OrderList_Ribbon {order}></OrdersTab_OrderList_Ribbon>
									<div class="arrow-right-icon"></div>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table> -->

			{#each $filtered_view_order_a$ as order}
				<div class="order-details-section" class:active={order === $selected_order$} on:click={evt => _.show_order_details(order)}>
					<div class="order-status-ribbon">
						<OrdersTab_OrderList_Ribbon {order}></OrdersTab_OrderList_Ribbon>
					</div>

					<div class="details-item">
						<div class="details-item-info order-number">{order.OrderNumber}</div>
						<div class="details-item-info customer-name">{order.CustomerName}</div>
					</div>

					<div class="details-item">
						<div class="details-item-info service-type">{order.ServiceType}</div>
						<div class="details-item-info order-status">
							<OrdersTab_OrderList_Status {order}></OrdersTab_OrderList_Status>
						</div>
						<div class="details-item-info history-container" on:click|stopPropagation={evt => _.open_order_status_history_modal(evt, order)}>
							<a href="." class="history" on:click|preventDefault>
								<div class="fa fa-history"></div>
							</a>
						</div>
					</div>

					<div class="details-item">
						<div class="details-item-info order-transition" on:click|stopPropagation>
							<OrderTransitionUI
								{order}
								btn_size_class="btn-sm"
								show_accept_order={false}
								show_cancel_order={false}
								on:transition={()=>ro_orders_OrderList_a$.refresh()}
							></OrderTransitionUI>
						</div>
					</div>
				</div>
			{/each}
	</div>
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.OrdersTab_OrderList {
	position: relative;
	display: flex;
	height: calc(100vh - 273px);
	min-height: calc(100% - 108px);
	@media (max-width: $screen-md-max) {
		height: calc(100vh - 243px);
	}
	@media (max-width: $screen-xs-max) {
		height: calc(100vh - 261px);
	}
	@media (max-height: 900px) {
		overflow: hidden;
		height: auto;
	}
	> .scroll-to-top {
		position: fixed;
		bottom: 24px;
		right: 36px;
		display: none;
		font-size: 36px;
		z-index: 10;
		cursor: pointer;
		&:hover {
			color: $brand-success;
		}
		&.show {
			display: block;
		}
	}

	.order-list {
		width: 100%;

		.order-details-section {
			position: relative;
			border-bottom: 1px solid #dbdbdb;
    		padding: 16px;
			cursor: pointer;

			.details-item {
				display: flex;
				align-items: center;
				justify-content: space-between;

				&:not(:last-child) {
					margin-bottom: 16px;
				}

				.details-item-info {
					&:not(.history-container) {
						flex-basis: 100%;
					}

					&.order-number, &.customer-name {
						font-weight: 900;
					}

					&.customer-name {
						margin-right: 36px;
					}

					&.order-status {
						margin-right: 24px;
					}

					&.order-transition {

						.OrderTransitionUI {
							display: flex;
    						align-items: center;

							.auxiliary-text {
								margin-right: 36px;
							}
						}
					}
				}
			}

			&.active {
				background-color: #dbdbdb;	
			}
		}
	}

	// .order-list {
	// 	flex: 1;
	// 	overflow: hidden;
	// 	overflow-y: auto;
	// 	@media (max-height: 900px) {
	// 		overflow: hidden;
	// 	}
	// 	&.no_orders_in_process {
	// 		position: relative;
	// 		.background {
	// 			position: absolute;
	// 			top: 0;
	// 			left: 0;
	// 			height: 100%;
	// 			width: 100%;
	// 			opacity: 0.2;
	// 			background-image: vurl('/assets/img/cuisines/french-bistro.svg');
	// 			background-size: contain;
	// 			background-repeat: no-repeat;
	// 			background-position: center;
	// 			z-index: -1;
	// 		}
	// 		.message {
	// 			margin: 24px 0 0;
	// 			text-align: center;
	// 		}
	// 	}
	// 	table {
	// 		margin-bottom: 0;
	// 		thead {
	// 			tr {
	// 				th {
	// 					position: sticky;
	// 					top: -1px;
	// 					z-index: 10;
	// 					background: white;
	// 				}
	// 			}
	// 		}
	// 		tbody {
	// 			overflow-x: hidden;
	// 			overflow-y: auto;
	// 			@media (max-height: 900px) {
	// 				overflow-y: hidden;
	// 			}
	// 			> tr {
	// 				> td {
	// 					vertical-align: middle;
	// 					position: relative;
	// 					@media (max-width: $screen-xs-max) {
	// 						padding: 4px;
	// 					}
	// 					&.history-container {
	// 						text-align: center;
	// 					}
	// 					.Status {
	// 						font-weight: $lato-black;
	// 					}
	// 					.history {
	// 						overflow: hidden;
	// 						display: block;
	// 						height: 24px;
	// 						line-height: 24px;
	// 					}
	// 					.OrderTransitionUI {
	// 						float: left;
	// 						.action-buttons {
	// 							@media (max-width: $screen-xs-max) {
	// 								display: block;
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// 	.customer-img {
	// 		width: 48px;
	// 		height: 48px;
	// 		background-color: #DBDBDB;
	// 	}
	// }
	.PageLoader {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 200px;
		width: 100%;
	}
}
</style>
