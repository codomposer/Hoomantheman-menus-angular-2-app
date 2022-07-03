<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { EnsureFontAwesome } from '@menus/font-awesome'
import { is_navigating_onclick_b, params_fireFlyID$_b } from '@menus/page'
import { ro_sideMenuOpened$_b, RoRestaurantNavUl } from '@menus/ro-layout-ui'
import { ro_orders_UnRead$_b, ro_orders_API_ORDERS_list_payload$_b } from '@menus/ro-orders'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import { ro_login_user$_b } from '@menus/ro-user-common'
import { Path } from '@menus/route'
import { getContext_ui_ctx } from '@menus/ui'
import { ORDERS_TAB, timeout_ms, } from '@menus/web-config'
import type { ro_edit_restaurant_ui_Ctx } from '../ro_edit_restaurant_ui_Ctx.js'
import { EditRestaurant_c } from './EditRestaurant_c.js'
const ctx = getContext_ui_ctx() as ro_edit_restaurant_ui_Ctx
const is_navigating_onclick = is_navigating_onclick_b(ctx)
const params_fireFlyID$ = params_fireFlyID$_b(ctx)
const ro_login_user$ = ro_login_user$_b(ctx)
const ro_orders_API_ORDERS_list_payload$ = ro_orders_API_ORDERS_list_payload$_b(ctx)
const ro_orders_UnRead$ = ro_orders_UnRead$_b(ctx)
const ro_restaurant$ = ro_restaurant$_b(ctx)
const ro_sideMenuOpened$ = ro_sideMenuOpened$_b(ctx)
export const _ = new EditRestaurant_c(ctx)
let refresh_spin = false
onMount(()=>_.onMount())
onMount(()=>refresh_orders())
onDestroy(()=>_.onDestroy())
async function refresh_orders() {
	await ro_orders_API_ORDERS_list_payload$.refresh()
	refresh_spin = true
	setTimeout(()=>refresh_spin = false, timeout_ms)
}
</script>

<EnsureFontAwesome></EnsureFontAwesome>
<div class="EditRestaurant">
  <div class="sticky-header"
			 class:sidebar-opened={$ro_sideMenuOpened$}
	>
    <!-- Nav tabs -->
		{#if $ro_login_user$?.ShowRestTabNav}
      <RoRestaurantNavUl class="nav nav-pills scrollable" show_tutorial_icon={true}></RoRestaurantNavUl>
    {/if}
		<div class="breadcrumb-container">
      <Breadcrumb prefix={`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`}></Breadcrumb>
			{#if $ro_restaurant$}
				<div class="restaurant-name cursor-default">
					{ $ro_restaurant$.Name || '' }
					<span
						class:text-success={$ro_restaurant$.Enabled}
						class:text-danger={!$ro_restaurant$.Enabled}
					>{ $ro_restaurant$.Enabled ? 'Enabled' : 'Disabled' }</span>
				</div>
			{/if}
    </div>
		<div class="new-orders-container" on:click={evt => refresh_orders()}>
			<a class="alert alert-primary text-center f-black alert-new-orders"
				 href="/backoffice/manage-restaurant/{$params_fireFlyID$}/{ORDERS_TAB}"
			>You have { $ro_orders_UnRead$ || 0 } {`New Order${$ro_orders_UnRead$ === 1 ? '' : 's'}`}</a>
			<div class="fa fa-refresh fa-spin" class:fa-spin={refresh_spin}></div>
		</div>
  </div>
  <div class="main-contents">
		<slot></slot>
  </div>
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
@import "@menus/css/clearfix";
.EditRestaurant {
	position: relative;
	@media (max-width: $screen-md-max) {
		padding-top: 36px;
	}
	@media (max-width: $screen-xs-max) {
		padding-top: 0;
	}
	> .sticky-header {
		position: fixed;
		top: calc(env(safe-area-inset-top, 0) + #{$navbar-height});
		right: 0;
		width: 100%;
		background: white;
		z-index: 99;
		transition: width 0.5s;
		&.sidebar-opened {
			width: calc(100% - #{$sidebar-width-md});
			@media (min-width: $screen-lg-min) {
				width: calc(100% - #{$sidebar-width-lg});
			}
			@media (max-width: $screen-xs-max) {
				width: 100%;
			}
		}
		.nav-pills {
			padding: 0 20px;
			border-bottom: 1px solid #DBDBDB;
			@media (max-width: $screen-xs-max) {
				display: none;
			}
			li {
				a {
					user-select: none;
				}
			}
		}
		.breadcrumb-container {
			overflow: hidden;
			margin: 0 24px;
			.breadcrumb {
				float: left;
			}
			.restaurant-name {
				float: left;
				margin: 0 0 0 12px;
				font-weight: $lato-black;
			}
		}
		.new-orders-container {
			position: relative;
			.alert-new-orders {
				display: block;
				cursor: pointer;
			}
			.fa-refresh {
				display: flex;
				position: absolute;
				height: 100%;
				width: 14px;
				top: 0;
				left: calc(100% - 40px);
				align-items: center;
				justify-content: center;
				color: white;
			}
		}
	}
	.main-contents {
		position: relative;
		padding-top: 89px;
		@media (max-width: $screen-md-max) {
			padding-top: 20px;
		}
		.page {
			margin-top: 0;
			padding-top: 0;
			min-height: calc(100vh - 164px);
		}
		.main-page-loader {
			padding-top: 16px;
		}
	}
}
</style>
