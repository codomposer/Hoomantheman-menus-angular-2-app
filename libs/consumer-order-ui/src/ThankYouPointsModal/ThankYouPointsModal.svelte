<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import type { consumer_order_ui_Ctx } from '../consumer_order_ui_Ctx.js'
import { ThankYouPointsModal_c } from './ThankYouPointsModal_c.js'
const ctx = getContext_ui_ctx() as consumer_order_ui_Ctx
export const _ = new ThankYouPointsModal_c(ctx)
export const open = _.open, close = _.close
const { is_modal_open$, order$, total_points$ } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
<div class="modal thank-you-points-modal fade d-block in"
		 tabindex="-1"
		 role="dialog"
		 aria-labelledby="myModalLabel"
>
  <div class="modal-dialog" role="document" mStopEvent>
    <div class="modal-content bg-primary">

      <div class="modal-header">
        <button type="button" class="close" on:click={close} aria-label="Close">
          <div class="close-3-white-icon"></div>
        </button>
        <h4 class="modal-title">&nbsp;</h4>
      </div>

      <div class="modal-body modal-scrollable">
        <div class="text-heading">
          <div>Woohoo!</div>
          <div>You got { $total_points$ } pts.</div>
        </div>
        <div class="text-subheading">
          <div>Thank you for your review for</div>
          <div>{ $order$.RestaurantName }</div>
        </div>
        <div class="text-para">
          <div>Remember, then more points you earn,</div>
          <div>then more free orders you can get!</div>
        </div>
      </div>

      <div class="modal-footer">
        <div class="row">
          <button type="button"
                  class="col-xs-12 btn btn-primary btn-inverse btn-no-hover close-btn"
                  on:click={close}
          >Okay</button>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}

<style type=text/scss>
@import "@menus/consumer-shared-css/lib";
.modal.thank-you-points-modal {
	.modal-content {
		.modal-header {
			border-bottom: none;
			.close {
				color: white;
			}
		}
		.modal-body {
			text-align: center;
			color: white;
			.text-heading {
				font-weight: $lato-black;
				font-size: 40px;
			}
			.text-subheading {
				margin-top: 5px;
				font-weight: $lato-black;
				font-size: 18px;
			}
			.text-para {
				margin-top: 34px;
				opacity: 0.8;
			}
		}
		.modal-footer {
      text-align: center;
      .close-btn {
        border-color: transparent;
      }
		}
	}
}
</style>
