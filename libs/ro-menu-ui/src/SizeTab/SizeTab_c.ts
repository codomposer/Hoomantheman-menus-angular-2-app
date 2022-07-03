import { idx_sort_a_, tup } from '@ctx-core/array'
import { I } from '@ctx-core/combinators'
import { assign, deep_clone } from '@ctx-core/object'
import { writable$, derived$, Readable$, subscribe_wait_timeout, Writable$ } from '@ctx-core/store'
import type { Sortable_itemclick_evt_T, Sortable_sort_evt_T } from '@menus/dnd'
import type { CheckBox_change_evt_T } from '@menus/form-ui'
import { notyf_error_b } from '@menus/notyf'
import { params_fireFlyID$_b } from '@menus/page'
import { ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { RoMenuoptionsize_I, set_list_SortID } from '@menus/ro-shared-models'
import { SORT_ERROR_MSG } from '@menus/sort-shared'
import { confirmModal$_b } from '@menus/shared-ui'
import { BaseController } from '@menus/shared-ui-lib'
import { refresh_writable_ } from '@menus/store'
import { is_new_o_, log } from '@menus/util'
import { STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
import { lookup_ro_menuoptionsizes$_b } from '../lookup_ro_menuoptionsizes$_b.js'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menuitem$_b } from '../ro_menuitem$_b.js'
import { ro_menuoptionsizes$_b, ro_menuoptionsizes$_T } from '../ro_menuoptionsizes$_b.js'
import { create_ro_menuoptionsize_b } from './create_ro_menuoptionsize_b.js'
import { edit_ro_menuoptionsize_b } from './edit_ro_menuoptionsize_b.js'
import { isOpen_lookup_ro_menuoptionsizes_section$_b } from './isOpen_lookup_ro_menuoptionsizes_section$_b.js'
import { menuoptionsize_edit_a$_b } from './menuoptionsize_edit_a$_b.js'
import { toggle_isOpen_lookup_ro_menuoptionsizes_section_b } from './toggle_isOpen_lookup_ro_menuoptionsizes_section_b.js'
const Controller_name = 'SizeTab_c'
export class SizeTab_c extends BaseController<ro_menu_ui_Ctx> {
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly create_ro_menuoptionsize = create_ro_menuoptionsize_b(this.ctx)
	readonly in_edit_ro_menuoptionsize = edit_ro_menuoptionsize_b(this.ctx)
	readonly isOpen_lookup_ro_menuoptionsizes_section$ = isOpen_lookup_ro_menuoptionsizes_section$_b(this.ctx)
	readonly lookup_ro_menuoptionsizes$ = lookup_ro_menuoptionsizes$_b(this.ctx)
	readonly menuoptionsize_busy_a$ = refresh_writable_<boolean[]>([])
	readonly menuoptionsize_edit_a$ = menuoptionsize_edit_a$_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_menuitem$ = ro_menuitem$_b(this.ctx)
	readonly ro_menuoptionsizes$:ro_menuoptionsizes$_T = ro_menuoptionsizes$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly toggle_isOpen_lookup_ro_menuoptionsizes_section = toggle_isOpen_lookup_ro_menuoptionsizes_section_b(this.ctx)
	readonly available_lookup_ro_menuoptionsizes$:Readable$<RoMenuoptionsize_I[]> = derived$(
		tup(this.lookup_ro_menuoptionsizes$, this.ro_menuoptionsizes$),
		([lookup_ro_menuoptionsizes, ro_menuoptionsizes])=>{
			return lookup_ro_menuoptionsizes?.filter(
				lookup_Menuoptionsize_I=>
					ro_menuoptionsizes
					&& (
						!~ro_menuoptionsizes.map(
							Menuoptionsize_I=>Menuoptionsize_I.Name
						).indexOf(lookup_Menuoptionsize_I.Name)
					)
			)
		}
	)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.load_data().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		await Promise.all([
			subscribe_wait_timeout(this.lookup_ro_menuoptionsizes$, I, timeout_ms),
			subscribe_wait_timeout(this.ro_menuitem$, I, timeout_ms),
			subscribe_wait_timeout(this.ro_menuoptionsizes$, I, timeout_ms),
		])
	}
	readonly edit_ro_menuoptionsize = (Menuoptionsize:RoMenuoptionsize_I, index:number)=>{
		const { menuoptionsize_edit_a$ } = this
		menuoptionsize_edit_a$.$[index] = true
		menuoptionsize_edit_a$.refresh()
		return this.in_edit_ro_menuoptionsize(Menuoptionsize)
	}
	readonly onsort_menuoptionsizes = async (evt:Sortable_sort_evt_T<RoMenuoptionsize_I[]>)=>{
		const {
			out_list: ro_menuoptionsizes,
			sort_idx_a,
		} = evt.detail
		log(this.ctx, Controller_name, 'onsort_menuoptionsizes', evt, ro_menuoptionsizes)
		const rollback_value = this.ro_menuoptionsizes$.$
		const rollback = ()=>{
			this.notyf_error(SORT_ERROR_MSG)
			this.ro_menuoptionsizes$.$ = rollback_value
		}
		set_list_SortID(ro_menuoptionsizes)
		this.ro_menuoptionsizes$.$ = ro_menuoptionsizes
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
			const body = { SortDetails: [] }
			for (const ro_menuoptionsize of this.ro_menuoptionsizes$.$) {
				if (ro_menuoptionsize.ID > 0) {
					body.SortDetails.push({
						ID: ro_menuoptionsize.ID,
						SortID: ro_menuoptionsize.SortID,
					})
				}
			}
			const payload = await this.ro_httpClient.API_MENUS_menusize_sort(requestData, body)
			if (payload.Status === 'success') {
				this.menuoptionsize_busy_a$.$ = idx_sort_a_(this.menuoptionsize_busy_a$.$, sort_idx_a)
				this.menuoptionsize_edit_a$.$ = idx_sort_a_(this.menuoptionsize_edit_a$.$, sort_idx_a)
			} else {
				rollback()
			}
			log(this.ctx, Controller_name, 'API_MENUS_menusize_sort', payload)
		} catch (err) {
			rollback()
			throw err
		}
	}
	readonly onitemclick_menuoptionsizes = async (evt:Sortable_itemclick_evt_T<RoMenuoptionsize_I>)=>{
		this.edit_ro_menuoptionsize(evt.detail.item, evt.detail.index)
	}
	readonly cancel_menuoptionsize = (ro_menuoptionsize:RoMenuoptionsize_I, index:number)=>{
		const { previous_Is_Default_ro_menuoptionsize } = ro_menuoptionsize
		if (previous_Is_Default_ro_menuoptionsize && ro_menuoptionsize.Is_Default) {
			previous_Is_Default_ro_menuoptionsize.Is_Default = true
			ro_menuoptionsize.Is_Default = false
		}
		ro_menuoptionsize.previous_Is_Default_ro_menuoptionsize = null
		if (is_new_o_(ro_menuoptionsize)) {
			this.remove_menuoptionsize(ro_menuoptionsize)
		} else {
			assign(ro_menuoptionsize, ro_menuoptionsize.undo)
			this.close_menuoptionsize(index)
		}
	}
	readonly remove_menuoptionsize = (ro_menuoptionsize:RoMenuoptionsize_I)=>{
		const ro_menuoptionsizes = this.ro_menuoptionsizes$.$
		const index = ro_menuoptionsizes.indexOf(ro_menuoptionsize)
		if (~index) {
			ro_menuoptionsizes.splice(index, 1)
			this.ro_menuoptionsizes$.$ = ro_menuoptionsizes
		}
	}
	readonly close_menuoptionsize = (index:number)=>{
		const { menuoptionsize_edit_a$ } = this
		menuoptionsize_edit_a$.$[index] = false
		menuoptionsize_edit_a$.refresh()
	}
	readonly set_menuoptionsize_Is_Default = async (ro_menuoptionsize:RoMenuoptionsize_I, index:number)=>{
		const previous_Is_Default_ro_menuoptionsize = this.ro_menuoptionsizes$.$.find(
			i_Menuoptionsize_I=>
				ro_menuoptionsize !== i_Menuoptionsize_I
				&& !this.menuoptionsize_edit_a$.$[index]
				&& i_Menuoptionsize_I.Is_Default)
		for (const menuoptionsize of this.ro_menuoptionsizes$.$) {
			menuoptionsize.Is_Default = false
		}
		ro_menuoptionsize.previous_Is_Default_ro_menuoptionsize = previous_Is_Default_ro_menuoptionsize
		ro_menuoptionsize.Is_Default = true
		this.ro_menuoptionsizes$.refresh()
		if (!this.menuoptionsize_edit_a$.$[index]) {
			await this.API_MENUS_menusize_save(ro_menuoptionsize, index)
		}
	}
	readonly toggle_menuoptionsize_Enabled = async (
		evt:CheckBox_change_evt_T, ro_menuoptionsize:RoMenuoptionsize_I, index:number
	)=>{
		log(this.ctx, Controller_name, 'toggle_menuoptionsize_Enabled', ro_menuoptionsize)
		ro_menuoptionsize.Enabled = evt.detail as boolean
		this.ro_menuoptionsizes$.refresh()
		if (!this.menuoptionsize_edit_a$.$[index]) {
			await this.API_MENUS_menusize_save(ro_menuoptionsize, index)
		}
	}
	readonly add_ro_menuoptionsize = ()=>{
		const lookup_ro_menuoptionsizes = this.lookup_ro_menuoptionsizes$.$.filter(s=>s.is_selected)
		const ro_menuoptionsizes = this.ro_menuoptionsizes$.$
		for (const in_ro_menuoptionsize of lookup_ro_menuoptionsizes) {
			if (this.isOpen_lookup_ro_menuoptionsizes_section$.$) {
				this.toggle_isOpen_lookup_ro_menuoptionsizes_section()
			}
			const ro_menuoptionsize = assign(deep_clone(in_ro_menuoptionsize), {
				is_new: true
			})
			ro_menuoptionsizes.push(ro_menuoptionsize)
			this.edit_ro_menuoptionsize(ro_menuoptionsize, ro_menuoptionsizes.length - 1)
		}
		this.ro_menuitem$.refresh({
			Is_Single_Size: false,
		})
		this.ro_menuoptionsizes$.refresh()
		this.ro_menuoptionsizes$.$ = ro_menuoptionsizes
	}
	readonly API_MENUS_menusize_save = async (ro_menuoptionsize:RoMenuoptionsize_I, index:number)=>{
		log(this.ctx, Controller_name, 'API_MENUS_menusize_save')
		const { menuoptionsize_busy_a$ } = this
		menuoptionsize_busy_a$[index] = true
		menuoptionsize_busy_a$.refresh()
		try {
			const payload = await this.ro_menuoptionsizes$.API_MENUS_menusize_save(ro_menuoptionsize)
			if (payload.Status === STATUS_SUCCESS) {
				this.close_menuoptionsize(index)
			}
			log(this.ctx, Controller_name, 'API_MENUS_menusize_add', payload)
		} finally {
			menuoptionsize_busy_a$[index] = false
			menuoptionsize_busy_a$.refresh()
		}
	}
	readonly API_MENUS_menusize_del = async (menuoptionsize_idx:number, ro_menuoptionsize:RoMenuoptionsize_I)=>{
		const confirm = await this.confirmModal$.$.open({
			message: `Are you sure you want to delete ${ro_menuoptionsize.Name}?`,
		})
		if (confirm) {
			log(this.ctx, Controller_name, 'API_MENUS_menusize_del')
			this.busy$.$ = true
			try {
				const payload =
					await this.ro_menuoptionsizes$.API_MENUS_menusize_del(menuoptionsize_idx, ro_menuoptionsize)
				log(this.ctx, Controller_name, 'API_MENUS_menusize_del', payload)
			} finally {
				this.busy$.$ = false
			}
		}
	}
}
