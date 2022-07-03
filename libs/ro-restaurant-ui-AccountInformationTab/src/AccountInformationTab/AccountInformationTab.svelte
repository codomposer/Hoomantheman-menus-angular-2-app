<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { ladda } from '@menus/ladda'
import type { ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import { ro_auth_rules$_b } from '@menus/ro-user-common'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { number_errors_, regex_errors_2, required_errors_, validation, ValidationMessages } from '@menus/validation'
import { BRAINTREE_PAYMENT_STATUS, ACCOUNT_INFORMATION_TAB } from '@menus/web-config'
import { AccountInformationTab_c } from './AccountInformationTab_c.js'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx, dispatch = createEventDispatcher()
const ro_auth_rules$ = ro_auth_rules$_b(ctx)
export const _ = new AccountInformationTab_c(ctx, dispatch)
const { banking_info_editing$, busy$, save_busy$, restaurant_account_info$ } = _
let form_errors:string[] = []//region
let LegalName_errors = [], AccountName_errors = [], AccountNumber_errors = [],
	RoutingNumber_errors = [], TIN_errors = []
$: form_errors = [
	...LegalName_errors, ...AccountName_errors, ...AccountNumber_errors,
	...RoutingNumber_errors, ...TIN_errors,
]//endregion
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $ro_auth_rules$[ACCOUNT_INFORMATION_TAB]}
<div class="AccountInformationTab page">
  {#if $busy$ || !$restaurant_account_info$}
    <PageLoader center="parent"></PageLoader>
  {:else}
    <div class="section-heading">Account Information</div>
    <p>
      Your account will be credited when the order is accepted under the Orders tab.
      This data is secure & safe for your account to receive payments.
    </p>
    <form on:submit|preventDefault={evt => form_errors.length || _.save()}>
      <div class="row banking-info-header">
        <div class="col-md-12 col-lg-8">
          <div class="section-heading">
            Bank Information
            <div class="toggle_edit"
								 class:close-icon={$banking_info_editing$}
								 class:pencil-icon={!$banking_info_editing$}
								 on:click={evt => _.toggle_edit()}
								 title={`${$banking_info_editing$ ? 'Cancel ' : ''}Edit Bank Information`}
						></div>
          </div>
          <p>This data is passed directly to the Credit Card processor & will not be saved in our system.</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4">
					<label for="LegalName">Legal Name</label>
          {#if $banking_info_editing$}
            <div class="form-group input-container"
								 class:has-error={LegalName_errors.length}
						>
              <input type="text" class="form-control" id="LegalName" name="LegalName"
										 required
										 bind:value={$restaurant_account_info$.LegalName}
										 use:validation={$restaurant_account_info$.LegalName, ['Legal Name', required_errors_]}
										 on:errors={evt => LegalName_errors = evt.detail}
							/>
              <ValidationMessages errors={LegalName_errors}></ValidationMessages>
            </div>
          {:else}
            <div class="form-group input-container">
              <div class="m-input-group has-addon-right">
                <div class="readonly-input">
                  { $restaurant_account_info$.LegalName || '—' }
                </div>
              </div>
            </div>
          {/if}
        </div>
        <div class="col-md-6 col-lg-4">
					<label for="AccountName">Account Name</label>
          {#if $banking_info_editing$}
            <div class="form-group input-container"
								 class:has-error={AccountName_errors.length}
						>
              <input type="text" class="form-control" id="AccountName" name="AccountName"
										 required
										 bind:value={$restaurant_account_info$.AccountName}
										 use:validation={$restaurant_account_info$.AccountName, ['Account Name', required_errors_]}
										 on:errors={evt => AccountName_errors = evt.detail}
							/>
              <ValidationMessages errors={AccountName_errors}></ValidationMessages>
            </div>
          {:else}
            <div class="form-group input-container">
              <div class="m-input-group has-addon-right">
                <div class="readonly-input">
                  { $restaurant_account_info$.AccountName || '—' }
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
      <div class="row banking-info-header">
        <div class="col-md-6 col-lg-4">
          <label for="AccountNumber">Account Number (10 digits)</label>
					{#if $banking_info_editing$}
            <div class="form-group input-container"
								 class:has-error={AccountNumber_errors.length}
						>
              <input type="text" class="form-control" id="AccountNumber" name="AccountNumber"
										 required
										 bind:value={$restaurant_account_info$.AccountNumber}
										 use:validation={$restaurant_account_info$.AccountNumber, [
                       'Account Number',
                        required_errors_, number_errors_,
                         regex_errors_2(/^[0-9]{10}$/, 'should be 10 digits')
                     ]}
										 on:errors={evt => AccountNumber_errors = evt.detail}
							/>
              <ValidationMessages errors={AccountNumber_errors}></ValidationMessages>
            </div>
          {:else}
            <div class="form-group input-container">
              <div class="m-input-group has-addon-right">
                <div class="readonly-input">
                  { $restaurant_account_info$.AccountNumber || '—' }
                </div>
              </div>
            </div>
          {/if}
        </div>
        <div class="col-md-6 col-lg-4">
          <label for="RoutingNumber">Routing Number (9 digits)</label>
					{#if $banking_info_editing$}
            <div class="form-group input-container"
								 class:has-error={RoutingNumber_errors.length}
						>
              <input type="text" class="form-control" id="RoutingNumber" name="RoutingNumber"
										 required
										 bind:value={$restaurant_account_info$.RoutingNumber}
										 use:validation={$restaurant_account_info$.RoutingNumber, [
                       'Routing Number',
                        required_errors_, number_errors_,
                         regex_errors_2(/^[0-9]{9}$/, 'should be 9 digits')
                     ]}
										 on:errors={evt => RoutingNumber_errors = evt.detail}
							/>
              <ValidationMessages errors={RoutingNumber_errors}></ValidationMessages>
            </div>
          {:else}
            <div class="form-group input-container">
              <div class="m-input-group has-addon-right">
                <div class="readonly-input">
                  { $restaurant_account_info$.RoutingNumber || '—' }
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <label for="TIN">TIN (9 digits)</label>
					{#if $banking_info_editing$}
            <div class="form-group input-container"
								 class:has-error={TIN_errors.length}
						>
              <input type="text" class="form-control" id="TIN" name="TIN"
										 required
										 bind:value={$restaurant_account_info$.TIN}
										 use:validation={$restaurant_account_info$.TIN, [
                       'TIN',
                        required_errors_, number_errors_,
                         regex_errors_2(/^[0-9]{9}$/, 'should be 9 digits')
                      ]}
										 on:errors={evt => TIN_errors = evt.detail}
							/>
              <ValidationMessages errors={TIN_errors}></ValidationMessages>
            </div>
          {:else}
            <div class="form-group input-container">
              <div class="m-input-group has-addon-right">
                <div class="readonly-input">
                  { $restaurant_account_info$.TIN || '—' }
                </div>
              </div>
            </div>
          {/if}
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="form-group input-container">
            <label for="Braintree_Onboard_Status">Bank Approval Status</label>
            <div id="Braintree_Onboard_Status" class="braintree-status">
              { BRAINTREE_PAYMENT_STATUS[$restaurant_account_info$.Braintree_Onboard_Status] || '—' }
            </div>
						{#if $banking_info_editing$ && $restaurant_account_info$.Braintree_Onboard_Message}
              <div class="help-block c-danger">{
								$restaurant_account_info$.Braintree_Onboard_Message
							}</div>
            {/if}
          </div>
        </div>
      </div>
			{#if $banking_info_editing$}
        <div class="action-buttons">
          <button use:ladda={$save_busy$} type="submit"
									class="btn btn-lg btn-success"
					>Save</button>
        </div>
      {/if}
    </form>
  {/if}
</div>
{/if}

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.AccountInformationTab {
	.braintree-status {
		border: 1px solid rgba(69, 90, 100, .3);
		padding: 13px 12px;
		border-radius: 3px;
		line-height: 1.42857;
		background-color: #eee;
	}
	.action-buttons {
		margin-top: 40px;
	}
	.readonly-input {
		background-color: #eeeeee;
		border-radius: 3px;
		border: 1px solid rgba(69, 90, 100, 0.3);
		padding: 13px 12px;
	}
	.banking-info-header {
		.toggle_edit {
			float: right;
		}
	}
}
</style>
