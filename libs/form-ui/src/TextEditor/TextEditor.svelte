<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { getContext_ui_ctx } from '@menus/ui'
import { EnsureFontAwesome } from '@menus/font-awesome'
import type { form_ui_Ctx } from '../form_ui_Ctx.js'
import { TextEditor_c } from './TextEditor_c.js'
export let placeholder = 'Enter your text.', value:string, id:string
const ctx = getContext_ui_ctx() as form_ui_Ctx, dispatch = createEventDispatcher()
export const _ = new TextEditor_c(ctx, dispatch)
const { in_value$, out_value$, text_editor$, toolbar$ } = _
_.in_value$.$ = value
_.out_value$.$ = value
$: _.id$.$ = id
$: _.placeholder$.$ = placeholder
$: _.in_value$.$ = value
$: {
	if ($out_value$ !== $in_value$) {
		value = $out_value$
	}
}
onMount(()=>_.onMount())
onDestroy(()=>_.onDestroy())
</script>

<EnsureFontAwesome></EnsureFontAwesome>
<div class="TextEditor" {id}>
  <div class="toolbar" bind:this={$toolbar$}>
		<!--<span class="icon-group">
			<select class="ql-font"></select>
			<select class="ql-size"></select>
		</span>-->
    <span class="icon-group">
			<button class="fa fa-bold" on:click={evt => _.execCommand('bold')}></button>
			<!--<button class="ql-italic"></button>-->
			<button class="fa fa-underline" on:click={evt => _.execCommand('underline')}></button>
			<button class="fa fa-strikethrough" on:click={evt => _.execCommand('strikeThrough')}></button>
		</span>
		<!--<span class="icon-group">
			<select class="ql-color"></select>
			<select class="ql-background"></select>
		</span>-->
    <span class="icon-group">
			<button class="fa fa-subscript" value="sub" on:click={evt => _.execCommand('subscript')}></button>
			<button class="fa fa-superscript" value="super" on:click={evt => _.execCommand('superscript')}></button>
		</span>
    <span class="icon-group">
			<button class="h1-icon" value="1" on:click={evt => _.execCommand('heading', '1')}></button>
			<button class="h2-icon" value="2" on:click={evt => _.execCommand('heading', '2')}></button>
			<button class="fa fa-quote-right" on:click={evt => _.execCommand('formatBlock', 'blockquote')}></button>
			<!--<button class="ql-code-block"></button>-->
		</span>
		<!--<span class="icon-group">
			<button class="ql-list" value="ordered"></button>
			<button class="ql-list" value="bullet"></button>
			<button class="ql-indent" value="-1"></button>
			<button class="ql-indent" value="+1"></button>
		</span>-->
		<!--<span class="icon-group">
			<button class="ql-direction" value="rtl"></button>
			<select class="ql-align"></select>
		</span>-->
    <span class="icon-group">
			<button class="fa fa-link" on:click={evt => _.createLink()}></button>
			<button class="fa fa-image" on:click={evt => _.insertImage()}></button>
			<!--<button class="ql-video"></button>
			<button class="ql-formula"></button>-->
		</span>
    <span class="icon-group">
			<button class="clean-icon"></button>
		</span>
  </div>
  <div class="text-editor"
			 contenteditable="true"
			 bind:this={$text_editor$}
			 bind:innerHTML={value}></div>
</div>

<style type=text/scss>
@import "@menus/css/lib";
.TextEditor {
	.toolbar {
		padding: 0 8px;
		border: 1px solid $gray-light;
		.icon-group {
			margin-right: 15px;
			display: inline-block;
			overflow: hidden;
			button {
				height: 28px;
				width: 24px;
				padding: 5px 3px;
				background: no-repeat center transparent;
				background-size: 18px 18px;
				border: none;
				&.h1-icon {
					background-image: url(/assets/img/shared/h1.svg);
				}
				&.h2-icon {
					background-image: url(/assets/img/shared/h2.svg);
				}
				&.clean-icon {
					background-image: url(/assets/img/shared/clean.svg);
				}
			}
		}
	}
	.text-editor {
		height: 375px;
		padding: 12px;
		border: 1px solid $gray-light;
		border-top: none;
		overflow: auto;
	}
}
</style>
