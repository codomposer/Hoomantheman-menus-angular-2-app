import { writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { Path } from '@menus/route'
import { API_PREVIEW_preview_b, ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { navigating_goto_b, params_fireFlyID$_b } from '@menus/page'
import type { RoPreviewHeading_I, RoPreviewMasterheading_I, RoPreviewMenuitem_I } from '@menus/ro-shared-models'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import type { MenuSearchBox_itemclicked_evt_I } from './MenuSearchBox_itemclicked_evt_I.js'
const Controller_name = 'MenuSearchBox_c.js'
export class MenuSearchBox_c extends BaseController<ro_menu_ui_Ctx> {
	readonly API_PREVIEW_preview = API_PREVIEW_preview_b(this.ctx)
	readonly click_action$ = writable$<string>(null)
	readonly isOpenACList$:Writable$<boolean> = writable$(false)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_preview_masterheadings$:Writable$<RoPreviewMasterheading_I[]> = writable$([])
	readonly keywords$:Writable$<string> = writable$('')
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly openACList = (isOpen:boolean)=>{
		setTimeout(()=>{
			this.isOpenACList$.$ = isOpen
		}, isOpen ? 0 : 200)
	}
	readonly menussearch_text_Enter = async ()=>{
		this.openACList(true)
		await this.load_autocomplete_masterheadings()
	}
	readonly load_autocomplete_masterheadings = async ()=>{
		const requestData = new RoRequestQuery()
		requestData.ff = this.params_fireFlyID$.$
		requestData.search = this.keywords$.$
		const payload = await this.API_PREVIEW_preview(requestData)
		this.ro_preview_masterheadings$.$ = payload.MasterHeading
	}
	readonly view_ro_preview_masterheading = async (ro_preview_masterheading:RoPreviewMasterheading_I)=>{
		this.openACList(false)
		if (this.click_action$.$ === 'event') {
			this.dispatch('itemclicked', {
				type: 'ro_preview_masterheading',
				ro_preview_masterheading,
			} as MenuSearchBox_itemclicked_evt_I)
		} else {
			await this.navigating_goto([
				`${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
				this.params_fireFlyID$.$,
				Path.RO.MENU_DETAILS,
				ro_preview_masterheading.MasterHeadingID,
			])
		}
	}
	readonly view_ro_preview_heading = async (
		ro_preview_masterheading:RoPreviewMasterheading_I, ro_preview_heading:RoPreviewHeading_I
	)=>{
		this.openACList(false)
		if (this.click_action$.$ === 'event') {
			this.dispatch('itemclicked', {
				type: 'ro_preview_heading',
				ro_preview_masterheading,
				ro_preview_heading,
			} as MenuSearchBox_itemclicked_evt_I)
		} else {
			await this.navigating_goto([
				`${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
				this.params_fireFlyID$.$,
				Path.RO.MENU_DETAILS,
				ro_preview_masterheading.MasterHeadingID,
				Path.RO.CATEGORY_DETAILS,
				ro_preview_heading.HeadingID,
			])
		}
	}
	readonly view_ro_preview_menuitem = async (
		ro_preview_masterheading:RoPreviewMasterheading_I, ro_preview_heading:RoPreviewHeading_I, ro_preview_menuitem:RoPreviewMenuitem_I
	)=>{
		this.openACList(false)
		ro_preview_menuitem = ro_preview_menuitem || ({} as RoPreviewMenuitem_I)
		if (this.click_action$.$ === 'event') {
			this.dispatch('itemclicked', {
				type: 'ro_preview_menuitem',
				ro_preview_masterheading,
				ro_preview_heading,
				ro_preview_menuitem,
			} as MenuSearchBox_itemclicked_evt_I)
		} else {
			await this.navigating_goto([
				`${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
				this.params_fireFlyID$.$,
				Path.RO.MENU_DETAILS,
				ro_preview_masterheading.MasterHeadingID,
				Path.RO.CATEGORY_DETAILS,
				ro_preview_heading.HeadingID,
				Path.RO.MENU_ITEM_DETAILS,
				ro_preview_menuitem.MenuItemID,
			])
		}
	}
}
