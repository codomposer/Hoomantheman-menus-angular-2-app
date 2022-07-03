<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { support_chat_window_show$_b } from '@menus/chat'
import { ChipsContainer, Filters, SearchDish } from '@menus/consumer-layout-ui'
import { MapView, RestGrid, MenuGrid, search_menuitem_a$_b } from '@menus/consumer-search-ui'
import { is_filters_opened$_b } from '@menus/filters-common'
import { EnsureFontAwesome } from '@menus/font-awesome'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { MenuCartitemModal } from '@menus/restaurant-ui'
import { page_query$_b } from '@ctx-core/sapper'
import { search_menus_menuitems_termsinclude$_b, } from '@menus/search-menu'
import { getContext_ui_ctx } from '@menus/ui'
import type { search_ui_Ctx } from '../search_ui_Ctx.js'
import { NoResultPlaceholder, PageLoader } from '@menus/shared-ui'
import { Menu_c } from './Menu_c.js'
import { GRID_SEARCH_VIEW } from '@menus/web-config'
import { DELIVERY_SERVICE_TYPE_ID, ServiceType } from '@menus/service-type-common';
const ctx = getContext_ui_ctx() as search_ui_Ctx
const is_filters_opened$ = is_filters_opened$_b(ctx)
const notyf_error = notyf_error_b(ctx)
const notyf_success = notyf_success_b(ctx)
// const search_menuitem_a$ = search_menuitem_a$_b(ctx)
// const { search_menus_menuitems_busy$, search_menus_menu_no_result_config$ } = search_menuitem_a$
// const search_menus_menuitems_termsinclude$ = search_menus_menuitems_termsinclude$_b(ctx)
const support_chat_window_show$ = support_chat_window_show$_b(ctx)
const page_query$ = page_query$_b(ctx)
export const _ = new Menu_c(ctx)
const { busyMap$, busyList$ } = _
const { search_menu_names_a$, search_restaurants_a$, search_menuitem_a$, userAddress$, serviceType$, restNoResultConfig$ } = _
let MenuoptionsModal:MenuCartitemModal
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
// $: {
// 	$search_menuitem_a$
// 	? $search_menuitem_a$.length
// 		? notyf_success({
// 			message: `${$search_menuitem_a$.length} result${$search_menuitem_a$.length > 1 ? 's' : ''}`,
// 			duration: 1000,
// 			position: { x: 'right', y: 'bottom' }
// 		})
// 		: notyf_error({
// 			message: 'No results',
// 			duration: 1000,
// 			position: { x: 'right', y: 'bottom' }
// 		})
// 	: 0
// }
</script>
<EnsureFontAwesome></EnsureFontAwesome>
<div class="page search Menu" class:filters-opened={$is_filters_opened$}>
	{#if $busyMap$ || $busyList$}
		<PageLoader></PageLoader>
	{/if}

	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a href="/search">« All Restaurants</a>
			</li>
			<li class="breadcrumb-item active">
				<span>{ $page_query$?.keywords }</span>
			</li>
		</ul>
	</div>

  <MenuCartitemModal bind:this={MenuoptionsModal}></MenuCartitemModal>
  	<ChipsContainer
		class="SearchDish"
		bind:list={$search_menu_names_a$}
		key="Name"
		multi_select={true}
		enable_loadMoreResults={true}
		on:itemsChanged={_evt => _.onMenuNameSelected(_evt)}
	></ChipsContainer>
  <div class="search-body" class:has-no-chips={ !$search_menu_names_a$?.length }>
	{#if !$userAddress$ && ($serviceType$ === ServiceType.SERVICE_TYPE_DELIVERY || $serviceType$ === ServiceType.SERVICE_TYPE_CATERING) }
		<div class="no-result-wrapper">
			<NoResultPlaceholder config={{
				icon: 'no-location-icon',
				title: "Can't find your location",
				subtitle: 'We tried to find your location, but no luck. Try to enter your address manually or go to settings and allow us to get your location',
				buttons: [{
					type: '',
					title: 'Change Location',
					action:  () => {
						_.open_ChangeAddressModal_i()
					}
				}]
			}}></NoResultPlaceholder>
		</div>
	{/if}

	{#if $restNoResultConfig$ }
		<div class="no-result-wrapper">
			<NoResultPlaceholder config={$restNoResultConfig$}></NoResultPlaceholder>
		</div>
	{/if}

    <div class="search-map-content"
				 class:show-support-chat-window={$support_chat_window_show$}
				 class:isMapView={$page_query$?.search_view !== GRID_SEARCH_VIEW}
		>
      <div class="search-map-view-container">
        <MapView
					context="menu"
					search_menuitem_a={$search_restaurants_a$}
					busy={false}
				></MapView>
      </div>
    </div>
    <div class="grid-content" class:isGridView={$page_query$?.search_view === GRID_SEARCH_VIEW}>
		<MenuGrid
			search_menuitem_a={$search_menuitem_a$}
			busy={false}
			no_result_config={null}
			on:sortChanged={_.onSortChanged}
			on:loadMore={_evt => _.onloadMore(true)}
		></MenuGrid>
    </div>
  </div>
  <Filters></Filters>
</div>

<style type="text/scss" global>
@import "@menus/css/lib";
.Menu {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	height: calc(100vh - #{$navbar-height} - 40px);
	overflow: hidden;
	padding: 0;

	@media (max-width: $screen-xs-max) {
		height: calc(100vh - #{$navbar-height} - 77px);
	}

	> .SearchDish {
		flex-grow: 0;
	}
	> .search-body {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		overflow: hidden;
		position: relative;

		> .no-result-wrapper {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 2;
			padding: 0 40px;
			background-color: white;
		}

		.search-map-content {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			width: 100%;
			overflow: hidden;
			padding-left: 16px;
			@media (max-width: $screen-xs-max) {
				display: none;
				width: 100%;
				padding-left: 0;
				&.isMapView {
					display: flex;
				}
			}
			> .search-map-view-container {
				flex-grow: 1;
				display: flex;
				overflow: auto;
				background-color: #F2F2F2;
			}
		}
		.grid-content {
			flex-grow: 0;
			display: flex;
			flex-direction: column;
			overflow: auto;
			min-width: $sidebar-grid-width;
			max-width: $sidebar-grid-width;
			transition: all ease-in-out 1s;
			background: white;
			position: relative;
			@media (max-width: $screen-xs-max) {
				display: none;
				width: 100%;
				flex-grow: 1;
				min-width: auto;
				max-width: none;
				&.isGridView {
					display: flex;
				}
			}
		}

		&.has-no-chips {
			padding-top: 12px;
		}
	}

	.breadcrumb-container {
		@include breadcrumb-container-default;
	}
}
</style>
