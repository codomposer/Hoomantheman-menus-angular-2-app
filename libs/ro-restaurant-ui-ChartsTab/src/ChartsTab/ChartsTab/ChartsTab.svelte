<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { CHARTS_TAB } from '@menus/web-config'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
import { ChartMissingMenu } from '../ChartMissingMenu/index.js'
import { ChartMenuCompetition } from '../ChartMenuCompetition/index.js'
import { ChartSegmentType } from '../ChartSegmentType/index.js'
import type { ChartSegmentType_T } from '../ChartSegmentType/index.js'
import { ChartRestType } from '../ChartRestType/index.js'
import type { ChartRestType_T } from '../ChartRestType/index.js'
import { ItemCompareChart } from '../ItemCompareChart/index.js'
import { ChartsTab_c } from './ChartsTab_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_ChartsTab_Ctx
const ro_auth_rules$ = ro_auth_rules$_b(ctx)
export const _ = new ChartsTab_c(ctx)
const { busy$, charts_map$, charts_proximity$, MenuCounts$, ro_restaurant$, } = _
let valid_ChartRestType_a:ChartRestType_T[], valid_ChartSegmentType_a:ChartSegmentType_T[]
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $ro_auth_rules$[CHARTS_TAB]}
<div class="ChartsTab page">
<div class="available-in-certain-areas">Available in only certain areas.</div>
<div class="restaurant-menu-sense">
  {#if $busy$ || !$ro_restaurant$}
    <PageLoader center="parent"></PageLoader>
  {:else}
    <div class="chart-map-section">
      <div bind:this={$charts_map$} id="charts-map"></div>
    </div>
    <div class="restaurant-map-details">
      <div class="row">
        <div class="col-lg-4">
          <div class="restaurant-address-wrapper">
            <div class="restaurant-map-orange-icon"></div>
            <span>{ $ro_restaurant$.Address_1 } { $ro_restaurant$.Address_2 } { $ro_restaurant$.City } { $ro_restaurant$.State } { $ro_restaurant$.ZipCode }</span>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="rest-cuisine-segment-info">
            <span class="cuisine-text">Cuisine:
              <span class="f-black">{ $ro_restaurant$.Cuisine }</span>
            </span>
            <span>Segment:
              <span class="f-black">{ $ro_restaurant$.Segment }</span>
            </span>
          </div>
        </div>
        <div class="col-lg-3 chart-proximity-select-wrapper">
          <div class="chart-proximity-select">
            <div class="form-group">
              <select class="form-control" bind:value={$charts_proximity$}>
                <option value={3}>Search 3 miles around me</option>
                <option value={6}>Search 6 miles around me</option>
                <option value={9}>Search 9 miles around me</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="compare-price-section">
      <div class="price-details">
        <div class="row">
          <div class="col-sm-4">
            <div class="price-text">Your Menu Density</div>
            <div class="price-value">{ $MenuCounts$?.YourMenuCount || '' }</div>
          </div>
          <div class="col-sm-4">
            <div class="price-text">{$MenuCounts$?.DiffPercentageHeaderText || ''}</div>
            <div class="price-value">{$MenuCounts$?.DiffPercentageText || ''}</div>
          </div>
          <div class="col-sm-4">
            <div class="price-text">Other's Menu Density</div>
            <div class="price-value">{ $MenuCounts$?.OtherMenuAvg || '' }</div>
          </div>
        </div>
      </div>
    </div>
    <ItemCompareChart></ItemCompareChart>
    <ChartMissingMenu></ChartMissingMenu>
    <ChartMenuCompetition></ChartMenuCompetition>
    <div class="chart-section-wrapper"
         class:hidden={!valid_ChartRestType_a?.length && !valid_ChartSegmentType_a?.length}
    >
      <div class="row">
        <div class="col-sm-6">
          <ChartRestType bind:valid_ChartRestType_a></ChartRestType>
        </div>
        <div class="col-sm-6">
          <ChartSegmentType bind:valid_ChartSegmentType_a></ChartSegmentType>
        </div>
      </div>
    </div>
  {/if}
</div>
</div>
{/if}

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.ChartsTab {
	padding-bottom: 100px;
  .available-in-certain-areas {
    padding: 6px 0
  }
  .chart-marker-actions {
    a:focus {
      outline: none;
      text-decoration: none;
    }
  }
	.restaurant-menu-sense {
		.PageLoader {
			.page-loader-container {
				margin-top: 48px;
			}
		}
		.chart-map-section {
			position: relative;
			#charts-map {
				height: 322px;
				width: 100%;
			}
			/* Map Marker */
			.chart-map-marker {
				position: absolute;
				z-index: 1;
				height: 28px;
				width: 28px;
				cursor: pointer;
				background-color: #455A64;
				border: 4px solid #FFFFFF;
				box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
				border-radius: 50%;
				top: 50%;
				left: 50%;
				margin-left: -14px; // Should be half of element width
				margin-top: -14px; // Should be half of element height
			}
		}
		.restaurant-map-details {
			padding: 22px 0;
			border-bottom: 1px solid #DBDBDB;
			.restaurant-address-wrapper {
				padding-top: 5px;
				.restaurant-map-orange-icon {
					vertical-align: middle;
					margin-right: 16px;
					border-radius: 50%;
				}
			}
			.rest-cuisine-segment-info {
				padding-top: 7px;
				@media (max-width: $screen-md-max) {
					margin-top: 20px;
					margin-bottom: 20px;
				}
				@media (min-width: $screen-lg-min) {
					text-align: right;
				}
				.cuisine-text {
					margin-right: 24px;
				}
			}
			.chart-proximity-select-wrapper {
				@media (min-width: $screen-lg-min) {
					text-align: right;
				}
				.chart-proximity-select {
					display: inline-block;
					.form-control {
						height: auto;
					}
				}
			}
		}
		.compare-price-section {
			padding: 44px 0 38px;
			border-bottom: 1px solid #DBDBDB;
			.compare-restaurant-name {
				font-weight: $lato-black;
				margin-left: 8px;
			}
			.price-details {
				text-align: center;
				.price-value {
					font-weight: $lato-black;
					font-size: 32px;
					@media (max-width: $screen-xs-max) {
						margin-bottom: 20px;
					}
				}
			}
		}
		.chart-section-wrapper {
			padding: 24px;
			margin-top: 48px;
			box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
			&.hidden {
				display: none;
			}
		}
		.chart-heading {
			font-weight: $lato-black;
			font-size: 18px;
			margin: 44px 0 43px;
			@media (max-width: $screen-xs-max) {
				text-align: center;
			}
		}
		.chart-page-size {
			margin: 39px 0 43px;
			@media (max-width: $screen-xs-max) {
				text-align: center;
			}
			.form-control {
				height: auto;
			}
		}
		.item_compare_chart_wrapper, .missing_menu_chart_wrapper, .menu_competition_bar_chart_wrapper {
			position: relative;
			height: 500px;
		}
		.pie-chart-section-wrapper {
			@media (max-width: $screen-xs-max) {
				text-align: center;
			}
			.pie-chart-section {
				position: relative;
				height: 240px;
				width: 240px;
				@media (max-width: $screen-xs-max) {
					margin-left: auto;
					margin-right: auto;
				}
			}
			.chart-label-list {
				margin-top: 24px;
				.chart-label-item {
					margin-bottom: 16px;
					.bg-color {
						width: 16px;
						height: 16px;
						border-radius: 50%;
						display: inline-block;
						vertical-align: text-bottom;
						margin-right: 8px;
					}
				}
			}
		}
		.cuisine-type-chart-wrapper {
			position: relative;
			height: 500px;
		}
	}
}
</style>
