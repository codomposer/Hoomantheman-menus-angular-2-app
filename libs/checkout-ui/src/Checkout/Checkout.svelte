<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { has_dom } from '@ctx-core/dom'
import { goto_login_b } from '@menus/consumer-http'
import { ShoppingCart, MODE_NORMAL } from '@menus/consumer-shopping-cart-ui'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { innerWidth_gt_SCREEN_SM_MIN$_b, innerWidth_lte_SCREEN_SM_MIN$_b } from '@menus/dom'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
import type { checkout_ui_Ctx } from '../checkout_ui_Ctx.js'
import { CheckoutConfirmAddressModal } from '../CheckoutConfirmAddressModal/index.js'
import { CheckoutSettings } from '../CheckoutSettings/index.js'
import { ThankYouOrderModal } from '../ThankYouOrderModal/index.js'
import { Checkout_c } from './Checkout_c.js'
const ctx = getContext_ui_ctx() as checkout_ui_Ctx
const consumer_login_user$ = consumer_login_user$_b(ctx)
const goto_login = goto_login_b(ctx)
const innerWidth_gt_SCREEN_SM_MIN$ = innerWidth_gt_SCREEN_SM_MIN$_b(ctx)
const innerWidth_lte_SCREEN_SM_MIN$ = innerWidth_lte_SCREEN_SM_MIN$_b(ctx)
const isLoggedIn$ = consumer_login_user$.isLoggedIn$
export const _ = new Checkout_c(ctx)
const { busy$, restaurant_cartitems$, CheckoutConfirmAddressModal_i$, isLoggedOut$, ThankYouOrderModal_i$, } = _
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

{#if $busy$}
  <PageLoader center="page"></PageLoader>
{/if}
{#if has_dom}
  <div class="Checkout page">
    <ThankYouOrderModal bind:this={$ThankYouOrderModal_i$}></ThankYouOrderModal>
    <CheckoutConfirmAddressModal bind:this={$CheckoutConfirmAddressModal_i$}></CheckoutConfirmAddressModal>
    <div class="row">
      {#if $isLoggedOut$}
        You are currently logged out.
        <a href="/login" on:click|preventDefault={evt => goto_login()}>Login</a> to view this page.
      {:else if $isLoggedIn$}
        {#if $innerWidth_gt_SCREEN_SM_MIN$}
          <div class="col-md-6">
            <CheckoutSettings></CheckoutSettings>
          </div>
        {/if}
				<div class="col-md-6">
          <div class="order-details-section">
            {#if $restaurant_cartitems$?.length}
              <div class="shopping-cart-section-wrapper">
                <ShoppingCart
									mode={MODE_NORMAL}
									on:place_order={_evt => _.place_order()}
								>
                  {#if $innerWidth_lte_SCREEN_SM_MIN$}
                    <CheckoutSettings></CheckoutSettings>
                  {/if}
                </ShoppingCart>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style type=text/scss>
@import "@menus/css/lib";
.Checkout {
	padding: 0 135px 100px;
  @media (max-width: $screen-sm-max) {
    padding: 0 24px 100px;
  }
}
</style>
