<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { noop } from '@ctx-core/function'
import {
	Enable_Catering$_b, Enable_Delivery$_b, Enable_DiningIn$_b, Enable_Pickup$_b, isPlatform$_b
} from '@menus/platform-settings'
import { getContext_ui_ctx, goto_b } from '@menus/ui'
import type { service_type_ui_Ctx } from '../service_type_ui_Ctx.js'
export let root:HTMLUListElement = null
export let Delivery_enabled = false, Pickup_enabled = false, Catering_enabled = false, DiningIn_enabled = false
export let Delivery_active = false, Pickup_active = false, Catering_active = false, DiningIn_active = false
export let Delivery_href:string, Pickup_href:string, Catering_href:string, DiningIn_href:string
export let onclick_Delivery:(evt:MouseEvent)=>void = noop, onclick_Pickup:(evt:MouseEvent)=>void = noop,
	onclick_Catering:(evt:MouseEvent)=>void = noop, onclick_DiningIn:(evt:MouseEvent)=>void = noop
const ctx = getContext_ui_ctx() as service_type_ui_Ctx, dispatch = createEventDispatcher()
const Enable_Delivery$ = Enable_Delivery$_b(ctx)
const Enable_Pickup$ = Enable_Pickup$_b(ctx)
const Enable_Catering$ = Enable_Catering$_b(ctx)
const Enable_DiningIn$ = Enable_DiningIn$_b(ctx)
const goto = goto_b(ctx)
const isPlatform$ = isPlatform$_b(ctx)
</script>

<ul bind:this={root} class="ServiceTypeNav nav nav-pills tabs service-type-tabs {$$props.class}">
  <!-- {#if $isPlatform$ === false}
    <li class="enabled">
      <a class="arrow-left-icon previous-route"
				 href="/search"
				 on:click|preventDefault={_evt => window.history.back()}
			>&nbsp;</a>
    </li>
  {/if} -->
	{#if $Enable_Delivery$}
    <li
			class:enabled={Delivery_enabled}
			class:disabled={!Delivery_enabled}
			class:active={Delivery_active}
		><a href={Delivery_href} on:click={onclick_Delivery}
		>Delivery</a></li>
  {/if}
	{#if $Enable_Pickup$}
    <li
			class:enabled={Pickup_enabled}
			class:disabled={!Pickup_enabled}
			class:active={Pickup_active}
		><a href={Pickup_href} on:click={onclick_Pickup}
		>Pickup</a></li>
  {/if}
	{#if $Enable_Catering$}
    <li
			class:enabled={Catering_enabled}
			class:disabled={!Catering_enabled}
			class:active={Catering_active}
		><a href={Catering_href} on:click={onclick_Catering}
		>Catering</a></li>
  {/if}
	{#if $Enable_DiningIn$}
    <li
			class:enabled={DiningIn_enabled}
			class:disabled={!DiningIn_enabled}
			class:active={DiningIn_active}
		><a href={DiningIn_href} on:click={onclick_DiningIn}
		>Dine In</a></li>
  {/if}
</ul>

<style type="text/scss" global>
@import "@menus/css/lib";
.ServiceTypeNav.nav.nav-pills {
	border-top: none;
	border-bottom: none;
	li {
		&.disabled {
			color: $gray-light;
			&:hover {
				color: $gray-light;
				border-color: transparent;
			}
			a {
				&:hover {
					color: $gray-light;
					border-color: transparent;
				}
			}
		}
		a {
			&.previous-route {
				display: flex;
				font-size: 2em;
				div {
					flex-grow: 1;
				}
			}
		}
	}
}
</style>
