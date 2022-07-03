<script lang="ts">
import { has_dom } from '@ctx-core/dom'
import { singleton_component_map$_b } from '../singleton_component_map$_b.js'
import type { component_registry_Ctx } from '../component_registry_Ctx.js'
export let ctx:component_registry_Ctx, Load
const singleton_component_map$ = singleton_component_map$_b(ctx)
let ssr_Load:boolean
$: {
	if (!$singleton_component_map$.has(Load)) {
		if (has_dom) {
			setTimeout(()=>{
				if (!$singleton_component_map$.has(Load)) {
					$singleton_component_map$.set(Load,
						new Load({
							target: document.body,
							props: {
								ctx,
							},
						})
					)
				}
			})
		} else {
			ssr_Load = true
		}
	}
}</script>
{#if ssr_Load}
  <svelte:component {ctx} this={Load}></svelte:component>
{/if}
