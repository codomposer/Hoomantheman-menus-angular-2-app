<script lang="ts">
import { has_dom } from '@ctx-core/dom'
import { vibrant_loaded$_b } from '../vibrant_loaded$_b.js'
import type { vibrant_Ctx } from '../vibrant_Ctx.js'
export let ctx:vibrant_Ctx
const vibrant_loaded$ = vibrant_loaded$_b(ctx)
</script>

<svelte:head>
  {#if has_dom}
    <script {...{ src: '/client/vibrant.min.js' }}
						on:load={evt => vibrant_loaded$.set(true)}
		></script>
  {/if}
</svelte:head>
