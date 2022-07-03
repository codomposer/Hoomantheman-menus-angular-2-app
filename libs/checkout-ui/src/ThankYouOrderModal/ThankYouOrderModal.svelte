<script lang="ts">
import { onDestroy, onMount } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import type { checkout_ui_Ctx } from '../checkout_ui_Ctx.js'
import { ThankYouOrderModal_c } from './ThankYouOrderModal_c.js'
const ctx = getContext_ui_ctx() as checkout_ui_Ctx
export const _ = new ThankYouOrderModal_c(ctx)
const { is_modal_open$, place_order_errors$, pay_order_errors$, pay_order_successes$ } = _
export const open = _.open, close = _.close
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
<div class="modal-backdrop fade in"></div>
<div class="modal ThankYouOrderModal thank-you-order-modal fade d-block in"
		 tabindex="-1"
		 role="dialog"
		 aria-labelledby="myModalLabel"
		 on:click={evt => _.close()}
>
  <div class="modal-dialog" role="document" on:click|stopPropagation>
    <div class="modal-content">
      <div class="modal-header">
        <button type="button"
								class="close"
								on:click={evt => _.close()}
								aria-label="Close"
				>
          <div class="close-3-icon"></div>
        </button>
        <h4 class="modal-title">Thank you!</h4>
      </div>
      <div class="modal-body modal-scrollable clearfix">
        <div class="clearfix">
          <div class="thank-you-image thank-you-image-left"
					><img src="/assets/img/cr/thank-you-1.png"
								alt="Thank you"
					></div>
          <div class="order-info-section">
            <div class="text-heading">
              <div
								class:order-declined={
                  !$pay_order_successes$?.length
                  && ($place_order_errors$?.length || $pay_order_errors$?.length)
                }
							>
                {#if $pay_order_successes$?.length}
                  Your order(s) is being processed
                {:else if $place_order_errors$?.length || $pay_order_errors$?.length}
                  Something is wrong with your order
                {/if}
              </div>
            </div>
						{#if $pay_order_successes$?.length}
              <div class="order-confirm-section">
                <div class="order-confirm-title">Your confirmation number</div>
								{#each $pay_order_successes$ as restaurant_cartitem}
                  <div class="order-confirm-number">{ restaurant_cartitem.orderResult.OrderNumber }</div>
                {/each}
              </div>
            {/if}
						{#if $place_order_errors$?.length}
              <div class="order-confirm-section order-declined">
                {#each $place_order_errors$ as place_order_error}
                  <div class="order-confirm-title">{
										place_order_error.payload.Message
										|| 'Remove or use another coupon.'
									}</div>
                  <div class="order-confirm-number c-danger"
									>{ place_order_error.restaurant_cartitem.RestaurantName }</div>
                {/each}
              </div>
            {/if}
						{#if $pay_order_errors$?.length}
              <div class="order-confirm-section order-declined">
                {#each $pay_order_errors$ as pay_order_error}
                  <div class="order-confirm-title">
                    {
											pay_order_error.payload.Message
											|| `Order(s) is not placed for these restaurant(s) due to payment declined. Please update your payment method.`
										}
                  </div>
                  <div
										class="order-confirm-number c-danger">{ pay_order_error.restaurant_cartitem.RestaurantName }</div>
                {/each}
              </div>
            {/if}
          </div>
          <div class="thank-you-image thank-you-image-right"><img src="/assets/img/cr/thank-you-2.png" alt="Thank you"></div>
        </div>
      </div>
      <div class="modal-footer">
				<div class="row">
					<button type="button"
									class="col-xs-12 btn btn-lg btn-success btn-no-hover close-btn"
									on:click={evt => _.close()}
					>Okay</button>
				</div>
      </div>
    </div>
  </div>
</div>
{/if}

<style type=text/scss global>
@import "@menus/consumer-shared-css/lib";
.modal.ThankYouOrderModal {
	.modal-content {
		.modal-header {
			border-bottom: none;
			.modal-title {
				text-align: center;
				padding-left: 24px;
				padding-right: 0;
			}
		}
		.modal-body {
			padding-left: 0;
			padding-right: 0;
			padding-bottom: 22px;
			text-align: center;
			@media (max-width: $screen-xs-max) {
				background-url: vurl('/assets/img/cr/thank-you-1.png');
				background-size: cover;
			}
			.order-info-section {
				float: left;
				width: 260px;
				@media (max-width: $screen-xs-max) {
					float: none;
					width: 100%;
				}
				.text-heading {
					font-weight: $lato-black;
					font-size: 18px;
					margin-top: 40px;
				}
				.order-confirm-section {
					width: 260px;
					margin: 28px auto 0;
					padding: 13px 8px 20px;
					box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
					border-radius: 8px;
					.order-confirm-title {
						font-size: 12px;
					}
					.order-confirm-number {
						margin-top: 2px;
						font-weight: $lato-black;
						font-size: 18px;
						color: $brand-success;
					}
				}
			}
			.thank-you-image {
				float: left;
				@media (max-width: $screen-xs-max) {
					display: none;
				}
				&.thank-you-image-left {
					width: 154px;
					margin-right: 27px;
				}
				&.thank-you-image-right {
					width: 189px;
					padding-top: 24px;
				}
				img {
					max-width: 100%;
				}
			}
		}
		.modal-footer {
			text-align: center;

			@media (max-width: $screen-xs-max) {
				// TODO: Fix this `important` in future
				position: unset !important;
				padding-bottom: 150px !important;
			}
		}
	}
}
</style>
