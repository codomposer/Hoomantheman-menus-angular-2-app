<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { EnsureGrecaptcha } from '../EnsureGrecaptcha'
import type { grecaptcha_Ctx } from '../grecaptcha_Ctx.js'
import { Grecaptcha_c } from './Grecaptcha_c.js'
export let theme:'light'|'dark' = 'light'
const ctx = getContext_ui_ctx() as grecaptcha_Ctx, dispatch = createEventDispatcher()
export const _ = new Grecaptcha_c(ctx, dispatch)
const { elem$ } = _
$: _.theme$.$ = theme
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<EnsureGrecaptcha></EnsureGrecaptcha>
<div bind:this={$elem$} class="Grecaptcha"></div>

<style type="text/scss" global>
.Grecaptcha {
	overflow: hidden;
}
</style>
