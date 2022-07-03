<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { api_src_ } from '@menus/api'
import type { Menuitem } from '@menus/consumer-menu'
import { is_navigating_onclick_b } from '@menus/page'
import { Enable_Yelp_Count$_b, Enable_Yelp_Rating$_b } from '@menus/platform-settings'
import { restaurant_url_, menuitem_restaurant_url_data_ } from '@menus/route'
import { SERVICE_TYPE_DINEIN, SERVICE_TYPE_PICKUP, serviceType$_b } from '@menus/service-type'
import { getContext_ui_ctx } from '@menus/ui'
import { distance_text_ } from '@menus/util'
import { page_query$_b } from '@ctx-core/sapper'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
import { Menuitem_c } from './Menuitem_c.js'
import { query_str_ } from '@ctx-core/uri';
export let config = { viewOnly: false }, menuitem:Menuitem, show_close = false
const ctx = getContext_ui_ctx() as consumer_search_ui_Ctx, dispatch = createEventDispatcher()
const is_navigating_onclick = is_navigating_onclick_b(ctx)
const Enable_Yelp_Count = Enable_Yelp_Count$_b(ctx)
const Enable_Yelp_Rating = Enable_Yelp_Rating$_b(ctx)
const serviceType = serviceType$_b(ctx)
const page_query$ = page_query$_b(ctx)
export const _ = new Menuitem_c(ctx, dispatch)//region
const { itemTrending, platform_settings } = _
$: _.menuitem.$ = menuitem
let viewOnly:boolean
$: viewOnly = config.viewOnly
let itemHasCoupon:boolean
$: itemHasCoupon = !!menuitem?.CouponCode
let restClosed:boolean
$: restClosed = !menuitem?.isOpen
</script>

