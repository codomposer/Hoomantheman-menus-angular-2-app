<script lang="ts">
import { createEventDispatcher } from 'svelte'
export let inline:boolean, disabled:boolean, name:string, text:string, textAlign = '', value:string, group:string
const dispatch = createEventDispatcher()
</script>

<div
	class="Radio"
	class:radio={!inline}
	class:radio-block={!inline}
	class:radio-inline={inline}
	class:label-left={textAlign === 'left'}
	class:disabled={disabled}
>
	<label>
		<input
			type="radio"
			{name}
			{value}
			bind:group
			on:change={evt => dispatch('change', evt)}
			{disabled}
		/>
		<span class="icon"></span>
		{#if text}
			<span class="text">{ text }</span>
		{/if}
	</label>
</div>

<style type=text/scss global>
@import "@menus/css/lib";
.Radio {
	// Checkboxes and radios
	//
	// Indent the labels to position radios/checkboxes as hanging controls.
	position: relative;
	display: block;
	margin: 0;
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
	&.radio-inline {
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
		& + &.radio-inline {
			margin-top: 0;
			margin-left: 10px; // space out consecutive inline controls
		}
		label {
			margin-bottom: 0;
		}
	}
	label {
		min-height: $line-height-computed; // Ensure the input doesn't jump when there is no text
		margin-bottom: 0;
		padding-left: 0;
		font-weight: 400;
		cursor: pointer;
		input {
			display: none;
			/* <-- hide the default checkbox */
		}
		span {
			&.icon {
				/* <-- style the artificial checkbox */
				display: inline-block;
				width: 32px;
				height: 32px;
				background-repeat: no-repeat;
				background-position: 50%;
				background-image: vurl('/assets/img/shared/radio-off.svg');
			}
			&.text {
				float: right;
			}
		}
		[type=radio]:checked + span.icon {
			/* <-- style its checked state..with a ticked icon */
			background-image: vurl('/assets/img/shared/radio-on.svg');
		}
	}
	input[type="radio"] {
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
	.Radio {
		padding-top: ($padding-base-vertical + 1); // Default padding plus a border
		margin-top: 0;
		margin-bottom: 0;
		// Account for padding we're adding to ensure the alignment and of help text
		// and other content below items
		&.radio-block {
			min-height: ($line-height-computed + ($padding-base-vertical + 1));
		}
	}
}
</style>
