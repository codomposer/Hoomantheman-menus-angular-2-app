<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { clickoutside } from '@menus/dom'
import { getContext_ui_ctx } from '@menus/ui'
import type { errors__T } from '@menus/validation'
import { errors_2, ValidationMessages } from '@menus/validation'
import { CheckBox } from '../CheckBox/index.js'
import type { form_ui_Ctx } from '../form_ui_Ctx.js'
import { Select_c } from './Select_c.js'
export let id = '', validation = [], theme = '', errors = [], items = [], itemLabelProp = 'label', disabled = false,
	is_open = false, multiSelect = false, placeholder = '', readonly = false
let errors_:errors__T
$: errors_ = errors_2(validation)
const ctx = getContext_ui_ctx() as form_ui_Ctx
export const _ = new Select_c(ctx)
const { is_open$, in_items$, out_items$, multiSelect$, keywords$, selectedText$, } = _
$: is_open = $is_open$
$: placeholder = placeholder ? placeholder : `Select item${$multiSelect$ ? '(s)' : ''}`
$: _.disabled$.$ = disabled
$: _.readonly$.$ = readonly
$: _.in_items$.$ = items
$: _.out_items$.$ = items
$: if ($in_items$ !== $out_items$) items = $out_items$
$: errors = errors_(items)
$: _.itemLabelProp$.$ = itemLabelProp
$: _.multiSelect$.$ = multiSelect
let root:HTMLDivElement
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div
	{id} bind:this={root}
	use:clickoutside={_.onclickoutside}
	class="Select select-btn-group-container"
	class:disabled
>
  <div class="btn-group select-btn-group"
			 class:single-select={!$multiSelect$}
			 class:theme-dark={theme === 'dark'}
	>
    <button type="button" class="btn btn-default btn-xlg dropdown-toggle"
						class:has-error={errors.length}
						class:disabled
						on:click={_.toggle_open}
		>
      <div class="placeholder-text text-overflow">{ $selectedText$ || placeholder }</div>
      <span class="caret"></span>
    </button>
		{#if is_open}
      <ul class="dropdown-menu search-section d-block">
        <li>
          <div class="form-group">
            <input class="form-control input-sm" type="text" placeholder="Search..."
									 name="$keywords$"
									 bind:value={$keywords$}
									 autocomplete="off"
						>
          </div>
        </li>
      </ul>
      <ul class="dropdown-menu list-section d-block">
        {#each $out_items$ || [] as item}
          <li hidden={item.isHidden}
							class:active={!$multiSelect$ && item.is_selected}
							class:disabled={readonly}
							on:click={evt => _.onclick_item(item)}
					>
            <a href="." on:click|preventDefault>
              {#if $multiSelect$}
                <CheckBox inline={true} disabled={readonly} bind:value={item.is_selected}></CheckBox>
              {/if}
							{ item[itemLabelProp] }
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  <ValidationMessages {errors}></ValidationMessages>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.select-btn-group-container {
	.disabled {
		opacity: 1;
		background-color: #eeeeee;
	}
	.btn-group.select-btn-group {
		width: 100%;
		.btn {
			width: 100%;
			padding: 0 8px;
			border-radius: 4px;
			border-width: 1px;
			font-weight: normal;
			min-width: auto;
			text-align: left;
			&.has-error {
				border-color: $brand-danger;
			}
			.placeholder-text {
				float: left;
				width: 90%;
			}
			.caret {
				float: right;
				margin-top: 20px;
			}
		}
		.dropdown-menu {
			display: block;
			width: 100%;
			max-height: 300px;
			overflow-y: auto;
			margin-top: 0;
			box-shadow: none;
			&.search-section {
				border-bottom: none;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
			&.list-section {
				margin-top: 67px;
				border-top: none;
				border-top-left-radius: 0;
				border-top-right-radius: 0;
			}
			.form-group {
				margin: 8px 16px;
			}
			> li {
				.checkbox-inline {
					margin-top: 4px;
					padding-left: 0;
					padding-right: 8px;
				}
				> a {
					padding-top: 10px;
					padding-bottom: 10px;
				}
			}
		}
		/* Single Select */
		&.single-select {
			.dropdown-menu {
				> li {
					> a {
						&:hover {
							background-color: $brand-success;
							color: white;
						}
					}
				}
			}
		}
		/* Theme Dark */
		&.theme-dark {
			.btn {
				background: rgba(255, 255, 255, 0.10);
				color: rgba(255, 255, 255, 0.5);
				border-color: transparent;
				border: 1px solid $brand-success;
			}
		}
	}
}
</style>
