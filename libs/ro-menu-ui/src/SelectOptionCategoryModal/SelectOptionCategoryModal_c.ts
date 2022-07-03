import { assign } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { BaseModalController } from '@menus/modal'
import {
	OptionGroupSuggestion, OptionGroupSuggestionDetail, RoMenuoption, RoMenuoptionitem
} from '@menus/ro-shared-models'
import type { SizeDetail } from '@menus/shared-menu'
import { STATUS_SUCCESS } from '@menus/web-config'
import { save_API_MENUS_menuoptionitem_payload_T } from '@menus/ro-http'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { log } from '@menus/util'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { OptionGroupSuggestions$_b } from '../OptionGroupSuggestions$_b.js'
import { ro_menu_ui_save_API_MENUS_menuoption_b } from '../ro_menu_ui_save_API_MENUS_menuoption_b.js'
import { ro_menu_ui_save_API_MENUS_menuoptionitem_b } from '../ro_menu_ui_save_API_MENUS_menuoptionitem_b'
import { selected_ro_menuoption$_b } from '../selected_ro_menuoption$_b.js'
import { ro_menuoptionitems$_b } from '../ro_menuoptionitems$_b.js'
import { ro_menuoptionsizes$_b } from '../ro_menuoptionsizes$_b.js'
import { set_ro_menuoptionitem_Is_Default_b } from '../set_ro_menuoptionitem_Is_Default_b.js'
import { SelectOptionCategoryModal_close_T, SelectOptionCategoryModal_open_T } from './SelectOptionCategoryModal_I.js'
const Controller_name = 'SelectOptionCategoryModal_c'
export class SelectOptionCategoryModal_c
	extends BaseModalController<SelectOptionCategoryModal_open_T, SelectOptionCategoryModal_close_T, ro_menu_ui_Ctx> {
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly OptionGroupSuggestions$ = OptionGroupSuggestions$_b(this.ctx)
	readonly ro_menu_ui_save_API_MENUS_menuoptionitem = ro_menu_ui_save_API_MENUS_menuoptionitem_b(this.ctx)
	readonly selected_ro_menuoption$ = selected_ro_menuoption$_b(this.ctx)
	readonly ro_menuoptionitems$ = ro_menuoptionitems$_b(this.ctx)
	readonly ro_menuoptionsizes$ = ro_menuoptionsizes$_b(this.ctx)
	readonly ro_menu_ui_save_API_MENUS_menuoption = ro_menu_ui_save_API_MENUS_menuoption_b(this.ctx)
	readonly selected_optionGroupSuggestion$:refresh_writable_T<OptionGroupSuggestion> = refresh_writable_(null)
	readonly set_ro_menuoptionitem_Is_Default = set_ro_menuoptionitem_Is_Default_b(this.ctx)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly toggle_optionGroupSuggestion = (selected_optionGroupSuggestion:OptionGroupSuggestion)=>{
		this.deactive_optionGroupSuggestionItem_Details(selected_optionGroupSuggestion)
		if (this.selected_optionGroupSuggestion$.$ === selected_optionGroupSuggestion) {
			this.selected_optionGroupSuggestion$.$ = null
		} else {
			this.selected_optionGroupSuggestion$.$ = selected_optionGroupSuggestion
		}
	}
	readonly toggle_optionGroupSuggestion_detail = (optionGroupSuggestion_detail:OptionGroupSuggestionDetail)=>{
		optionGroupSuggestion_detail.isActive = !optionGroupSuggestion_detail.isActive
		this.selected_optionGroupSuggestion$.refresh()
	}
	readonly save_selected_optionGroupSuggestion = async ()=>{
		const selected_optionGroupSuggestion = this.selected_optionGroupSuggestion$.$
		if (!selected_optionGroupSuggestion) {
			this.notyf_error(`Please choose an option category first.`)
			return
		}
		this.busy$.$ = true
		try {
			const ro_menuoption = new RoMenuoption()
			ro_menuoption.Name = selected_optionGroupSuggestion.Name
			this.selected_ro_menuoption$.$ = ro_menuoption
			const save_API_MENUS_menuoption_payload = await this.ro_menu_ui_save_API_MENUS_menuoption(ro_menuoption)
			if (save_API_MENUS_menuoption_payload.Status === STATUS_SUCCESS) {
				assign(ro_menuoption, save_API_MENUS_menuoption_payload.Data)
				const save_API_MENUS_menuoptionitem_payloads =
					await Promise.all(
						selected_optionGroupSuggestion
							.Details
							.filter(item=>item.isActive)
							.map(item=>{
								const menuoptionitem = new RoMenuoptionitem()
								menuoptionitem.Name = item.Name
								for (const size of this.ro_menuoptionsizes$.$) {
									if (size.ID > 0) {
										menuoptionitem.SizeDetails.push({
											MenuSizeID: size.ID,
											Name: size.Name,
											Price: 0,
											id: 0,
										} as SizeDetail)
									}
								}
								return this.ro_menu_ui_save_API_MENUS_menuoptionitem(ro_menuoption, menuoptionitem)
							})
					) as save_API_MENUS_menuoptionitem_payload_T[]
				log(this.ctx, Controller_name, 'save_selected_optionGroupSuggestion()', save_API_MENUS_menuoptionitem_payloads)
				const ro_menuoptionitems = this.ro_menuoptionitems$.$
				for (const save_API_MENUS_menuoptionitem_payload of save_API_MENUS_menuoptionitem_payloads) {
					if (save_API_MENUS_menuoptionitem_payload.Status === STATUS_SUCCESS) {
						ro_menuoptionitems.push(save_API_MENUS_menuoptionitem_payload.Data)
					}
				}
				this.ro_menuoptionitems$.$ = ro_menuoptionitems
				await this.set_ro_menuoptionitem_Is_Default(ro_menuoption, ro_menuoptionitems[0])
				this.notyf_success(`${ro_menuoption.Name} added successfully.`)
				await this.close()
			} else {
				if (save_API_MENUS_menuoption_payload.Code === 'ERR_NAME_EXIST') {
					this.notyf_error(`${ro_menuoption.Name} already exists, Please try a different name.`)
				} else {
					this.notyf_error(`Unable to save item, Please try later.`)
				}
			}
		} finally {
			this.busy$.$ = false
		}
	}
	private readonly deactive_optionGroupSuggestionItem_Details = (selected_optionGroupSuggestion:OptionGroupSuggestion)=>{
		if (selected_optionGroupSuggestion) {
			for (const item of selected_optionGroupSuggestion.Details) {
				item.isActive = false
			}
		}
	}
}
