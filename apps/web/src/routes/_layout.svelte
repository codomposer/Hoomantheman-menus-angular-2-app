<script context="module" lang="ts">
import { has_dom } from '@ctx-core/dom'
import { assign } from '@ctx-core/object'
import type { Page, page$_T, PreloadContext } from '@ctx-core/sapper'
import { preload_ } from '@menus/app'
import { ssr_ui_ctx_, request_id_map_ctx } from '@menus/ui'
import { webConfig_ } from '@menus/web-config'
export const preload = preload_(async function (this:PreloadContext, page:Page, session) {
	const { path } = page
	const { webConfig, request_id } = assign(session, {
		gps: session.gps,
		webConfig: session.webConfig || webConfig_(page.host)
	})
	const ctx = ssr_ui_ctx_(page, session)
	if (!has_dom) {
		assign(request_id_map_ctx.get(request_id), ctx)
	}
	return {
		request_id,
		webConfig,
		in_path: path,
	}
})
</script>
<script lang="ts">
import { onMount } from 'svelte'
import type { Page, page$_T, PageContext } from '@ctx-core/sapper'
import { page$_b, page_host$_b, page_path$_b } from '@ctx-core/sapper'
import { goto, stores } from '@sapper/app'
import { init_app_b } from '@menus/app'
import { Bootstrap } from '@menus/bootstrap'
import { init_gps$_b, platform_settings$_b } from '@menus/http'
import type { layout_ui_Ctx } from '@menus/layout-ui'
import { is_mobile_menu_open$_b } from '@menus/layout-ui'
import { hide_navigating_b, is_navigating$_b, page_title$_b } from '@menus/page'
import type { Gps } from '@menus/platform-settings'
import { platformStyles$_b } from '@menus/platform-settings'
import { ConfirmModal, confirmModal$_b, MessageModal, messageModal$_b, PageLoader } from '@menus/shared-ui'
import type { ui_Ctx } from '@menus/ui'
import { ui_ctx_, dom_goto$_b, setContext_ui_ctx } from '@menus/ui'
import { VersionRefresh } from '@menus/version-refresh-ui'
import type { WebConfig } from '@menus/web-config'
const { page } = stores()
export let gps:Gps = null
export let request_id = ''
export let segment, webConfig:WebConfig = webConfig_($page.host), in_path:string
export let ctx:ui_Ctx&layout_ui_Ctx =
	has_dom
	? ui_ctx_($page as PageContext, { webConfig })
	: request_id_map_ctx.get(request_id)
init_gps$_b(ctx).$ = gps
setContext_ui_ctx(ctx)
const confirmModal$ = confirmModal$_b(ctx)
const dom_goto$ = dom_goto$_b(ctx)
const hide_navigating = hide_navigating_b(ctx)
const init_app = init_app_b(ctx)
const is_mobile_menu_open$ = is_mobile_menu_open$_b(ctx)
const is_navigating$ = is_navigating$_b(ctx)
const messageModal$ = messageModal$_b(ctx)
const page$ = page$_b(ctx)
const page_host$ = page_host$_b(ctx)
const page_path$ = page_path$_b(ctx)
const page_title$ = page_title$_b(ctx)
const platform_settings$ = platform_settings$_b(ctx)
const platformStyles$ = platformStyles$_b(ctx)
$: page$.$ = $page
$: page_title$.$ = $platform_settings$?.App_Name ? $platform_settings$.App_Name : 'Menu.com'
if (has_dom) {
	dom_goto$.$ = goto
}
$: $page, hide_navigating()
let ro_app:boolean
$: ro_app = /^\/backoffice/.test($page_path$ || in_path)
let main:HTMLDivElement
$: {
	$page$
	if (main) main.scrollTo(0, 0)
	if (has_dom) document.body.scrollTo(0, 0)
}
onMount(()=>{
	init_app(page_host$.$).then()
})
function style_(styles) {
	const tag = 'style'
	return `<${tag} type="text/css">${styles}</${tag}>`
}
</script>

<svelte:head>
  <title>{$page_title$}</title>
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="stylesheet" href="/assets/global.css">
  <link rel="manifest" href="/assets/manifest.json" crossorigin="use-credentials">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/favicon.png">
  <link rel="stylesheet" href="/client/ladda-themeless.min.css">
</svelte:head>
<ConfirmModal bind:this={$confirmModal$}></ConfirmModal>
<MessageModal bind:this={$messageModal$}></MessageModal>
<VersionRefresh></VersionRefresh>
<main
	bind:this={main}
	class="menus-main"
	class:cr-app={!ro_app}
	class:ro-app={ro_app}
	class:no-scroll={$is_mobile_menu_open$}
