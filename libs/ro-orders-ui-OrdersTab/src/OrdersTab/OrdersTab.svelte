<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { OrderStatusHistoryModal, OrderDetails } from '@menus/ro-orders-ui'
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { ORDERS_TAB } from '@menus/web-config'
import type { ro_orders_ui_OrdersTab_Ctx } from '../ro_orders_ui_OrdersTab_Ctx.js'
import { OrdersTab_c, view_selection_T } from './OrdersTab_c.js'
import OrdersTab_Filters from './OrdersTab_Filters.svelte'
import OrdersTab_OrderList from './OrdersTab_OrderList.svelte'
import OrdersTab_Search from './OrdersTab_Search.svelte'
const ctx = getContext_ui_ctx() as ro_orders_ui_OrdersTab_Ctx
const ro_auth_rules$ = ro_auth_rules$_b(ctx)
export const _ = new OrdersTab_c(ctx)
const {
	busy$, order_status_history_modal$, selected_order$, ro_orders_TotalRow$, show_filters$, view_order_a$,
	view_order_a_tup_a$, view_selection$, filtered_view_order_a$
} = _
let OrdersTab:HTMLDivElement, order_list:HTMLDivElement, scrollTop:number, scrollTopOrderList:number
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $ro_auth_rules$[ORDERS_TAB]}
<OrderStatusHistoryModal bind:this={$order_status_history_modal$}></OrderStatusHistoryModal>
<div bind:this={OrdersTab} class="OrdersTab page"
		 on:scroll={evt=>scrollTop = evt.target.scrollTop}
		 on:scroll={_.load_next_page_order_list}
>
	{#if $busy$}
		<PageLoader center="parent"></PageLoader>
	{/if}
	<div class="scroll-to-top fa fa-arrow-circle-up" class:show={scrollTop > 0}
			 on:click={evt => OrdersTab.scrollTo({ top: 0, behavior: 'smooth' })}
	></div>
	<div class="scroll-to-top fa fa-arrow-circle-up" class:show={scrollTopOrderList > 0}
		on:click={evt => order_list.scrollTo({ top: 0, behavior: 'smooth' })}
	></div>
	{#if $show_filters$}
		<div class="customer-order-search" class:filters-active={$show_filters$}>
			<OrdersTab_Filters {_}></OrdersTab_Filters>
		</div>
	{/if}
	{#if !$view_order_a$}
		<PageLoader></PageLoader>
	{:else}
		<div class="orders-view-wrapper" class:has-no-orders={!$filtered_view_order_a$.length && !$busy$}>
			<div class="orders-view-sidebar" class:selected-order={!!$selected_order$}>
				{#if !$show_filters$}
					<div class="customer-order-search" class:filters-active={$show_filters$}>
						<OrdersTab_Search {_}></OrdersTab_Search>
					</div>
				{/if}

				<ul class="view_order_a_nav nav nav-pills">
					{#each $view_order_a_tup_a$ || [] as [view_key, order_a]}
						<li class:active={$view_selection$ === view_key}>
							<a href="." on:click|preventDefault={evt => _.change_view_selection(view_key)}
							>{view_key} ({view_key === view_selection_T.ALL ? $ro_orders_TotalRow$ : order_a.length})</a>
						</li>
					{/each}
				</ul>

				{#if $filtered_view_order_a$.length}
					<div class="order-list-wrapper"
						bind:this={order_list}
						on:scroll={evt=>scrollTopOrderList = evt.target.scrollTop}
						on:scroll={evt=>_.load_next_page_order_list(evt)}
						>
						<OrdersTab_OrderList {_}></OrdersTab_OrderList>
					</div>
				{/if}
			</div>

			{#if $filtered_view_order_a$.length}
				<div class="order-details-wrapper">
					{#if $selected_order$}
						<OrderDetails fireFlyID={$selected_order$.FireFlyID} orderID={$selected_order$.ID} on:hideOrderDetails={evt=>_.hide_order_details()}></OrderDetails>
					{/if}
				</div>
			{/if}

			{#if !$filtered_view_order_a$.length && !$busy$}
				<div class="no-order-found-message">
					<div class="no-order-found-background"></div>
					<h1 class="no-order-found-text">No orders in process</h1>
				</div>
			{/if}
		</div>
	{/if}
</div>
{/if}

<style type=text/scss global>
@import "@menus/css/clearfix";
@import "@menus/ro-shared-css/lib";
.OrdersTab {
	// position: relative;
	// height: calc(100vh - 170px);
	// overflow: hidden;
	// @media (max-height: 900px) {
	// 	height: calc(100vh - 156px);
	// 	overflow-y: auto;
	// }
	// @media (max-width: $screen-md-max) {
	// 	height: calc(100vh - 128px);
	// }
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
	.PageLoader {
		.page-loader-container {
			margin-top: 48px;
		}
	}
	.customer-order-search {
		&.filters-active {
			padding-left: 22px;
			padding-right: 22px;
			color: white;
			background-color: $gray;
			border-radius: 4px;
		}
		.btn {
			float: left;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 24px;
			margin-bottom: 16px;
			width: auto;
			@media (max-width: $screen-xs-max) {
				margin-right: 0;
			}
			&:last-child {
				margin-right: 0;
			}
		}
	}

	.orders-view-wrapper {

		@media (max-width: $screen-md-max) {
			padding-top: 8px;
		}

		@media (min-width: $screen-md-min) {
			display: flex;
		}

		.orders-view-sidebar {

			@media (min-width: $screen-md-min) {
				flex-basis: 400px; 
				flex-grow: 0; 
				flex-shrink: 0;
			}

			&.selected-order {

				@media (max-width: $screen-sm-max) {
					display: none;
				}
			}

			.view_order_a_nav {
				height: 24px;
				display: flex;
				flex-direction: row;
				margin: 12px 0;
			}

			.order-list-wrapper {
				height: calc(100vh - 230px);
				overflow: auto;
				border-radius: 4px;
				box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%), 0 3px 1px -2px rgb(0 0 0 / 20%);

				@media (min-width: $screen-md-min) {
					height: calc(100vh - 260px);
				}
			}
		}

		.order-details-wrapper {

			@media (min-width: $screen-md-min) {
				flex-basis: 100%;
				overflow: auto;
				margin-left: 24px;
				height: calc(100vh - 175px);
			}
		}

		&.has-no-orders {

			.no-order-found-message {
				position: relative;
				width: 100%;
    			height: 500px;

				.no-order-found-background {
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					width: 100%;
					opacity: 0.2;
					background-image: vurl('/assets/img/cuisines/french-bistro.svg');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
					z-index: -1;
				}

				.no-order-found-text {
					margin: 24px 0 0;
					text-align: center;
				}
			}
		}
	}
}
</style>
