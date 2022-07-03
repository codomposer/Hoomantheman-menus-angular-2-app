<script lang="ts">
import css_vars from 'svelte-css-vars'
import { getContext_ui_ctx } from '@menus/ui'
import { is_mobile_menu_open$_b } from '../is_mobile_menu_open$_b.js'
import type { layout_ui_Ctx } from '../layout_ui_Ctx.js'
import { toggle_mobile_menu_b } from '../toggle_mobile_menu_b.js'
const ctx = getContext_ui_ctx() as layout_ui_Ctx
const is_mobile_menu_open$ = is_mobile_menu_open$_b(ctx)
const toggle_mobile_menu = toggle_mobile_menu_b(ctx)
export let color_white = false, bg_transparent = false, bg_white = false, bg_white_opacity = 1.0
</script>

<nav
	class="Navbar navbar menus-navbar {$$props.class||''}"
	use:css_vars={{ bg_white_opacity }}
	class:color_white={color_white}
	class:bg_transparent={bg_transparent}
	class:bg_white={bg_white}
	class:not_is_mobile_menu_open={!$is_mobile_menu_open$}
	class:is_mobile_menu_open={$is_mobile_menu_open$}
>
  <slot></slot>
  <div class="navbar-header">
    <button
			type="button"
			class="navbar-toggle collapsed"
			class:is_mobile_menu_open={$is_mobile_menu_open$}
			on:click={toggle_mobile_menu}
		>
      <div
				class="base-icon toggle-menu-icon fa"
				class:fa-bars={!$is_mobile_menu_open$}
				class:fa-times={$is_mobile_menu_open$}
			></div>
    </button>
    <slot name="header"></slot>
  </div>
  <div class="navbar-collapse" class:collapse={!$is_mobile_menu_open$} on:click={_evt => is_mobile_menu_open$.set(false)}>
    <slot name="collapse"></slot>
  </div>
</nav>

