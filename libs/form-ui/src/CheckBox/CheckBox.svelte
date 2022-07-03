<script lang="ts">
import { createEventDispatcher, onDestroy } from 'svelte'
import { writable$ } from '@ctx-core/store'
import { getContext_ui_ctx } from '@menus/ui'
import { validation as validation_directive, ValidationMessages } from '@menus/validation'
import type { form_ui_Ctx } from '../form_ui_Ctx.js'
import type { CheckBox_value_T } from './CheckBox_value_T.js'
export let value:CheckBox_value_T = false, inline = false, toggle = false
export let textAlign = '', text = '', text_bold = false, title = '', disabled = false
export let validation = [], errors = []
const ctx = getContext_ui_ctx() as form_ui_Ctx, dispatch = createEventDispatcher()
const checked$ = writable$(false), in_value$ = writable$<CheckBox_value_T>(null),
	out_value$ = writable$<CheckBox_value_T>(null)
$: $in_value$ = value
const unsubscribe_a = [
	in_value$.subscribe(in_value=>{
		checked$.set(!!in_value)
	}),
	checked$.subscribe(checked=>{
		const in_value = in_value$.$
		if (checked) {
			out_value$.$ = typeof in_value === 'number' ? 1 : true
		} else {
			out_value$.$ = (
				in_value == null
				? in_value
				: (
					typeof in_value === 'number'
					? 0
					: false
				)
			)
		}
	}),
	out_value$.subscribe(out_value=>{
		if (out_value !== in_value$.$) {
			in_value$.set($out_value$)
			value = $out_value$
			dispatch_change()
		}
	})
]
function dispatch_change() {
	dispatch('change', out_value$.$)
}
onDestroy(()=>unsubscribe_a.forEach(unsubscribe=>unsubscribe()))
</script>

<div
	on:click|stopPropagation={evt => $checked$ = !$checked$}
	on:click|stopPropagation={evt => dispatch('click', evt)}
	class="CheckBox {$$props.class||''}"
	class:checkbox={!inline}
	class:checkbox-block={!inline}
	class:checkbox-inline={inline}
	class:label-left={textAlign === 'left'}
	class:toggle-btn={toggle}
	class:disabled
	use:validation_directive={value, validation}
>
	<label>
		<input
			type="checkbox"
			bind:checked={$checked$}
			disabled
			{title}
		/>
		<span class="icon"></span>
		{#if text}
      <span class="text" class:text_bold>{ text }</span>
    {/if}
	</label>
	<ValidationMessages {errors}></ValidationMessages>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.CheckBox {
	// Checkboxes and radios
	//
	// Indent the labels to position radios/checkboxes as hanging controls.
	position: relative;
	margin: 0;
	align-items: center;
	justify-content: flex-start;
	cursor: pointer;
	&.label-left {
		label {
			span.text {
				float: left;
				margin-left: 0;
				margin-right: 10px;
			}
		}
	}
	&.disabled {
		label {
			cursor: $cursor-disabled;
			span.icon {
				opacity: .3;
			}
		}
	}
	// On same line
	&.checkbox-inline {
		position: relative;
		display: inline-block;
		padding-left: 20px;
		margin-bottom: 0;
		font-weight: 400;
		vertical-align: middle;
		cursor: pointer;
		// These are used directly on <label>s
		&.disabled {
			cursor: $cursor-disabled;
		}
		& + &.checkbox-inline {
			margin-top: 0;
			margin-left: 10px; // space out consecutive inline controls
		}
		label {
			margin-bottom: 0;
		}
	}
	&.toggle-btn {
		label {
			span.icon {
				/* <-- style the artificial checkbox */
				width: 44px;
				height: 24px;
				background-image: vurl('/assets/img/shared/toggle-off.svg');
			}
			span.text {
				margin-top: 1px;
				margin-left: 8px;
			}
		}
		[type=checkbox]:checked + span.icon {
			/* <-- style its checked state..with a ticked icon */
			background-image: vurl('/assets/img/shared/toggle-on.svg');
		}
	}
	label {
		min-height: $line-height-computed; // Ensure the input doesn't jump when there is no text
		margin-bottom: 0;
		padding-left: 0;
		font-weight: 400;
		cursor: pointer;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		input {
			display: none;
			/* <-- hide the default checkbox */
		}
		span {
			&.icon {
				/* <-- style the artificial checkbox */
				width: 32px;
				height: 32px;
				background-repeat: no-repeat;
				background-position: 50%;
				/* <-- style the artificial checkbox */
				background-image: vurl('/assets/img/shared/checkbox-off.svg');
			}
			&.text {
				flex: 1;
				&.text_bold {
					font-weight: bold;
				}
			}
		}
		[type=checkbox]:checked + span.icon {
			/* <-- style its checked state..with a ticked icon */
			background-image: vurl('/assets/img/shared/checkbox-on.svg');
		}
	}
	input[type="checkbox"] {
		position: absolute;
		margin-top: 4px \9
	;
		margin-left: -20px;
	}
}
.form-horizontal {
	// Consistent vertical alignment of radios and checkboxes
	//
	// Labels also get some reset styles, but that is scoped to a media query below.
	.CheckBox {
		padding-top: ($padding-base-vertical + 1); // Default padding plus a border
		margin-top: 0;
		margin-bottom: 0;
		// Account for padding we're adding to ensure the alignment and of help text
		// and other content below items
		&.checkbox-block {
			min-height: ($line-height-computed + ($padding-base-vertical + 1));
		}
	}
}
</style>
