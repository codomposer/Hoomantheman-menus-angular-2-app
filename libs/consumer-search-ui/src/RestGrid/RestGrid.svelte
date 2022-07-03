<script lang="ts">
import { onDestroy, onMount, createEventDispatcher } from 'svelte'
import SvelteInfiniteScroll from 'svelte-infinite-scroll'
import { Enable_Map_View$_b } from '@menus/platform-settings'
import type { BaseRestaurantCard } from '@menus/restaurant'
import type { NoResultPlaceholder_config_T } from '@menus/shared-ui'
import { NoResultPlaceholder, PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
import { RestaurantCard } from '../RestaurantCard/index.js'
import { RestGrid_c } from './RestGrid_c.js'
export let items:BaseRestaurantCard[], busy:boolean, no_result_config:NoResultPlaceholder_config_T
const ctx = getContext_ui_ctx() as consumer_search_ui_Ctx, dispatch = createEventDispatcher()
const Enable_Map_View = Enable_Map_View$_b(ctx)
export const _ = new RestGrid_c(ctx, dispatch)
let restaurantListElement;

function open_map_search_view() {
	// Reset scroll position
	restaurantListElement.scrollTop = 0;

	_.open_map_search_view();
}

onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="RestGrid rest-grid">
  <div class="section-title-wrapper">
  <div class="section-title">Restaurants around you</div>
  <div class="action-icons">
    <div class="view-on-icon cursor-default"></div>
		{#if $Enable_Map_View}
      <a class="map-off-icon-link" href="." on:click|preventDefault={open_map_search_view}>
        <div class="map-off-icon"></div>
      </a>
    {/if}
  </div>
</div>
	{#if !items?.length && no_result_config}
    <NoResultPlaceholder config={no_result_config}></NoResultPlaceholder>
  {/if}
	{#if items?.length}
    <div class="restaurant-list clearfix" bind:this={restaurantListElement}>
      {#each items || [] as item,index}
        <RestaurantCard restaurant_card={item} {index}></RestaurantCard>
      {/each}
			<SvelteInfiniteScroll
				threshold={20}
				on:loadMore={(ev) => _.on_loadMore(ev)}
			></SvelteInfiniteScroll>
    </div>
  {/if}
	{#if busy}
    <PageLoader center="parent"></PageLoader>
  {/if}
</div>

<style type="text/scss" global>
@import "@menus/css/lib";
.RestGrid {
	display: flex;
	flex-direction: column;
	padding: 8px 0;
	width: 100%;
	overflow: hidden;
	position: relative;
	min-height: 100%;
	> * {
		padding: 0 16px; // 135px
		@media (max-width: $screen-xs-max) {
			padding-left: 24px;
			padding-right: 24px;
		}
	}
	> .section-title-wrapper {
		display: flex;
    	justify-content: space-between;

		@media (min-width: $screen-sm-min) {
			margin-right: 24px;
		}

		> .section-title {
			font-weight: $lato-black;
			font-size: 18px;
		}

		> .action-icons {
			display: flex;
			align-items: center;

			@media (min-width: $screen-sm-min) {
				display: none;
			}
			
			.view-on-icon {
				margin-right: 16px;
			}

			.map-off-icon-link {
				display: flex;
			}
		}
	}
	> .NoResultPlaceholder {
		flex-grow: 1;
		display: flex;
	}
	> .restaurant-list {
		flex-grow: 1;
		overflow: auto;
		padding-top: 8px;
		font-size: 0; // FIX: the extra spaces caused by child element `display: inline-block`
		text-align: center;

		.restaurant-item {
			margin-bottom: 16px;
		}
	}
	> .PageLoader {
		flex-grow: 1;
		display: flex;
	}
}
</style>
