<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { CARD_MONTHS, CARD_YEARS } from '@menus/web-config'
import { ladda } from '@menus/ladda'
import { ValidationMessages } from '@menus/validation'
import type { user_payment_ui_Ctx } from '../user_payment_ui_Ctx.js'
import { SaveUserPaymentModal_c } from './SaveUserPaymentModal_c.js'
const ctx = getContext_ui_ctx() as user_payment_ui_Ctx
export const _ = new SaveUserPaymentModal_c(ctx)
const { busy$, card_errors$, expiryMonth$, expiryYear$, is_modal_open$, isNewUserPayment$, userPayment$, } = _
export const open = _.open, close = _.close
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
  <div class="modal fade d-block in">
    <div class="modal-dialog save-user-payment-modal">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close"
									on:click={_.close}
					>
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Save Payment Method</h4>
        </div>
        <div class="modal-body modal-scrollable">
          <div>
            {#if $isNewUserPayment$}
              <div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label for="CardNumber">Card Number</label>
                      <input type="text" class="form-control" id="CardNumber"
														 placeholder="Card Number"
														 bind:value={$userPayment$.CardNumber}
											>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="expiryMonth">Expiry Month</label>
                      <select class="form-control" id="expiryMonth"
															bind:value={$expiryMonth$}
											>
                        {#each CARD_MONTHS as item}
                          <option value={item.value}>{ item.label }</option>
                        {/each}
                      </select>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="expiryYear">Expiry Year</label>
                      <select class="form-control" id="expiryYear"
															bind:value={$expiryYear$}
											>
                        {#each CARD_YEARS as item}
                          <option value={item.value}>{ item.label }</option>
                        {/each}
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label for="CVV">CVV</label>
                      <input type="text" id="CVV"
														 class="form-control"
														 bind:value={$userPayment$.CVV}
														 placeholder="CVV"
											>
                    </div>
                  </div>
                </div>
                <ValidationMessages errors={$card_errors$}></ValidationMessages>
              </div>
            {/if}
						<div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="Billing_FirstName">First Name</label>
                  <input type="text" class="form-control" id="Billing_FirstName"
												 bind:value={$userPayment$.Billing_FirstName}
												 placeholder="First Name">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="Billing_LastName">Last Name</label>
                  <input type="text" class="form-control" id="Billing_LastName"
												 bind:value={$userPayment$.Billing_LastName}
												 placeholder="Last Name">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="Billing_Address">Address</label>
                  <input type="text" class="form-control" id="Billing_Address"
												 bind:value={$userPayment$.Billing_Address}
												 placeholder="Address">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="Billing_City">City</label>
                  <input type="text" class="form-control" id="Billing_City"
												 bind:value={$userPayment$.Billing_City}
												 placeholder="City">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="Billing_State">State</label>
                  <input type="text" class="form-control" id="Billing_State"
												 bind:value={$userPayment$.Billing_State}
												 placeholder="State">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="Billing_Zip">Zip</label>
                  <input type="text" class="form-control" id="Billing_Zip"
												 bind:value={$userPayment$.Billing_Zip}
												 placeholder="Zip">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
					<div class="row">
						<button use:ladda={$busy$}
										type="button"
										class="col-xs-6 btn btn-lg btn-success"
										on:click={_.save_userPayment}
						>Save</button>
						<button type="button"
										class="col-xs-6 btn btn-lg btn-success btn-inverse"
										on:click={_.close}
						>Cancel</button>
					</div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style type=text/scss>
@import "@menus/consumer-shared-css/lib";
.save-user-payment-modal {
	.modal-body {
		padding: 40px;
	}
  .modal-footer {
    @media (max-width: $screen-xs-max) {
      // TODO: Fix this `important` in future
      position: unset !important;
      padding-bottom: 150px !important;
    }
  }
}
</style>
