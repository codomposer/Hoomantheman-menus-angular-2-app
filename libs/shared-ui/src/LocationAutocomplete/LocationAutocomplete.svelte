<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { userAddress_text$_b } from '@menus/consumer-user-address'
import type { shared_ui_Ctx } from '../shared_ui_Ctx.js'
import { LocationAutocomplete_c } from './LocationAutocomplete_c.js'
const ctx = getContext_ui_ctx() as shared_ui_Ctx
const userAddress_text$ = userAddress_text$_b(ctx)
export const _ = new LocationAutocomplete_c(ctx)
export const clear = _.clear
export let input = null
$: _.input$.$ = input
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<input
	bind:this={input}
	id="location-autocomplete"
	type="text"
	class="form-control search-input your-address"
	bind:value={$userAddress_text$}
	name="addressText"
	placeholder="Your address"
	autocomplete="off"
>
