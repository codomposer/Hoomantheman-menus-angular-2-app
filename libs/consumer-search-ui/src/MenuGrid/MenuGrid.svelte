<script lang="ts">
import { onMount, createEventDispatcher } from 'svelte'
import SvelteInfiniteScroll from 'svelte-infinite-scroll'
import { has_dom } from '@ctx-core/dom'
import { clone } from '@ctx-core/object'
import { query_str_ } from '@ctx-core/uri'
import type { Menuitem_I } from '@menus/consumer-menu'
import type{ SearchMenuitem_I } from '@menus/search-menu-common'
import { PageLoader, NoResultPlaceholder } from '@menus/shared-ui'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { getContext_ui_ctx } from '@menus/ui'
import { MAP_SEARCH_VIEW } from '@menus/web-config'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
import { Menuitem } from '../Menuitem/index.js'
import { MenuGrid_c } from './MenuGrid_c.js'
export let search_menuitem_a:SearchMenuitem_I[], busy = false, no_result_config, selected_menuitem:Menuitem_I = null
const menuitemConfig = {
	showDistance: true
}
const ctx = getContext_ui_ctx() as consumer_search_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new MenuGrid_c(ctx, dispatch)//region
const { Enable_Map_View$, page_query$, selected_menuitem$, more_dishes_show$, } = _
$: _.selected_menuitem$.$ = selected_menuitem || null
let search_menus_menuitems_sort:string

// tell swiper to use navigation and pagination modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

let Swiper;
let SwiperSlide;

onMount(async () => {
  // dynamically import swiper module
  const SwiperSvelteModule = await import('swiper/svelte');
  Swiper = SwiperSvelteModule.Swiper;
  SwiperSlide = SwiperSvelteModule.SwiperSlide;
});

	// sorted_search_menuitem_a:SearchMenuitem_I[]
// $: {
// 	if (search_menuitem_a) {
// 		const sortings = {
// 			is_open(i0:SearchMenuitem_I, i1:SearchMenuitem_I) {
// 				return (
// 					i0.is_open && i1.is_open
// 					? 0
// 					: i0.is_open
// 						? -1
// 						: 1
// 				)
// 			},
// 			restaurant_name_asc(i0:SearchMenuitem_I, i1:SearchMenuitem_I) {
// 				return (
// 					i0.RestaurantName < i1.RestaurantName
// 					? -1
// 					: i0.RestaurantName > i1.RestaurantName
// 						? 1
// 						: 0
// 				)
// 			},
// 			restaurant_rating_desc(i0:SearchMenuitem_I, i1:SearchMenuitem_I) {
// 				return (
// 					i0.RestRating < i1.RestRating
// 					? 1
// 					: i0.RestRating > i1.RestRating
// 						? -1
// 						: 0
// 				)
// 			},
// 			distance_asc(i0:SearchMenuitem_I, i1:SearchMenuitem_I) {
// 				return (
// 					i0.Distance < i1.Distance
// 					? -1
// 					: i0.Distance > i1.Distance
// 						? 1
// 						: 0
// 				)
// 			},
// 			price_asc(i0:SearchMenuitem_I, i1:SearchMenuitem_I) {
// 				return (
// 					i0.Price < i1.Price
// 					? -1
// 					: i0.Price > i1.Price
// 						? 1
// 						: 0
// 				)
// 			},
// 		}
// 		sorted_search_menuitem_a = search_menuitem_a.sort(sortings[search_menus_menuitems_sort])
// 	}
// }
</script>

