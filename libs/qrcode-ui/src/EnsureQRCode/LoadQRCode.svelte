<script lang="ts">
import { has_dom } from '@ctx-core/dom'
import { qrcode_loaded$_b } from '../qrcode_loaded$_b.js'
import type { qrcode_ui_Ctx } from '../qrcode_ui_Ctx.js'
export let ctx:qrcode_ui_Ctx
const qrcode_loaded$ = qrcode_loaded$_b(ctx)
</script>

<svelte:head>
  {#if has_dom}
    <script {...{ src: '/client/qrcode.min.js' }}
						on:load={evt => qrcode_loaded$.set(true)}
		></script>
  {/if}
</svelte:head>
