import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { BaseController, BaseController_params_I } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { API_PREVIEW_menuoptions_b, RoMenuitem_I } from '@menus/ro-shared-models'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import type { shopping_cart_T } from '@menus/shopping-cart'
import { MENU_CARTITEM_MAX_LIMIT, MENU_CARTITEM_QTY_MAX_LIMIT } from '@menus/web-config'
import { notyf_error_b } from '@menus/notyf'
import {
	OptionItems_is_selected_count_, MenuCartitem_I, Menuoption_I, Menuoptionitem_I, Menuoptionsize_I
} from '@menus/consumer-menu'
import { params_fireFlyID$_b } from '@menus/page'
import type { ro_menuitem_selected_evt_data_T } from './ro_menuitem_selected_evt_T.js'
import type { ro_orders_ui_Ctx } from '../ro_orders_ui_Ctx.js'
const Controller_name = 'MenuItemOptions_c'
export class Menuitemoptions_c extends BaseController<ro_orders_ui_Ctx> {
	constructor(protected params:Menuitemoptions_c_params_I) {
		super(params.ctx, params.dispatch)
	}
	readonly menu_cartitem$ = this.params.menu_cartitem$
	readonly action$ = this.params.action$
	readonly API_PREVIEW_menuoptions = API_PREVIEW_menuoptions_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly menuoptions$:Readable$<Menuoption_I[]> = derived$(this.menu_cartitem$,//region
		(menu_cartitem)=>{
			return menu_cartitem.menuoptions
		}
	)//endregion
	readonly menuoptionsize$:Readable$<Menuoptionsize_I> = derived$(this.menu_cartitem$,//region
		(menu_cartitem)=>{
			return menu_cartitem.selected_menuoptionsize
		}
	)//endregion
	readonly menuoptionsizes$:Readable$<Menuoptionsize_I[]> = derived$(this.menu_cartitem$,//region
		(menu_cartitem)=>{
			return menu_cartitem.menuoptionsizes
		}
	)//endregion
	readonly ro_menuitem$:refresh_writable_T<RoMenuitem_I> = refresh_writable_(null)
	readonly shopping_cart$:Writable$<shopping_cart_T> = writable$(null)
	unsubscribe_restaurant_cartitems:()=>void
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			this.shopping_cart$.subscribe((shopping_cart:shopping_cart_T)=>{
				let { unsubscribe_restaurant_cartitems } = this
				if (unsubscribe_restaurant_cartitems) {
					unsubscribe_restaurant_cartitems()
					this.unsubscribe_restaurant_cartitems = null
				}
				unsubscribe_restaurant_cartitems =
					shopping_cart.restaurant_cartitems$.subscribe(()=>
						this.menu_cartitem$.refresh())
				this.unsubscribers.push(unsubscribe_restaurant_cartitems)
			})
		)
		this.load_data().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()', this.action$.$)
		if (
			this.action$.$ === 'update'
			|| this.menuoptionsize$.$
			|| this.menuoptions$.$?.length
			|| this.menuoptionsizes$.$?.length
		) {
		} else {
			this.menu_cartitem$.refresh({ quantity: 1 })
			try {
				await this.API_PREVIEW_menuoptions(this.params_fireFlyID$.$, this.ro_menuitem$.$.ID)
				log(this.ctx, Controller_name, 'load_data()')
			} catch (err) {
				console.error('load_data', err)
				throw err
			}
		}
	}
	select_menuoptionsize = async (selected_menuoptionsize?:Menuoptionsize_I)=>{
		try {
			this.menu_cartitem$.refresh({
				selected_menuoptionsize,
			})
		} catch (err) {
			console.error('select_menuoptionsize', err)
		}
	}
	select_menuoptionitem = (menuoption:Menuoption_I, menuoptionitem:Menuoptionitem_I)=>{
		if (menuoption.Is_Single_Select) {
			// Single select
			menuoption.selected_OptionItem = menuoptionitem
		} else {
			// Multiple select
			menuoptionitem.is_selected = !menuoptionitem.is_selected
			if (menuoptionitem.is_selected) {
				// Maximum limit
				if (
					menuoption.Maximum_Select > 1
					&& OptionItems_is_selected_count_(menuoption) === menuoption.Maximum_Select
				) {
					menuoptionitem.is_selected = false
					alert('Maximum limit reached. You cant add more.')
					return
				}
			}
		}
		this.ro_menuitem$.refresh()
	}
	update_menu_cartitem_quantity = async (value:number)=>{
		const result_status = await this.shopping_cart$.$.update_menu_cartitem_quantity(this.menu_cartitem$.$, value)
		if (result_status === MENU_CARTITEM_QTY_MAX_LIMIT) {
			alert(`You cant add more then ${MENU_CARTITEM_MAX_LIMIT} items.`)
		}
	}
	add_to_cart = ()=>{
		let is_valid = true
		// Checks if menu item size is available and user has chosen at least 1 size
		const menu_cartitem = this.menu_cartitem$.$
		if (menu_cartitem.menuoptionsizes?.length && !menu_cartitem.selected_menuoptionsize) {
			is_valid = false
			this.notyf_error('Choose item size<br>You need to choose at least 1 option')
		} else {
			// Checks the validation rules on the option items of a particular menu item
			for (const menuoption of (menu_cartitem.menuoptions || [])) {
				// For single select items
				if (menuoption.Is_Single_Select) {
					if (!menuoption.selected_OptionItem || !menuoption.selected_OptionItem) {
						is_valid = false
						this.notyf_error(`${menuoption.OptionHeader}<br>You need to choose at least 1 option`)
						break
					}
				} else {
					// For multi select items
					if (OptionItems_is_selected_count_(menuoption) < menuoption.Minimum_Select) {
						is_valid = false
						this.notyf_error(
							`${menuoption.OptionHeader}<br>You need to choose at least ${menuoption.Minimum_Select} option`,
						)
						break
					}
				}
			}
		}
		if (is_valid) {
			this.dispatch('ro_menuitem_selected', {
				menu_cartitem: this.menu_cartitem$.$,
				action: this.action$.$
			} as ro_menuitem_selected_evt_data_T)
		}
	}
}
export interface Menuitemoptions_c_params_I extends BaseController_params_I<ro_orders_ui_Ctx> {
	menu_cartitem$:menu_cartitem$_T
	action$:action$_T
}
export type menu_cartitem$_T = refresh_writable_T<MenuCartitem_I>
export type action$_T = Readable$<string>
