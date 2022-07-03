<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { compact } from '@ctx-core/array'
import { Row } from '@menus/bootstrap'
import { ladda } from '@menus/ladda'
import type { manage_platform_ui_Ctx } from '@menus/manage-platform-ui'
import {
  manage_platform_busy$_b, manage_platform_no_active_restaurant$_b, manage_platform_settings_save_busy$_b,
  platform_settings_form_errors$_b, save_manage_platform_settings_b,
} from '@menus/manage-platform-ui'
import { MobilePreview } from '@menus/manage-platform-ui-MobilePreview'
import { ro_sideMenuOpened$_b } from '@menus/ro-layout-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { AppConfiguration_c } from './AppConfiguration_c.js'
import AppConfiguration_Colors from './AppConfiguration_Colors.svelte'
import AppConfiguration_Features from './AppConfiguration_Features.svelte'
import AppConfiguration_Icons from './AppConfiguration_Icons.svelte'
import AppConfiguration_IntroPages from './AppConfiguration_IntroPages.svelte'
import AppConfiguration_Main from './AppConfiguration_Main.svelte'
import AppConfiguration_PagesText from './AppConfiguration_PagesText.svelte'
import AppConfiguration_PlatformCompanies from './AppConfiguration_PlatformCompanies.svelte'
import AppConfiguration_Store from './AppConfiguration_Store.svelte'
import AppConfiguration_ViewSettings from './AppConfiguration_ViewSettings.svelte'
import { TutorialChapterId } from '@menus/ro-support-ui';
const ctx = getContext_ui_ctx() as manage_platform_ui_Ctx, dispatch = createEventDispatcher()
const manage_platform_busy$ = manage_platform_busy$_b(ctx)
const manage_platform_no_active_restaurant$ = manage_platform_no_active_restaurant$_b(ctx)
const manage_platform_settings_save_busy$ = manage_platform_settings_save_busy$_b(ctx)
const platform_settings_form_errors$ = platform_settings_form_errors$_b(ctx)
const ro_sideMenuOpened$ = ro_sideMenuOpened$_b(ctx)
const save_manage_platform_settings = save_manage_platform_settings_b(ctx)
export const _ = new AppConfiguration_c(ctx, dispatch)
const { manage_platform_settings$, MobilePreview_i$, } = _
let AppConfiguration_ViewSettings_errors:string[] = [], AppConfiguration_Main_errors:string[] = [],//region
	AppConfiguration_Icons_errors:string[] = [], AppConfiguration_Colors_errors:string[] = [],
	AppConfiguration_Store_errors:string[] = [], AppConfiguration_Features_errors:string[] = [],
	AppConfiguration_IntroPages_errors:string[] = [], AppConfiguration_PagesText_errors:string[] = []