>
  <slot></slot>
</main>
{@html style_($platformStyles$)}
{#if $is_navigating$}
  <PageLoader></PageLoader>
{/if}

<Bootstrap></Bootstrap>
<style type="text/scss" global>
@import '@menus/css/lib';
@import '@menus/css/helpers';
@import '@menus/css/icons';
@import '@menus/css/yelp-icons';
@import '@menus/css/chips';
@import '@menus/css/common';
@import '@menus/css/cuisines-icons';
@import '@menus/css/social-icons';
@import '@menus/css/btn-group';
@import '@menus/css/tabs';
@import '@menus/css/hero';
@import '@menus/ro-shared-css/_landing-pages';
html {
	overflow: hidden;
}
body, .m-gmaps-ui-view {
	color: $gray;
	font-family: 'Lato', sans-serif !important;
	font-weight: $lato-regular;
	font-size: 14px;
	letter-spacing: 0;
}
body {
	min-height: 100vh;
	max-height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
}
#sapper.cordova-app > main {
	height: 100vh;
	overflow-y: auto;
}
// Inputs
input:not([type=checkbox]):not([type=radio]), textarea {
	-webkit-appearance: none;
}
.form-control {
	box-shadow: none;
	&:focus {
		box-shadow: none;
	}
}
input[type="color"],
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"],
select, textarea,
.input-sm, .input-group-sm > .form-control, .input-group-sm > .input-group-addon,
.input-group-sm > .input-group-btn > .btn {
	font-size: 16px;
}
.input-container {
	margin-bottom: 20px;
}
select {
	padding: 8px;
}
[disabled], .disabled {
	cursor: not-allowed;
}
// Form Group
.form-group {
	position: relative;
	.m-input-group {
		position: relative;
		.m-input-group-addon {
			position: absolute;
			display: inline-block;
			top: 0;
			&.m-addon-left {
				left: 0;
				padding: 12px 8px 12px 12px;
			}
			&.m-addon-right {
				right: 0;
				padding: 12px 12px 12px 8px;
			}
			&.show-password-addon, &.editable-input-addon {
				cursor: pointer;
				opacity: .3;
				&.active {
					opacity: 1;
				}
			}
			.color-preview-addon {
				display: inline-block;
				width: 24px;
				height: 24px;
				border: 1px solid #DBDBDB;
			}
		}
		&.m-input-sm {
			.m-input-group-addon {
				&.m-addon-left, &.m-addon-right {
					padding-top: 8px;
					padding-bottom: 8px;
				}
			}
		}
		&.has-addon-left {
			.form-control {
				padding-left: 44px;
			}
		}
		&.has-addon-right {
			.form-control {
				padding-right: 44px;
			}
		}
	}
}
// Text area
textarea {
	resize: none;
}
// Button
button:focus, button:active, .btn:focus, .btn:active, .btn:active:focus, .btn.active:focus {
	outline: none !important;
}
// Links
a {
	cursor: pointer;
	&.blue_underline {
		color: blue;
		text-decoration: underline;
	}
}
// Label
label {
	font-weight: $lato-regular;
}
// Table
.table {
	font-size: 14px;
	border-bottom: 1px solid #DBDBDB;
	tbody {
		tr {
			th, td {
				padding-top: 20px;
				padding-bottom: 20px;
			}
			th {
				font-weight: $lato-bold;
				border: none;
				background-color: white;
			}
			td {
				cursor: pointer;
			}
		}
	}
	&.table-center {
		tr {
			th, td {
				vertical-align: middle;
				text-align: center;
			}
		}
	}
	.table-responsive-label {
		display: none;
	}
}
$table-responsive-sizes: (
	"table-responsive-xs": $screen-xs-max,
	"table-responsive-sm": $screen-sm-max,
	"table-responsive-md": $screen-md-max
);
@each $name, $size in $table-responsive-sizes {
	.table {
		@media(max-width: $size) {
			&.#{$name} {
				.table-responsive-label {
					display: block;
					font-weight: $lato-bold;
				}
				display: block;
				text-align: left;
				width: 100%;
				tbody, tbody td, tbody tr {
					display: block;
					text-align: left;
					width: 100%;
					overflow: hidden;
					&.overflow-visible {
						overflow: visible;
					}
				}
				thead {
					display: none;
				}
				tbody {
					tr {
						border-bottom: 1px solid #EAEBEB;
						td {
							padding: 8px;
							border: none;
						}
					}
				}
			}
		}
	}
}
@media screen and (max-width: $screen-xs-max) {
	.table-responsive {
		border: none;
	}
}
// Custom table
.m-table {
	display: table;
	.m-tr {
		display: table-row;
		.m-th, .m-td {
			display: table-cell;
			vertical-align: middle;
			line-height: 1.42857;
			padding: 20px 8px 20px;
			border-top: 1px solid #ddd;
			font-size: 14px;
		}
		.m-th {
			padding-bottom: 0;
			font-weight: $lato-bold;
			border: none;
			background-color: white;
		}
		.m-td {
			cursor: pointer;
		}
	}
	&.table-center {
		.m-tr {
			.m-th, .m-td {
				vertical-align: middle;
				text-align: center;
			}
		}
	}
	&.table-striped {
		.m-tr:nth-of-type(odd) {
			background-color: #f9f9f9;
		}
	}
}
// Modals
.modal-dialog {
	display: flex;
	@media (max-width: $screen-xs-max) {
		height: 100vh;
		width: 100vw;
		max-height: none;
		margin: 0;
	}
	.modal-content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		max-width: 100%;
		max-height: calc(100vh - 60px);
		overflow-y: auto;
		@media (max-width: $screen-xs-max) {
			overflow-y: auto;
			max-height: none;
		}
		> * {
			@media (max-width: $screen-xs-max) {
				padding-left: 20px;
				padding-right: 20px;
			}
			&.modal-header {
				position: relative;
				@media (max-width: $screen-xs-max) {
					padding-top: calc(env(safe-area-inset-top, 0) + 12px);
					padding-bottom: 12px;
				}
				.close {
					position: absolute;
					right: 0;
					display: block;
					margin: 0;
					opacity: 1;
					font-size: 32px;
					line-height: 48px;
					min-width: 48px;
					@media (max-width: $screen-xs-max) {
						font-size: 24px;
						line-height: 36px;
					}
				}
				.modal-title {
					padding-right: 30px;
					overflow: hidden;
					text-overflow: ellipsis;
					font-weight: $lato-black;
					font-size: 32px;
					line-height: 48px;
					@media (max-width: $screen-xs-max) {
						font-size: 24px;
						line-height: 36px;
					}
				}
			}
			&.modal-body {
				flex-grow: 1;
				@media (min-width: $screen-sm-min) {
					max-height: calc(100vh - 30px); // -300px
					overflow-y: auto;
				}
			}
		}
	}
}
.action-buttons {
	.btn {
		@media (max-width: $screen-xs-max) {
		}
	}
	.btn + .btn {
		margin-left: 0;
	}
}
// Alert
.alert {
	position: relative;
	padding-left: 20px;
	padding-right: 20px;
	margin-bottom: 0;
	&.alert-primary {
		background-color: $brand-primary;
		border-color: $brand-primary;
		color: white;
	}
}
// Toaster
.notyf__toast-success {
	background-color: $brand-success;
}
.notyf__toast-error {
	background-color: $brand-danger;
}
// Ribbon
.ribbon {
	position: absolute;
	top: -5px;
	z-index: 1;
	overflow: hidden;
	width: 75px;
	height: 75px;
	text-align: right;
	span {
		font-size: 10px;
		font-weight: bold;
		color: #FFF;
		text-transform: uppercase;
		text-align: center;
		line-height: 20px;
		width: 100px;
		display: block;
		box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
		position: absolute;
		top: 19px;
	}
	span::before {
		content: "";
		position: absolute;
		left: 0;
		top: 100%;
		z-index: -1;
		border-right: 3px solid transparent;
		border-bottom: 3px solid transparent;
	}
	span::after {
		content: "";
		position: absolute;
		right: 0;
		top: 100%;
		z-index: -1;
		border-left: 3px solid transparent;
		border-bottom: 3px solid transparent;
	}
	$colors: (primary: $brand-primary,
		success: $brand-success,
		info: $brand-info,
		warning: $brand-warning,
		danger: $brand-danger,
		white: white,
		gray-darker: $gray-darker,
		gray-dark: $gray-dark,
		gray: $gray,
		gray-light: $gray-light,
		gray-lighter: $gray-lighter,
	);
	@each $propKey,
	$propValue in $colors {
		&.ribbon-#{""+$propKey} {
			span {
				background: #{$propValue};
				background: linear-gradient(#{$propValue} 0%,
					#{$propValue} 100%);
			}
			span::before {
				border-left: 3px solid #{$propValue};
				border-top: 3px solid #{$propValue};
			}
			span::after {
				border-right: 3px solid #{$propValue};
				border-top: 3px solid #{$propValue};
			}
		}
	}
	&.align-left {
		left: -5px;
		span {
			transform: rotate(-45deg);
			left: -21px;
		}
	}
	&.align-right {
		right: -5px;
		span {
			transform: rotate(45deg);
			right: -21px;
		}
	}
	// For Align-left ONLY at the moment
	&.ribbon-second {
		width: 150px;
		height: 150px;
		span {
			top: 42px;
			width: 164px;
			left: -31px;
		}
	}
}
// Range
input[type=range].custom-range-slider {
	-webkit-appearance: none;
	width: 100%;
	margin: 10px 0;
	&:focus {
		outline: none;
		&::-webkit-slider-runnable-track {
			background: #f1f1f1;
		}
		&::-ms-fill-lower {
			background: #eeeeee;
		}
		&::-ms-fill-upper {
			background: #f1f1f1;
		}
	}
	&::-webkit-slider-runnable-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
		background: #eeeeee;
		border-radius: 4px;
		border: 0 solid #eeeeee;
	}
	&::-webkit-slider-thumb {
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
		border: 1px solid $brand-success;
		height: 24px;
		width: 24px;
		border-radius: 50px;
		background: $brand-success;
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -10px;
	}
	&::-moz-range-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
		background: #eeeeee;
		border-radius: 4px;
		border: 0 solid #eeeeee;
	}
	&::-moz-range-thumb {
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
		border: 1px solid $brand-success;
		height: 24px;
		width: 24px;
		border-radius: 50px;
		background: $brand-success;
		cursor: pointer;
	}
	&::-ms-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	&::-ms-fill-lower {
		background: #ebebeb;
		border: 0 solid #eeeeee;
		border-radius: 8px;
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
	}
	&::-ms-fill-upper {
		background: #eeeeee;
		border: 0 solid #eeeeee;
		border-radius: 8px;
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
	}
	&::-ms-thumb {
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
		border: 1px solid $brand-success;
		width: 24px;
		border-radius: 50px;
		background: $brand-success;
		cursor: pointer;
		height: 4px;
	}
}
.range-fill {
	left: 0;
	position: absolute;
	top: 0; //19.5px;
	height: 4px;
	border-radius: 0;
	background-color: #EDEDED;
	pointer-events: none;
	width: 100%;
	&.range-fill-white {
		background-color: white;
		width: 100%;
	}
	&.range-fill-inactive {
		//left: 14px;
		//width: calc(100% - 28px);
		background-color: #EDEDED; //;
	}
	&.range-fill-active {
		//left: 14px;
		width: 0; //z-index: 111;
		background-color: $brand-success;
		&.range-fill-33 {
			width: 33.3333%;
		}
		&.range-fill-66 {
			width: 60%;
		}
		&.range-fill-100 {
			width: 85%;
		}
	}
}
.no-scroll {
	overflow: hidden;
}
#sapper {
	overflow-x: hidden;
	.modal-footer {
		position: relative;
		padding-bottom: 20px;
		.row {
			width: 100%;
			margin: 0;
			.btn + .btn {
				margin-left: 0;
			}
		}
	}
}
@media (max-width: $screen-xs-max) {
	#sapper {
		.modal-footer {
			position: fixed;
			left: 0;
			bottom: 24px;
			width: 100%;
			padding-bottom: 0;
		}
	}
}
.cr-app {
	min-height: auto;
	height: auto;
	// CR Shared Styles
	@import '@menus/consumer-shared-css/_variables';
	@import '@menus/consumer-shared-css/_icons';
	@import '@menus/consumer-shared-css/_form';
}
.rating-off-icon, .rating-on-icon {
	width: 18px;
	height: 18px;
}
// 36x24
.hamburger-menu-icon {
	width: 36px;
	height: 24px;
}
// 112x112
.dish-icon {
	width: 112px;
	height: 112px;
}
.header-logo-section {
	display: flex;
	height: calc(env(safe-area-inset-top, 0) + #{$navbar-height});
}
.AppSwiper {
	.swiper-button {
		color: $brand-success;
	}
}
.position-relative {
	position: relative;
}
.text-align-right {
	text-align: right;
}
.mt-12 {
	margin-top: 12px !important;
}
</style>