<style type="text/scss" global>
@import "@menus/css/lib";
.Navbar.navbar {
	position: fixed;
	z-index: 100;
	display: flex;
	flex-direction: row;
	top: 0;
	width: 100%;
	border: none;
	padding: 0 0 0 48px;
	border-bottom: 1px solid transparent;
	min-height: $navbar-height;
	overflow: hidden;
	@media (max-width: $screen-sm-max) {
		flex-direction: column;
		min-height: $navbar-height-sm;
	}
	@media (max-width: $grid-float-breakpoint-max) {
		padding: 0;
	}
	&.menus-navbar {
		&.bg_transparent {
			&.color_white {
				@media (min-width: $grid-float-breakpoint+1) {
					.navbar-nav {
						> * {
							> a {
								color: white;
							}
						}
					}
					.toggle-menu-icon {
						color: white;
					}
				}
				&.not_is_mobile_menu_open {
					.navbar-nav {
						> * {
							> a {
								color: white;
							}
						}
					}
					.toggle-menu-icon {
						color: white;
					}
				}
			}
		}
		&.bg_white {
			background-color: rgba(255, 255, 255, var(--bg_white_opacity));
			box-shadow: 0 0 2px white;
			.navbar-nav {
				> * {
					> a {
						color: $gray;
					}
				}
			}
			.navbar-header {
				a {
					&:hover {
						text-decoration: none;
					}
				}
				.toggle-menu-icon {
					font-size: 24px;
					color: $gray;
				}
				.logo {
					display: none;
					@media (max-width: $grid-float-breakpoint-max) {
						display: block;
						position: absolute;
						right: 0;
						background: vurl("/assets/favicon.png");
					}
				}
			}
		}
		&.is_mobile_menu_open {
			@media (max-width: $grid-float-breakpoint-max) {
				&.menus-navbar {
					background-color: white;
					.navbar-nav {
    					margin-left: 0;
						background-color: white;
						> * {
							> a {
								padding: 8px 0;
								border: none;
								color: $link-color;
								box-shadow: none;
								font-size: inherit;
							}
						}
					}
					.navbar-brand {
						a {
							&:hover {
								text-decoration: none;
							}
						}
					}
				}
			}
		}
		> .navbar-collapse {
			padding: 8px 0;
			flex-grow: 1;
			overflow-x: hidden !important;
			display: flex;
			justify-content: flex-end;
			@media (max-width: $grid-float-breakpoint-max) {
				position: fixed;
				display: block;
				left: 0;
				right: 0;
				width: 100%;
				height: 100%;
				height: calc(100vh - #{$navbar-height-sm});
				background-color: rgba(0,0,0,.1);
				margin: 0;
				padding: 0;
				z-index: 10;
				top: $navbar-height-sm;
				max-width: none;
				&.collapse {
					visibility: hidden;

					.Profile-container {
						margin-left: -100%;
					}
				}
			}
			.navbar-nav {
				display: flex;
				float: none;
				padding-left: 0;
				@media (max-width: $grid-float-breakpoint-max) {
					flex-direction: column;
					height: 100%;
    				transition: all .5s;
					margin-left: -100%;
					width: 70%;
					max-width: 400px;
				}
				> li {
					position: relative;	
					display: flex;
					align-items: center;
					justify-content: flex-end;
					
					&.has-svg-icon {
						padding-left: 48px;

						a {
							&::before {
								display: block;
								position: absolute;
								top: 0;
								left: 12px;
								height: 100%;
								width: 24px;
								background-repeat: no-repeat;
								background-position: 50%;
								background-size: contain;
								z-index: 1;
								content: " ";
							}
						}
					}

					&.has-fa-icon {
						padding-left: 15px;

						> a {
							display: flex;
							align-items: center;
							.icon {
								font-size: 22px;
								margin-right: 8px;
							}
						}
					}
					@media (max-width: $screen-sm-max) {
						padding: 8px 0;
						align-items: flex-start;
						justify-content: flex-start;

						&.has-fa-icon {
							> a {
								.icon {
									width: 22px;
									margin-right: 11px;
								}
							}
						}
					}
				}
			}
		}
	}
	&.cr-navbar, &.ro-navbar {
		> .navbar-collapse {
			.navbar-nav {
				@media (max-width: $grid-float-breakpoint-max) {
					flex-direction: column-reverse;
					justify-content: flex-end;
				}
			}
		}
	}
	&.color_white {
		.navbar-nav {
			> * {
				&.big-link {
					> a {
						color: white;
					}
				}
			}
		}
	}
	.navbar-header {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0;
		@media (max-width: $screen-sm-max) {
			flex-direction: column;
		}
		@media (max-width: $screen-sm-max) {
			flex-grow: 0;
			height: $navbar-height-sm;
			margin: 0 12px;
		}
		.search-box-wrapper {
			flex-grow: 1;
			@media (min-width: $screen-sm-min) {
				$navbar-brand-width: 176px;
				width: calc(100% - #{$navbar-brand-width});
			}
			@media (max-width: $screen-sm-max) {
				$side-icon-width: 36px;
				width: calc(100% - #{$side-icon-width * 2});
			}
		}
		.shopping-cart-link-container {
			height: $input-height-large;
			margin: 8px 0;
			@media (min-width: $screen-sm-min) {
				display: none;
			}
			.ShoppingCartLinkHandle {
				> a {
					position: relative;
				}
			}
		}
		.navbar-brand {
			flex-grow: 1;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			height: $input-height-large;
			padding: 0;
			margin: 0;
			width: 100%;
			@media (max-width: $screen-sm-max) {
				justify-content: center;
			}
			&.collapse {
				width: auto;
			}
		}
	}
	.navbar-toggle {
		display: none;
		margin: 0;
		padding: 0;
		border: none;
		font-size: 18px;
		background-color: transparent;
		@media (max-width: $grid-float-breakpoint-max) {
			display: block;
		}

		@media (max-width: $screen-sm-max) {
			position: absolute;
			top: 0;
			left: 0;
			padding: 16px 16px 12px;
		}

		.base-icon {
			display: block;
		}
		.icon-bar {
			width: 36px;
			height: 4px;
			background-color: white;
			& + .icon-bar {
				margin-top: 5px;
			}
		}
	}
	.navbar-nav {
		$login-user-link-width: 166px;
		display: flex;
		flex-direction: row;
		@media (max-width: $grid-float-breakpoint-max) {
			flex-direction: column;
		}
		> * {
			overflow: hidden;
			@media (max-width: $grid-float-breakpoint-max) {
				width: 100%;
				padding-left: 8px;
				padding-right: 8px;
			}
			&.user-address-link-container {
				$shopping-cart-link-width: 88px;
				flex-grow: 1;
				padding-right: 8px;
				@media (min-width: $grid-float-breakpoint) {
					max-width: calc(100% - #{$login-user-link-width} - #{$shopping-cart-link-width});
				}
			}
			&.login-link {
				text-align: center;
				@media (max-width: $grid-float-breakpoint-max) {
					width: 100%;
				}
				> a {
					display: flex;
					align-items: center;
					justify-content: center;
					height: $input-height-large;
					@media (max-width: $grid-float-breakpoint-max) {
						padding: 8px;
					}
				}
			}

			&.Profile-container {
				@media (max-width: $grid-float-breakpoint-max) {
					flex-direction: column;
					width: 100%;
					padding: 0;
					height: 100%;
					background-color: white;
					transition: margin .5s;
				}
				@media (min-width: $grid-float-breakpoint) {
					width: $login-user-link-width;
				}
				.ProfileHandle {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 56px;
					@media (max-width: $grid-float-breakpoint-max) {
						display: none;
					}
				}
			}
			&.shopping-cart-link {
				@media (max-width: $grid-float-breakpoint-max) {
					display: none;
				}
				> a {
					display: flex;
					align-items: center;
					justify-self: center;
					height: $input-height-large;
				}
			}
			&.home-link {
				@media (min-width: $grid-float-breakpoint) {
					display: none;
				}
			}
			&.big-link {
				padding-top: 12px;
				padding-bottom: 12px;
				margin-left: 24px;
				margin-right: 24px;
				@media (max-width: $grid-float-breakpoint-max) {
					margin-left: 0;
					margin-right: 0;
				}
				> a {
					padding: 8px 24px;
					background-color: transparent;
					border-color: white;
					border-radius: $custom-btn-border-radius;
				}
			}
			&.last-link {
				> a {
					@media (min-width: $grid-float-breakpoint) {
						margin-right: 0;
					}
				}
			}
			> a {
				&:hover, &:focus, &:active {
					background-color: transparent;
				}
				&:not(.dropdown-toggle) {
					font-weight: $lato-bold;
					border: 2px solid transparent;
					padding: 8px 24px;
					font-size: 18px;
					@media (max-width: $grid-float-breakpoint-max) {
						font-weight: $lato-bold;
						font-size: 20px;
						color: #2A3134;
						text-align: center;
						border: none;
					}
				}
				&.not-visible {
					visibility: hidden;
				}
			}
		}
	}
	.navbar-right {
		margin: 0;
	}
}
</style>
