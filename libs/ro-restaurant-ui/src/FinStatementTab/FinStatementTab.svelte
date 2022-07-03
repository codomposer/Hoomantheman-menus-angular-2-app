<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { currency_str_ } from '@ctx-core/currency'
import { getContext_ui_ctx } from '@menus/ui'
import { PageLoader } from '@menus/shared-ui'
import { FIN_STATEMENT_TAB } from '@menus/web-config'
import { mediumDate_ } from '@menus/date'
import { DateTime } from '@menus/form-ui'
import { Pagination } from '@menus/pagination-ui'
import { goto_order_details_b } from '@menus/ro-orders'
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import { onclick_download_link } from '@menus/web-cordova'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
import { FinStatementTab_c } from './FinStatementTab_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx, dispatch = createEventDispatcher()
const goto_order_details = goto_order_details_b(ctx)
const ro_auth_rules$ = ro_auth_rules$_b(ctx)
export const _ = new FinStatementTab_c(ctx, dispatch)
const {
	busy$, Details$, export_url$, finStatementRangeDate$, params_fireFlyID$, query_fsPage$, query_fsPageSize$, Summary$,
	TotalPages$, TotalRow$,
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $ro_auth_rules$[FIN_STATEMENT_TAB]}
<div class="FinStatementTab page">
  {#if $busy$ || !$Summary$}
    <PageLoader></PageLoader>
  {:else}
    <div>
      <div class="fin-statments-search filters-active">
        <div class="row">
          <div class="col-sm-6 col-md-4">
            <label for="finStatementRangeDate">Select Dates</label>
            <div id="finStatementRangeDate">
              <DateTime bind:value={$finStatementRangeDate$} options={{ mode: 'range' }}></DateTime>
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <button
							class="btn btn-xlg btn-success generate-statement"
							on:click={evt => _.load_data()}
							disabled={!$finStatementRangeDate$}
						>Generate Statement</button>
          </div>
          <div class="col-sm-12 col-md-5">
            <a
							href={$export_url$} target="_blank"
							on:click|preventDefault={onclick_download_link}
							class="btn btn-xlg btn-success btn-inverse export-button output-button"
						>Export</a>
            <button
							class="btn btn-xlg btn-success btn-inverse print-button output-button"
							on:click={evt => _.print_finStatement()}
						>Print</button>
          </div>
        </div>
      </div>
      <div class="fin-summary-section">
        <div class="row">
          <div class="col-sm-3">
            <div class="number-count-section">
              <div class="number-count-title">{ $Summary$.Orders }</div>
              <div class="number-count-value">Number Of Orders</div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="number-count-section">
              <div
								class="number-count-title">{ currency_str_($Summary$.Sales, 'USD') }</div>
              <div class="number-count-value">Total Sales</div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="number-count-section">
              <div
								class="number-count-title">{ currency_str_($Summary$.TotalCouponDiscount || 0, 'USD') }</div>
              <div class="number-count-value">Total Coupon Discount</div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="number-count-section">
              <div class="number-count-title">{ $Summary$.COD_ItemsCount }</div>
              <div class="number-count-value">Cash On Delivery Count</div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="number-count-section">
              <div
								class="number-count-title">{ currency_str_($Summary$.COD_ItemsSales, 'USD') }</div>
              <div class="number-count-value">Cash On Delivery Sales</div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="number-count-section">
              <div
								class="number-count-title">{ $Summary$.CreditCard_ItemsCount }</div>
              <div class="number-count-value">Credit Card Count</div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="number-count-section">
              <div
								class="number-count-title">{ currency_str_($Summary$.CreditCard_ItemsSales, 'USD') }</div>
              <div class="number-count-value">Credit Card Sales</div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-responsive-xs">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Order Date/Time</th>
              <th>Order Number</th>
              <th>Order Status</th>
              <th>Customer</th>
              <th>Payment Method</th>
              <th>Order Subtotal</th>
              <th>Coupon Discount</th>
              <th>Delivery Charge</th>
              <th>Tax</th>
              <th>Tip</th>
              <th>Total Customer Payment</th>
              <th>Order Source</th>
              <th>Service Charge</th>
              <th>Net Account Credit</th>
              <th>Braintree Status</th>
            </tr>
          </thead>
          <tbody>
            {#if !$busy$ && !$Details$.length}
              <tr class="text-center">
                <td colspan="13">No Records to display</td>
              </tr>
            {/if}
						{#each $Details$ || [] as finStatementTab_Details_item}
              <tr on:click={evt => goto_order_details($params_fireFlyID$, finStatementTab_Details_item.ID)}>
                <td>{ mediumDate_(finStatementTab_Details_item.OrderDate) }</td>
                <td>
                  <div class="f-black">{ finStatementTab_Details_item.OrderNumber }</div>
                </td>
                <td>{ finStatementTab_Details_item.OrderStatus }</td>
                <td>{ finStatementTab_Details_item.Customer }</td>
                <td>{ finStatementTab_Details_item.PaymentMethod }</td>
                <td>{ currency_str_(finStatementTab_Details_item.SubTotal, 'USD') }</td>
                <td>{ finStatementTab_Details_item.Discount ? currency_str_(finStatementTab_Details_item.Discount, 'USD') : '-' }</td>
                <td>{ currency_str_(finStatementTab_Details_item.DeliveryCharge, 'USD') }</td>
                <td>{ currency_str_(finStatementTab_Details_item.Tax_Final, 'USD') }</td>
                <td>{ currency_str_(finStatementTab_Details_item.Driver_Tip, 'USD') }</td>
                <td>{ currency_str_(finStatementTab_Details_item.GrandTotal, 'USD') }</td>
                <td>{ finStatementTab_Details_item.OrderSource }</td>
                <td>{ currency_str_(finStatementTab_Details_item.GrandTotal, 'USD') }</td>
                <td>{ currency_str_(finStatementTab_Details_item.GrandTotal, 'USD') }</td>
                <td
									class:text-success={finStatementTab_Details_item.Is_Settled}>{ finStatementTab_Details_item.Is_Settled ? 'Settled' : 'Pending' }</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
			{#if $Details$.length}
        <Pagination id="FIN_STATEMENT_PAGINATION_ID"
										page={$query_fsPage$}
										pageSize={$query_fsPageSize$}
										TotalPages={$TotalPages$}
										TotalRow={$TotalRow$}
										on:change={evt => _.onchange_finStatement()}
				></Pagination>
      {/if}
    </div>
  {/if}
</div>
{/if}

<style type=text/scss>
@import "@menus/ro-shared-css/lib";
// Finn Reviews tab
.FinStatementTab {
	.fin-statments-search {
		margin-top: 12px;
		.generate-statement {
			margin-top: 27px;
		}
		.export-button {
			margin-right: 24px;
		}
		.output-button {
			margin-top: 27px;
		}
	}
	.fin-summary-section {
		margin: 64px 0;
		.number-count-section {
			margin: 16px 0;
			text-align: center;
			.number-count-title {
				font-weight: $lato-black;
				font-size: 32px;
			}
		}
	}
}
</style>
