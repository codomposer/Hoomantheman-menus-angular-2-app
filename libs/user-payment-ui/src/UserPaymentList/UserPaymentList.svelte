<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import { CARD_TYPE_CLASS } from '@menus/web-config'
import { unmaskCardNo } from '@menus/payment'
import { SaveUserPaymentModal } from '../SaveUserPaymentModal'
import { UserPaymentList_c } from './UserPaymentList_c.js'
import type { user_payment_ui_Ctx } from '../user_payment_ui_Ctx.js'
export let expand = true
const ctx = getContext_ui_ctx() as user_payment_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new UserPaymentList_c(ctx)
const { busy$, saveUserPaymentModal$, userPayments$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<SaveUserPaymentModal bind:this={$saveUserPaymentModal$}></SaveUserPaymentModal>
<div class="UserPaymentList">
  <div class="section-title"
			 on:click={evt => dispatch('click-section-title', evt)}
	>Payment Method</div>
	{#if expand}
    {#if $busy$}
      <PageLoader></PageLoader>
    {:else}
      <div class="payment-card-section-wrapper clearfix">
        {#each $userPayments$ || [] as userPayment,index}
          <div class="payment-card-section"
							 class:active={userPayment.Is_Default}
							 class:has-error={userPayment.has_error}
							 on:click={_evt => _.set_default_userPayment(userPayment)}
					>
            {#if userPayment.busy}
              <PageLoader center={'parent'}></PageLoader>
            {/if}
						<div class="payment-card-container">
              <div class="payment-card-top clearfix">
                <div class="payment-card-actions">
                  <div class="pencil-2-icon"
											 on:click|stopPropagation={_evt => _.edit_userPayment(userPayment)}
									></div>
                  <div class="delete-2-icon"
											 on:click|stopPropagation={_evt => _.delete_userPayment(index, userPayment)}
									></div>
                </div>

                <div class="{ CARD_TYPE_CLASS[userPayment.CardType] }-icon payment-card-logo"></div>
              </div>
              <div class="payment-card-number">
                **** **** **** { unmaskCardNo(userPayment.CardNumber) }
              </div>
              <div class="payment-card-details clearfix">
                <div class="payment-card-holder">
                  { userPayment.CardHolder }
                </div>
                <div class="payment-card-expiry">
                  { userPayment.Expiry }
                </div>
              </div>
            </div>
          </div>
        {/each}
				<div class="payment-card-section" on:click={evt => _.edit_userPayment()}>
          <div class="payment-card-container">
            <div class="payment-card-number">
              <div class="add-card-icon"></div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/if}
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.UserPaymentList {
	.section-title {
		margin: 0 0 43px;
		font-weight: $lato-black;
		font-size: 18px;
	}
	.payment-card-section-wrapper {
		position: relative;
		.payment-card-section {
			position: relative;
			float: left;
			margin-right: 26px;
			margin-bottom: 26px;
			border-radius: 3px;
			border: 4px solid transparent;
			cursor: pointer;
			&.has-error {
				border-color: rgba($brand-danger, .3);
			}
			&.active, &:hover {
				border-color: rgba($brand-success, .3);
				&.has-error {
					border-color: $brand-danger;
				}
				.payment-card-container {
					.payment-card-top {
						.payment-card-actions {
							display: block;
						}
					}
				}
			}
			.payment-card-container {
				width: 270px;
				padding: 67px 0;
				border: 1px solid rgba(#455A64, .3);
				border-radius: 3px;
				.payment-card-top {
					position: absolute;
					width: 100%;
					left: 0;
					top: 0;
					margin-top: 16px;
					padding: 0 16px;
					.payment-card-actions {
						display: none;
						float: left;
					}
					.payment-card-logo {
						float: right;
					}
				}
				.payment-card-number {
					font-size: 17px;
					font-weight: $lato-bold;
					text-align: center;
					.add-card-icon {
						display: block;
						margin: 0 auto;
					}
				}
				.payment-card-details {
					position: absolute;
					width: 100%;
					left: 0;
					bottom: 0;
					margin-bottom: 16px;
					padding: 0 16px;
					.payment-card-holder, .payment-card-expiry {
						font-weight: $lato-bold;
						font-size: 12px;
					}
					.payment-card-holder {
						float: left;
					}
					.payment-card-expiry {
						float: right;
					}
				}
			}
		}
	}
}
</style>
