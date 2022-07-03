import { tup } from '@ctx-core/array'
import { derived$, Readable$, subscribe } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { consume_page_data$_b } from '@menus/page'
import { restaurant_MenuoptionsModal$_b, } from '../restaurant_MenuoptionsModal$_b.js'
import { restaurant_search_text$_b } from '../restaurant_search_text$_b.js'
import { filtered_headings$_b } from '../filtered_headings$_b.js'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
const Controller_name = 'Restaurant_Menuitems_Filter_c'
export class Restaurant_Menuitems_Filter_c extends BaseController<restaurant_ui_Ctx> {
	readonly consume_page_data$ = consume_page_data$_b(this.ctx)
	readonly filtered_headings$ = filtered_headings$_b(this.ctx)
	readonly restaurant_search_text$ = restaurant_search_text$_b(this.ctx)
	readonly restaurant_MenuoptionsModal$ = restaurant_MenuoptionsModal$_b(this.ctx)
	readonly no_result$:Readable$<boolean> = derived$(tup(this.restaurant_search_text$, this.filtered_headings$),//region
		([restaurant_search_text, filtered_headings])=>{
			return !!restaurant_search_text && !filtered_headings?.length
		})//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		const page_data = this.consume_page_data$()
		if (page_data?.menuitem) {
			const unsubscribe_MenuoptionsModal =
				subscribe(this.restaurant_MenuoptionsModal$, restaurant_MenuoptionsModal=>{
					if (restaurant_MenuoptionsModal) {
						restaurant_MenuoptionsModal.open(page_data.menuitem)
						unsubscribe_MenuoptionsModal()
					}
				})
			this.unsubscribers.push(unsubscribe_MenuoptionsModal)
		}
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
}
