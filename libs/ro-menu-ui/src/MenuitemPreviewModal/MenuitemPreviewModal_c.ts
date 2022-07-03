import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import {
	API_PREVIEW_menuoptions_T, API_PREVIEW_menuoptions_b, API_PREVIEW_menuoptionsize_T, API_PREVIEW_menuoptionsize_b,
	RoMenuitemHeading_I
} from '@menus/ro-shared-models'
import { log } from '@menus/util'
import { BaseModalController } from '@menus/modal'
import {
	API_PREVIEW_menuoptions_payload_T, API_PREVIEW_menuoptionsize_payload_T, ro_httpClient_b
} from '@menus/ro-http'
import type { Menuoption_I, Menuoptionsize_I } from '@menus/consumer-menu'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import type {
	MenuitemPreviewModal_close_T, MenuitemPreviewModal_open_T, MenuitemPreviewModal_I
} from './MenuitemPreviewModal_I.js'
const Controller_name = 'MenuitemPreviewModal_c.js'
export class MenuitemPreviewModal_c
	extends BaseModalController<MenuitemPreviewModal_open_T, MenuitemPreviewModal_close_T, ro_menu_ui_Ctx>
	implements MenuitemPreviewModal_I {
	readonly API_PREVIEW_menuoptions:API_PREVIEW_menuoptions_T = API_PREVIEW_menuoptions_b(this.ctx)
	readonly API_PREVIEW_menuoptionsize:API_PREVIEW_menuoptionsize_T = API_PREVIEW_menuoptionsize_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly menuitemPreviewModal$:Writable$<MenuitemPreviewModal_open_T> = writable$(undefined)
	readonly menuoptionsize$:Writable$<Menuoptionsize_I> = writable$(undefined)
	readonly menuoptions$:Writable$<Menuoption_I[]> = writable$([])
	readonly menuoptionsizes$:Writable$<Menuoptionsize_I[]> = writable$(undefined)
	readonly fireFlyID$:Readable$<string> = derived$(this.menuitemPreviewModal$,//region
		(menuitemPreviewModal)=>{
			return menuitemPreviewModal?.fireFlyID
		}
	)//endregion
	readonly ro_menuitem_heading$:Readable$<RoMenuitemHeading_I> = derived$(this.menuitemPreviewModal$,//region
		(menuitemPreviewModal)=>{
			return menuitemPreviewModal?.ro_menuitem_heading
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (menuitemPreviewModal:MenuitemPreviewModal_open_T)=>{
		log(this.ctx, Controller_name, 'init()', menuitemPreviewModal)
		this.menuitemPreviewModal$.$ = menuitemPreviewModal
		this.load_data().then()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')
		try {
			const API_PREVIEW_menuoptionsize_payload:API_PREVIEW_menuoptionsize_payload_T =
				await this.API_PREVIEW_menuoptionsize(
					this.fireFlyID$.$, this.ro_menuitem_heading$.$.MenuItemID
				)
			const menuoptionsizes = API_PREVIEW_menuoptionsize_payload.Data
			this.menuoptionsizes$.$ = menuoptionsizes
			await this.load_menuoptions()
		} catch (err) {
			console.error(err)
		}
	}
	readonly select_menuoptionsize = async (menuoptionsize:Menuoptionsize_I)=>{
		this.busy$.$ = true
		try {
			this.menuoptionsize$.$ = menuoptionsize
			await this.load_menuoptions(menuoptionsize.id)
		} catch (err) {
			console.error(err)
			throw err
		} finally {
			this.busy$.$ = false
		}
	}
	readonly load_menuoptions = async (menuoptionsize_id?:number)=>{
		if (!menuoptionsize_id) {
			for (const menuoptionsize of this.menuoptionsizes$.$) {
				if (menuoptionsize.Is_Default) {
					menuoptionsize_id = menuoptionsize.id
					break
				}
			}
		}
		const API_PREVIEW_menuoptions_payload:API_PREVIEW_menuoptions_payload_T =
			await this.API_PREVIEW_menuoptions(
				this.fireFlyID$.$, this.ro_menuitem_heading$.$.MenuItemID, menuoptionsize_id
			)
		const menuoptions = API_PREVIEW_menuoptions_payload.MenuOptions
		this.menuoptions$.$ = menuoptions
	}
}
