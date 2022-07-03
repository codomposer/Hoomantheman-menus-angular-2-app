<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import SvelteInfiniteScroll from 'svelte-infinite-scroll'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import { Menuitem } from '@menus/consumer-search-ui'
import { params_fireFlyID$_b } from '@menus/page'
import { restaurant_url_, menuitem_restaurant_url_data_ } from '@menus/route'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { CHARTS_TAB } from '@menus/web-config'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { Ro_Menuitems_c } from './Ro_Menuitems_c.js'
let show_more_chips = false, opened_more_dishes = false
const ctx = getContext_ui_ctx() as ro_menu_ui_Ctx, dispatch = createEventDispatcher()
const params_fireFlyID = params_fireFlyID$_b(ctx)
export const _ = new Ro_Menuitems_c(ctx, dispatch)
const {
	busy$, dish_chips_div$, dishTypes$, is_overflow_dish_chips$, keywords_label$, load_more_menuitems_busy$, menuitems$,
	menuitems_busy$,
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $busy$}
  <PageLoader center="page"></PageLoader>
{:else}
  <div class="breadcrumb-container">
    <Breadcrumb></Breadcrumb>
  </div>
{/if}
<div class="restaurant-menu-items-page">
  {#if !$busy$}
    <div class="main-contents">
      <div class="page-title-section">
				<a href="/backoffice/manage-restaurant/{$params_fireFlyID}/{CHARTS_TAB}" class="page-title-text">
					<div class="arrow-left-icon"></div>
					{ $keywords_label$ }
				</a>
      </div>
      <div>
        {#if $dishTypes$.length}
          <div class="dish-chips-container" class:show-less={!show_more_chips}>
            <div class="chips style-2" bind:this={$dish_chips_div$}>
              {#each $dishTypes$ as dishType,index}
                <div class="chip-item"
										 class:active={dishType.active}
										 on:click={evt => _.choose_dishType(dishType)}
								>{ dishType.Name }</div>
              {/each}
            </div>
						{#if $is_overflow_dish_chips$}
              <div class="show-more-link c-success"
									 on:click={evt => show_more_chips = !show_more_chips}
							>Show { show_more_chips ? 'less' : 'more' }</div>
            {/if}
          </div>
        {/if}
				{#if $menuitems_busy$}
          <PageLoader></PageLoader>
        {/if}
				<div class="menu-item-list clearfix"
						 class:opened-more-dishes={opened_more_dishes}
				>
          {#each $menuitems$ as menuitem}
            <a
							href={
                restaurant_url_(menuitem_restaurant_url_data_(menuitem))
              }
						>
              <Menuitem
								{menuitem}
								config={{ viewOnly: true }}
							></Menuitem>
            </a>
          {/each}
					<SvelteInfiniteScroll
						threshold={20}
						on:loadMore={evt => _.loadMore_menuitems(true)}
					></SvelteInfiniteScroll>
        </div>
				{#if $load_more_menuitems_busy$}
          <PageLoader></PageLoader>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style type=text/scss global="true">
@import "@menus/css/lib";
.restaurant-menu-items-page {
	.page-title-section {
		.page-title-text {
			text-transform: capitalize;
		}
	}
	.dish-chips-container {
		border-bottom: 1px solid #DBDBDB;
		padding: 8px 135px;
		background-color: white;
		max-height: 400px;
		overflow-y: auto;
		@media (max-width: $screen-md-max) {
			padding-left: 48px;
			padding-right: 48px;
		}
		@media (max-width: $screen-sm-max) {
			padding-left: 36px;
			padding-right: 36px;
		}
		@media (max-width: $screen-xs-max) {
			padding-left: 24px;
			padding-right: 24px;
		}
		&.show-less {
			.chips {
				height: 40px;
				overflow-y: hidden;
			}
		}
		.chips {
			padding-left: 0;
			@media (max-width: $screen-xs-max) {
				@include chipsScrollable();
			}
			.chip-item {
				display: inline-block;
				margin: 5px;
				a {
					text-decoration: none;
				}
			}
		}
		.show-more-link {
			font-weight: $lato-bold;
			text-align: right;
			cursor: pointer;
			text-decoration: underline;
			@media (max-width: $screen-xs-max) {
				display: none;
			}
		}
	}
	.menu-item-list {
		margin-top: 37px;
		text-align: center;
		@media (min-width: $screen-sm-min) {
			font-size: 0; // FIX: the extra spaces caused by child element `display: inline-block`
		}
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
		.Menuitem {
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
	}
	.PageLoader {
		margin-top: 24px;
	}
}
</style>
