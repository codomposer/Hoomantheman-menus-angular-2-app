<script lang="ts">
import { has_dom } from '@ctx-core/dom'
import { braintree_loaded$_b } from '../braintree_loaded$_b.js'
import type { braintree_ui_Ctx } from '../braintree_ui_Ctx.js'
export let ctx:braintree_ui_Ctx
const braintree_loaded$ = braintree_loaded$_b(ctx)
</script>

<svelte:head>
  {#if has_dom}
    <script {...{ src: `https://js.braintreegateway.com/web/${process.env.BRAINTREE_VERSION}/js/client.min.js` }}
						on:load={evt => braintree_loaded$.set(true)}
		></script>
  {/if}
</svelte:head>
