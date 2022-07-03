<script lang="ts">
import { createEventDispatcher, onMount, onDestroy } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { is_filters_opened$_b, toggle_filters_opened_b } from '@menus/filters-common'
import { filters_changed_count$_b, is_filters_changed$_b } from '@menus/filters'
import type { consumer_search_ui_Ctx } from '../consumer_search_ui_Ctx.js'
import { SearchParams_c } from './SearchParams_c.js'
const ctx = getContext_ui_ctx() as consumer_search_ui_Ctx
const dispatch = createEventDispatcher()
const is_filters_changed = is_filters_changed$_b(ctx)
const is_filters_opened = is_filters_opened$_b(ctx)
const filters_changed_count = filters_changed_count$_b(ctx)
const toggle_filters_opened = toggle_filters_opened_b(ctx)
export const _ = new SearchParams_c(ctx, dispatch)
export let value = ''
let input
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div class="SearchParams section-title">
  <div
		class="left-icon"
		class:funnel-icon={!$is_filters_opened}
		class:funnel-on-icon={$is_filters_opened}
		on:click={toggle_filters_opened}
	>
    {#if $is_filters_changed}
      <div class="count">{ $filters_changed_count }</div>
    {/if}
  </div>
  <div class="body">
    <input
			bind:this={input}
			type="text" class="form-control clearable search-input"
			placeholder="What's your craving?"
			autocomplete="disable"
			bind:value={value}
			on:focus={evt => dispatch('focus', evt)}
			on:blur={evt => dispatch('blur', evt)}
			on:keyup={_.onkeyup} on:keydown={_.onkeydown}
		/>
      <div
				class="clear-button"
				class:visible={value}
				on:click={evt => value = ''}
				on:click={evt => input.focus}
				on:click={_.onclick_button}
			>
        <div class="close-1-icon icon-custom"></div>
      </div>
  </div>
  <button class="btn btn-lg btn-success search-white-icon" on:click={_.onclick_button}></button>
</div>

<style type="text/scss" global>
@import "@menus/consumer-shared-css/lib";
.SearchParams.section-title {
	position: relative;
	display: flex;
	flex-direction: row;
	min-width: 200px;
	font-weight: $lato-black;
	font-size: 18px;
	.left-icon {
		position: relative;
		height: $input-height-base;
		width: $input-height-base;
		background-color: white;
		background-size: 24px 24px;

		@media (max-width: $screen-xs-max) {
			height: $input-height-base;
			width: $input-height-base;
		}

		.count {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			width: 100%;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin-top: 10px;
			margin-left: 10px;
			font-size: 12px;
			color: #263238;
			font-weight: $lato-bold;
		}
	}
	.body {
		flex-grow: 1;
		position: relative;
		input.form-control {
			border: none;

			@media (max-width: $screen-xs-max) {
				height: $input-height-base;
			}

			&:focus {
				outline: none;
			}
		}
	}
	button {
		height: $input-height-base;
		border-radius: 0;
		background-size: unset;
		min-width: 96px;

		@media (max-width: $screen-xs-max) {
			height: $input-height-base;
		}
		@media (max-width: $screen-md-max) {
			width: 72px;
			min-width: 72px;
		}
	}
}
</style>
