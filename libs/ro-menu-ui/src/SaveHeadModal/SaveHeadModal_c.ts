import { deep_clone } from '@ctx-core/object'
import { writable$, derived$, Readable$, Writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import { STATUS_SUCCESS } from '@menus/web-config'
import { log, merge } from '@menus/util'
import { RoHeading_I, RoHeading } from '@menus/ro-shared-models'
import { ro_httpClient_b } from '@menus/ro-http'
import { notyf_error_b } from '@menus/notyf'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import type { SaveHeadModal_close_T, SaveHeadModal_open_T, SaveHeadModal_I, } from './SaveHeadModal_I.js'
const Controller_name = 'SaveHeadModal_c'
export class SaveHeadModal_c
	extends BaseModalController<SaveHeadModal_open_T, SaveHeadModal_close_T, ro_menu_ui_Ctx>
	implements SaveHeadModal_I {
	fireFlyID:string
	MasterheadingID:number
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly head$:Writable$<RoHeading_I> = writable$(null)
	readonly isNewHead$ = derived$(this.head$,//region
		(head)=>{
			return !head?.ID
		}) as Readable$<boolean>//endregion
	ro_head:RoHeading_I // Will keeps reference to original object
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (data:SaveHeadModal_open_T)=>{
		const { fireFlyID, MasterheadingID, head } = data
		this.fireFlyID = fireFlyID
		this.MasterheadingID = MasterheadingID
		if (head) {
			this.ro_head = head
			this.head$.$ = deep_clone(head)
		} else {
			this.head$.$ = new RoHeading()
		}
	}
	readonly save = async (form)=>{
		log(this.ctx, Controller_name, 'save', form)
		this.busy$.$ = true
		try {
			const payload = await this.ro_httpClient.save_API_MENUS_heading({
				fireFlyID: this.fireFlyID,
				MasterheadingID: this.MasterheadingID,
				head: this.head$.$,
			})
			if (payload.Status === STATUS_SUCCESS) {
				if (this.isNewHead$.$) {
					const head = payload.Data
					this.dispatch('additem', head)
				} else {
					merge(this.ro_head, this.head$.$ as RoHeading_I)
				}
				await this.close(true)
			} else {
				this.notyf_error('Sorry, Unable to save item')
			}
			log(this.ctx, Controller_name, 'save', payload)
		} finally {
			this.busy$.$ = false
		}
	}
}
