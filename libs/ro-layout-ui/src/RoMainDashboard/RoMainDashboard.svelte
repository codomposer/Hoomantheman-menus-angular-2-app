<script lang="ts">
import { page_path$_b } from '@ctx-core/sapper'
import { notyf_error_b } from '@menus/notyf'
import { is_navigating_onclick_b, params_fireFlyID$_b, url$_b } from '@menus/page'
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import { getContext_ui_ctx } from '@menus/ui'
import { APP_VERSION$_b } from '@menus/version-refresh-ui'
import {
	BILLING_PAGE, MANAGE_PLATFORM_PAGE, MANAGE_PLATFORM_PAGE_LINK, MARKETING_PAGE, SETTINGS_PAGE, SUPPORT_PAGE, USERS_PAGE
} from '@menus/web-config'
import { close_ro_sideMenuOpened_b } from '../close_ro_sideMenuOpened_b.js'
import type { ro_layout_ui_Ctx } from '../ro_layout_ui_Ctx.js'
import { ro_logout_b } from '../ro_logout_b.js'
import { ro_sideMenuOpened$_b } from '../ro_sideMenuOpened$_b.js'
import { RoAccountHandle } from '../RoAccountHandle/index.js'
import { RoRestaurantNavUl } from '../RoRestaurantNavUl/index.js'
import { toggle_ro_sideMenuOpened_b } from '../toggle_ro_sideMenuOpened_b.js'
const ctx = getContext_ui_ctx() as ro_layout_ui_Ctx
const { webConfig } = ctx
const APP_VERSION$ = APP_VERSION$_b(ctx)
const close_ro_sideMenuOpened = close_ro_sideMenuOpened_b(ctx)
const is_navigating_onclick = is_navigating_onclick_b(ctx)
const notyf_error = notyf_error_b(ctx)
const page_path$ = page_path$_b(ctx)
const params_fireFlyID$ = params_fireFlyID$_b(ctx)
const ro_auth_rules$ = ro_auth_rules$_b(ctx)
const ro_logout = ro_logout_b(ctx)
const ro_sideMenuOpened$ = ro_sideMenuOpened$_b(ctx)
const toggle_ro_sideMenuOpened = toggle_ro_sideMenuOpened_b(ctx)
const url$ = url$_b(ctx)
let manage_restaurant_selected:boolean
$: manage_restaurant_selected = !!($params_fireFlyID$ && ~$url$.indexOf('/backoffice/manage-restaurant/'))
</script>

<div
	class="side-menu-overlay"
	class:opened={$ro_sideMenuOpened$}
	on:click|preventDefault={_evt => close_ro_sideMenuOpened()}
