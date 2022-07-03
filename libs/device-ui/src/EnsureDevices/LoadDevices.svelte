<script lang="ts">
import { has_dom } from '@ctx-core/dom'
import { devices_loaded$_b } from '../devices_loaded$_b.js'
import type { device_ui_Ctx } from '../device_ui_Ctx.js'
export let ctx:device_ui_Ctx
const devices_loaded$ = devices_loaded$_b(ctx)
</script>

<svelte:head>
  {#if has_dom}
    <link rel="stylesheet" href="/client/devices.min.css"
					on:load={evt => devices_loaded$.set(true)}
		>
  {/if}
</svelte:head>
