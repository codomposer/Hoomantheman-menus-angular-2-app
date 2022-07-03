<script lang="ts">
import { has_dom } from '@ctx-core/dom'
import { fontawesome_loaded$_b } from '../fontawesome_loaded$_b.js'
import type { font_awesome_Ctx } from '../font_awesome_Ctx.js'
export let ctx:font_awesome_Ctx
const fontawesome_loaded$ = fontawesome_loaded$_b(ctx)
</script>

<svelte:head>
  {#if has_dom}
    <link rel="stylesheet" href="/client/font-awesome.min.css"
					on:load={evt => fontawesome_loaded$.set(true)}
		>
  {/if}
</svelte:head>

<style type=text/scss global>
.fa {
	> * {
		font-family: "Lato", sans-serif;
	}
}
</style>
