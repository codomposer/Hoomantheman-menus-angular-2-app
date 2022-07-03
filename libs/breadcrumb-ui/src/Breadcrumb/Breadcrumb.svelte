<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { is_last_ } from '@menus/array'
import { is_navigating_onclick_b } from '@menus/page'
import { getContext_ui_ctx } from '@menus/ui'
import type { breadcrumb_ui_Ctx } from '../breadcrumb_ui_Ctx.js'
import { Breadcrumb_c } from './Breadcrumb_c.js'
export let prefix = ''
const ctx = getContext_ui_ctx() as breadcrumb_ui_Ctx
const is_navigating_onclick = is_navigating_onclick_b(ctx)
export const _ = new Breadcrumb_c(ctx)
const { breadcrumb_url_a$, friendly_name_a$, prefix$ } = _
$: prefix$.$ = prefix || ''
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<ul class="breadcrumb">
  {#each $breadcrumb_url_a$ || [] as url,idx}
    <li class="breadcrumb-item" class:active={is_last_($breadcrumb_url_a$, idx)}>
      {#if !is_last_($breadcrumb_url_a$, idx)}
        <a href={ url } on:click={is_navigating_onclick}>{$friendly_name_a$[idx]}</a>
      {:else}
        <span>{$friendly_name_a$[idx]}</span>
      {/if}
    </li>
  {/each}
</ul>

<style type=text/scss>
</style>
