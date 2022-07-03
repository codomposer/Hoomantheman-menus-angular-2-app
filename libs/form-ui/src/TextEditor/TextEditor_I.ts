import type { SvelteComponentTyped } from 'svelte'
import type { TextEditor_text_change_event_T } from './TextEditor_text_change_event_T.js'
import type { TextEditor_c } from './TextEditor_c.js'
export interface TextEditor_I extends SvelteComponentTyped<{
	placeholder:string
	value:string
}, {
	'text-change':CustomEvent<TextEditor_text_change_event_T>
}> {
	_:TextEditor_c
}
