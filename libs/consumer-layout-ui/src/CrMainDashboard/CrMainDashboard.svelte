<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { no_dom } from '@ctx-core/dom'
import { SiteFooter } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { SearchBox } from '@menus/consumer-search-ui'
import { ChangeAddressModal, ChangeAddressModal_i$_b, UserAddressLink } from '@menus/user-address-ui'
import { ShoppingCart, ShoppingCartLinkHandle } from '@menus/consumer-shopping-cart-ui'
// import { SupportChatBox } from '@menus/chat-ui'
import { Navbar, open_modals_set_b } from '@menus/layout-ui'
import { is_navigating_onclick_b } from '@menus/page'
import { PlatformIcon } from '@menus/platform-ui'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import {
	Enable_Yelp_Count$_b, EnableLoggedInSupportChat$_b,
} from '@menus/platform-settings'
import { is_filters_opened$_b } from '@menus/filters-common'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import { support_chat_window_show$_b } from '@menus/chat'
import { ProfileHandle } from '../ProfileHandle'
import { ProfileMenu } from '../ProfileMenu'
import { is_ProfileHandle_open$_b } from '../is_ProfileHandle_open$_b.js'
import { toggle_ProfileHandle_b } from '../toggle_ProfileHandle_b.js'
import { CrMainDashboard_c } from './CrMainDashboard_c.js'
import { main_dashboard_content$_b } from './main_dashboard_content$_b.js'
import type { consumer_layout_ui_Ctx } from '../consumer_layout_ui_Ctx.js'
export let SearchBox_show = false, userAddress_show = false, hideFooter = false
const ctx = getContext_ui_ctx() as consumer_layout_ui_Ctx, dispatch = createEventDispatcher()
const ChangeAddressModal_i$ = ChangeAddressModal_i$_b(ctx)
const Enable_Yelp_Count$ = Enable_Yelp_Count$_b(ctx)
const EnableLoggedInSupportChat$ = EnableLoggedInSupportChat$_b(ctx)
const is_filters_opened$ = is_filters_opened$_b(ctx)
const is_navigating_onclick = is_navigating_onclick_b(ctx)
const is_ProfileHandle_open$ = is_ProfileHandle_open$_b(ctx)
const consumer_login_user$ = consumer_login_user$_b(ctx)
const isLoggedIn$ = consumer_login_user$.isLoggedIn$
const { is_shopping_cart_opened$ } = shopping_cart_b(ctx)
const main_dashboard_content$ = main_dashboard_content$_b(ctx)
const open_modals_set = open_modals_set_b(ctx)
const toggle_ProfileHandle = toggle_ProfileHandle_b(ctx)
const support_chat_window_show$ = support_chat_window_show$_b(ctx)
export const _ = new CrMainDashboard_c(ctx, dispatch)
const { is_mobile_menu_open$ } = _
let SupportChatBox_show
$: SupportChatBox_show =
	(!$isLoggedIn$ && $Enable_Yelp_Count$)
	|| ($isLoggedIn$ && $EnableLoggedInSupportChat$)
</script>

<ChangeAddressModal bind:this={$ChangeAddressModal_i$}></ChangeAddressModal>
<div class="CrMainDashboard"
		 class:is_shopping_cart_opened={$is_shopping_cart_opened$}
		 class:filters-opened={$is_filters_opened$}
		 class:open_modals={!!$open_modals_set?.size}
		 class:show-support-chat={$support_chat_window_show$}