<div class="MenuGrid menu-item-section">
  <div class="page-actions">
    <select name="sort" class="form-control select-sort" bind:value={search_menus_menuitems_sort} on:change="{evt => dispatch('sortChanged', evt)}">
		<option value="0">Default - Is Open</option>
		<option value="1">Restaurant Name Asc</option>
		<option value="2">Restaurant Rating Desc</option>
		<option value="3">Distance Asc</option>
		<option value="4">Price Asc</option>
    </select>
    <div class="action-icons">
      <div class="view-on-icon icon-view"></div>
			{#if $Enable_Map_View$}
        <a href="/menu{query_str_(clone($page_query$, { search_view: MAP_SEARCH_VIEW }))}">
          <div class="map-off-icon icon-map"></div>
        </a>
      {/if}
    </div>
  </div>
	{#if !search_menuitem_a?.length && no_result_config}
    <NoResultPlaceholder config={no_result_config}></NoResultPlaceholder>
  {/if}
	{#if $more_dishes_show$}
    <div class="more-dishes-container">
      <div class="more-dishes-details clearfix">
        <div class="restaurant-name">{ $selected_menuitem$?.sub_menuitems?.[0]?.RestaurantName }'s</div>
        <div class="dish-count">{ $selected_menuitem$?.sub_menuitems?.length } { $selected_menuitem$?.sub_menuitems?.[0]?.MenuItemName || 'item(s)' }</div>
        <div class="delete-icon" on:click={_evt => _.set_ShowMoreDishes(null)}></div>
      </div>
	  {#if has_dom}
	  	<div class="AppSwiper">
			<svelte:component
				this={Swiper}
				slidesPerView={'auto'}
				spaceBetween={15}
				navigation={{
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}}
			>
			<!-- TODO: Use Swiper library directly, same as used in `RoHome.svelte` file <AppSwiper> -->
			{#each $selected_menuitem$?.sub_menuitems as menuitem,index}
				<svelte:component this={SwiperSlide}>
					<div class="swiper-slide">
						<div class="swiper-slide-item">
							<Menuitem
								config={ { hideMoreDishes: true } }
								{menuitem}
								on:click={_evt => _.view_restaurant(menuitem, true)}
							></Menuitem>
						</div>
					</div>
				</svelte:component>
			{/each}

				<svelte:fragment slot="container-end">
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
				</svelte:fragment>
			</svelte:component>
		</div>
      {/if}
    </div>
  {/if}
	<div class="menu-item-list clearfix" class:opened-more-dishes={$more_dishes_show$}>
    <div class="menu-item-list-overlay" on:click={_.onclick_outside_ShowMoreDishes}></div>
		{#each search_menuitem_a || [] as menuitem}
      <Menuitem config={menuitemConfig} {menuitem} on:showMoreDishes="{() => _.set_ShowMoreDishes(menuitem)}"></Menuitem>
    {/each}
		{#if has_dom}
      <SvelteInfiniteScroll threshold={20} on:loadMore={_.on_loadMore}></SvelteInfiniteScroll>
    {/if}
  </div>
	{#if busy}
    <PageLoader center="parent"></PageLoader>
  {/if}
</div>

<style type="text/scss" global>
@import "@menus/consumer-shared-css/lib";
@import "@menus/css/clearfix";
@import 'swiper/swiper.scss';
@import 'swiper/components/navigation/navigation.scss';
@import 'swiper/components/pagination/pagination.scss';
.MenuGrid {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	padding: 8px 16px; // 135px
	margin: 0;
	min-width: 100%;
	max-width: 100%;

	.AppSwiper {
		width: 100%;
		.swiper-slide {
			display: flex;
			width: 400px;
			height: 300px;
			padding: 8px;
			@media (max-width: $screen-xs-max) {
				align-items: center;
				justify-content: center;
			}
			.swiper-slide-item {
				width: 100%;
				height: 100%;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
				display: inline-block;
				cursor: pointer;
			}
		}
	}

	> * {
		padding: 16px;
	}

	> .page-actions {
		@extend .clearfix;
		min-height: 55px;
		@media (min-width: $screen-sm-min) {
			font-size: 0; // FIX: the extra spaces caused by child element `display: inline-block`
		}
		.select-sort {
			float: left;
			width: 200px;
			height: auto;

			@media (min-width: $screen-sm-min) {
				width: 100%;
			}
		}
		.action-icons {
			float: right;
			display: none;
			@media (max-width: $screen-xs-max) {
				display: inline-block;
			}
			.icon-map, .icon-view {
				vertical-align: middle;
			}
			.icon-view {
				cursor: default;
			}
			.icon-map {
				margin-left: 16px;
			}
		}
	}
	> no-result-placeholder, > .PageLoader {
		flex-grow: 1;
		display: flex;
	}
	> .PageLoader {
		align-items: center;
		justify-content: center;
	}
	> .menu-item-list {
		flex-grow: 1;
		overflow: auto;
		text-align: center;
		&.opened-more-dishes {
			opacity: 0.3;
			.menu-item-list-overlay {
				display: block;
			}
		}
		.menu-item-list-overlay {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
			display: none;
		}
		.menu-item-container {
			display: inline-block;
			width: 100%;
			max-width: 370px;
			height: 230px;
			margin-bottom: 24px;
			text-align: left;
			@media (min-width: $screen-sm-min) {
				margin-right: 30px;
			}
		}
	}
	.more-dishes-container {
		position: fixed;
		z-index: 99;
		top: 350px;
		left: 0;
		right: 0;
		padding-left: 36px;
		padding-right: 36px;
		background-color: white;
		border: 1px solid #DDDDDD;
		.more-dishes-details {
			padding-top: 23px;
			padding-left: 32px;
			padding-right: 16px;
			.restaurant-name {
				font-weight: $lato-black;
				font-size: 24px;
				float: left;
			}
			.dish-count {
				margin-top: 11px;
				margin-left: 24px;
				float: left;
			}
			.delete-icon {
				float: right;
			}
		}
		.menu-item-container {
			display: inline-block;
			width: 100%;
			max-width: 370px;
			height: 230px;
			margin-bottom: 24px;
			text-align: left;
			@media (min-width: $screen-sm-min) {
				margin-right: 30px;
			}
		}
		$initial-margin-left: 135px;
		$item-width: 370px;
		$item-margin-right: 32px;
		.arrow-right {
			right: 103px;
		}
		.menu-item-list {
			margin-top: 22px;
			margin-bottom: 29px;
			padding-top: 0;
			padding-bottom: 0;
			&.more-dishes {
				width: 100%;
				menu-item {
					$margin-right: 32px;
					&:first-child {
						.menu-item-container {
							margin-left: $margin-right;
						}
					}
					.menu-item-container {
						float: none;
						display: inline-block;
						margin-right: $margin-right;
						margin-top: 8px;
						margin-bottom: 8px;
					}
				}
			}
		}
	}
}
</style>
