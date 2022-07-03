<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { CARD_MONTHS, CARD_YEARS } from '@menus/web-config'
import { ladda } from '@menus/ladda'
import { validation, ValidationMessages, required_errors_ } from '@menus/validation'
import type { ro_billing_ui_Ctx } from '../ro_billing_ui_Ctx.js'
import { SavePaymentMethodModal_c } from './SavePaymentMethodModal_c.js'
const ctx = getContext_ui_ctx() as ro_billing_ui_Ctx
export const _ = new SavePaymentMethodModal_c(ctx)
export const { open, close } = _
const { busy$, expiryMonth$, expiryYear$, is_modal_open$, isNewPaymentMethod$, paymentMethod$ } = _
let form_errors = []//region
let CardNumber_errors = [], expiryMonth_errors = [], expiryYear_errors = [], CVV_errors = [],
	Billing_FirstName_errors = [], Billing_LastName_errors = [], Billing_Address_errors = [],
	Billing_City_errors = [], Billing_State_errors = [], Billing_Zip_errors = []
$: form_errors = [
	...CardNumber_errors, ...expiryMonth_errors, ...expiryYear_errors, ...CVV_errors,
	...Billing_FirstName_errors, ...Billing_LastName_errors, ...Billing_Address_errors,
	...Billing_City_errors, ...Billing_State_errors, ...Billing_Zip_errors,
]//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
	<!-- Add User Modal -->
  <div
		class="modal fade save-payment-method-modal SavePaymentMethodModal d-block in"
		on:click={evt => _.close()}
		tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	>
    <div class="modal-dialog" role="document" on:click|stopPropagation>
      <div class="modal-content">
        <form novalidate on:submit|preventDefault={evt => form_errors.length || _.savePaymentMethod()}>
          <div class="modal-header">
            <button type="button" class="close" on:click={evt => _.close()}><span
							aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Save Payment Method</h4>
          </div>
          <div class="modal-body modal-scrollable">
            {#if $isNewPaymentMethod$}
              <div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group" class:has-error={CardNumber_errors.length}>
                      <label for="CardNumber">Card Number</label>
                      <input
												type="text" class="form-control" name="CardNumber" id="CardNumber"
												required
												bind:value={$paymentMethod$.CardNumber}
												use:validation={$paymentMethod$.CardNumber, ['Card number', required_errors_]}
												on:errors={evt => CardNumber_errors = evt.detail }
											>
                      <ValidationMessages errors={CardNumber_errors} input_tooltip={true}></ValidationMessages>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group" class:has-error={expiryMonth_errors.length}>
                      <label for="expiryMonth">Expiry Month</label>
                      <select
												class="form-control" name="expiryMonth" id="expiryMonth"
												required
												bind:value={$expiryMonth$}
												use:validation={$expiryMonth$, ['Expiry month', required_errors_]}
												on:errors={evt => expiryMonth_errors = evt.detail }
											>
                        {#each CARD_MONTHS as item}
                          <option value={item.value}>{ item.label }</option>
                        {/each}
                      </select>
                      <ValidationMessages errors={expiryMonth_errors} input_tooltip={true}></ValidationMessages>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group" class:has-error={expiryYear_errors.length}>
                      <label for="expiryYear">Expiry Year</label>
                      <select
												class="form-control" name="expiryYear" id="expiryYear"
												required
												bind:value={$expiryYear$}
												use:validation={$expiryYear$, ['Expiry year', required_errors_]}
												on:errors={evt => expiryYear_errors = evt.detail }
											>
                        {#each CARD_YEARS as item}
                          <option value={item.value}>{ item.label }</option>
                        {/each}
                      </select>
                      <ValidationMessages errors={expiryYear_errors} input_tooltip={true}></ValidationMessages>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group" class:has-error={CVV_errors.length}>
                      <label for="CVV">CVV</label>
                      <input
												type="text" class="form-control" name="CVV" id="CVV"
												required
												bind:value={$paymentMethod$.CVV}
												use:validation={$paymentMethod$.CVV, ['CVV', required_errors_]}
												on:errors={evt => CVV_errors = evt.detail }
											>
                      <ValidationMessages errors={CVV_errors} input_tooltip={true}></ValidationMessages>
                    </div>
                  </div>
                </div>
              </div>
            {/if}
						<div class="row">
              <div class="col-sm-6">
                <div class="form-group" class:has-error={Billing_FirstName_errors.length}>
                  <label for="Billing_FirstName">First Name</label>
                  <input
										type="text" class="form-control" name="Billing_FirstName" id="Billing_FirstName"
										required
										bind:value={$paymentMethod$.Billing_FirstName}
										use:validation={$paymentMethod$.Billing_FirstName, ['First Name', required_errors_]}
										on:errors={evt => Billing_FirstName_errors = evt.detail }
									>
                  <ValidationMessages errors={Billing_FirstName_errors} input_tooltip={true}></ValidationMessages>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group" class:has-error={Billing_LastName_errors.length}>
                  <label for="Billing_LastName">Last Name</label>
                  <input
										type="text" class="form-control" name="Billing_LastName" id="Billing_LastName"
										required
										bind:value={$paymentMethod$.Billing_LastName}
										use:validation={$paymentMethod$.Billing_LastName, ['Last Name', required_errors_]}
										on:errors={evt => Billing_LastName_errors = evt.detail }
									>
                  <ValidationMessages errors={Billing_LastName_errors} input_tooltip={true}></ValidationMessages>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group" class:has-error={Billing_Address_errors.length}>
                  <label for="Billing_Address">Address</label>
                  <input
										type="text" class="form-control" name="Billing_Address" id="Billing_Address"
										required
										bind:value={$paymentMethod$.Billing_Address}
										use:validation={$paymentMethod$.Billing_Address, ['Address', required_errors_]}
										on:errors={evt => Billing_Address_errors = evt.detail }
									>
                  <ValidationMessages errors={Billing_Address_errors} input_tooltip={true}></ValidationMessages>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group" class:has-error={Billing_City_errors.length}>
                  <label for="Billing_City">City</label>
                  <input
										type="text" class="form-control" name="Billing_City" id="Billing_City"
										required
										bind:value={$paymentMethod$.Billing_City}
										use:validation={$paymentMethod$.Billing_City, ['City', required_errors_]}
										on:errors={evt => Billing_City_errors = evt.detail }
									>
                  <ValidationMessages errors={Billing_City_errors} input_tooltip={true}></ValidationMessages>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group" class:has-error={Billing_State_errors.length}>
                  <label for="State">State</label>
                  <input
										type="text" class="form-control" name="State" id="State"
										required
										bind:value={$paymentMethod$.Billing_State}
										use:validation={$paymentMethod$.Billing_State, ['State', required_errors_]}
										on:errors={evt => Billing_State_errors = evt.detail }
									>
                  <ValidationMessages errors={Billing_State_errors} input_tooltip={true}></ValidationMessages>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group" class:has-error={Billing_Zip_errors.length}>
                  <label for="Zip">Zip</label>
                  <input
										type="text" class="form-control" name="Zip" id="Zip"
										required
										bind:value={$paymentMethod$.Billing_Zip}
										use:validation={$paymentMethod$.Billing_Zip, ['Zip', required_errors_]}
										on:errors={evt => Billing_Zip_errors = evt.detail }
									>
                  <ValidationMessages errors={Billing_Zip_errors} input_tooltip={true}></ValidationMessages>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
						<div class="row action-buttons">
							<button use:ladda={$busy$} type="submit" class="col-xs-6 btn btn-lg btn-success">Save</button>
							<button
								type="button" class="col-xs-6 btn btn-lg btn-success btn-inverse"
								on:click={evt => _.close()}
							>Cancel</button>
						</div>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<style type=text/scss>
.save-payment-method-modal {
	.modal-body {
		padding: 40px;
	}
}
</style>