>
  <Navbar class="cr-navbar" bg_white={true}>
    <svelte:fragment slot="header">
      <div class="header-PlatformIcon"
					 class:is_mobile_menu_open={$is_mobile_menu_open$}
			>
        <PlatformIcon></PlatformIcon>
      </div>
      <div class="SearchBox-wrapper" class:display={SearchBox_show} class:is_mobile_menu_open={$is_mobile_menu_open$}>
        {#if SearchBox_show}
          <SearchBox></SearchBox>
        {/if}
      </div>
      <div class="UserAddressLink-wrapper" class:display={userAddress_show}>
        {#if !$is_mobile_menu_open$ && userAddress_show}
          <UserAddressLink ChangeAddressModal_i={$ChangeAddressModal_i$}></UserAddressLink>
        {/if}
      </div>
      <div class="ShoppingCartLinkHandle-wrapper" class:is_mobile_menu_open={$is_mobile_menu_open$}>
        <ShoppingCartLinkHandle></ShoppingCartLinkHandle>
      </div>
    </svelte:fragment>
    <ul slot="collapse" class="nav navbar-nav" on:click|stopPropagation>
      {#if $isLoggedIn$}
        <div class="Profile-container">
          <ProfileHandle></ProfileHandle>
					{#if $is_ProfileHandle_open$}
            <div class="desktop-ProfileMenu">
              <ProfileMenu class="dropdown-menu"></ProfileMenu>
            </div>
          {/if}
					{#if $is_mobile_menu_open$}
            <div class="mobile-ProfileMenu">
              <ProfileMenu></ProfileMenu>
            </div>
          {/if}
        </div>
      {:else if $isLoggedIn$ != null}
		<li class="has-fa-icon signup-link">
			<a on:click|preventDefault={evt => _.navigate('/signup')} href="/signup" on:click={evt => is_mobile_menu_open$.set(false)}><span class="icon fa fa-user-plus"></span>Signup</a>
		</li>
	  	<li class="has-fa-icon cr-login-link">
          <a on:click|preventDefault={evt => _.navigate('/login')} href="/login"
						 class:not-visible={no_dom}
					><span class="icon fa fa-user"></span>Login</a>
		</li>
      {/if}
			<div class="desktop-ShoppingCartLinkHandle" on:click={evt => is_ProfileHandle_open$.set(false)}>
        <ShoppingCartLinkHandle></ShoppingCartLinkHandle>
      </div>
    </ul>
  </Navbar>
  <slot name="before-main"></slot>
  <div class="main_dashboard_content" bind:this={$main_dashboard_content$}>
    <slot></slot>
		{#if !hideFooter}
      <SiteFooter topBorder="true"></SiteFooter>
    {/if}
  </div>
	{#if $is_shopping_cart_opened$}
    <ShoppingCart></ShoppingCart>
  {/if}
	<!--{#if $support_chat_window_show$}-->
	<!--  <div class="support-chat-box-container">-->
	<!--    {#if SupportChatBox_show }-->
	<!--      <div>-->
	<!--        <SupportChatBox type="TYPE_CUSTOMER"></SupportChatBox>-->
	<!--      </div>-->
	<!--    {/if}-->
	<!--  </div>-->
	<!--{/if}-->
</div>

<style type="text/scss" global>
@import "@menus/consumer-shared-css/variables";
.CrMainDashboard {
	padding: $navbar-height 0 0;
	@media (max-width: $screen-sm-max) {
		display: block;
		height: auto;
		min-height: 100vh;
	}
	&.is_shopping_cart_opened {
		.main_dashboard_content {
			margin-right: $sidebar-cart-width;
		}
	}
	> .Navbar.navbar {
		position: fixed;
		top: 0;
		left: 0;
		overflow: visible;
		.header-PlatformIcon {
			display: none;
			@media (min-width: $screen-md-min) {
				display: block;
			}
			&.is_mobile_menu_open {
				display: block;
				padding: 0;

				.PlatformIcon {
					padding-left: 0;

					.app-name {
						padding: 0;
					}
				}
			}
		}
		.SearchBox-wrapper {
			display: none;
			&.display {
				display: block;
				flex-grow: 1;
			}

			&.is_mobile_menu_open {
				@media (max-width: $screen-sm-max) {
					display: none;
				}
			}

			@media (max-width: $screen-sm-max) {
				margin-top: 12px;
				width: 100%;
				order: 2;
			}
		}
		.UserAddressLink-wrapper {
			display: none;

			@media (max-width: $screen-sm-max) {
				align-self: flex-start;
				margin-top: 16px;
				order: 1;
				padding: 0 24px;
				width: 100%;

				&.display {
					display: block;
				}
			}
		}
		.ShoppingCartLinkHandle-wrapper {
			display: none;
			@media (max-width: $screen-sm-max) {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: 0;
				right: 0;
				z-index: 1;
				height: $navbar-height;
				padding: 0 8px 8px;
				background-color: white;
			}

			@media (max-width: $screen-sm-max) {
				height: unset;
				padding: 8px 16px;
			}

			&.is_mobile_menu_open {
				@media (max-width: $screen-sm-max) {
					display: none;
				}
			}
		}
		.navbar-nav {
			margin: 0;
			> * {
				&.PlatformIcon {
					display: none;
					@media (max-width: $screen-sm-max) {
						display: block;
					}
				}
				&.Profile-container {
					.desktop-ProfileMenu {
						display: none;
						@media (min-width: $screen-md-min) {
							display: block;
						}
						.dropdown-menu {
							display: block;
							left: auto;
							right: auto;
							width: 160px;
						}
					}
					.mobile-ProfileMenu {
						display: none;
						@media (max-width: $screen-sm-max) {
							display: block;
						}
					}
				}
				&.desktop-ShoppingCartLinkHandle {
					display: none;
					@media (min-width: $screen-md-min) {
						display: flex;
						margin-left: 56px;
					}

					.ShoppingCartLinkHandle {
						@media (min-width: $screen-md-min) {
							margin-top: -8px;
						}
					}
				}
			}
		}
	}
	.Search_Restaurant_Filters_container {
		@media (max-width: $screen-sm-max) {
			margin-top: 42px;
		}
	}
	> .main_dashboard_content {
		@media (max-width: $screen-sm-max) {
			flex-grow: 1;
		}
		> .page {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
		}
	}
	> .support-chat-box-container {
		@media (max-width: $screen-sm-max) {
			flex-grow: 0;
			min-height: $support-chat-box-container-height;
		}
	}
}
</style>
