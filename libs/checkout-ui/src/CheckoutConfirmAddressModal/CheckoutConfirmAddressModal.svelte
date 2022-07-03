<script lang="ts">
import { getContext_ui_ctx } from '@menus/ui'
import { aptSuiteNo$_b } from '@menus/consumer-user-address'
import { innerWidth_lte_SCREEN_SM_MIN$_b } from '@menus/dom'
import { shopping_cart_b } from '@menus/consumer-shopping-cart'
import { ScheduleDayTime } from '@menus/consumer-shopping-cart-ui'
import type { checkout_ui_Ctx } from '../checkout_ui_Ctx.js'
import { CheckoutConfirmAddressModal_c } from './CheckoutConfirmAddressModal_c.js'
const ctx = getContext_ui_ctx() as checkout_ui_Ctx
const aptSuiteNo$ = aptSuiteNo$_b(ctx)
const innerWidth_lte_SCREEN_SM_MIN$ = innerWidth_lte_SCREEN_SM_MIN$_b(ctx)
const restaurant_cartitems$ = shopping_cart_b(ctx).restaurant_cartitems$
export const _ = new CheckoutConfirmAddressModal_c(ctx)
const { is_modal_open$, userAddress$ } = _
export const open = _.open, close = _.close
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
{/if}
<!-- Checkout confirm address modal -->
{#if $is_modal_open$}
  <div class="modal CheckoutConfirmAddressModal checkout-confirm-address-modal fade d-block in"
			 tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog" role="document" on:click|stopPropagation>
      <div class="modal-content">
        <div class="modal-header">
          <button type="button"
									class="close"
									on:click={ _evt => _.close(false) }
									aria-label="Close"
					>
            <div class="delete-icon"></div>
          </button>
          <h4 class="modal-title">Address &amp; time of your order are correct?</h4>
					{#each $restaurant_cartitems$ as restaurant_cartitem}
            <ScheduleDayTime schedule_ctx={restaurant_cartitem}
														 on:change={evt => restaurant_cartitems$.refresh()}
						></ScheduleDayTime>
          {/each}
        </div>
        <div class="modal-body modal-scrollable">
          <div class="map-container">
            <div id="checkout-confirm-address-map"></div>
          </div>
          <div class="address-container">
            <div>{ $userAddress$?.Address || '' }</div>
            <div>{ $aptSuiteNo$ || 'Apartment / Suite is not provided' }</div>
          </div>
        </div>
        <div class="modal-footer">
					<div class="row">
						<button class="col-xs-6 btn btn-lg btn-success"
										class:btn-sm={$innerWidth_lte_SCREEN_SM_MIN$}
										on:click={ _ui_ctx => _.close(true) }
						>Yes</button>
						<button class="col-xs-6 btn btn-lg btn-success btn-inverse"
										class:btn-sm={$innerWidth_lte_SCREEN_SM_MIN$}
										on:click={ _ui_ctx => _.close(false) }
						>No</button>
					</div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style type=text/scss global>
@import "@menus/css/lib";
.modal.CheckoutConfirmAddressModal {
	.modal-body {
		padding: 0;
		.map-container {
			border-bottom: 1px solid #DBDBDB;
			#checkout-confirm-address-map {
				height: 161px;
			}
		}
		.address-container {
			margin-top: 24px;
			padding: 0 40px;
		}
	}
	.modal-footer {
		padding-top: 48px;

		@media (max-width: $screen-xs-max) {
			// TODO: Fix this `important` in future
			position: unset !important;
			padding-bottom: 150px !important;
		}
	}
}
</style>
