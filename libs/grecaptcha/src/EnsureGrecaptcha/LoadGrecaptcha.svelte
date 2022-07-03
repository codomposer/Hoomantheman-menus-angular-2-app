<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { has_dom } from '@ctx-core/dom'
import { grecaptcha_loaded$_b } from '../grecaptcha_loaded$_b.js'
import type { grecaptcha_Ctx } from '../grecaptcha_Ctx.js'
export let ctx:grecaptcha_Ctx
const grecaptcha_loaded$ = grecaptcha_loaded$_b(ctx)
onMount(()=>{
	window['onload_grecaptcha'] = ()=>{
		grecaptcha_loaded$.set(true)
	}
})
onDestroy(()=>{
	delete window['onload_grecaptcha']
})
</script>

<svelte:head>
  {#if has_dom}
    <script {...{ src: 'https://www.google.com/recaptcha/api.js?render=explicit&onload=onload_grecaptcha' }}
						async defer
		></script>
  {/if}
</svelte:head>
