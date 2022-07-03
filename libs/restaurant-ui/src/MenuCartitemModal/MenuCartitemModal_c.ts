import { derived$, noinit_subscribe, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import {
	menu_cartitem_, Menuitem, Menuitem_I, Menuoptionsize_I, Menuoption_I, Menuoptionitem_I, MenuCartitem_I,
	OptionItems_is_selected_count_
} from '@menus/consumer-menu'
import { SERVICE_TYPE_DINEIN, serviceType$_b } from '@menus/service-type'
import { log } from '@menus/util'
import {
	consumer_http_client_b, fetch_search_menus_menuoptions_b, fetch_search_menus_menuoptionsize_b
} from '@menus/consumer-http'
import { shopping_cart_b, } from '@menus/consumer-shopping-cart'
import { calculate_menuitem_subTotal } from '@menus/shopping-cart'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { MENU_CARTITEM_MAX_LIMIT } from '@menus/web-config'
import type { SoldOutAction } from '@menus/consumer-user-common'
import {
	consumer_login_user$_b, SoldOutActionAPIRequestQuery, UserAPIRequestQuery, User
} from '@menus/consumer-user-common'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import {
	restaurant_frame_fetch_search_menus_menuoptions_requestData_,
	restaurant_frame_fetch_search_menus_menuoptionsize_requestData_,
	restaurant_frame_in_sync$_b
} from '@menus/restaurant-frame'
import type { restaurant_ui_Ctx } from '../restaurant_ui_Ctx.js'
import type {
	MenuCartitemModal_close_T, MenuCartitemModal_open_T, MenuCartitemModal_I
} from './MenuCartitemModal_I.js'
const Controller_name = 'MenuCartitemModal_c.js'
export class MenuCartitemModal_c
	extends BaseModalController<MenuCartitemModal_open_T, MenuCartitemModal_close_T, restaurant_ui_Ctx>
	implements MenuCartitemModal_I {
	readonly shopping_cart = shopping_cart_b(this.ctx)
	readonly add_menu_cartitem = this.shopping_cart.add_menu_cartitem
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly fetch_search_menus_menuoptions = fetch_search_menus_menuoptions_b(this.ctx)
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly isLoggedIn$ = this.consumer_login_user$.isLoggedIn$
	readonly is_shopping_cart_opened$ = this.shopping_cart.is_shopping_cart_opened$
	readonly fetch_search_menus_menuoptionsize = fetch_search_menus_menuoptionsize_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly restaurant_frame_in_sync$ = restaurant_frame_in_sync$_b(this.ctx)
	readonly serviceType$ = serviceType$_b(this.ctx)
	readonly toggle_shopping_cart = this.shopping_cart.toggle_shopping_cart
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly menu_cartitem$:refresh_writable_T<MenuCartitem_I> = refresh_writable_(null)
	readonly SoldOutAction_busy$:Writable$<boolean> = writable$(false)
	readonly SoldOutActions$:refresh_writable_T<SoldOutAction[]> = refresh_writable_<SoldOutAction[]>([])
	readonly SoldOutAction$:Writable$<SoldOutAction> = writable$(null)
	readonly totalPrice$:Writable$<number> = writable$(0)
	readonly menuitem$:Readable$<Menuitem_I> = derived$(this.menu_cartitem$,//region
		(menu_cartitem)=>{
			return menu_cartitem?.menuitem
		}
	)//endregion
	readonly menuoptionsizes$:Readable$<Menuoptionsize_I[]> = derived$(this.menu_cartitem$,//region
		(menu_cartitem)=>{
			return menu_cartitem?.menuoptionsizes
		}
	)//endregion
	readonly serviceType_invalid:Readable$<boolean> = derived$(this.serviceType$, serviceType=>//region
		serviceType === SERVICE_TYPE_DINEIN
	)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.load_SoldOutActions().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (menuitem:Menuitem_I)=>{
		log(this.ctx, Controller_name, 'open', menuitem)
		const menu_cartitem = menu_cartitem_(menuitem)
		menu_cartitem.quantity = 1
		this.menu_cartitem$.$ = menu_cartitem
		this.update_totalPrice()
	}
	readonly after_open_modal = async (_menuitem:Menuitem)=>{
		this.load_search_menus_menuoptionsize().then()
	}
	readonly load_SoldOutActions = async ()=>{
		const get_app_settings_payload =
			await this.consumer_http_client.get_app_settings(new UserAPIRequestQuery())
		this.SoldOutActions$.$ = get_app_settings_payload.SoldOutActions
		this.init_SoldOutAction()
	}
	readonly init_SoldOutAction = ()=>{
		const SoldOutActions = this.SoldOutActions$.$
		if (this.isLoggedIn$.$) {
			const $login_user = this.consumer_login_user$.$ as User
			const login_user_SoldOutAction = $login_user.SoldOutAction
			if (login_user_SoldOutAction) {
				const SoldOutAction = SoldOutActions.find(s=>s.ID === login_user_SoldOutAction.ID)
				if (SoldOutAction) {
					this.SoldOutAction$.$ = SoldOutAction
				}
			}
		} else {
			if (SoldOutActions.length) {
				this.SoldOutAction$.$ = SoldOutActions[0]
			}
		}
		this.unsubscribers.push(
			noinit_subscribe(this.SoldOutAction$, ()=>this.onchange_SoldOutAction())
		)
	}
	readonly load_search_menus_menuoptionsize = async ()=>{
		this.busy$.$ = true
		try {
			const menu_cartitem = this.menu_cartitem$.$
			const menuitem = this.menuitem$.$
			if (menuitem.IsSingleSize) {
				menu_cartitem.menuoptionsizes = []
				await this.select_menuoptionsize(null)
			} else {
				const requestData = restaurant_frame_fetch_search_menus_menuoptionsize_requestData_(menuitem)
				const payload = await this.fetch_search_menus_menuoptionsize(requestData)
				const menuoptionsizes = payload.Data
				menu_cartitem.menuoptionsizes = menuoptionsizes
				for (const menuoptionsize of menuoptionsizes) {
					if (menuoptionsize.Is_Default) {
						await this.select_menuoptionsize(menuoptionsize)
						break
					}
				}
			}
			this.menu_cartitem$.refresh()
		} finally {
			this.busy$.$ = false
		}
	}
	readonly onchange_SoldOutAction = async ()=>{
		const SoldOutAction = this.SoldOutAction$.$
		log(this.ctx, Controller_name, 'onchange_SoldOutAction', SoldOutAction)
		this.SoldOutAction_busy$.$ = true
		try {
			const requestData = new SoldOutActionAPIRequestQuery()
			requestData.a = this.SoldOutAction$.$?.ID
			const payload = await this.consumer_http_client.update_SoldOutAction(requestData)
			if (payload?.Code === 'CUSTOMER_SETTINGS_UPDATED') {
				if (this.isLoggedIn$.$) {
					this.consumer_login_user$.refresh({
						SoldOutAction: SoldOutAction
					})
				}
				this.notyf_success('Successfully updated Sold Out Action.')
			}
		} finally {
			this.SoldOutAction_busy$.$ = false
		}
	}
	readonly save = async ()=>{
		if (!this.restaurant_frame_in_sync$.$) {
			this.notyf_error('Restaurant data is out of sync. Please re-add your menu item.')
			await this.close()
			return
		}
		this.busy$.$ = true
		try {
			let is_valid = true
			const menuoptionsizes = this.menuoptionsizes$.$
			const menu_cartitem = this.menu_cartitem$.$
			// Checks if menu item size is available and user has chosen at least 1 size
			if (
				menuoptionsizes?.length
				&& (
					typeof menu_cartitem.selected_menuoptionsize === 'undefined'
					|| !menu_cartitem.selected_menuoptionsize
				)
			) {
				is_valid = false
				this.notyf_error('Choose item size<br>You need to choose at least 1 item size')
			} else {
				// Checks the validation rules on the option items of a particular menu item
				for (const menuoption of menu_cartitem.menuoptions || []) {
					// For single select items
					if (menuoption.Is_Single_Select) {
						if (
							typeof menuoption.selected_OptionItem === 'undefined'
							|| !menuoption.selected_OptionItem
						) {
							is_valid = false
							this.notyf_error(`${menuoption.OptionHeader}<br>You need to choose at least 1 option`)
							break
						}
					} else {
						// For multi select items
						const OptionItems_is_selected_count = OptionItems_is_selected_count_(menuoption)
						const errorMessage =
							(OptionItems_is_selected_count < menuoption.Minimum_Select)
							? `You need to choose at least ${menuoption.Minimum_Select} option${plural_suffix_(menuoption.Minimum_Select)}`
							: (menuoption.Maximum_Select && OptionItems_is_selected_count > menuoption.Maximum_Select)
								? `You need to choose at most ${menuoption.Maximum_Select} option${plural_suffix_(menuoption.Maximum_Select)}`
								: null
						if (errorMessage) {
							is_valid = false
							this.notyf_error(`${menuoption.OptionHeader}<br>${errorMessage}`)
							break
						}
					}
				}
			}
			// If user selected valid options, then update the cart
			if (is_valid) {
				await this.add_menu_cartitem(menu_cartitem)
				if (!this.is_shopping_cart_opened$.$) {
					this.toggle_shopping_cart()
				}
				await this.close()
			}
		} finally {
			this.busy$.$ = false
		}
	}
	readonly select_menuoptionitem = (menuoption:Menuoption_I, menuoptionitem:Menuoptionitem_I)=>{
		if (menuoption.Is_Single_Select) {
			menuoption.selected_OptionItem = menuoptionitem
		} else {
			menuoptionitem.is_selected = !menuoptionitem.is_selected
			if (menuoptionitem.is_selected) {
				if (
					menuoption.Maximum_Select > 1
					&& OptionItems_is_selected_count_(menuoption) > menuoption.Maximum_Select
				) {
					menuoptionitem.is_selected = false
					this.notyf_error(`Maximum limit reached: You can't add more option items.`)
					return
				}
			}
		}
		this.menu_cartitem$.refresh()
		this.update_totalPrice()
	}
	readonly select_menuoptionsize = async (selected_menuoptionsize:Menuoptionsize_I)=>{
		const already_busy = this.busy$.$
		if (!already_busy) this.busy$.$ = true
		try {
			const menu_cartitem = this.menu_cartitem$.$
			const { menuitem } = menu_cartitem
			const requestData =
				await restaurant_frame_fetch_search_menus_menuoptions_requestData_(menuitem, selected_menuoptionsize)
			const search_menus_menuoptions_payload =
				await this.fetch_search_menus_menuoptions(requestData)
			const menuoptions = search_menus_menuoptions_payload.MenuOptions.slice()
			this.menu_cartitem$.refresh({
				selected_menuoptionsize,
				menuoptions,
			} as MenuCartitem_I)
		} finally {
			if (!already_busy) this.busy$.$ = false
		}
		for (const menuoption of this.menu_cartitem$.$.menuoptions) {
			for (const menuoptionitem of menuoption.OptionItems) {
				if (menuoptionitem.Is_Default) {
					this.select_menuoptionitem(menuoption, menuoptionitem)
					if (menuoption.Is_Single_Select) break
				}
			}
		}
		this.menu_cartitem$.refresh()
		this.update_totalPrice()
	}
	readonly update_quantity = (increment:number)=>{
		const menu_cartitem = this.menu_cartitem$.$
		let newQty = increment + menu_cartitem.quantity
		if (newQty > MENU_CARTITEM_MAX_LIMIT) {
			this.notyf_error(`You can't add more then ${MENU_CARTITEM_MAX_LIMIT} items`)
		} else {
			menu_cartitem.quantity = Math.max(newQty, 1)
			this.menu_cartitem$.refresh()
			this.update_totalPrice()
		}
	}
	readonly update_totalPrice = ()=>{
		this.totalPrice$.$ = calculate_menuitem_subTotal(this.menu_cartitem$.$)
	}
}
function plural_suffix_(count:number) {
	return count > 1 ? 's' : ''
}
