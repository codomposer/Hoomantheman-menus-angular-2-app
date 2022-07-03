import { not } from '@ctx-core/function'
import { tup } from '@ctx-core/array'
import { writable$, derived$, noinit_subscribe, Readable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import type { SelectItem } from '@menus/form'
import type { form_ui_Ctx } from '../form_ui_Ctx.js'
const Controller_name = 'Select_c'
export class Select_c extends BaseController<form_ui_Ctx> {
	readonly disabled$:Writable$<boolean> = writable$(false)
	readonly is_open$:Writable$<boolean> = writable$(false)
	readonly itemLabelProp$:Writable$<string> = writable$(undefined)
	readonly in_items$:Writable$<SelectItem[]> = writable$(undefined)
	readonly multiSelect$:Writable$<boolean> = writable$(false)
	readonly out_items$:Writable$<SelectItem[]> = writable$(undefined)
	readonly readonly$:Writable$<boolean> = writable$(false)
	readonly keywords$:Writable$<string> = writable$('')
	readonly selectedText$:Readable$<string> = derived$(tup(this.in_items$, this.itemLabelProp$, this.multiSelect$),//region
		([in_items, itemLabelProp, multiSelect])=>{
			let selectedText = ''
			const list = (in_items || []).filter(item=>item.is_selected)
			const { length } = list
			if (multiSelect && length) {
				selectedText = `(${length}) `
			}
			for (let i = 0; i < length; i += 1) {
				const item = list[i]
				selectedText += item[itemLabelProp]
				if (i < length - 1) {
					selectedText += ', '
				}
			}
			return selectedText
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] ||= []
		this.ctx[Controller_name].push(this)
		this.unsubscribers.push(
			noinit_subscribe(this.is_open$, this.onchange_is_open),
			noinit_subscribe(this.keywords$, this.onchange_search_text),
		)
	};
	async onDestroy() {
		this.ctx[Controller_name].splice(this.ctx[Controller_name].indexOf(this), 1)
	}
	readonly onchange_is_open = (is_open:boolean)=>{
		if (!is_open) {
			this.keywords$.$ = ''
		}
	}
	readonly toggle_open = ()=>{
		if (!this.disabled$.$) {
			this.is_open$.update(not)
		}
	}
	readonly onclick_item = (item:SelectItem)=>{
		if (this.readonly$.$) return
		item.is_selected = !item.is_selected
		this.in_items$.update(in_items=>{
			if (!this.multiSelect$.$) {
				for (const item of in_items) {
					item.is_selected = false
				}
				item.is_selected = true
			}
			return in_items
		})
		if (this.is_open$.$) {
			this.toggle_open()
		}
		const in_items = this.in_items$.$
		this.out_items$.$ = in_items.slice(0)
		log(this.ctx, Controller_name, 'onclick_item')
	}
	readonly onchange_search_text = (search_text:string)=>{
		this.out_items$.update(out_items=>{
			for (const item of out_items) {
				item.isHidden = !!(
					search_text
					&& !~item[this.itemLabelProp$.$].toLowerCase().indexOf(search_text.toLowerCase()))
			}
			return out_items
		})
	}
	readonly onclickoutside = ()=>{
		this.is_open$.$ = false
		log(this.ctx, Controller_name, 'onclickoutside')
	}
}