></div>
<div class="side-menu" class:opened={$ro_sideMenuOpened$}>
	<div class="side-menu-navigation">
		<div class="menu-logo-container">
			<a href="/backoffice/manage-restaurant" class="menu-logo-white-icon"
				 on:click={_evt => close_ro_sideMenuOpened('mobile')}
			>&nbsp;</a>
		</div>
		<div class="list-group">
			<a class="list-group-item item-restaurant"
				 class:active={manage_restaurant_selected}
				 href="/backoffice/manage-restaurant"
				 on:click={_evt => close_ro_sideMenuOpened('mobile')}
			>
				<div class="item-icon"></div>
				Manage Restaurants
			</a>
			{#if manage_restaurant_selected}
				<RoRestaurantNavUl
					class="list-group list-group-submenu"
					a_class_={()=>'list-group-item'}
				></RoRestaurantNavUl>
			{/if}
			{#if $ro_auth_rules$[MANAGE_PLATFORM_PAGE_LINK]}
				<a class="list-group-item item-manage-platform"
					 href="/backoffice/manage-platform"
					 disabled={$ro_auth_rules$[MANAGE_PLATFORM_PAGE_LINK] && !$ro_auth_rules$[MANAGE_PLATFORM_PAGE]}
					 class:active={$page_path$ === '/backoffice/manage-platform'}
					 on:click={evt => {
						 if ($ro_auth_rules$[MANAGE_PLATFORM_PAGE]) {
							 is_navigating_onclick(evt)
							 close_ro_sideMenuOpened('mobile')
						 } else {
							 evt.preventDefault()
							 notyf_error("You don't have access to Manage Platform. Please contact the Platform Admin.")
						 }
					 }}
				>
					<div class="item-icon"></div>
					Manage Platform
				</a>
			{/if}
			{#if false}
				<!--TODO: Fix Chat-->
				<a class="list-group-item item-settings"
					 href="/backoffice/chat"
					 class:active={$page_path$ === '/backoffice/chat'}
					 on:click={evt => is_navigating_onclick(evt)}
					 on:click={_evt => close_ro_sideMenuOpened('mobile')}
				>
					<div class="item-icon"></div>
					Chat
				</a>
			{/if}
			{#if $ro_auth_rules$[USERS_PAGE]}
				<a class="list-group-item item-users"
					 href="/backoffice/users"
					 class:active={$page_path$ === '/backoffice/users'}
					 on:click={evt => is_navigating_onclick(evt)}
					 on:click={_evt => close_ro_sideMenuOpened('mobile')}
				>
					<div class="item-icon"></div>
					Users
				</a>
			{/if}
			{#if $ro_auth_rules$[SUPPORT_PAGE]}
				<a class="list-group-item item-support"
					 href="/backoffice/support"
					 class:active={$page_path$ === '/backoffice/support'}
					 on:click={evt => is_navigating_onclick(evt)}
					 on:click={_evt => close_ro_sideMenuOpened('mobile')}
				>
					<div class="item-icon"></div>
					Support
				</a>
			{/if}
			{#if $ro_auth_rules$[SETTINGS_PAGE]}
				<a class="list-group-item item-settings"
					 href="/backoffice/settings"
					 class:active={$page_path$ === '/backoffice/settings'}
					 on:click={evt => is_navigating_onclick(evt)}
					 on:click={_evt => close_ro_sideMenuOpened('mobile')}
				>
					<div class="item-icon"></div>
					Settings
				</a>
			{/if}
			{#if $ro_auth_rules$[BILLING_PAGE]}
				<a class="list-group-item item-billing"
					 href="/backoffice/billing"
					 class:active={$page_path$ === '/backoffice/billing'}
					 on:click={evt => is_navigating_onclick(evt)}
					 on:click={_evt => close_ro_sideMenuOpened('mobile')}
				>
					<div class="item-icon"></div>
					Billing
				</a>
			{/if}
			{#if $ro_auth_rules$[MARKETING_PAGE]}
				<a class="list-group-item item-marketing"
					 href="/backoffice/marketing"
					 class:active={$page_path$ === '/backoffice/marketing'}
					 on:click={evt => is_navigating_onclick(evt)}
					 on:click={_evt => toggle_ro_sideMenuOpened('mobile')}
				>
					<div class="item-icon"></div>
					Marketing
				</a>
			{/if}
			<a class="list-group-item item-logout visible-xs"
				 href="."
				 on:click|preventDefault={ro_logout}
				 on:click={_evt => close_ro_sideMenuOpened('mobile')}
			>
				<div class="item-icon fa fa-sign-out"></div>
				Logout
			</a>
		</div>
	</div>
	<div class="app-info">
		<div class="APP_VERSION">{$APP_VERSION$ || ''}</div>
		<div class="powered-by-menu"
		>Powered by <a href="https://menu.com" target="_blank" class="menu-logo-white-icon">&nbsp;</a></div>
	</div>
</div>
<div
	class="page-contents main-header-pt"
	class:has-sidebar={$ro_sideMenuOpened$}
>
  <div class="main-header-wrapper">
    <div class="main-header"
				 class:sidemenu-pl={$ro_sideMenuOpened$}
		>
      <div class="row">
        <div class="col-xs-3 col-sm-6">
          <div class="hamburger-menu-icon"
							 on:click={_evt => toggle_ro_sideMenuOpened()}
					></div>
        </div>
        <div class="col-xs-9 col-sm-6 text-overflow">
          <div class="right-side">
            <RoAccountHandle></RoAccountHandle>
          </div>
        </div>
      </div>
    </div>
  </div>
  <slot></slot>
</div>

<style type="text/scss" global>
@import "@menus/ro-shared-css/lib";
.side-menu {
	transition: left $side-menu-transition-speed, width $side-menu-transition-speed;
	transform: translateZ(0);
	position: fixed;
	z-index: 101;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	height: auto;
	width: $sidebar-width-md;
	background-color: $gray;
	top: 0;
	bottom: 0;
	left: -$sidebar-width-lg;
	&.opened {
		left: 0;
	}
	@media (min-width: $screen-lg-min) {
		width: $sidebar-width-lg;
	}
	.side-menu-navigation {
		flex: 1;
		overflow-y: auto;
		.menu-logo-container {
			text-align: center;
			margin: 48px 0;
		}
		.list-group-item {
			padding: 21.5px 15px 21.5px 40px;
			background-color: transparent;
			border: 1px solid transparent;
			border-bottom: 1px solid #384E59;
			cursor: pointer;
			user-select: none;
			opacity: 0.5;
			font-weight: $lato-bold;
			font-size: 14px;
			color: white;
			letter-spacing: 0;
			.item-icon {
				font-size: 24px;
				padding-left: 3px;
			}
			&.item-dashboard {
				.item-icon {
					background-image: vurl('/assets/img/ro/dashboard.svg');
				}
			}
			&.item-restaurant {
				.item-icon {
					background-image: vurl('/assets/img/ro/restaurant.svg');
				}
			}
			&.item-manage-platform {
				.item-icon {
					background-image: vurl('/assets/img/ro/manage-platform.png');
				}
			}
			&.item-users {
				.item-icon {
					background-image: vurl('/assets/img/ro/users.svg');
				}
			}
			&.item-support {
				.item-icon {
					background-image: vurl('/assets/img/ro/support.svg');
				}
			}
			&.item-settings {
				.item-icon {
					background-image: vurl('/assets/img/ro/settings.svg');
				}
			}
			&.item-billing {
				.item-icon {
					background-image: vurl('/assets/img/ro/card.svg');
				}
			}
			&.item-marketing {
				.item-icon {
					background-image: vurl('/assets/img/ro/promote-white.svg');
				}
			}
			&.active, &:hover {
				opacity: 1;
				background-color: #1D282E !important;
				color: white !important;
				border: 1px solid transparent;
			}
			.item-icon {
				display: block;
				float: left;
				width: 24px;
				height: 24px;
				background-repeat: no-repeat;
				background-position: 50%;
				background-size: contain;
				margin-top: -2px;
				margin-right: 16px;
			}
		}
		.list-group {
			&.list-group-submenu {
				margin-bottom: 0;
				.list-group-item {
					padding-left: 80px;
				}
			}
		}
	}
	.app-info {
		padding-bottom: calc(env(safe-area-inset-bottom, 0) + 4px);
		padding-left: calc(env(safe-area-inset-left, 0) + 80px);
		flex: 0;
		color: $gray-light;
		.powered-by-menu {
			display: inline-block;
			.menu-logo-white-icon {
				height: 17px;
				width: 66px;
				line-height: 17px;
				margin-left: 2px;
			}
		}
	}
}
.sidemenu-pl {
	transition: padding $side-menu-transition-speed;
	padding-left: 0;
	@media (min-width: $screen-md-min) {
		padding-left: $sidebar-width-md;
	}
	@media (min-width: $screen-lg-min) {
		padding-left: $sidebar-width-lg;
	}
}
.side-menu-overlay {
	transition: opacity $side-menu-transition-speed;
	height: 100%;
	width: 0;
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.9);
	overflow-y: auto;
	overflow-x: hidden;
	text-align: center;
	opacity: 0;
	&.opened {
		@media (max-width: $screen-sm-max) {
			width: 100%;
			opacity: 0.8;
		}
	}
}
.open-sidemenu-btn {
	display: none;
	@media (max-width: $screen-sm-max) {
		display: block;
	}
}
.main-header-pt {
	padding-top: calc(env(safe-area-inset-top, 0) + 88px);
	@media (max-width: $screen-xs-max) {
		padding-top: calc(env(safe-area-inset-top, 0) + 85px);
	}
}
.page-contents {
	position: relative;
	padding-top: calc(env(safe-area-inset-top, 0) + #{$navbar-height});
	padding-right: calc(env(safe-area-inset-right, 0) + 24px);
	padding-bottom: env(safe-area-inset-bottom, 0);
	padding-left: calc(env(safe-area-inset-left, 0) + 24px);
	transition: margin $side-menu-transition-speed;
	@media (max-width: $screen-xs-max) {
		padding-left: calc(env(safe-area-inset-right, 0) + 12px);
		padding-right: calc(env(safe-area-inset-right, 0) + 12px);
	}
	&.has-sidebar {
		margin-left: 0;
		@media (min-width: $screen-md-min) {
			margin-left: $sidebar-width-md;
		}
		@media (min-width: $screen-lg-min) {
			margin-left: $sidebar-width-lg;
		}
	}
	.breadcrumb-container {
		.breadcrumb {
			margin: 0;
		}
	}
	.page {
		padding-top: 12px;
		min-height: calc(100vh - 112px);
	}
	.section-heading {
		font-weight: $lato-black;
		font-size: 24px;
		margin-top: 24px;
	}
	.section-subheading {
		font-weight: $lato-black;
		font-size: 18px;
		margin-top: 24px;
		overflow: hidden;
	}
	.main-header-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		padding-top: calc(env(safe-area-inset-top, 0) + 16px);
		padding-right: 16px;
		padding-left: 16px;
		padding-bottom: 16px;
		border-bottom: 1px solid #DBDBDB;
		background: white;
		z-index: 99;
		.main-header {
			transition: padding $side-menu-transition-speed;
			.hamburger-menu-icon {
				margin-top: 3px;
			}
			.right-side {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
	}
	.menu-search-box-wrapper {
		margin-top: 16px;
	}
	// Page title section
	.page-title-section {
		.page-title-text {
			display: inline-block;
			font-weight: $lato-black;
			font-size: 32px;
			cursor: pointer;
			overflow: hidden;
			text-overflow: ellipsis;
			@media (max-width: $screen-xs-max) {
				font-size: 24px;
			}
			.text-success, .text-danger {
				margin-left: 16px;
			}

			>.tutorial-link {
				margin-left: 8px;
				color: $brand-success;
			}
		}
	}
	// Status Circle
	.status-circle {
		&:before {
			content: ' ';
			display: inline-block;
			width: 12px;
			height: 12px;
			border-radius: 50%;
			background-color: $brand-danger;
		}
		&.active {
			&:before {
				background-color: $brand-success;
			}
		}
	}
}
</style>
