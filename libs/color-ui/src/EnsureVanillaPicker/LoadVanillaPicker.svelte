<script lang="ts">
import { has_dom } from '@ctx-core/dom'
import { vanilla_picker_loaded$_b } from '../vanilla_picker_loaded$_b.js'
import type { color_ui_Ctx } from '../color_ui_Ctx.js'
export let ctx:color_ui_Ctx
const vanilla_picker_loaded$ = vanilla_picker_loaded$_b(ctx)
</script>
<svelte:head>
  {#if has_dom}
    <script {...{ src: '/client/vanilla-picker.min.js' }}
						on:load={evt => vanilla_picker_loaded$.set(true)}
		></script>
  {/if}
</svelte:head>
