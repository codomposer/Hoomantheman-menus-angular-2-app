<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { is_last_ } from '@menus/array'
import { MapView, RestaurantCard } from '@menus/consumer-search-ui'
import { Pagination } from '@menus/pagination-ui'
import { PlatformIcon } from '@menus/platform-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { unslug } from '@menus/util'
import type { consumer_seo_ui_Ctx } from '../consumer_seo_ui_Ctx.js'
import { SeoCityRestaurantList_c } from './SeoCityRestaurantList_c.js'
export let city, page:number|string = 1, zipcode
const ctx = getContext_ui_ctx() as consumer_seo_ui_Ctx
export const _ = new SeoCityRestaurantList_c(ctx)
const {
	breadcrumbList$, busyZip$, city_ctx$, linksContainer$, mapView$, pageSize$, restaurants$, restaurants_busy$, sticky$,
	TotalPages$, TotalRow$, zipcode_ctx$,
} = _
$: _.city$.$ = city
$: _.page$.$ = parseInt(page.toString())
$: _.zipcode$.$ = parseInt(zipcode)
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<svelte:window on:scroll={_.onscroll}></svelte:window>
<div class="seo-cuisine-list-page">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>
  <div class="main-contents">
    <div class="top-section-container">
      <div class="hero">
        <h1 class="section-title">{ unslug(city) }
					{#if $zipcode_ctx$ && !$restaurants_busy$}
            <span>(Served by { $TotalRow$ } Restaurants)</span>
          {/if}
        </h1>
        <div class="search-for-dishes"
						 on:click={evt => _.searchForDishes()}
				>Search for Dishes</div>
      </div>
      <div class="breadcrumb-container">
        <ul class="breadcrumb">
          {#each $breadcrumbList$ as item,index}
            <li class="breadcrumb-item"
								class:active={is_last_($breadcrumbList$, index)}
						>
              {#if is_last_($breadcrumbList$, index)}
                <span>{ item.name }</span>
              {:else}
                <a href={ item.url }>{ item.name }</a>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
      <div bind:this={$linksContainer$} class="links-container">
        <h4 class="browse-by-heading">Filter by zip codes</h4>
				{#if $busyZip$}
          <PageLoader></PageLoader>
        {:else}
          <div class="chips-container">
            <div class="chips style-2">
              {#each $city_ctx$?.ZipInfo || [] as item,index}
                <a
									class="chip-item"
									class:active={item.Zip == $zipcode_ctx$?.Zip}
									href="/city/{city}/{item.Zip}/menu/page/1"
								>{ item.Zip }</a>
              {/each}
            </div>
          </div>
        {/if}
      </div>
      <div class="map-container" class:sticky={$sticky$}>
        <MapView bind:this={$mapView$}
								 search_menuitem_a={$restaurants$}
								 busy={$restaurants_busy$}
								 on:mouseoverMapMarker={_.onmouseoverMapMarker}
								 on:mouseoutMapMarker={_.onmouseoutMapMarker}
				></MapView>
      </div>
    </div>
		{#if $zipcode_ctx$ && !restaurants_busy$}
      <div class="restaurant-list" class:sticky={$sticky$}>
        <h4 class="browse-by-heading">Browse by restaurants</h4>
        <div class="clearfix">
          {#each $restaurants$ as restaurant,index}
            <RestaurantCard restaurant_card={restaurant}
														{index}
														on:mouseovercomponent={evt => _.onmouseovercomponent({ index })}
														on:mouseoutcomponent={evt => _.onmouseoutcomponent({ index })}
						></RestaurantCard>
          {/each}
        </div>
				{#if $restaurants$.length}
          <Pagination
						baseUrl={`/city/${city}/${zipcode}/menu`}
						bind:page={page}
						bind:pageSize={$pageSize$}
						TotalPages={$TotalPages$}
						TotalRow={$TotalRow$}
						on:changepage={_.load_restaurants}
					></Pagination>
        {:else}
          <div>No restaurant available</div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style type=text/scss global>
@import "@menus/consumer-shared-css/variables";
.seo-cuisine-list-page {
	.main-contents {
		padding: 48px 0;
		.browse-by-heading {
			font-weight: $lato-bold;
			margin: 48px 0 12px;
			@media (max-width: $screen-sm-max) {
				padding: 0 1rem;
			}
		}
		.top-section-container {
			margin: 0 auto;
			$cuisine-item-margin: 5px;
			$cuisine-item-width: 300px;
			width: 100%;
			@media (min-width: $screen-sm-min) {
				// Show 2 items per row
				width: (2 * $cuisine-item-width) + (2 * $cuisine-item-margin);
			}
			@media (min-width: $screen-md-min) {
				// Show 3 items per row
				width: 3 * $cuisine-item-width + (3 * $cuisine-item-margin);
			}
			@media (min-width: $screen-lg-min + 100px) {
				// Show 4 items per row
				width: 4 * $cuisine-item-width + (4 * $cuisine-item-margin);
			}
			@media (min-width: $screen-lg-min + 400px) {
				// Show 5 items per row
				width: 5 * $cuisine-item-width + (5 * $cuisine-item-margin);
			}
			@include hero();
			.breadcrumb-container {
				margin: 0;
				@media (max-width: $screen-sm-max) {
					padding: 0 1rem;
				}
			}
			.hero {
				flex-direction: column;
				@media (max-width: $screen-sm-max) {
					padding: 0 1rem;
				}
				.search-for-dishes {
					cursor: pointer;
				}
			}
			.links-container {
				.section-title {
					text-align: center;
					font-weight: $lato-black;
					text-transform: capitalize;
				}
				.section-subtitle {
					font-weight: $lato-bold;
					margin-bottom: 16px;
				}
				.chips-container {
					.chips {
						padding-left: 0;
						.chip-item {
							display: inline-block;
							margin: 5px;
							a {
								text-decoration: none;
							}
						}
					}
				}
				.section-links {
					margin-top: 13px;
					.section-link {
						margin-bottom: 8px;
					}
				}
			}
			.cuisine-list {
				.cuisine-item {
					cursor: pointer;
					padding: 27px 0 0;
					text-align: center;
					border: 1px solid #DBDBDB;
					margin-left: -1px;
					margin-top: -1px;
					height: 140px;
					float: left;
					width: 100%;
					@media (min-width: $screen-sm-min) {
						// width: $cuisine-item-width;
						// margin-right: $cuisine-item-margin;
						// margin-bottom: $cuisine-item-margin;
						width: 120px;
					}
					.cuisine-img {
						width: 48px;
						height: 48px;
						margin: 0 auto;
					}
					.cuisine-name,
					.cuisine-count {
						font-size: 12px;
					}
					.cuisine-name {
						margin-top: 4px;
					}
				}
			}
		}
		.map-container {
			transition: all 1000ms;
			&.sticky {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				z-index: 2;
			}
		}
		.MapView {
			min-height: 400px;
		}
		.restaurant-list {
			&.sticky {
				margin-top: 450px;
			}
		}
		.restaurant-list {
			margin: 0 auto;
			margin-top: 24px;
			$restaurant-item-margin: 5px;
			$restaurant-item-width: 300px;
			width: 100%;
			@media (min-width: $screen-sm-min) {
				// Show 2 items per row
				width: (2 * $restaurant-item-width) + (2 * $restaurant-item-margin);
			}
			@media (min-width: $screen-md-min) {
				// Show 3 items per row
				width: 3 * $restaurant-item-width + (3 * $restaurant-item-margin);
			}
			@media (max-width: $screen-sm-max) {
				padding: 0 1rem;
			}
			@media (min-width: $screen-lg-min + 100px) {
				// Show 4 items per row
				width: 4 * $restaurant-item-width + (4 * $restaurant-item-margin);
			}
			@media (min-width: $screen-lg-min + 400px) {
				// Show 5 items per row
				width: 5 * $restaurant-item-width + (5 * $restaurant-item-margin);
			}
		}
	}
}
</style>
