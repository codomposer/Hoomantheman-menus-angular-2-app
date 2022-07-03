<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import type { ExtendedGeolocatable_I } from '@menus/geolocatable'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
import { RestaurantCard } from '../RestaurantCard/index.js'
import { MapViewContext, MapView_c } from './MapView_c.js'
import { Menuitem } from '../Menuitem/index.js'
export let search_menuitem_a:SearchMenuitem_I[] = [], context = MapViewContext.RESTAURANT, busy = false, map_center:ExtendedGeolocatable_I = null
const dispatch = createEventDispatcher()
const ctx = getContext_ui_ctx() as consumer_search_ui_Ctx
export const _ = new MapView_c(ctx, dispatch)
const { active_item_element$, map_center$, map_element$, map_ready$ } = _
export const { active_item$, setActive, unset_active_item } = _
$: _.in_map_center$.$ = map_center
$: map_center = $map_center$
$: _.search_menuitem_a$.$ = search_menuitem_a
$: _.context$.$ = context
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="MapView map-container">
  {#if busy}
    <PageLoader center="parent"></PageLoader>
  {/if}
	<div class="action-icons">
    <div class="action-icon map-on-icon icon-map"></div>
    <div class="action-icon view-off-icon icon-view" on:click={()=>_.open_grid_view()}></div>
  </div>
  <div bind:this={$active_item_element$}
			 class="active-item-element m-gmaps-ui-view"
			 class:ready={$map_ready$}
	>
    {#if $active_item$}

	{#if context === MapViewContext.RESTAURANT}
	<RestaurantCard show_close={true} show_bubble={true} restaurant_card={$active_item$} index={0} on:close={()=>unset_active_item()}></RestaurantCard>
	{:else}
	<Menuitem
		show_close={true}
		menuitem={$active_item$}
		config={ {bubble: true, hideMoreDishes: true} }
		on:close={()=>unset_active_item()}
	></Menuitem>
	{/if} 
	
    {/if}
  </div>
  <div bind:this={$map_element$} id="map"></div>
</div>

<style type="text/scss" global>
@import "@menus/consumer-shared-css/variables";
.MapView {
	flex-grow: 1;
	display: flex;
	overflow: hidden;
	min-width: 100%;
	max-width: 100%;
	position: relative;
	.PageLoader {
		&.pare.nt-center {
			overflow: hidden;
		}
	}
	.active-item-element {
		display: none;
		position: absolute;
		min-width: 375px;
		max-width: 400px;
		min-height: 232px;
		max-height: 232px;
		background: white;
		&.ready {
			display: block;
		}
	}
	.action-icons {
		position: absolute;
		top: 8px;
		right: 8px;
		padding: 12px 24px;
		background: white;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
		border-radius: 8px;
		width: 104px;
		z-index: 1;
		text-align: center;
		display: none;
		@media (max-width: $screen-xs-max) {
			display: inline-block;
		}
		.action-icon {
			vertical-align: middle;
			&.icon-map {
				cursor: default;
			}
			&.icon-view {
				margin-left: 16px;
			}
		}
	}
	#map {
		min-height: 100%;
		width: 100%;
		// Styling for price info window
		.gm-style .gm-style-iw-t::after {
			bottom: 0;
		}
		// Hide price map info window close button
		button.gm-ui-hover-effect {
			display: none !important;
		}
	}
}
</style>
