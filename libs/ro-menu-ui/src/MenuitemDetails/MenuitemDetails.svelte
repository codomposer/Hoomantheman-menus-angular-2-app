<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { page_path$_b } from '@ctx-core/sapper'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import {
	navigating_goto_b, params_fireFlyID$_b, params_HeadingID$_b, params_MasterheadingID$_b, params_MenuItemID$_b
} from '@menus/page'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import { subscribe_ERR_INVALID_ACCESS_b } from '@menus/ro-restaurant-ui'
import { Path } from '@menus/route'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { log } from '@menus/util'
import { MenuSearchBox } from '../MenuSearchBox/index.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menuitem$_b } from '../ro_menuitem$_b.js'
import { ro_menuitem_is_multisize$_b } from '../ro_menuitem_is_multisize$_b.js'
import { ro_menuitem_is_multisize_errors$_b } from '../ro_menuitem_is_multisize_errors$_b.js'
import { ro_menuoptions$_b } from '../ro_menuoptions$_b.js'
import { ro_menuoptionsizes$_b } from '../ro_menuoptionsizes$_b.js'
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx
const navigating_goto = navigating_goto_b(ctx)
const page_path$ = page_path$_b(ctx)
const params_fireFlyID$ = params_fireFlyID$_b(ctx)
const params_HeadingID$ = params_HeadingID$_b(ctx)
const params_MasterheadingID$ = params_MasterheadingID$_b(ctx)
const params_MenuItemID$ = params_MenuItemID$_b(ctx)
const ro_menuitem$ = ro_menuitem$_b(ctx)
const ro_menuitem_is_multisize$ = ro_menuitem_is_multisize$_b(ctx)
const ro_menuitem_is_multisize_errors$ = ro_menuitem_is_multisize_errors$_b(ctx)
const ro_menuoptions$ = ro_menuoptions$_b(ctx)
const ro_menuoptionsizes$ = ro_menuoptionsizes$_b(ctx)
const ro_restaurant$ = ro_restaurant$_b(ctx)
const subscribe_ERR_INVALID_ACCESS = subscribe_ERR_INVALID_ACCESS_b(ctx)
let busy = false
const component_name = 'MenuitemDetails'
let Menuitem_IsNew = false
$: Menuitem_IsNew = !$ro_menuitem$?.ID
onMount(()=>{
	ro_menuoptions$.invalidate()
	ro_menuoptionsizes$.invalidate()
	ro_restaurant$.invalidate()
})
onDestroy(subscribe_ERR_INVALID_ACCESS(ro_menuoptionsizes$.is_ERR_INVALID_ACCESS$, component_name))
onDestroy(subscribe_ERR_INVALID_ACCESS(ro_menuoptions$.is_ERR_INVALID_ACCESS$, component_name))
onDestroy(subscribe_ERR_INVALID_ACCESS(ro_restaurant$.is_ERR_INVALID_ACCESS$, component_name))
async function goBack() {
	await navigating_goto([
		Path.RO.BASE,
		Path.RO.MANAGE_RESTAURANT, params_fireFlyID$.$,
		Path.RO.MENU_DETAILS, params_MasterheadingID$.$,
		Path.RO.CATEGORY_DETAILS, params_HeadingID$.$,
	])
	log(ctx, component_name, 'goBack')
}
</script>

{#if !busy}
  <div class="breadcrumb-container">
    <Breadcrumb></Breadcrumb>
  </div>
{/if}
<div class="MenuitemDetails page">
  <div class="page-title-section">
		<div class="page-title-text" on:click={evt => goBack()}>
			<div class="arrow-left-icon"></div>
			{ $ro_menuitem$?.Name || '' }
		</div>
  </div>
	{#if busy || !$ro_menuitem$}
    <PageLoader center="page"></PageLoader>
  {/if}
	<div class="menu-search-box-wrapper">
		<div class="row">
			<div class="col-sm-6">
				<MenuSearchBox></MenuSearchBox>
			</div>
			<div class="col-sm-6 text-right tab-search">
				<slot name="search-box"></slot>
			</div>
		</div>
	</div>
	<ul class="nav nav-pills">
		<li class:active={/\/info/.test($page_path$)}
		><a
			href={
				[
					'backoffice', Path.RO.MANAGE_RESTAURANT, $params_fireFlyID$, Path.RO.MENU_DETAILS,
					$params_MasterheadingID$, Path.RO.CATEGORY_DETAILS, $params_HeadingID$, Path.RO.MENU_ITEM_DETAILS,
					$params_MenuItemID$, 'info'
				].join('/')
			}
			title="Item Info"
		>Item Info</a></li>
		{#if !Menuitem_IsNew}
			{#if $ro_menuitem_is_multisize$}
				<li class:active={/\/size/.test($page_path$)}
						class:disabled={Menuitem_IsNew}
						class:has-errors={$ro_menuitem_is_multisize_errors$.length}
				><a
					href={
						[
							'backoffice', Path.RO.MANAGE_RESTAURANT, $params_fireFlyID$, Path.RO.MENU_DETAILS,
							$params_MasterheadingID$, Path.RO.CATEGORY_DETAILS, $params_HeadingID$, Path.RO.MENU_ITEM_DETAILS,
							$params_MenuItemID$, 'size'
						].join('/')
					}
					title={$ro_menuitem_is_multisize_errors$.join('\n') || 'Multi Size'}
				>Multi Size</a></li>
			{/if}
			<li class:active={/\/option/.test($page_path$)}
					class:disabled={Menuitem_IsNew}
			><a
				href={
					[
						'backoffice', Path.RO.MANAGE_RESTAURANT, $params_fireFlyID$, Path.RO.MENU_DETAILS,
						$params_MasterheadingID$, Path.RO.CATEGORY_DETAILS, $params_HeadingID$, Path.RO.MENU_ITEM_DETAILS,
						$params_MenuItemID$, 'option'
					].join('/')
				}
				title="Option"
			>Option</a></li>
		{/if}
	</ul>
	<slot></slot>
</div>
<style type=text/scss global>
@import "@menus/css/lib";
// Save Menu Item Modal
.MenuitemDetails {
	padding: 0 0 600px;
	.menu-search-box-wrapper {
		margin-bottom: 16px;
		.OptionTabSearch {
			@media (max-width: $screen-xs-max) {
				margin-top: 12px;
			}
		}
	}
	.nav-pills {
		li {
			&.has-errors {
				a {
					color: $brand-danger;
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
}
</style>
