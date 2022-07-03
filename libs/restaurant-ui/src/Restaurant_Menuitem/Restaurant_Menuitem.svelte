<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { Enable_Popular_Ribbon$_b } from '@menus/platform-settings'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import { api_src_ } from '@menus/api'
import type { Menuitem_I } from '@menus/consumer-menu'
import { set_selected_menuitem_ } from '../set_selected_menuitem_.js'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
export let menuitem:Menuitem_I
const ctx = getContext_ui_ctx() as restaurant_ui_Ctx
const { MenuItemID_h_menu_cartitem$ } = shopping_cart_b(ctx)
const Enable_Popular_Ribbon$ = Enable_Popular_Ribbon$_b(ctx)
const set_selected_menuitem = set_selected_menuitem_(ctx)
</script>

<div class="Restaurant_Menuitem menu-item clearfix"
		 on:click={_evt => set_selected_menuitem(menuitem)}
>
  {#if menuitem.MenuImageExist}
    <div class="menu-item-img-container">
      <img class="menu-item-img obj-fit-cover"
					 src={api_src_(menuitem.FileName)}
					 alt={ menuitem.RestaurantName }>
    </div>
  {/if}
	<div class="menu-item-details">
    <div class="clearfix">
      <div class="menu-item-name"
					 class:c-success={menuitem.cartCount}
			>
        { menuitem.MenuItemName }
				{#if $Enable_Popular_Ribbon$ && menuitem.PopularLevel === 1}
          <span class="trending-text"
								class:bg-primary={!menuitem.cartCount}
								class:bg-success={menuitem.cartCount}
					>Popular</span>
        {/if}
				{#if menuitem.CouponCode}
          <span class="coupon-text"
								class:bg-calm={!menuitem.cartCount}
								class:bg-success={menuitem.cartCount}
					>Coupon</span>
        {/if}
				{#if $MenuItemID_h_menu_cartitem$[menuitem.MenuItemID]}
          <span class="x-qty-text bg-success"
					>x{ $MenuItemID_h_menu_cartitem$[menuitem.MenuItemID].quantity }</span>
        {/if}
      </div>
      <div class="menu-item-icon arrow-right-icon"></div>
      <div class="menu-item-price">${ menuitem.Price }</div>
    </div>
    <div class="menu-item-desc c-text2">{ menuitem.MenuItemDescription }</div>
  </div>
</div>

<style type=text/scss>
@import "@menus/css/lib";
.Restaurant_Menuitem {
	border-bottom: 1px solid #DBDBDB;
	padding-bottom: 16px;
	margin-bottom: 16px;
	cursor: pointer;
	.menu-item-img-container {
		float: left;
		width: 120px;
		height: 120px;
		margin-right: 16px;
		.menu-item-img {
			margin-right: 16px;
		}
	}
	.menu-item-details {
		overflow: hidden;
		.menu-item-name {
			float: left;
			font-weight: $lato-bold;
			span {
				margin-left: 8px;
				display: inline-block;
				border-radius: 100px;
				text-align: center;
				color: white;
				font-weight: $lato-bold;
				font-size: 10px;
				letter-spacing: 0;
				height: 20px;
				line-height: 20px;
				&.trending-text {
					width: 54px;
				}
				&.coupon-text {
					width: 54px;
				}
				&.x-qty-text {
					width: 36px;
				}
			}
		}
		.menu-item-price {
			float: right;
			font-weight: $lato-black;
		}
		.menu-item-icon {
			float: right;
			margin-left: 8px;
			margin-top: -2px;
		}
		.menu-item-desc {
			margin-top: 7px;
		}
	}
}
</style>