<div class="Menuitem menu-menuitem-container {$serviceType}">
  {#if menuitem}
    {#if config.bubble}
      <div class="menu-menuitem-bubble"></div>
    {/if}
		{#if show_close}
      <div class="close" on:click={_.onclose}>&times;</div>
    {/if}
		<div
			class="menu-menuitem"
			class:is_selected={menuitem.is_selected}
			on:mouseover={_.onmouseover}
			on:focus={_.onmouseover}
			on:mouseout={_.onmouseout}
			on:blur={_.onmouseout}
		>
      <div
				class="ribbon ribbon-primary align-left trending-ribbon"
				class:menuitem-trending={$itemTrending}
			><span>Popular</span></div>
      <div
				class="ribbon ribbon-second ribbon-success align-left coupon-ribbon"
				class:menuitem-has-coupon={itemHasCoupon}
			>
        <span>Coupon { (menuitem.CouponDiscount * 100).toFixed(1) }% OFF</span>
      </div>
      <div class="clearfix menu-menuitem-content">
        <div class="menu-menuitem-img-container">
          {#if menuitem.MenuImageExist || menuitem.RestImageExist}
            <div class="menu-menuitem-img">
              <img src={ api_src_(menuitem.FileName) } alt={ menuitem.MenuItemName }/>
            </div>
          {:else}
            <div class="menuitem-cuisine-icon-parent clearfix">
              <div class="cuisine-icon-{menuitem.CuisineID} menuitem-cuisine-icon"></div>
            </div>
          {/if}
					<div class="yelp-rating">
            {#if $Enable_Yelp_Rating}
              <div class="yelp-icon yelp-icon-0 yelp-icon-{ menuitem.RestRating }">&nbsp;</div>
            {/if}
						<div class="yelp-logo-rating">
              {#if $Enable_Yelp_Rating || $Enable_Yelp_Count}
                <img class="yelp-logo" src="/assets/img/yelp/yelp-logo.svg" alt="">
              {/if}
							{#if $Enable_Yelp_Count}
                <span class="yelp-rating-count c-text2">({ menuitem.RestRatingCount || 0 })</span>
              {/if}
            </div>
          </div>
        </div>
        <div class="menuitem-details">
          <div class="clearfix">
            <div class="menu-menuitem-name text-overflow">{ menuitem.MenuItemName }</div>
            <div class="menuitem-price">${ menuitem.Price }</div>
          </div>
          <div class="menu-menuitem-desc c-text2">{ (menuitem.MenuItemDescription || '').substr(0, 80) }</div>
          <div class="menuitem-restaurant-name-container clearfix">
            <div class="menuitem-restaurant-name">{ menuitem.RestaurantName || '&nbsp;' }
							{#if config.showDistance && menuitem.Distance}
                <span class="c-primary">({ distance_text_(menuitem.Distance) })</span>
              {/if}
            </div>
          </div>
					{#if config.showAddress && menuitem.Address}
            <div>{ menuitem.Address }</div>
          {/if}
					<div class="clearfix">
            {#if $serviceType !== SERVICE_TYPE_DINEIN}
              <div
								class="menuitem-fees c-text2"
								class:rest-closed={restClosed}
							>
                {#if $serviceType !== SERVICE_TYPE_PICKUP}
                  <span>Delivery Fee ${ menuitem.DeliveryCharge }
										&nbsp;&nbsp;•&nbsp;&nbsp;Min Order ${ menuitem.MinOrder }
										&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                {/if}
								<span>ETA { menuitem.ETA } MIN</span>
              </div>
            {/if}
						<div class="menuitem-available"
								 class:rest-closed={restClosed}
						>
              <span class="menuitem-available-status"
										class:c-primary={!menuitem.IsOpen}
							>{ menuitem.Availability }</span>
            </div>
          </div>
        </div>
      </div>
      <div class="menuitem-actions clearfix" class:view-only={viewOnly}>
        {#if
					!config.hideMoreDishes
					&& !config.viewOnly
					&& menuitem.ItemCount > 1
					&& !menuitem.busy
				}
          <a href="."
						 on:click|preventDefault|stopPropagation={evt => _.onclick_more_dishes(evt)}
						 class="btn btn-xs more-dishes c-text1"
					>More Dishes</a>
        {/if}
				<a
					href="{restaurant_url_(menuitem_restaurant_url_data_(menuitem, $serviceType))}{$page_query$?.keywords ? query_str_({ keywords: $page_query$?.keywords }) : ''}"
					class="btn btn-success btn-xs view-menu"
				>View Menu</a>
      </div>
    </div>
  {/if}
</div>

<style type="text/scss">
@import "@menus/css/lib";
@import "@menus/css/clearfix";
.Menuitem {
	position: relative;
	float: left;
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 370px;
	min-height: 250px;
	max-height: 250px;
	margin-bottom: 30px;
	padding: 16px;
	cursor: pointer;
	text-align: left;
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
	border-radius: 3px;
	border: 2px solid transparent;
	background: white;
	@media (min-width: $screen-sm-min) {
		margin-right: 30px;
	}
	@media (max-width: $screen-xs-max) {
		max-width: none;
	}
	.menu-menuitem-bubble {
		background-color: white;
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
		content: "\A0";
		display: block;
		left: 50%;
		position: absolute;
		top: 100%;
		transform: rotate(45deg);
		height: 12px;
		width: 12px;
		margin-top: -6px;
		margin-left: -6px;
		z-index: 0;
	}
	.close {
		z-index: 1;
		position: absolute;
		top: 0;
		right: 4px;
		cursor: pointer;
	}
	.menu-menuitem {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		min-height: 248px;
		max-width: 366px;
		padding: 16px;
		background-color: white;
		border: 2px solid transparent;
		&.is_selected {
			border-color: $brand-success;
		}
		.menu-menuitem-content {
			flex-grow: 1;
			.menu-menuitem-img-container {
				float: left;
				margin-right: 16px;
				.menu-menuitem-img {
					position: relative;
					width: 96px;
					height: 96px;
					margin: 0 auto;
					background-color: #F5F7F7;
					@media (max-width: $iPhone6-width - 1) {
						width: 64px;
						height: 64px;
					}
					img {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto;
						max-width: 100%;
						max-height: 100%;
					}
				}
				.menuitem-cuisine-icon-parent {
					background-color: #F5F7F7;
					padding: 24px;
					@media (max-width: $iPhone6-width - 1) {
						padding: 8px;
					}
					.menuitem-cuisine-icon {
						width: 48px;
						height: 48px;
						margin: 0 auto;
					}
				}
				.yelp-rating {
					margin: 7px 0 12px;
					.yelp-icon {
						display: inline-block;
						width: 96px;
						height: 14px;
						@media (max-width: $iPhone6-width - 1) {
							width: 64px;
						}
					}
					.yelp-logo-rating {
						@extend .clearfix;
						.yelp-logo {
							vertical-align: middle;
							float: left;
							margin-left: 4px;
						}
						.yelp-rating-count {
							font-size: 12px;
							float: left;
							margin-top: 3px;
							margin-left: 3px;
						}
					}
				}
			}
			.menuitem-details {
				overflow: hidden;
			}
		}
		.trending-ribbon {
			display: none;
			&.menuitem-trending {
				display: block;
			}
		}
		.coupon-ribbon {
			display: none;
			&.menuitem-has-coupon {
				display: block;
			}
		}
		.menuitem-cuisine-icon-container {
			float: left;
			margin-right: 16px;
			background-color: #F5F7F7;
			.menuitem-cuisine-icon-parent {
				padding: 12px;
				.menuitem-cuisine-icon {
					width: 48px;
					height: 48px;
					margin: 0 auto;
				}
			}
		}
		.menu-menuitem-name {
			font-weight: $lato-bold;
			font-size: 14px;
			letter-spacing: 0;
			line-height: 20px;
			float: left;
			width: 70%;
		}
		.menuitem-price {
			font-weight: $lato-black;
			font-size: 14px;
			letter-spacing: 0;
			padding-left: 4px;
			float: right;
		}
		.menu-menuitem-desc {
			font-size: 12px;
			color: #7C8B92;
			margin: 4px 0 22px;
			height: 34px;
			overflow: hidden;
		}
		.menuitem-actions {
			text-align: center;
			border-top: 1px solid #DBDBDB;
			margin-top: 0;
			padding-top: 16px;
			&.view-only {
				text-align: right;
			}
			a {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.menuitem-restaurant-name-container {
			.menuitem-restaurant-name {
				width: 100%;
				font-weight: $lato-bold;
				font-size: 12px;
				letter-spacing: 0;
			}
			.view-menu {
				float: left;
				width: 30%;
				text-align: right;
				opacity: 0.39;
				font-family: $lato-bold;
				font-size: 10px;
			}
		}
		.menuitem-fees {
			font-weight: $lato-regular;
			font-size: 10px;
			color: #7C8B92;
			letter-spacing: 0;
			height: 34px;
			&.rest-closed {
				display: none;
			}
		}
		.menuitem-available {
			display: none;
			&.rest-closed {
				display: block;
				.menuitem-available-status {
					font-size: 10px;
					margin-right: 5px;
				}
			}
		}
		.view-menu, .more-dishes, .add-to-cart {
			min-width: 96px;
			height: 24px;
			font-size: 12px;
		}
		.view-menu, .more-dishes {
			color: $gray;
			background: #F5F7F7;
			@media (max-width: $iPhone6-width - 1) {
				width: 48%;
			}
		}
		.more-dishes {
			float: left;
			@media (max-width: $iPhone6-width - 1) {
				margin-right: 1%;
			}
		}
		.view-menu {
			float: right;
			@media (max-width: $iPhone6-width - 1) {
				margin-left: 1%;
			}
		}
		.more-dishes-placeholder {
			float: left;
			width: 96px;
			height: 24px;
		}
		.add-to-cart {
			float: right;
			@media (max-width: $iPhone6-width - 1) {
				width: 100%;
				margin-top: 11px;
			}
		}
		.menu-menuitem-more {
			margin-top: 10px;
			width: 30px;
			height: 30px;
		}
	}
	.menu-items-pager {
		//border-top: 1px solid #DBDBDB;
		text-align: center;
		margin-left: 24px;
		margin-right: 24px;
		padding: 13px 8px;
		.page-no {
			font-size: 12px;
			color: #455A64;
		}
		.left-arrow,
		.right-arrow {
			color: #474747;
		}
	}
	.menu-menuitem-loader {
		padding-top: 25px;
		background-color: white;
		width: 100%;
		position: absolute;
		height: 100%;
		top: 0;
		bottom: 0;
	}
}
</style>
