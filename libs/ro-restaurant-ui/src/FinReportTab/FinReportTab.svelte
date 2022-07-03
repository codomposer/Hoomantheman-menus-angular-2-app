<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { currency_str_ } from '@ctx-core/currency'
import { DateTime } from '@menus/form-ui'
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { FIN_REPORT_TAB } from '@menus/web-config'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
import { FinReportTab_c } from './FinReportTab_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx, dispatch = createEventDispatcher()
const ro_auth_rules$ = ro_auth_rules$_b(ctx)
export const _ = new FinReportTab_c(ctx, dispatch)
const { busy$, Details$, fin_report_range_date$, fin_sales_orders_chart_canvas$, total$, } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $ro_auth_rules$[FIN_REPORT_TAB]}
<div class="FinReportTab page">
  {#if $busy$}
    <PageLoader></PageLoader>
  {:else}
    <div class="fin-report-search filters-active">
      <div class="row">
        <div class="col-sm-4">
          <label for="fin_report_range_date">Select Dates</label>
          <div id="fin_report_range_date">
            <DateTime bind:value={$fin_report_range_date$} options={{ mode: 'range' }}></DateTime>
          </div>
        </div>
        <div class="col-sm-4">
          <button
						class="btn btn-lg btn-success generate-report"
						on:click={evt => _.load_data()}
						disabled={!$fin_report_range_date$?.length}
					>Generate Report</button>
        </div>
      </div>
    </div>
    <div class="fin-report-chart-section">
      <div class="fin-report-chart-heading">Sales / Orders</div>
      <div>{ $fin_report_range_date$?.formatted || '' }</div>
      <div class="fin-sales-orders-chart-wrapper">
        <canvas bind:this={$fin_sales_orders_chart_canvas$} id="fin-sales-orders-chart"></canvas>
      </div>
    </div>
    <div class="fin-report-details-section">
      <div class="fin-report-details-heading">Details</div>
      <div class="table-responsive fin-report-list">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Total Quantity</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {#each $Details$ || [] as finReportTab_Details_item}
              <tr>
                <td>
                  <div class="f-black">{ finReportTab_Details_item.ItemName }</div>
                </td>
                <td>{ currency_str_(finReportTab_Details_item.Price) }</td>
                <td>{ finReportTab_Details_item.TotalQty }</td>
                <td>{ currency_str_(finReportTab_Details_item.TotalSales) }</td>
              </tr>
            {/each}
						<tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td class="total-text">Total</td>
              <td class="total-text">{ currency_str_($total$, 'USD') }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  {/if}
</div>
{/if}

<style type=text/scss>
@import "@menus/ro-shared-css/lib";
.FinReportTab {
	.fin-report-search {
		margin-top: 12px;
		.generate-report {
			margin-top: 25px;
		}
	}
	.fin-report-chart-section {
		padding-top: 48px;
		.fin-report-chart-heading {
			font-weight: $lato-black;
			font-size: 18px;
		}
		.fin-sales-orders-chart-wrapper {
			height: 500px;
		}
	}
	.fin-report-details-section {
		padding-top: 48px;
		.fin-report-details-heading {
			padding-bottom: 28px;
			font-weight: $lato-black;
			font-size: 18px;
		}
		.fin-report-list {
			.table {
				tr {
					td {
						cursor: text;
					}
				}
			}
			.total-text {
				font-size: 18px;
				font-weight: $lato-black;
			}
		}
	}
}
</style>
