<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { consumer_user_ui_Ctx } from '../consumer_user_ui_Ctx.js'
import { MapRouteModal_c } from './MapRouteModal_c.js'
const ctx = getContext_ui_ctx() as consumer_user_ui_Ctx
export const _ = new MapRouteModal_c(ctx)
const {
	busy$, customer_overlay_div$, customer_route_map_div$, is_modal_open$, restaurant$, rest_overlay_div$, route$
} = _
export const { open, close } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
<div class="modal-backdrop fade in"></div>
<div
	class="modal MapRouteModal map-route-modal fade d-block in"
	tabindex="-1"
	role="dialog"
	aria-labelledby="myModalLabel"
>
  <div class="modal-dialog modal-lg" role="document" mStopEvent>
    <div class="modal-content">
      <div class="m-gmaps-ui-view">
        <div bind:this={$customer_overlay_div$} class="customer-overlay">You</div>
        <div bind:this={$rest_overlay_div$} class="rest-overlay">Restaurant</div>
      </div>
      <div class="modal-header">
        <button type="button" class="close" on:click={_.close} aria-label="Close">
          <div class="delete-icon"></div>
        </button>
        <h4 class="modal-title" id="myModalLabel">{ $restaurant$?.RestaurantName || '' }</h4>
      </div>
      <div class="modal-body modal-scrollable">
        <div class="row">
          <div class="col-sm-4 left-side">
            <div class="customer-address-label">{ $restaurant$?.Address || '' }</div>
            <div class="customer-address-value">{ $restaurant$?.Phone || '' }</div>
            <div class="away-rest-section">
              <div class="est-title">
                { $route$.distance }
              </div>
              <div>away from restaurant</div>
            </div>
            <div class="arrival-time-section">
              <div class="est-title">
                { $route$.duration }
              </div>
              <div>Estimate Time Arrival</div>
            </div>
          </div>
          <div class="col-sm-8 right-side">
            {#if $busy$}
              <PageLoader center="parent"></PageLoader>
            {/if}
						<div id="customer-route-map" bind:this={$customer_route_map_div$}></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="row">
          <button type="button" class="col-xs-12 btn btn-lg btn-success btn-block close-btn"
									on:click={_.close}
					>Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}

<style type=text/scss>
@import "@menus/consumer-shared-css/variables";
.modal.map-route-modal {
	.customer-overlay, .rest-overlay {
		position: absolute;
		display: inline-block;
		background-color: white;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
		border-radius: 5px;
		font-size: 12px;
	}
	.customer-overlay {
		padding: 5px 14px;
	}
	.rest-overlay {
		padding: 5px 8px;
	}
	.modal-body {
		.row {
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
		}
	}
	.close-btn {
		@media (min-width: $screen-lg-min) {
			max-width: 300px;
		}
	}
}
</style>
