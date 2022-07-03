<script lang="ts">
import { style_ } from '@ctx-core/html'
import { getContext_ui_ctx } from '@menus/ui'
import {
	MIN_ORDER_STEPS_TEXT, DELIVERY_STEPS_TEXT, delivery_fee_step$_b, is_filters_opened$_b,
	min_order_step$_b, min_price$_b, max_price$_b, proximity$_b, toggle_filters_opened_b, FILTER_DEFAULT_VALUES
} from '@menus/filters-common'
import { clone } from '@ctx-core/object'
import { query_str_ } from '@ctx-core/uri'
import { writable$ } from '@ctx-core/store'
import { PageLoader } from '@menus/shared-ui'
import { Enable_Cuisine_Filter$_b } from '@menus/platform-settings'
import { cuisines$_b, cuisines_busy$_b } from '@menus/search-menu-common'
import { is_filters_changed$_b } from '@menus/filters'
import { navigating_goto_b } from '@menus/page'
import { page_query$_b } from '@ctx-core/sapper'
import { reset_filters_b } from '@menus/consumer-shopping-cart'
import { select_cuisine_b } from '@menus/search-menu'
import type { consumer_layout_ui_Ctx } from '../consumer_layout_ui_Ctx.js'
const ctx = getContext_ui_ctx() as consumer_layout_ui_Ctx
const cuisines$ = cuisines$_b(ctx)
const cuisines_busy$ = cuisines_busy$_b(ctx)
const delivery_fee_step$ = delivery_fee_step$_b(ctx)
const Enable_Cuisine_Filter$ = Enable_Cuisine_Filter$_b(ctx)
const is_filters_changed$ = is_filters_changed$_b(ctx)
const is_filters_opened$ = is_filters_opened$_b(ctx)
const min_order_step$ = min_order_step$_b(ctx)
const max_price$ = max_price$_b(ctx)
const min_price$ = min_price$_b(ctx)
const proximity$ = proximity$_b(ctx)
const new_min_price$ = writable$<number>(undefined)
const new_max_price$ = writable$<number>(undefined)
const new_delivery_fee_step$ = writable$<number>(undefined)
const new_min_order_step$ = writable$<number>(undefined)
const new_proximity$ = writable$<number>(undefined)
const page_query$ = page_query$_b(ctx)
const navigating_goto = navigating_goto_b(ctx)
const reset_filters = reset_filters_b(ctx)
const select_cuisine = select_cuisine_b(ctx)
const toggle_filters_opened = toggle_filters_opened_b(ctx)//endregion

min_price$.subscribe((new_min_price) => {
	if(new_min_price !== undefined) {
		new_min_price$.$ = new_min_price
	}
})

max_price$.subscribe((new_max_price) => {
	if(new_max_price !== undefined) {
		new_max_price$.$ = new_max_price
	}
})

proximity$.subscribe((new_proximity) => {
	if(new_proximity !== undefined) {
		new_proximity$.$ = new_proximity
	}
})

delivery_fee_step$.subscribe((new_delivery_fee_step) => {
	if(new_delivery_fee_step !== undefined) {
		new_delivery_fee_step$.$ = new_delivery_fee_step
	}
})

min_order_step$.subscribe((new_min_order_step) => {
	if(new_min_order_step !== undefined) {
		new_min_order_step$.$ = new_min_order_step
	}
})

function reset() {
	min_price$.set(FILTER_DEFAULT_VALUES.MIN_PRICE);
	max_price$.set(FILTER_DEFAULT_VALUES.MAX_PRICE);
	delivery_fee_step$.set(FILTER_DEFAULT_VALUES.DELIVERY_FEE_STEP);
	min_order_step$.set(FILTER_DEFAULT_VALUES.MIN_ORDER_STEP);
	proximity$.set(FILTER_DEFAULT_VALUES.PROXIMITY);

	const clone_page_query = clone(page_query$.$)

	delete clone_page_query.min_price
	delete clone_page_query.max_price
	delete clone_page_query.delivery_fee_step
	delete clone_page_query.min_order
	delete clone_page_query.proximity

	navigating_goto([
		'/search',
		query_str_(clone_page_query)
	])

	// reset_filters();
}

function set_min_price(value: number) {
	new_min_price$.$ = value;

	if(new_min_price$.$ > new_max_price$.$) {
		new_max_price$.$ = new_min_price$.$;
	}
}

function set_max_price(value: number) {
	new_max_price$.$ = value;

	if(new_max_price$.$ < new_min_price$.$) {
		new_min_price$.$ = new_max_price$.$;
	}
}

