<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import type { DateOption } from 'flatpickr/dist/types/options'
import { Flatpickr } from '@menus/flatpickr'
import { getContext_ui_ctx } from '@menus/ui'
import type { validation_args_T } from '@menus/validation'
import { errors_, validation as validation_directive, ValidationMessages } from '@menus/validation'
import type { form_ui_Ctx } from '../form_ui_Ctx.js'
import { DateTime_c } from './DateTime_c.js'
export let id = '', disabled = false, value:Date|string|number|DateOption[] = '', options,
	validation:validation_args_T = []
const ctx = getContext_ui_ctx() as form_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new DateTime_c(ctx, dispatch)
const { in_value$, out_value$, in_options$, out_options$, in_datetime$ } = _
export const { clear } = _
export let errors = []
let datetime:HTMLInputElement
$: _.disabled$.$ = disabled
$: in_value$.set(value)
$: out_value$.set(value)
$: in_datetime$.set(datetime)
$: in_options$.set(options || {})
$: {
	if ($in_value$ !== $out_value$) {
		value = $out_value$
	}
}
$: errors = errors_(validation, value)
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<div {id} class="DateTime form-group"
		 on:click={evt=>_.onclick_datetime(evt)}
		 class:has-error={errors.length}
>
	<Flatpickr>
		<input bind:this={datetime}
					 type="text" class="form-control" {disabled}
					 bind:value
					 use:validation_directive={value, validation}
					 on:errors={evt => errors = evt.detail}
		/>
		<ValidationMessages {errors} input_tooltip={true}></ValidationMessages>
	</Flatpickr>
	{#if !$out_options$.hide_clear}
    <div class="clear" title="clear" on:click|preventDefault|stopPropagation={evt => clear()}
		>&times;</div>
  {/if}
</div>

<style type=text/scss global>
.DateTime {
	position: relative;
	margin-bottom: 0;
	cursor: text;
	.help-block {
		&[hidden] {
			visibility: hidden;
		}
	}
	.clear {
		position: absolute;
		top: 0px;
		right: 1px;
		z-index: 1;
		font-size: 16px;
		padding: 0 6px;
		cursor: pointer;
	}
}
</style>
