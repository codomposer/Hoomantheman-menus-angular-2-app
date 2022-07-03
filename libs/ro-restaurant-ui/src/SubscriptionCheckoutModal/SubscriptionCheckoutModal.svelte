<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { currency_str_ } from '@ctx-core/currency'
import { mask_credit_card_str_ } from '@menus/credit-card'
import { shortDate_ } from '@menus/date'
import { CheckBox } from '@menus/form-ui'
import { ladda } from '@menus/ladda'
import { SavePaymentMethodModal } from '@menus/ro-billing-ui'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { validation, ValidationMessages, required_errors_ } from '@menus/validation'
import { WEB_APP_URL_ } from '@menus/web-config'
import { is_cordova_app } from '@menus/web-cordova'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
import { SubscriptionCheckoutModal_c } from './SubscriptionCheckoutModal_c.js'
import { innerWidth_lte_SCREEN_XS_MIN$_b } from '@menus/dom'
const ctx = getContext_ui_ctx() as ro_restaurant_ui_Ctx
const { webConfig } = ctx
const innerWidth_lte_SCREEN_XS_MIN$ = innerWidth_lte_SCREEN_XS_MIN$_b(ctx)
export const _ = new SubscriptionCheckoutModal_c(ctx)
const {
	busy$, CancelNextSubscription_busy$, ChangeSubscription_busy$, changeSubscription_errors$, currentSubscription$,
	discount$, fee_messages$, is_modal_open$, nextSubscription$, nextSubscriptionStartDate$, payment_methods$,
	SavePaymentMethodModal_i$, selectedPaymentMethodID$, selectedSubscription$, setupFees$, subscriptions$,
	Subscription_Expiration$, Subscription_Expired$, subtotal$, total$, yearlyPayment$,
} = _
export const open = _.open, close = _.close
let form_errors//region
let selectedSubscription_errors = [], selectedPaymentMethodID_errors = []
$: form_errors = [
	...selectedSubscription_errors, ...selectedPaymentMethodID_errors, ...$changeSubscription_errors$
]//endregion
let submit_disabled
$: submit_disabled = (
	(
		$currentSubscription$?.ID === $selectedSubscription$?.ID
		|| (
			$nextSubscription$
			&& $selectedSubscription$?.ID === $nextSubscription$?.ID
		)
	)
	&& !$Subscription_Expired$
)
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
  <div class="modal modal-open menu-item-option-items-modal fade d-block in"
			 tabindex="-1"
			 role="dialog" aria-labelledby="myModalLabel"
			 on:click={evt => _.close()}
	>
    <div class="modal-dialog modal-lg" role="document" on:click|stopPropagation>
      <div class="modal-content">
        <form on:submit|preventDefault={evt => form_errors.length || _.changeSubscription()}>
          <div class="modal-header">
            <button type="button" class="close" aria-label="Close"
										on:click|stopPropagation={evt => _.close()}
						>
              <div class="delete-icon"></div>
            </button>
            <h4 class="modal-title">Change Subscription</h4>
          </div>
          <div class="modal-body modal-scrollable">
            {#if $busy$}
              <PageLoader></PageLoader>
            {:else}
              <div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group select-service-type"
												 class:has-error={selectedSubscription_errors.length}
										>
                      <label for="selectedSubscription">New Subscription</label>
                      <select class="form-control"
															name="selectedSubscription" id="selectedSubscription"
															required
															bind:value={$selectedSubscription$}
															use:validation={$selectedSubscription$, ['New Subscription', required_errors_]}
															on:errors={evt => selectedSubscription_errors = evt.detail}
											>
                        {#each $subscriptions$ as subscription}
                          <option value={subscription}>{ subscription.Name }</option>
                        {/each}
                      </select>
                      <ValidationMessages errors={selectedSubscription_errors}></ValidationMessages>
                      <div class="help-block more-pricing-info">For more info
                        <a
													href="/backoffice/pricing" target="_blank"
													on:click={evt => {
														if (is_cordova_app) {
															evt.preventDefault()
															window.open(`${WEB_APP_URL_(webConfig)}/backoffice/pricing`, '_system')
														}
													}}
												>see our pricing</a>
                      </div>
                    </div>
										{#if $selectedSubscription$.MonthlyValue}
                      <div>
                        {#if $payment_methods$.length}
                          <div class="form-group select-service-type"
															 class:has-error={selectedPaymentMethodID_errors.length}
													>
                            <label for="selectedPaymentMethodID">Payment Method</label>
                            <select class="form-control"
																		name="selectedPaymentMethodID" id="selectedPaymentMethodID"
																		required
																		bind:value={$selectedPaymentMethodID$}
																		use:validation={$selectedPaymentMethodID$, ['Payment Method', required_errors_]}
																		on:errors={evt => selectedPaymentMethodID_errors = evt.detail}
														>
                              {#each $payment_methods$ as paymentMethod}
                                <option value={paymentMethod.ID}>{ paymentMethod.CardType }
																	- { paymentMethod.CardHolder }
																	- { mask_credit_card_str_(paymentMethod.CardNumber) }
																	- { paymentMethod.Expiry }</option>
                              {/each}
                            </select>
                            <ValidationMessages errors={selectedPaymentMethodID_errors}></ValidationMessages>
                          </div>
                        {/if}
												<div class="clear">
                          {#if $payment_methods$.length === 0}
                            <div class="add-payment-method-text">Please
                              add a payment method
                            </div>
                          {/if}
													<button type="button" class="btn btn-success btn-xs btn-add-payment-method"
																	on:click={evt => _.add_payment_method()}
													>Add Payment Method</button>
                        </div>
                        <div class="yearly-payment-toggle">
                          <CheckBox toggle={true} bind:value={$yearlyPayment$}
																		text="Pay yearly and save 10%"></CheckBox>
                        </div>
                      </div>
                    {/if}
										{#each $fee_messages$ as fee_message}
                      <div class="fee-message">{fee_message}</div>
                    {/each}
										<div class="subscription-text">
                      {#if $Subscription_Expired$}
                        <span>
                          Your { $currentSubscription$?.Name || '' } subscription expired
                          on { shortDate_($Subscription_Expiration$) || '' }.
                        </span>
                      {:else}
                        <span>You are currently subscribed to { $currentSubscription$?.Name || '' } subscription.</span>
                      {/if}
											{#if $nextSubscription$}
                        <span>Your { $nextSubscription$?.Name }
													subscription will start at { shortDate_($nextSubscriptionStartDate$) }</span>
                      {/if}
                    </div>
                    <div class="error-messages">
                      <ValidationMessages errors={form_errors}></ValidationMessages>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="menu-item">
                      <div class="clearfix">
                        <div class="menu-item-name">
                          { $selectedSubscription$.Name }
                        </div>
                        <div class="menu-item-price">
                          { currency_str_($selectedSubscription$.MonthlyValue || 0, 'USD') } / month
                        </div>
                      </div>
                    </div>
                    <div class="restaurant-price-info">
                      <div class="sub-total">
                        <div class="row">
                          <div class="col-xs-6 left-text">Setup Fees</div>
                          <div class="col-xs-6 right-text">{ currency_str_($setupFees$, 'USD') }</div>
                        </div>
                      </div>
                      <div class="sub-total">
                        <div class="row">
                          <div class="col-xs-6 left-text">Subtotal</div>
                          <div class="col-xs-6 right-text">{ currency_str_($subtotal$, 'USD') }</div>
                        </div>
                      </div>
                      <div class="sub-total">
                        <div class="row">
                          <div class="col-xs-6 left-text">Discount</div>
                          <div class="col-xs-6 right-text">{ currency_str_($discount$, 'USD') }</div>
                        </div>
                      </div>
                      <div class="full-total">
                        <div class="row">
                          <div class="col-xs-6 left-text">Total</div>
                          <div class="col-xs-6 right-text">{ currency_str_($total$, 'USD') }</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/if}
          </div>
					{#if !$busy$}
            <div class="modal-footer">
							<div class="row">
								<button type="button" class="btn btn-lg btn-success btn-inverse"
												class:btn-block={$innerWidth_lte_SCREEN_XS_MIN$}
												class:col-xs-4={$nextSubscription$ && $selectedSubscription$?.ID === $nextSubscription$?.ID}
												class:col-xs-6={!($nextSubscription$ && $selectedSubscription$?.ID === $nextSubscription$?.ID)}
												on:click={evt => _.close()}
								>Cancel</button>
								<button type="submit" class="btn btn-lg btn-success btn-complete-payment"
												class:btn-block={$innerWidth_lte_SCREEN_XS_MIN$}
												class:col-xs-4={$nextSubscription$ && $selectedSubscription$?.ID === $nextSubscription$?.ID}
												class:col-xs-6={!($nextSubscription$ && $selectedSubscription$?.ID === $nextSubscription$?.ID)}
												use:ladda={$ChangeSubscription_busy$}
												disabled={ submit_disabled }
								>{
									submit_disabled
									? 'Already Subscribed'
									: `Complete Order ${currency_str_($total$, 'USD')}`
								}</button>
								{#if $nextSubscription$ && $selectedSubscription$?.ID === $nextSubscription$?.ID}
									<button type="button" class="col-xs-4 btn btn-lg btn-danger btn-inverse btn-complete-payment"
													class:btn-block={$innerWidth_lte_SCREEN_XS_MIN$}
													use:ladda={$CancelNextSubscription_busy$}
													on:click={evt => _.cancelNextSubscription()}
									>
										Cancel Next Subscription
									</button>
								{/if}
							</div>
	          </div>
          {/if}
        </form>
      </div>
    </div>
  </div>
{/if}
<SavePaymentMethodModal bind:this={$SavePaymentMethodModal_i$}></SavePaymentMethodModal>

<style type=text/scss global>
@import "@menus/ro-shared-css/lib";
.menu-item-option-items-modal {
	display: block;
	.modal-body {
		padding-top: 32px;
		.add-payment-method-text {
			color: $brand-danger;
			margin-bottom: 8px;
		}
		.yearly-payment-toggle {
			margin-top: 20px;
		}
		.fee-message {
			font-style: italic;
			font-weight: $lato-bold;
			margin-bottom: 16px;
		}
		.subscription-text {
			font-weight: $lato-bold;
			margin-bottom: 16px;
		}
		.menu-item {
			border-bottom: 1px solid #DBDBDB;
			.menu-item-name {
				float: left;
				width: 50%;
				font-weight: $lato-bold;
				padding: 19px 5px 19px 0;
				@media (max-width: $iPhone6-width - 1) {
					width: 39%;
				}
			}
			.menu-item-price {
				float: right;
				text-align: right;
				font-weight: $lato-black;
				padding: 19px 0;
			}
		}
		.restaurant-price-info {
			.sub-total, .delivery-total, .tax-total, .service-fee-total, .full-total, .eta-time {
				margin-top: 0;
				padding: 13px 0 14px;
				border-bottom: 1px solid #DBDBDB;
				.right-text {
					text-align: right;
				}
			}
			.eta-time {
				margin-top: -1px;
				border-top: 1px solid #DBDBDB;
				@media (max-width: $screen-xs-max) {
					.left-text {
						padding-right: 0;
					}
					.right-text {
						padding-left: 0;
					}
				}
			}
			.driver-tip-total {
				border-bottom: 1px solid #DBDBDB;
				.tip-label {
					float: left;
					padding: 13px 0 14px;
					width: 25%;
				}
				.tip-range {
					float: left;
					padding: 2px 0;
					width: 40%;
					margin-top: 10px;
					.tip-range-container {
						position: relative;
					}
				}
				.tip-percent {
					float: left;
					padding: 13px 0 14px;
					width: 15%;
					text-align: center;
				}
				.tip-value {
					float: right;
					padding: 13px 0 14px;
					width: 20%;
					text-align: right;
				}
				.range {
					padding: 0;
					input {
						margin: 0;
					}
				}
			}
			.full-total {
				font-weight: $lato-black;
			}
			.applied-coupon-section {
				$remove-coupon-btn-width: 96px;
				padding: 8px 0;
				border-bottom: 1px solid #DBDBDB;
				.coupon-code {
					$padding-right: 16px;
					float: left;
					width: calc(100% - #{$remove-coupon-btn-width} - #{$padding-right});
					margin-top: 6px;
					.coupon-tag-icon {
						display: block;
						float: left;
						margin-right: 8px;
					}
				}
				&.has-coupon-errors {
					.coupon-code {
						text-decoration: line-through;
					}
				}
				.remove-coupon-btn {
					float: right;
					margin-top: 3px;
				}
			}
			.applied-coupon-errors-section {
				margin: 6px 0 12px;
			}
			.add-coupon-section {
				$remove-coupon-btn-width: 96px;
				padding: 24px 0;
				.coupon-input {
					$padding-right: 16px;
					margin-bottom: 0;
					@media (min-width: $screen-sm-min) {
						float: left;
						width: calc(100% - #{$remove-coupon-btn-width} - #{$padding-right});
					}
					.m-input-group {
						.m-input-group-addon {
							padding: 10px;
						}
					}
				}
				.coupon-btn {
					float: right;
					margin-top: 8px;
					@media (max-width: $screen-xs-max) {
						margin-top: 16px;
						font-size: 14px;
						width: 100%;
						height: 32px;
					}
				}
			}
			.available-coupons-link {
				margin-top: 24px;
				text-align: center;
				font-weight: $lato-black;
				cursor: pointer;
			}
		}
		.more-pricing-info {
			color: $gray;
			a {
				color: $brand-success;
			}
		}
		.clear {
			clear: both;
			overflow: hidden;
		}
	}
	.modal-footer {
		text-align: right;
		.btn-complete-payment {
			min-width: 220px;
		}
	}
}
</style>