$: platform_settings_form_errors$.$ = compact([
	...AppConfiguration_Main_errors, ...AppConfiguration_Icons_errors,
	...AppConfiguration_Colors_errors, ...AppConfiguration_Store_errors,
	...AppConfiguration_Features_errors, ...AppConfiguration_IntroPages_errors,
	...AppConfiguration_PagesText_errors, ...AppConfiguration_ViewSettings_errors
])//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="AppConfiguration">
  {#if $manage_platform_busy$}
    <PageLoader></PageLoader>
  {/if}
	<div class="page-title-section">
    <div class="page-title-text cursor-default">
      Manage Platform

	  <a class="tutorial-link" href="/backoffice/tutorial?chapter={TutorialChapterId.MANAGE_PLATFORM}" target="_blank"><i class="fa fa-youtube-play"></i></a>
    </div>
		{#if $manage_platform_no_active_restaurant$}
      <Row>
        Please fill the required fields and launch your web and mobile applications. The information can be changed.
      </Row>
    {/if}
  </div>
	{#if $manage_platform_settings$}
    <div class="platform-controls-section">
      <AppConfiguration_PlatformCompanies {_}></AppConfiguration_PlatformCompanies>
      <form on:submit|preventDefault={evt => save_manage_platform_settings()}>
        <AppConfiguration_ViewSettings {_} bind:AppConfiguration_ViewSettings_errors></AppConfiguration_ViewSettings>
        <AppConfiguration_Main {_} bind:AppConfiguration_Main_errors></AppConfiguration_Main>
        <AppConfiguration_Icons {_} bind:AppConfiguration_Icons_errors></AppConfiguration_Icons>
        <AppConfiguration_Colors bind:AppConfiguration_Colors_errors></AppConfiguration_Colors>
        <AppConfiguration_Store {_} bind:AppConfiguration_Store_errors></AppConfiguration_Store>
        <AppConfiguration_Features {_} bind:AppConfiguration_Features_errors>
          {#if false}
            <AppConfiguration_IntroPages {_} bind:AppConfiguration_IntroPages_errors></AppConfiguration_IntroPages>
          {/if}
        </AppConfiguration_Features>
        <AppConfiguration_PagesText {_} bind:AppConfiguration_PagesText_errors></AppConfiguration_PagesText>
        <div class="action-buttons-wrapper"
						 class:sidemenu-pl={$ro_sideMenuOpened$}
				>
          <div class="action-buttons">
            <button use:ladda={$manage_platform_settings_save_busy$} class="btn btn-lg btn-success"
										type="submit">Save</button>
            <button class="btn btn-lg btn-success btn-refresh-mobile-app" type="button"
										on:click={evt => _.refresh_mobile_app()}
						>Refresh Mobile App</button>
          </div>
        </div>
      </form>
    </div>
  {/if}
	{#if !$manage_platform_busy$}
    <div class="MobilePreview_container">
      <MobilePreview bind:this={$MobilePreview_i$}></MobilePreview>
    </div>
  {/if}
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.ManagePlatform {
	.AppConfiguration {
		padding: 0 0 200px;
		overflow: hidden;
		@media (max-width: $screen-xs-max) {
			padding-left: 0;
			padding-right: 0;
		}
		.platform-controls-section {

			.CheckBox {
				display: inline-flex;
			}

			@media (min-width: $screen-md-min) {
				max-width: calc(100% - 420px);
			}
			.enable-app-wrapper {
				@media (min-width: $screen-md-min) {
					padding-top: 34px;
				}
			}
			.photo-upload-container {
				float: left;
				@media (max-width: $screen-xs-max) {
					width: 100%;
					float: none;
					text-align: center;
				}
				.photo-viewer {
					position: relative;
					margin-top: 7px;
					margin-bottom: 12px;
					width: 144px;
					height: 144px;
					background-color: rgba(#455A64, 0.05);
          background-size: cover;
					@media (max-width: $screen-xs-max) {
						margin-left: auto;
						margin-right: auto;
					}
					img {
						position: absolute;
						margin: auto;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						max-width: 100%;
						max-height: 100%;
					}
				}
				.delete-menu-item-image {
					margin-top: 12px;
				}
			}
			.section {
				display: block;
				overflow: hidden;
			}
			.action-buttons-wrapper {
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				margin: 64px 0 0;
				background-color: white;
				z-index: 99;
				transition: padding $side-menu-transition-speed;
				.action-buttons {
					padding: 24px;
					border-top: 1px solid #DBDBDB;
					overflow: hidden;
					@media (max-width: $screen-xs-max) {
						padding: 24px 12px;
					}
					.btn {
						float: left;

						&:not(:last-child) {
							margin-right: 16px;
						}

						&.btn-refresh-mobile-app {
							min-width: 200px;
						}
					}
				}
			}
			.action-link {
				padding-left: 0;
				padding-right: 0;
				min-width: auto;
				&.save-link {
					color: $brand-success;
					margin-right: 8px;
					font-weight: $lato-bold;
				}
				&.cancel-link {
					color: $brand-danger;
					font-weight: $lato-regular;
				}
			}
			.palette-actions-wrapper {
				padding-top: 24px;
				> * {
					margin-right: 24px;
					margin-bottom: 8px;
				}
			}
			.palette-item {
				margin: 43px 0;
				label {
					display: block;
					margin-left: 152px;
				}
				.palette-color {
					display: inline-block;
					width: 80px;
					height: 44px;
					margin: 8px;
					border: 1px solid #DBDBDB;
					cursor: pointer;
					user-select: none;
				}
			}
			.intro-page-list {
				padding-top: 0;
				.table {
					margin-bottom: 0;
					.Enabled-row {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: flex-start;
					}
					.controls {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						.edit {
							flex-grow: 1;
						}
					}
					input {
						min-width: 100px;
					}
				}
				.empty-record {
					text-align: center;
					padding: 20px 8px;
					border-bottom: 1px solid #DBDBDB;
				}
			}
			.add-page-btn {
				margin-top: 24px;
			}
			.ServiceType {
				> div {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
				}
				.CheckBox {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					min-width: 120px;
					margin-bottom: 12px;
					label {
						display: inline-flex;
						align-items: center;
						justify-content: center;
					}
				}
				input[type=radio] {
					visibility: hidden;
					&:checked + label {
						background-color: $brand-success;
						color: white;
					}
					&:disabled + label {
						color: gray;
					}
					& + label {
						display: inline-flex;
						align-items: center;
						justify-content: center;
						height: 28px;
						width: 144px;
						margin-bottom: 12px;
						user-select: none;
					}
				}
			}
		}
	}
}
</style>
