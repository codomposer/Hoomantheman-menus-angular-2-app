<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import { shopping_cart_icon_src_ } from '@menus/util'
import { is_mobile_menu_open$_b } from '@menus/layout-ui'
import { Color_Balanced$_b } from '@menus/platform-settings'
import { SCREEN_MD_MIN } from '@menus/css'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import type { consumer_shopping_cart_ui_Ctx } from '../consumer_shopping_cart_ui_Ctx.js'
export let color_white = false
const ctx = getContext_ui_ctx() as consumer_shopping_cart_ui_Ctx
const Color_Balanced = Color_Balanced$_b(ctx)
const consumer_login_user$ = consumer_login_user$_b(ctx)
const isLoggedIn$ = consumer_login_user$.isLoggedIn$
const is_mobile_menu_open = is_mobile_menu_open$_b(ctx)
const { open_shopping_cart, toggle_shopping_cart, menuitems_quantity$ } = shopping_cart_b(ctx)
</script>

{#if $isLoggedIn$ != null && $menuitems_quantity$ != null}
  <a class="ShoppingCartLinkHandle"
		 href="."
		 on:click|preventDefault
		 on:click={evt => (window.innerWidth > SCREEN_MD_MIN) && toggle_shopping_cart()}
		 on:click={evt => (window.innerWidth <= SCREEN_MD_MIN) && open_shopping_cart()}
		 on:click={evt => is_mobile_menu_open.set(false)}
	>
    {#if $menuitems_quantity$}
      <img src={shopping_cart_icon_src_($Color_Balanced, '36px')}
					 alt="{$menuitems_quantity$} items"
			/>
      <div class="shopping-cart-count">{ $menuitems_quantity$ }</div>
    {:else}
      <div class="basket-empty-icon"
					 class:basket-empty-white-icon={color_white}
			></div>
    {/if}
  </a>
{/if}

<style type="text/scss" global>
@import "@menus/consumer-shared-css/variables";
.ShoppingCartLinkHandle {
	display: flex;
	position: relative;
	align-items: center;
	padding-left: 0;
	padding-right: 0;
	@media (max-width: $screen-sm-max) {
		flex-grow: 1;
	}
	.basket-empty-icon {
		display: block;
	}
	.shopping-cart-count {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		padding-top: 10px;
		font-size: 12px;
		color: white;
		font-weight: $lato-bold;
	}
}
</style>
