<script lang="ts">
import { compact } from '@ctx-core/array'
import { style_ } from '@ctx-core/html'
import { ro_orders_export_url$_b } from '@menus/ro-orders'
import { ServiceTypeID_r_title } from '@menus/service-type-common'
import { getContext_ui_ctx } from '@menus/ui'
import { order_status_text_r } from '@menus/web-config'
import { onclick_download_link } from '@menus/web-cordova'
import type { ro_orders_ui_OrdersTab_Ctx } from '../ro_orders_ui_OrdersTab_Ctx.js'
import type { OrdersTab_c } from './OrdersTab_c.js'
export let _:OrdersTab_c
export const ctx = getContext_ui_ctx() as ro_orders_ui_OrdersTab_Ctx
const ro_orders_export_url$ = ro_orders_export_url$_b(ctx)
const {
	ro_orders_filter_date_range$, ro_orders_filter_order_StatusID$, ro_orders_filter_serviceTypeId$, ro_orders_search$,
	show_filters$
} = _
let filter_text_a:string[]
$: filter_text_a = compact([
	$ro_orders_filter_date_range$?.join(' — '),
	ServiceTypeID_r_title[$ro_orders_filter_serviceTypeId$],
	order_status_text_r[$ro_orders_filter_order_StatusID$]
])
let filters_button:HTMLButtonElement, filter_value_style:string
$: filter_value_style = style_({
	top: `${filters_button?.offsetTop + 40}px`,
	left: `${filters_button?.offsetLeft}px`,
})
async function toggle_filters() {
	show_filters$.$ = !show_filters$.$
}
</script>

<svelte:window on:resize={()=>filters_button = filters_button}></svelte:window>

<div class="search-section OrdersTab_Search">
    <div class="form-group">
      <div class="m-input-group has-addon-left has-addon-right m-input-sm">
        <div class="m-input-group-addon m-addon-left">
          <div class="search-icon cursor-default"></div>
        </div>
        <input type="text" class="form-control input-sm" name="ro_orders_search"
							 bind:value={$ro_orders_search$}
							 placeholder="Search for Order"
							 on:keyup={evt => evt.key === 'Enter' && _.enter_ro_orders_search(false)}
				/>
        <div class="m-input-group-addon m-addon-right"
						 on:click={evt => _.enter_ro_orders_search(true)}
				>
          {#if $ro_orders_search$.length}
            <div class="close-3-icon cursor-pointer"
								 on:click|stopPropagation|preventDefault={evt => $ro_orders_search$ = ''}
						></div>
          {/if}

			<a class="fa fa-download cursor-pointer export-icon" href={$ro_orders_export_url$} target="_blank"
					on:click|preventDefault={onclick_download_link}
			></a>

			<div 
				class="cursor-pointer" 
				class:funnel-icon={!$show_filters$} 
				class:funnel-on-icon={$show_filters$ || filter_text_a.length} 
				on:click={evt => toggle_filters()}></div>
        </div>
      </div>

	  	{#if filter_text_a.length}
		<div class="filter-value">
			{filter_text_a.join(' | ')}
		</div>
		{/if}
    </div>
  <!-- <div class="col-sm-7 search-actions">
		<div class="search-actions-content">
			<a href={$ro_orders_export_url$} target="_blank"
				 on:click|preventDefault={onclick_download_link}
				 class="btn btn-lg btn-success btn-inverse export-button">Export</a>
			<button bind:this={filters_button}
							class="btn btn-lg btn-success btn-inverse"
							on:click={evt => toggle_filters()}
			>Filters</button>
		</div>
		{#if filter_text_a.length}
      <div class="filter-value" style={filter_value_style}>
        {filter_text_a.join(' | ')}
      </div>
    {/if}
  </div> -->
</div>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.OrdersTab {
	.customer-order-search {
		.OrdersTab_Search {

			.m-input-group {

				.m-input-group-addon {

					.export-icon {
						font-size: 24px;
						margin: 0 8px;
					}
				}
			}

			.filter-value {
				color: $brand-success;
				font-weight: bold;
			}

			.search-actions {
				position: relative;
				.search-actions-content {
					@media (max-width: $screen-xs-max) {
						margin-top: 16px;
						display: flex;
						flex-direction: row;
						.btn {
							flex: 1;
							min-width: auto;
						}
					}
					button {
						position: relative;
					}
				}
			}
		}
	}
}
</style>
