import { noinit_subscribe, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import type { pagination_ui_Ctx } from '../pagination_ui_Ctx.js'
import type { Pagination_change_I } from './Pagination_T.js'
const Controller_name = 'Pagination_c.js'
export class Pagination_c extends BaseController<pagination_ui_Ctx> {
	readonly in_page$:Writable$<string|number> = writable$(null)
	readonly out_page$:Writable$<number> = writable$(null)
	readonly in_pageSize$:Writable$<string|number> = writable$(null)
	readonly out_pageSize$:Writable$<number> = writable$(null)
	readonly TotalPages$:Writable$<number> = writable$(null)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			noinit_subscribe(this.out_page$,
				()=>this.dispatch_changepage()
			),
			noinit_subscribe(this.in_pageSize$, this.changepagesize),
		)
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly changepage = (add_page:number)=>{
		const out_page = parseInt(this.in_page$.$ as string) + add_page
		if (out_page > 0 && out_page <= this.TotalPages$.$) {
			this.out_page$.$ = out_page
			this.dispatch_changepage()
		}
		log(this.ctx, Controller_name, 'changepage', add_page, out_page, this.in_page$.$)
	}
	readonly first_changepage = ()=>{
		const out_page = 1
		if (out_page !== this.in_page$.$) {
			this.out_page$.$ = out_page
			this.dispatch_changepage()
		}
	}
	readonly last_changepage = ()=>{
		const out_page = this.TotalPages$.$
		if (out_page !== this.in_page$.$) {
			this.out_page$.$ = out_page
			this.dispatch_changepage()
		}
	}
	readonly changepagesize = ()=>{
		const $page = 1
		this.in_page$.$ = $page
		this.out_page$.$ = $page
		this.dispatch_changepage()
	}
	readonly dispatch_changepage = ()=>{
		return this.dispatch('changepagesize', this._Pagination_change())
	}
	readonly _Pagination_change = ()=>{
		return {
			page: this.out_page$.$,
			pageSize: this.out_pageSize$.$,
		} as Pagination_change_I
	}
}
