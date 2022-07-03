<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
import { MapCustomerRouteModal_c } from './MapCustomerRouteModal_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx
export const _ = new MapCustomerRouteModal_c(ctx)
const { busy$, customer_route_map$, is_modal_open$, route$, } = _
export const open = _.open, close = _.close
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
	<!-- Map Customer Route Modal -->
  <div class="MapCustomerRouteModal modal map-customer-route-modal fade d-block in"
			 on:click={evt => _.close()}
			 tabindex="-1"
			 role="dialog"
			 aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog modal-lg" role="document" on:click|stopPropagation>
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close"
									on:click={evt => _.close()} aria-label="Close"
					>
            <div class="delete-icon"></div>
          </button>
          <h4 class="modal-title" id="myModalLabel">Map Customer Route</h4>
        </div>
        <div class="modal-body modal-scrollable">
          {#if $busy$ }
            <PageLoader center="parent"></PageLoader>
          {/if}
					<div class="row">
            <div class="col-sm-4 left-side">
              <div class="customer-address-label">Customer Address</div>
              <div class="customer-address-value">{ $route$?.details?.DeliveryAddress || '' }</div>

              <div class="away-rest-section">
                <div class="est-title">{ $route$?.distance || '' }</div>
                <div>away from restaurant</div>
              </div>

              <div class="arrival-time-section">
                <div class="est-title">{ $route$?.duration || '' }</div>
                <div>Estimate Time Arrival</div>
              </div>
            </div>
            <div class="col-sm-8 right-side">
              <div bind:this={$customer_route_map$} id="customer-route-map"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
					<div class="row">
						<button type="button"
										class="col-xs-12 btn btn-lg btn-success btn-block close-btn"
										on:click={evt => _.close()}
						>Close</button>
					</div>
        </div>
      </div>
    </div>
  </div>
{/if}
<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.MapCustomerRouteModal {
	.modal-body {
		min-height: 250px;
	}
	.left-side {
		padding-top: 44px;
		.customer-address-label {
			font-weight: $lato-black;
		}
		.customer-address-value {
			margin-top: 13px;
		}
		.away-rest-section, .arrival-time-section {
			padding: 19px 24px;
			border: 1px solid rgba(#455A64, .3);
			border-radius: 3px;
			.est-title {
				font-weight: $lato-black;
				font-size: 32px;
			}
		}
		.away-rest-section {
			margin-top: 42px;
		}
		.arrival-time-section {
			margin-top: 24px;
		}
		.text-success {
			&.text-clear {
				margin-left: 8px;
			}
		}
		.input-circle-radius {
			display: inline-block;
			width: 80px;
			height: 40px;
			margin-left: 11px;
			margin-right: 16px;
		}
		.radio-area {
			margin-top: 50px;
		}
	}
	.right-side {
		@media (max-width: $screen-md-max) {
			margin-top: 20px;
		}
		#customer-route-map {
			width: 100%;
			height: 400px;
		}
	}
	.close-btn {
		@media (min-width: $screen-lg-min) {
			max-width: 300px;
		}
	}
}
</style>
