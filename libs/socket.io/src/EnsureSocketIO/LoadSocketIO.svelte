<script lang="ts">
import { has_dom } from '@ctx-core/dom'
import { socket_io_loaded$_b } from '../socket_io_loaded$_b.js'
import type { socket_io_Ctx } from '../socket_io_Ctx'
export let ctx:socket_io_Ctx
const socket_io_loaded$ = socket_io_loaded$_b(ctx)
</script>

<svelte:head>
  {#if has_dom}
    <script {...{ src: '/client/socket.io.js' }}
						on:load={evt => socket_io_loaded$.set(true)}
		></script>
  {/if}
</svelte:head>
