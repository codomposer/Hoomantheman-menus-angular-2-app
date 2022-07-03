<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { is_last_ } from '@menus/array'
import { PageLoader, LocationAutocomplete } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { MapView, Menuitem } from '@menus/consumer-search-ui'
import { Pagination } from '@menus/pagination-ui'
import { PlatformIcon } from '@menus/platform-ui'
import { ChipsContainer } from '@menus/consumer-layout-ui'
import type { consumer_seo_ui_Ctx } from '../consumer_seo_ui_Ctx.js'
import { SeoDishMenuItemList_c } from './SeoDishMenuItemList_c.js'
export let page:number|string = 1, zipcode, dish
const ctx = getContext_ui_ctx() as consumer_seo_ui_Ctx
export const _ = new SeoDishMenuItemList_c(ctx)//region
const {
	breadcrumbList$, busyZip$, dishZipSeo$, DishZipSeo_a$, linksContainer$,
	locationAutocomplete$, mapView$, menuitems$, menuitems_busy$, pageSize$,
	paginationBaseUrl$, showLocationAutocomplete$, sticky$, TotalPages$, TotalRow$,
} = _
$: _.page$.$ = parseInt(page as string)
$: _.zipcode$.$ = parseInt(zipcode)
$: _.dish$.$ = dish
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<svelte:head>
  <title>Restaurants serving {dish} by Menu.com</title>
  <meta name='description' content="Find Restaurants serving {dish} {
    $dishZipSeo$
      ? `in ${$dishZipSeo$.ZipCode}`
      : `around you`
  }">
</svelte:head>
<svelte:window on:scroll={_.onscroll}></svelte:window>
<div class="seo-dish-menu-item-list-page">
  <div class="header-logo-section">
    <PlatformIcon></PlatformIcon>
  </div>
  <div class="main-contents">
    <div class="menu-item-list">
      <div class="hero">
        <h1
					class="section-title"
				>{ dish }
					{#if zipcode && !$menuitems_busy$}<span>(Served by { $TotalRow$ } Restaurants)</span>{/if}</h1>
				{#if $showLocationAutocomplete$}
          <form class="location-autocomplete-container"
								on:submit|preventDefault={evt => _.gotoSearchMenuMapView()}
					>
            <LocationAutocomplete bind:this={$locationAutocomplete$}></LocationAutocomplete>
            <button>Search</button>
          </form>
        {:else}
          <div class="change-location"
							 on:click={evt => _.onclickChangeLocation()}
					>
            Change Location
          </div>
        {/if}
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
              <a href="{ item.url }">{ item.name }</a>
            {/if}
          </li>
          {/each}
        </ul>
      </div>
      <div bind:this={$linksContainer$} class="links-container">
        {#if $busyZip$}
          <PageLoader></PageLoader>
        {:else}
          <ChipsContainer
						type="link"
						multiSelect={false}
						list={$DishZipSeo_a$}
						key="ZipCode"
					></ChipsContainer>
        {/if}
      </div>
			{#if !$busyZip$}
        <div class="map-container"
						 class:sticky={$sticky$}
				>
          <MapView bind:this={$mapView$}
									 search_menuitem_a={$menuitems$}
									 busy={$menuitems_busy$}
									 map_center={$dishZipSeo$?.LatLngLiteral}
									 on:mouseoverMapMarker={evt => _.onmouseoverMapMarker(evt)}
									 on:mouseoutMapMarker={evt => _.onmouseoutMapMarker(evt)}
					></MapView>
        </div>
				{#if !$menuitems_busy$}
          <div class="menu-items">
            <h4 class="browse-by-heading">Browse by Menu Items</h4>
            <div class="clearfix">
              {#each $menuitems$ as menuitem,index}
                <a href="{_.getRestaurantDetailsUrl(menuitem)}">
                  <Menuitem
										{menuitem}
										{index}
										config={({
                      mode: 'viewOnly',
                      showAddress: true,
                    })}
										on:mouseover={evt => _.onmouseover({ index })}
										on:mouseout={evt => _.onmouseout({ index })}
									></Menuitem>
                </a>
              {/each}
            </div>
						{#if $menuitems$.length}
              <Pagination
								baseUrl={$paginationBaseUrl$}
								bind:page={page}
								bind:pageSize={$pageSize$}
								TotalPages={$TotalPages$}
								TotalRow={$TotalRow$}
								on:changepage={evt => _.load_menuItems(evt)}
							></Pagination>
            {:else}
              <div>No menu items available</div>
            {/if}
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style type=text/scss global>
@import "@menus/consumer-shared-css/variables";
.seo-dish-menu-item-list-page {
	.main-contents {
		padding: 48px 0;
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
		#map {
			min-height: 400px;
		}
		.map-container.sticky + .menu-items {
			margin-top: 400px;
		}
		.menu-items {
			overflow: auto;
			@media (max-width: $screen-md) {
				padding: 0 1rem;
			}
		}
		.sticky-map-spacer {
			display: none;
		}
		.browse-by-heading {
			font-weight: $lato-bold;
			margin: 48px 0 12px;
			@media (max-width: $screen-sm-max) {
				padding: 0 1rem;
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
			.SearchDish {
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
				&.show-less {
					.chips {
						height: 40px;
						overflow-y: hidden;
					}
				}
				.show-more-link {
					color: $brand-success;
					font-weight: $lato-bold;
					text-align: right;
					cursor: pointer;
					text-decoration: underline;
				}
			}
			.section-links {
				margin-top: 13px;
				.section-link {
					margin-bottom: 8px;
				}
			}
		}
		.breadcrumb-container {
			margin: 0;
			@media (max-width: $screen-md) {
				padding: 0 1rem;
			}
		}
		.menu-item-list {
			margin: 0 auto;
			$menu-item-margin: 10px;
			$menu-item-width: 370px;
			width: 100%;
			@media (min-width: $screen-sm-min + 50px) {
				// Show 2 items per row
				width: (2 * $menu-item-width) + (2 * $menu-item-margin);
			}
			@media (min-width: $screen-md-min) {
				// Show 3 items per row
				width: 2 * $menu-item-width + (2 * $menu-item-margin);
			}
			@media (min-width: $screen-lg-min) {
				// Show 4 items per row
				width: 3 * $menu-item-width + (3 * $menu-item-margin);
			}
			@media (min-width: $screen-lg-min + 400px) {
				// Show 4 items per row
				width: 4 * $menu-item-width + (4 * $menu-item-margin);
			}
			@include hero();
			.hero {
				flex-direction: column;
				@media (max-width: $screen-sm-max) {
					padding: 0 1rem;
				}
				.location-autocomplete-container {
					display: flex;
					flex-direction: row;
					min-width: 400px;
					@media (max-width: 400px) {
						min-width: auto;
						width: 100%;
					}
					> * {
						flex-grow: 1;
					}
					> button {
						flex-grow: 0;
						padding: 0 3rem;
						border: none;
						background: $brand-success;
					}
				}
				.change-location {
					cursor: pointer;
				}
			}
			.Menuitem {
				.menu-item-container {
					height: 230px;
					float: left;
					width: 100%;
					margin-bottom: 24px;
					@media (min-width: $screen-sm-min + 50px) {
						width: $menu-item-width;
						margin-right: $menu-item-margin;
						margin-bottom: $menu-item-margin;
					}
				}
			}
		}
	}
}
</style>
