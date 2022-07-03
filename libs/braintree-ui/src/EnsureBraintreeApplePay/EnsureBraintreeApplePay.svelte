<script lang="ts">
import { SingletonComponent } from '@menus/component-registry'
import { getContext_ui_ctx } from '@menus/ui'
import type { braintree_ui_Ctx } from '../braintree_ui_Ctx.js'
import LoadBraintreeApplePay from './LoadBraintreeApplePay.svelte'
const ctx = getContext_ui_ctx() as braintree_ui_Ctx
</script>
<SingletonComponent {ctx} Load={LoadBraintreeApplePay}></SingletonComponent>
