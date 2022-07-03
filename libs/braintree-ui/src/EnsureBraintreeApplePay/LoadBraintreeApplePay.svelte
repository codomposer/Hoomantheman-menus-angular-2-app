<script lang="ts">
import { has_dom } from '@ctx-core/dom'
import { EnsureBraintree } from '../EnsureBraintree'
import { braintree_apple_pay_loaded$_b } from '../braintree_apple_pay_loaded$_b.js'
import type { braintree_ui_Ctx } from '../braintree_ui_Ctx.js'
export let ctx:braintree_ui_Ctx
const braintree_apple_pay_loaded$ = braintree_apple_pay_loaded$_b(ctx)
</script>

<EnsureBraintree></EnsureBraintree>
<svelte:head>
  {#if has_dom}
    <script {...{ src: `https://js.braintreegateway.com/web/${process.env.BRAINTREE_VERSION}/js/apple-pay.min.js` }}
						on:load={evt => braintree_apple_pay_loaded$.set(true)}
		></script>
  {/if}
</svelte:head>