function update_price_in_url() {
	navigating_goto([
		'/search',
		query_str_(
			clone(
				page_query$.$, {
					min_price: `${new_min_price$.$}`,
					max_price: `${new_max_price$.$}`,
				}
			)
		)
	])
}

function update_value_in_url(name: string, value: string) {
	navigating_goto([
		'/search',
		query_str_(
			clone(
				page_query$.$, {
					[name]: value,
				}
			)
		)
	])
}

</script>

<div class="Filters filters-section-wrapper"
		 class:filters-opened={$is_filters_opened$}
>
  <div class="filters-section" on:click|preventDefault>
    <div class="filters-header">
		<div class="filters-header-title">
			Filters
		</div>

		<div class="filters-header-icon" on:click={toggle_filters_opened}>
			<div class="close-1-icon icon-custom"></div>
		</div>
    </div>
    <div class="filters-section-content">
			<!-- Dish filters -->
        <div class="dish-filters">
          <div class="row">
            <div class="col-xs-6 min-price-wrapper">
              <div class="min-price">
                  <span>Min Price:</span>
                  <span class="value c-success">${$new_min_price$}</span>
              </div>
              <div class="price-range">
                  <div
										class="range-fill range-fill-active"
										style={style_({width: `${($new_min_price$/FILTER_DEFAULT_VALUES.PRICE_LIMIT)*100}%`})}
									></div>
                  <input
										class="custom-range-slider"
										type="range"
										min="0"
										max="{FILTER_DEFAULT_VALUES.PRICE_LIMIT}"
										value={$new_min_price$}
										on:input={evt => set_min_price(Number(evt.currentTarget.value))}
										on:change={update_price_in_url}
										disabled={$cuisines_busy$}
									>
              </div>
            </div>
            <div class="col-xs-6 max-price-wrapper">
              <div class="min-price">
                  <span>Max Price:</span>
                  <span class="value c-success">${$new_max_price$}</span>
              </div>
              <div class="price-range">
                <div
									class="range-fill range-fill-active"
									style={style_({width: `${($new_max_price$/FILTER_DEFAULT_VALUES.PRICE_LIMIT)*100}%`})}
								></div>
                <input
									class="custom-range-slider"
									type="range"
									min="0"
									max="{FILTER_DEFAULT_VALUES.PRICE_LIMIT}"
									value={$new_max_price$}
									disabled={$cuisines_busy$}
									on:input={evt => set_max_price(Number(evt.currentTarget.value))}
									on:change={update_price_in_url}
								>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-6 delivery-fee-wrapper">
              <div class="delivery-fee">
                  <span>Delivery Fee:</span>
                  <span class="value c-success"
									>{ DELIVERY_STEPS_TEXT[$new_delivery_fee_step$] }</span>
              </div>
              <div class="price-range delivery-fee-range">
                <div class="range-fill range-fill-active"
										 style={style_({width: `${$new_delivery_fee_step$ * 33}%`})}
								></div>
                <input class="custom-range-slider"
											 type="range"
											 min="0"
											 max="3"
											 value={$new_delivery_fee_step$}
											 on:input={evt => new_delivery_fee_step$.set(Number(evt.currentTarget.value))}
											 on:change={evt => update_value_in_url('delivery_fee_step', evt.currentTarget.value)}
											 disabled={$cuisines_busy$}
								>
              </div>
            </div>
            <div class="col-xs-6 min-order-wrapper">
              <div class="min-order">
                  <span>Min Order:</span>
                  <span class="value c-success">{ MIN_ORDER_STEPS_TEXT[$new_min_order_step$] }</span>
              </div>
              <div class="price-range min-order-range">
                <div class="range-fill range-fill-active"
										 style={style_({
                        width: `${$new_min_order_step$ * 33.33}%`
                     })}
								></div>
                <input
									class="custom-range-slider"
									type="range"
									min="0"
									max="3"
									value={$new_min_order_step$}
									on:input={evt => new_min_order_step$.set(Number(evt.currentTarget.value))}
									on:change={evt => update_value_in_url('min_order', evt.currentTarget.value)}
									disabled={$cuisines_busy$}
								>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="proximity">
                <span>Proximity:</span>
                <span class="value c-success">{$new_proximity$} miles</span>
              </div>
              <div class="proximity-range">
                <div
									class="range-fill range-fill-active"
									style={style_({
                        width: `${($new_proximity$/FILTER_DEFAULT_VALUES.PROXIMITY_LIMIT)*100}%`
                    })}
								></div>
                <input class="custom-range-slider"
											 type="range"
											 min="1"
											 max="{FILTER_DEFAULT_VALUES.PROXIMITY_LIMIT}"
											 value={$new_proximity$}
											 on:input={evt => new_proximity$.set(Number(evt.currentTarget.value))}
											 on:change={evt => update_value_in_url('proximity', evt.currentTarget.value)}
											 disabled={$cuisines_busy$}
								>
              </div>
            </div>
          </div>
        </div>
			<!-- Cuisine filters -->
			{#if $Enable_Cuisine_Filter$ && $cuisines$?.length}
        <div class="cuisine-filters">
          {#if $cuisines_busy$}
            <PageLoader></PageLoader>
          {:else}
            <div class="cuisine-list clearfix">
              {#each $cuisines$ as cuisine}
                <div class="cuisine-item"
										 class:active={cuisine.is_selected}
										 on:click={_evt => select_cuisine(cuisine)}>
                  <div class="cuisine-icon-{cuisine.id} cuisine-img"
											 class:cuisine-icon-active={cuisine.is_selected}
									></div>
                  <div class="cuisine-name">{ cuisine.Cuisine }</div>
                </div>
              {/each}
              </div>
          {/if}
        </div>
      {/if}
    </div>
    <div class="filter-action-buttons">
			{#if $is_filters_changed$}
        <button class="btn btn-primary btn-block"
								on:click={reset}
				>Reset Filters</button>
      {/if}
    </div>
  </div>
</div>

<style type="text/scss" global>
@import "@menus/consumer-shared-css/variables";
.Filters {
	display: none;
	position: fixed;
	top: 66px;
	height: calc(100vh - 66px);
	width: 100%;
	overflow: auto;
	z-index: 10;
	flex-grow: 1;
	flex-direction: column;
	background-color: rgba(0,0,0,.1);
	border-right: 1px solid #DBDBDB;

	@media (max-width: $screen-sm-max) {
		top: 100px;
		height: calc(100vh - 100px);
	}

	&.filters-opened {
		display: flex;
	}
	.filters-section {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		width: 100%;
		background-color: white;

		@media (min-width: $screen-md-min) {
			max-width: 450px;
		}

		.filters-header {
			display: flex;
    		justify-content: space-between;
    		align-items: center;
    		padding: 16px 24px;

			@media (max-width: $screen-xs-max) {
				padding-bottom: 0;
			}

			.filters-header-title {
				font-size: 18px;
				font-weight: 900;
			}

			.filters-header-icon {

				.custom-icon {
					display: flex;
				}
			}
		}
		.filters-section-content {
			flex-grow: 1;
			overflow: auto;
			/* Dish filters */
			.dish-filters {
				padding: 8px 24px 8px;
				@media (max-width: $screen-xs-max) {
					padding-left: 16px;
					padding-right: 16px;
				}
				.filter-title {
					font-weight: $lato-black;
					font-size: 18px;
				}
				.min-price-wrapper, .max-price-wrapper, .delivery-fee-wrapper, .min-order-wrapper {
					margin-top: 16px;
					@media (max-width: $iPhone6-width - 1) {
						width: 100%;
					}
				}
				.min-price, .max-price, .delivery-fee, .min-order, .proximity {
					.value {
						margin-left: 6px;
						font-weight: $lato-black;
						color: $brand-success;
					}
				}
				.proximity {
					margin-top: 8px;
					@media (max-width: $iPhone6-width - 1) {
						margin-top: 16px;
					}
				}
				.price-range, .proximity-range {
					margin-top: 13px;
					padding: 0;
					padding-bottom: 8px;
					input {
						margin: 0;
					}
					position: relative;
				}
			}
			/* Cuisine filters */
			.cuisine-filters {
				padding-left: 24px;
				padding-right: 18px;
				padding-bottom: 43px;
				@media (max-width: $screen-xs-max) {
					padding-left: 16px;
					padding-right: 10px;
				}
				.filter-title {
					font-weight: $lato-black;
					font-size: 18px;
				}
				.cuisine-list {
					margin-top: 20px;
					-webkit-flex-wrap: wrap;
					flex-wrap: wrap;
					justify-content: flex-start;
					.cuisine-item {
						cursor: pointer;
						float: left;
						width: 25%;
						padding: 8px;
						text-align: center;
						border: 1px solid #DBDBDB;
						margin-left: -1px;
						margin-top: -1px;
						.cuisine-img {
							width: 48px;
							height: 48px; //background-color: #DBDBDB;
							margin: 0 auto;
						}
						.cuisine-name, .cuisine-count {
							font-size: 10px;
						}
						.cuisine-name {
							margin-top: 4px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
		/* Filter action buttons */
		.filter-action-buttons {
			text-align: center;
			padding: 12px 48px;
			button {
				margin-top: 8px;
				height: 40px;
				&:first-child {
					margin-left: 0;
				}
			}
		}
	}
}
</style>
