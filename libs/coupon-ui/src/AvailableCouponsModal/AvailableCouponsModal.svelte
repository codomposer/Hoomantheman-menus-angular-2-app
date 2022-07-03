<script lang="ts">
import { createEventDispatcher, onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { DISCOUNT_TYPE_PERCENT, DISCOUNT_TYPE_AMOUNT } from '@menus/web-config'
import type { coupon_ui_Ctx } from '../coupon_ui_Ctx.js'
import { AvailableCouponsModal_c } from './AvailableCouponsModal_c'
const ctx = getContext_ui_ctx() as coupon_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new AvailableCouponsModal_c(ctx)//region
const available_coupons = _.available_coupons
const restaurant_cartitem = _.restaurant_cartitem
const is_modal_open$ = _.is_modal_open$//endregion
export const open = _.open, close = _.close
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $is_modal_open$}
  <div class="modal-backdrop fade in"></div>
  <div class="modal AvailableCouponsModal fade d-block in">
    <div class="modal-dialog available-coupons-modal">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" on:click={close}>
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">{ $restaurant_cartitem.menu_cartitems[0].menuitem.RestaurantName }'s Coupons</h4>
        </div>
        <div class="modal-body modal-scrollable">
          <div class="table-responsive-xs">
            <table class="table table-striped table-center"
									 class:table-hover={$available_coupons?.length}
						>
              <thead>
                <tr>
                  <th>Coupon Code</th>
                  <th>Discount</th>
                </tr>
              </thead>
              <tbody>
                {#each $available_coupons || [] as available_coupon}
                  <tr on:click={_evt => _.choose_coupon(available_coupon)}>
                    <td class="available_coupon-code">{ available_coupon.CouponCode }</td>
                    <td class="coupon-status c-success">
                      {#if available_coupon.DiscountType === DISCOUNT_TYPE_PERCENT}
                        <span>{ available_coupon.DiscountValue * 100 } % OFF</span>
                      {/if}
                      {#if available_coupon.DiscountType === DISCOUNT_TYPE_AMOUNT}
                        <span>${ available_coupon.DiscountValue } OFF</span>
                      {/if}
                    </td>
                  </tr>
                {:else}
                  <tr>
                    <td colspan="2">No Records to display</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style type="text/scss" global>
@import "@menus/consumer-shared-css/variables";
.AvailableCouponsModal {
	.available-coupons-modal {
		.modal-body {
			.coupon-status {
				font-weight: $lato-black;
			}
		}
	}
}
</style>
