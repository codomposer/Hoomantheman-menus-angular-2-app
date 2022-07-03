import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { timeout_ms } from '@menus/web-config'
import type { form_ui_Ctx } from '../form_ui_Ctx.js'
const Controller_name = 'TextEditor_c'
export class TextEditor_c extends BaseController<form_ui_Ctx> {
	readonly toolbar$:Writable$<HTMLDivElement> = writable$(null)
	readonly placeholder$:Writable$<string> = writable$(null)
	readonly id$ = writable$<string>(null)
	readonly in_value$:Writable$<string> = writable$('')
	readonly out_value$:Writable$<string> = writable$('')
	readonly text_editor$:Writable$<HTMLDivElement> = writable$(null)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] ||= []
		this.ctx[Controller_name].push(this)
		await subscribe_wait_timeout(this.text_editor$, I, timeout_ms)
	}
	async onDestroy() {
		this.ctx[Controller_name].splice(this.ctx[Controller_name].indexOf(this), 1)
		await super.onDestroy()
	}
	readonly execCommand = (commandId:commandId_T, value?:string)=>{
		document.execCommand(commandId, null, value)
	}
	readonly createLink = ()=>{
		const url = prompt('Enter a URL:', 'http://')
		this.execCommand('createLink', url)
	}
	readonly insertImage = ()=>{
		const url = prompt('Enter a URL:', 'http://')
		this.execCommand('insertImage', url)
	}
}
export type commandId_T =
	'backColor'
	|'bold'
	|'ClearAuthenticationCache'
	|'contentReadOnly'
	|'copy'
	|'createLink'
	|'cut'
	|'decreaseFontSize'
	|'defaultParagraphSeparator'
	|'delete'
	|'enableAbsolutePositionEditor'
	|'enableInlineTableEditing'
	|'enableObjectResizing'
	|'fontName'
	|'fontSize'
	|'foreColor'
	|'formatBlock'
	|'forwardDelete'
	|'heading'
	|'hiliteColor'
	|'increaseFontSize'
	|'indent'
	|'insertBrOnReturn'
	|'insertHorizontalRule'
	|'insertHTML'
	|'insertImage'
	|'insertOrderedList'
	|'insertUnorderedList'
	|'insertParagraph'
	|'insertText'
	|'italic'
	|'justifyCenter'
	|'justifyFull'
	|'justifyLeft'
	|'justifyRight'
	|'outdent'
	|'paste'
	|'redo'
	|'removeFormat'
	|'selectAll'
	|'strikeThrough'
	|'subscript'
	|'superscript'
	|'underline'
	|'undo'
	|'unlink'
	|'useCSS '
	|'styleWithCSS'
