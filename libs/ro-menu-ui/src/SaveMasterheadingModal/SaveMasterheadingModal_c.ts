import { assign } from '@ctx-core/object'
import { derived$, Readable$, Writable$, writable$ } from '@ctx-core/store'
import { RoMasterheading, RoMasterheading_I } from '@menus/ro-shared-models'
import { BaseModalController } from '@menus/modal'
import { deep_clone, log } from '@menus/util'
import { STATUS_SUCCESS } from '@menus/web-config'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { ro_httpClient_b, saveMasterheading_data_T } from '@menus/ro-http'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import type { SaveMasterheadingModal_additem_evt_detail_T } from './SaveMasterheadingModal_additem_evt_T.js'
import type {
	SaveMasterheadingModal_close_T, SaveMasterheadingModal_open_T, SaveMasterheadingModal_I
} from './SaveMasterheadingModal_I.js'
const Controller_name = 'SaveMasterheadingModal_c'
export class SaveMasterheadingModal_c
	extends BaseModalController<SaveMasterheadingModal_open_T, SaveMasterheadingModal_close_T, ro_menu_ui_Ctx>
	implements SaveMasterheadingModal_I {
	private in_ro_masterheading:RoMasterheading_I // Will keeps reference to original object
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly fireFlyID$:Writable$<string> = writable$(null)
	readonly ro_masterheading$:Writable$<RoMasterheading_I> = writable$(null)
	readonly masterheading_is_new$:Readable$<boolean> = derived$(this.ro_masterheading$,//region
		($masterheading:RoMasterheading_I)=>{
			return !($masterheading?.ID > 0)
		})//endregion
	readonly before_open_modal = async (data:SaveMasterheadingModal_open_T)=>{
		this.fireFlyID$.$ = data.fireFlyID
		if (data.ro_masterheading) {
			this.in_ro_masterheading = data.ro_masterheading
			this.ro_masterheading$.$ = deep_clone(this.in_ro_masterheading)
		} else {
			this.ro_masterheading$.$ = new RoMasterheading()
		}
	}
	readonly save = async ()=>{
		this.busy$.$ = true
		try {
			const data = {
				fireFlyID: this.fireFlyID$.$,
				ro_masterheading: this.ro_masterheading$.$
			} as saveMasterheading_data_T
			const payload = await this.ro_httpClient.save_API_MENUS_masterheading(data)
			if (payload.Status === STATUS_SUCCESS) {
				const masterheading_is_new = this.masterheading_is_new$.$
				if (masterheading_is_new) {
					const masterheading:RoMasterheading_I = payload.Data
					this.in_ro_masterheading = masterheading
					this.ro_masterheading$.$ = deep_clone(this.in_ro_masterheading)
					this.dispatch('additem', masterheading as SaveMasterheadingModal_additem_evt_detail_T)
				} else {
					assign(this.in_ro_masterheading, this.ro_masterheading$.$)
				}
				this.notyf_success(`${this.ro_masterheading$.$.Name} ${masterheading_is_new ? 'added' : 'updated'} successfully.`)
			} else {
				this.notyf_error('Unable to save item, Please try later.')
			}
			this.close(this.ro_masterheading$.$).then()
			log(this.ctx, Controller_name, 'save', payload)
		} finally {
			this.busy$.$ = false
		}
	}
}
