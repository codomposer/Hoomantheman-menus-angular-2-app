<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { UserAddressListModal } from '@menus/user-address-ui'
import { UserPaymentList } from '@menus/user-payment-ui'
import { aptSuiteNo$_b } from '@menus/consumer-user-address'
import { isDeliverable$_b } from '@menus/service-type'
import type { checkout_ui_Ctx } from '../checkout_ui_Ctx.js'
import { CheckoutSettings_c } from './CheckoutSettings_c.js'
const ctx = getContext_ui_ctx() as checkout_ui_Ctx, dispatch = createEventDispatcher()
const aptSuiteNo$ = aptSuiteNo$_b(ctx)
const isDeliverable$ = isDeliverable$_b(ctx)
export const _ = new CheckoutSettings_c(ctx, dispatch)
const {
	delivery_address_map_div$, deliveryNotes$, userAddress$, UserAddressListModal_i$,
} = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<UserAddressListModal bind:this={$UserAddressListModal_i$}></UserAddressListModal>
<div class="CheckoutSettings user-details-section">
  {#if $isDeliverable$}
    <div class="delivery-section delivery-address-section">
      <div class="section-heading">Delivery Address</div>
      <div class="delivery-address-map-container">
        <div bind:this={$delivery_address_map_div$} id="delivery-address-map"></div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          { $userAddress$?.Address || 'Please select your Address' }
        </div>
        <div class="col-sm-6 text-right">
          <button class="btn btn-lg btn-success btn-inverse"
									on:click={_.open_UserAddressListModal_i}
					>Change</button>
        </div>
      </div>
    </div>
    <div class="delivery-section delivery-instruction-section">
      <div class="section-heading">Delivery Instructions</div>
      <div class="form-group input-container">
        <label for="aptSuiteNo">Apartment / Suite #</label>
        <input type="text" id="aptSuiteNo"
							 bind:value={$aptSuiteNo$}
							 class="form-control"
							 placeholder="Enter Here"
				>
      </div>
      <div class="form-group input-container">
        <label for="deliveryNotes">Delivery Note</label>
        <input type="text" id="deliveryNotes"
							 bind:value={$deliveryNotes$}
							 class="form-control"
							 placeholder="Enter your message here"
				>
      </div>
    </div>
  {/if}
	<div class="user-payment-section">
    <UserPaymentList></UserPaymentList>
  </div>
</div>

<style type=text/scss>
@import "@menus/css/lib";
.CheckoutSettings {
	.delivery-section {
		&.delivery-address-section {
			.delivery-address-map-container {
				position: relative;
				#delivery-address-map {
					margin-bottom: 24px;
					width: 100%;
					height: 160px;
				}
			}
		}
		.section-heading {
			margin: 43px 0 40px;
			font-weight: $lato-black;
			font-size: 18px;
		}
	}
}
</style>
