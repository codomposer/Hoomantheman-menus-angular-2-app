<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import SvelteInfiniteScroll from 'svelte-infinite-scroll'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { params_fireFlyID$_b } from '@menus/page'
import { DishItem } from '@menus/ro-dish-item-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { CHARTS_TAB } from '@menus/web-config'
import type { ro_restaurant_dishes_ui_Ctx } from '../ro_restaurant_dishes_ui_Ctx.js'
import { RestaurantDishes_c } from './RestaurantDishes_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_dishes_ui_Ctx, dispatch = createEventDispatcher()
const params_fireFlyID = params_fireFlyID$_b(ctx)
export const _ = new RestaurantDishes_c(ctx, dispatch)
const { busy$, dishes$, search_dish_busy$, title$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if !$busy$}
  <div class="breadcrumb-container">
    <Breadcrumb></Breadcrumb>
  </div>
{/if}
{#if $busy$}
  <PageLoader center="page"></PageLoader>
{/if}
<div class="RestaurantDishes page">
  {#if !$busy$}
    <div class="main-contents">
      <div class="page-title-section">
				<a href="/backoffice/manage-restaurant/{$params_fireFlyID}/{CHARTS_TAB}"
					 class="page-title-text"
				>
					<div class="arrow-left-icon"></div>
					{ $title$ }
				</a>
      </div>
      <div class="dish-list">
        <div class="clearfix">
          {#each $dishes$ as dish}
            <a href="." on:click|preventDefault={evt => _.select_dish(dish)}>
              <DishItem {dish}></DishItem>
            </a>
          {/each}
					<SvelteInfiniteScroll
						threshold={20}
						on:loadMore={_.load_next_search_dish}
					></SvelteInfiniteScroll>
        </div>
				{#if $search_dish_busy$}
          <PageLoader></PageLoader>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.RestaurantDishes {
	.page-title-section {
		.page-title-text {
			text-transform: capitalize;
		}
	}
	.dish-list {
		margin: 0 auto;
		padding: 48px 0;
		$dish-item-margin: 5px;
		$dish-item-width: 300px;
		width: 100%;
		$mainContentPaddingOffset: 80px;
		@media (min-width: $screen-sm-min + $mainContentPaddingOffset) {
			// Show 2 items per row
			width: (2 * $dish-item-width) + (2 * $dish-item-margin);
		}
		@media (min-width: $screen-md-min + $mainContentPaddingOffset) {
			// Show 3 items per row
			width: 3 * $dish-item-width + (3 * $dish-item-margin);
		}
		@media (min-width: $screen-lg-min + 100px + $mainContentPaddingOffset) {
			// Show 4 items per row
			width: 4 * $dish-item-width + (4 * $dish-item-margin);
		}
		@media (min-width: $screen-lg-min + 400px + $mainContentPaddingOffset) {
			// Show 5 items per row
			width: 5 * $dish-item-width + (5 * $dish-item-margin);
		}
		.DishItem {
			height: 200px;
			float: left;
			width: 100%;
			margin-bottom: 24px;
			@media (min-width: $screen-sm-min + $mainContentPaddingOffset) {
				width: $dish-item-width;
				margin-right: $dish-item-margin;
				margin-bottom: $dish-item-margin;
			}
		}
		.PageLoader {
			margin-top: 24px;
		}
	}
}
</style>
