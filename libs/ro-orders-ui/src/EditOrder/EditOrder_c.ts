import { I } from '@ctx-core/combinators'
import { assign } from '@ctx-core/object'
import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { consumer_http_client_b, fetch_search_menus_menuoptions_b } from '@menus/consumer-http'
import {
	MenuCartitem, MenuCartitem_I, MenuCartitem_input_I, Menuitem, Menuitem_I, Menuoptionsize_I
} from '@menus/consumer-menu'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { params_fireFlyID$_b, params_orderID$_b, navigating_goto_b } from '@menus/page'
import { restaurant_frame_fetch_search_menus_menuoptions_requestData_ } from '@menus/restaurant-frame'
import {
	API_MENUS_menu_info_b, API_MENUS_menu_list_b, API_MENUS_menu_info_payload_T, API_ORDERS_accept_b,
	API_ORDERS_details_update_b, MenuitemAPIRequestQuery, ro_httpClient_b, RoRequestQuery
} from '@menus/ro-http'
import { MenuSearchBox_itemclicked_evt_I, ro_masterheadings$_b } from '@menus/ro-menu-ui'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import {
	MapCustomerRouteModal_I, API_MENUS_heading_list_payload$_b, coupons$_b, order_info$_b,
	success_API_MENUS_menu_info_payload_T, success_API_MENUS_menu_list_payload_T, subscribe_ERR_INVALID_ACCESS_b
} from '@menus/ro-restaurant-ui'
import {
	API_PREVIEW_menuoptions_b, RoCoupon, RoOrderMenuItemDetail_I, RoHeading_I, RoMasterheading_I, RoMenuitem_I,
	RoOrderMenuItemDetail,
} from '@menus/ro-shared-models'
import { ro_login_user$_b } from '@menus/ro-user-common'
import { Path } from '@menus/route'
import {
	CATERING_SERVICE_TYPE_ID, DELIVERY_SERVICE_TYPE_ID, DINEIN_SERVICE_TYPE_ID, PICKUP_SERVICE_TYPE_ID,
} from '@menus/service-type-common'
import { OrderMenuoptiondetail, OrderMenuoptiondetail_I } from '@menus/shared-order'
import { BaseController, confirmModal$_b } from '@menus/shared-ui'
import {
	shopping_cart__b, CartCoupon_I, RestaurantCartitem_I, shopping_cart_T, restaurant_cartitems$_T,
	calculated_restaurant_cartitems$_T, driverTip_percent_T, serviceType$_b_T,
} from '@menus/shopping-cart'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { enableBodyScroll, log } from '@menus/util'
import {
	MENU_CARTITEM_MAX_LIMIT, MENU_CARTITEM_QTY_MAX_LIMIT, MENU_CARTITEM_QTY_ZERO_LIMIT, STATUS_SUCCESS, timeout_ms
} from '@menus/web-config'
import type { ro_menuitem_selected_evt_T } from '../Menuitemoptions/index.js'
import type { ro_orders_ui_Ctx } from '../ro_orders_ui_Ctx.js'
import { EditOrder_c_serviceType$_b } from './EditOrder_c_serviceType$_b.js'
const Controller_name = 'EditOrder_c.js'
export class EditOrder_c extends BaseController<ro_orders_ui_Ctx> {
	mapCustomerRouteModal:MapCustomerRouteModal_I
	readonly API_MENUS_heading_list_payload$ = API_MENUS_heading_list_payload$_b(this.ctx)
	readonly API_MENUS_menu_info = API_MENUS_menu_info_b(this.ctx)
	readonly API_ORDERS_accept = API_ORDERS_accept_b(this.ctx)
	readonly API_ORDERS_details_update = API_ORDERS_details_update_b(this.ctx)
	readonly API_PREVIEW_menuoptions = API_PREVIEW_menuoptions_b(this.ctx)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly coupons$ = coupons$_b(this.ctx)
	readonly fetch_search_menus_menuoptions = fetch_search_menus_menuoptions_b(this.ctx)
	readonly in_API_MENUS_menu_list = API_MENUS_menu_list_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly order_info$ = order_info$_b(this.ctx)
	readonly params_orderID$ = params_orderID$_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_restaurant$ = ro_restaurant$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_masterheadings$ = ro_masterheadings$_b(this.ctx)
	readonly subscribe_ERR_INVALID_ACCESS = subscribe_ERR_INVALID_ACCESS_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly cart_busy$:Writable$<boolean> = writable$(false)
	readonly headings$:Writable$<RoHeading_I[]> = writable$(null)
	readonly isOpenSelectedMenuItem$:Writable$<boolean> = writable$(false)
	readonly menuitems$:Writable$<RoMenuitem_I[]> = writable$(null)
	readonly menuitems_busy$:Writable$<boolean> = writable$(false)
	readonly save_order_busy$:Writable$<boolean> = writable$(false)
	readonly save_and_accept_order_busy$:Writable$<boolean> = writable$(false)
	readonly search_busy$:Writable$<boolean> = writable$(false)
	readonly selected_action$:Writable$<string> = writable$(null)
	readonly selected_menu_cartitem$:refresh_writable_T<MenuCartitem_I> = refresh_writable_(null)
	readonly selected_ro_heading$:Writable$<RoHeading_I> = writable$(null)
	readonly selected_ro_masterheading$:Writable$<RoMasterheading_I> = writable$(null)
	readonly selected_ro_menuitem$:refresh_writable_T<RoMenuitem_I> = refresh_writable_(null)
	readonly shopping_cart_ctx = write_proxy_(this.ctx)
	readonly serviceType$_b:serviceType$_b_T = EditOrder_c_serviceType$_b
	readonly shopping_cart:shopping_cart_T = shopping_cart__b({
		key_: in_key=>`EditOrder_c_${in_key}`,
		serviceType$_b: this.serviceType$_b,
		login_user$_b: ro_login_user$_b,
	})(this.shopping_cart_ctx)
	readonly MenuItemID_h_menu_cartitem$ = this.shopping_cart.MenuItemID_h_menu_cartitem$
	readonly restaurant_cartitems$:restaurant_cartitems$_T = this.shopping_cart.restaurant_cartitems$
	readonly calculated_restaurant_cartitems$:calculated_restaurant_cartitems$_T = this.shopping_cart.calculated_restaurant_cartitems$
	readonly driverTip_percent$:driverTip_percent_T = this.shopping_cart.driverTip_percent$
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			this.isOpenSelectedMenuItem$.subscribe(
				isOpenSelectedMenuItem=>enableBodyScroll(!isOpenSelectedMenuItem)
			),
			this.restaurant_cartitems$.subscribe(()=>this.selected_ro_menuitem$.refresh()),
			this.subscribe_ERR_INVALID_ACCESS(
				this.coupons$.is_ERR_INVALID_ACCESS$, Controller_name
			),
			this.subscribe_ERR_INVALID_ACCESS(
				this.API_MENUS_heading_list_payload$.is_ERR_INVALID_ACCESS$, Controller_name
			)
		)
		this.load_data().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')
		this.busy$.$ = true
		try {
			await Promise.all([
				subscribe_wait_timeout(this.ro_restaurant$, I, timeout_ms),
				subscribe_wait_timeout(this.order_info$, I, timeout_ms),
				subscribe_wait_timeout(this.coupons$, I, timeout_ms),
				subscribe_wait_timeout(this.ro_masterheadings$, I, timeout_ms),
			])
			await this.init_cart()
			// Select first master heading, and load its headings
			const ro_masterheadings = this.ro_masterheadings$.$
			if (ro_masterheadings.length) {
				await this.choose_selected_ro_masterheading(ro_masterheadings[0])
			}
		} finally {
			this.busy$.$ = false
		}
	}
	readonly API_MENUS_heading_list = async (MasterheadingID:number)=>{
		return await this.API_MENUS_heading_list_payload$.fetch(
			this.params_fireFlyID$.$, MasterheadingID
		)
	}
	readonly API_MENUS_menu_list = (HeadingID:number)=>{
		this.menuitems$.$ = []
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
		RoRequestQuery.fill_headID(requestData, HeadingID)
		return this.in_API_MENUS_menu_list(requestData)
	}
	readonly onitemclicked = async (evt:MenuSearchBox_itemclicked_evt_I)=>{
		if (evt.type === 'ro_preview_menuitem') {
			this.search_busy$.$ = true
			try {
				const requestData = new MenuitemAPIRequestQuery()
				MenuitemAPIRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
				MenuitemAPIRequestQuery.fill_ID(requestData, evt.ro_preview_menuitem.MenuItemID)
				const payload = (
					await this.API_MENUS_menu_info(requestData)
				) as success_API_MENUS_menu_info_payload_T
				const $ro_menuitem = payload.Data
				const menu_cartitem = this.MenuItemID_h_menu_cartitem$.$[$ro_menuitem.ID]
				this.select_menu_cartitem(menu_cartitem, 'add')
			} finally {
				this.search_busy$.$ = false
			}
		}
	}
	readonly choose_selected_ro_masterheading = async (selected_ro_masterheading:RoMasterheading_I)=>{
		log(this.ctx, Controller_name, 'choose_selected_ro_masterheading()')
		this.selected_ro_masterheading$.$ = selected_ro_masterheading
		const payload = await this.API_MENUS_heading_list(selected_ro_masterheading.ID)
		const headings = payload.Data
		this.headings$.$ = headings
		if (headings.length) {
			await this.select_heading(headings[0])
		}
		log(this.ctx, Controller_name, 'choose_selected_ro_masterheading', payload)
	}
	readonly select_heading = async (heading:RoHeading_I)=>{
		log(this.ctx, Controller_name, 'select_heading()')
		this.selected_ro_heading$.$ = heading
		this.menuitems_busy$.$ = true
		try {
			const payload = (
				await this.API_MENUS_menu_list(this.selected_ro_heading$.$.ID)
			) as success_API_MENUS_menu_list_payload_T
			this.menuitems$.$ = payload.Data
			log(this.ctx, Controller_name, 'select_heading', payload)
		} finally {
			this.menuitems_busy$.$ = false
		}
	}
	// Selected Menu Item Rightside bar
	readonly select_menu_cartitem = ($menu_cartitem:MenuCartitem_I, selected_action:string)=>{
		this.selected_menu_cartitem$.$ = $menu_cartitem
		this.selected_action$.$ = selected_action
		this.isOpenSelectedMenuItem$.$ = true
	}
	readonly closeMenuItem = ()=>{
		this.selected_action$.$ = null
		this.selected_ro_menuitem$.$ = null
		this.isOpenSelectedMenuItem$.$ = false
	}
	readonly on_ro_menuitem_selected = async (evt:ro_menuitem_selected_evt_T)=>{
		const data = evt.detail
		const { menu_cartitem, action } = data
		if (menu_cartitem) {
			if (action === 'add') {
				this.busy$.$ = true
				try {
					await this.add_menu_cartitem(menu_cartitem)
				} finally {
					this.busy$.$ = false
				}
			} else if (action === 'update') {
				this.selected_menu_cartitem$.$ = menu_cartitem
			}
		}
		this.closeMenuItem()
	}
	readonly API_MENUS_menu_info_a = async ()=>{
		return await Promise.all(
			this.order_info$.$.MenuDetail.map(ro_order_menu_detail=>{
				const requestData = new RoRequestQuery()
				RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
				RoRequestQuery.fill_ID(requestData, ro_order_menu_detail.ItemID)
				return this.API_MENUS_menu_info(requestData)
			})
		) as API_MENUS_menu_info_payload_T[]
	}
	readonly init_cart = async ()=>{
		const API_MENUS_menu_info_payloads = await this.API_MENUS_menu_info_a()
		const { shopping_cart } = this
		const order_info = this.order_info$.$
		shopping_cart.driverTip_percent$.set(order_info.OrderDetail.Driver_Tip_Percent)
		// Setting `item` from `menuDetail`
		await Promise.all(
			order_info.MenuDetail.map(async (ro_order_menu_detail:RoOrderMenuItemDetail_I, idx:number)=>{
				const API_MENUS_menu_info_payload = API_MENUS_menu_info_payloads[idx]
				if (API_MENUS_menu_info_payload.Status === STATUS_SUCCESS) {
					const $ro_menuitem = (
						API_MENUS_menu_info_payload as success_API_MENUS_menu_info_payload_T
					).Data as RoMenuitem_I
					ro_order_menu_detail.ro_menuitem = $ro_menuitem
					const menu_cartitem = await this._menu_cartitem($ro_menuitem)
					try {
						await this.API_PREVIEW_menuoptions(
							this.params_fireFlyID$.$, $ro_menuitem.ID, ro_order_menu_detail.SizeID
						)
					} catch (err) {
						console.error(err)
						return
					}
					// ro_order_menu_detail.OptionDetails.
					for (const menuoption of (menu_cartitem.menuoptions || [])) {
						if (menuoption.Is_Single_Select) {
							const order_menuoptiondetail = ro_order_menu_detail.OptionDetails.find(order_menuoptiondetail=>
								order_menuoptiondetail.OptionID === menuoption.OptionID)
							const selected_OptionItem = menuoption.OptionItems.find($menuoptionitem=>
								$menuoptionitem.ID === order_menuoptiondetail.OptionItemID)
							menuoption.selected_OptionItem = selected_OptionItem
						} else {
							$ro_menuitem.is_selected = true
						}
					}
					await this.add_menu_cartitem(menu_cartitem)
					ro_order_menu_detail.cr_menuitem = menu_cartitem.menuitem
				}
			})
		)
		this.order_info$.refresh()
		const $calculated_restaurant_cartitems = shopping_cart.restaurant_cartitems$.$
		if ($calculated_restaurant_cartitems.length) {
			const restaurant_cartitem = $calculated_restaurant_cartitems[0]
			for (const couponDetail of (order_info?.OrderDetail?.CouponDetail || [])) {
				this.addCouponCodeToCartItem(restaurant_cartitem, couponDetail.CouponCode)
			}
		}
		log(this.ctx, Controller_name, 'initShoppingCart()', this.order_info$, $calculated_restaurant_cartitems)
	}
	readonly add_menu_cartitem = async (menu_cartitem:MenuCartitem_I)=>{
		await this.shopping_cart.add_menu_cartitem(menu_cartitem)
		return menu_cartitem
	}
	readonly _menu_cartitem = async (ro_menuitem:RoMenuitem_I)=>{
		const order_info = this.order_info$.$
		const { OrderDetail, MenuDetail } = order_info
		const menuitem = new Menuitem()
		assign(menuitem, {
			RestaurantID: OrderDetail.RestaurantID,
			RestaurantName: OrderDetail.Restaurant,
			Address: OrderDetail.RestaurantAddress,
			DeliveryModeID: OrderDetail.DeliveryModeID,
			DeliveryCharge: OrderDetail.DeliveryCharge,
			MenuItemID: ro_menuitem.ID,
			MenuItemName: ro_menuitem.Name,
			MenuItemDescription: ro_menuitem.Description,
			ZipCode: this.ro_restaurant$.$.ZipCode,
		} as Partial<Menuitem_I>)
		const ro_order_menu_detail = MenuDetail.find(ro_order_menu_detail=>
			ro_order_menu_detail.ID === ro_menuitem.ID
		) as RoOrderMenuItemDetail_I
		const menu_cartitem = new MenuCartitem()
		const selected_menuoptionsize = {
			id: ro_order_menu_detail.SizeID,
			Name: ro_order_menu_detail.SizeName,
			Price: ro_order_menu_detail.Price,
		} as Menuoptionsize_I
		const requestData =
			await restaurant_frame_fetch_search_menus_menuoptions_requestData_(menuitem, selected_menuoptionsize)
		const search_menus_menuoptions_payload = await this.fetch_search_menus_menuoptions(requestData)
		const menuoptions = search_menus_menuoptions_payload.MenuOptions.slice()
		assign(menu_cartitem, {
			menuitem,
			quantity: ro_order_menu_detail.Qty,
			menuoptions,
			menuoptionsizes: ro_menuitem.menuoptionsizes,
			selected_menuoptionsize,
		} as MenuCartitem_input_I)
		return menu_cartitem
	}
	readonly edit_menu_cartitem = (menu_cartitem:MenuCartitem_I)=>{
		this.select_menu_cartitem(menu_cartitem, 'update')
	}
	readonly update_menu_cartitem_quantity = async (restaurant_cartitem:RestaurantCartitem_I, idx:number, value:number)=>{
		const menu_cartitem = restaurant_cartitem.menu_cartitems[idx]
		const resultStatus = await this.shopping_cart.update_menu_cartitem_quantity(menu_cartitem, value)
		if (resultStatus === MENU_CARTITEM_QTY_MAX_LIMIT) {
			this.notyf_error(`You cant add more then ${MENU_CARTITEM_MAX_LIMIT} items.`)
		} else if (resultStatus === MENU_CARTITEM_QTY_ZERO_LIMIT) {
			const confirm = await this.confirmModal$.$.open({
				message: `Are you sure you want to delete ${menu_cartitem.menuitem.MenuItemName}?`,
			})
			if (confirm) {
				const ro_order_detail = (
					this.order_info$.$.MenuDetail as RoOrderMenuItemDetail_I[]
				).find(ro_order_menu_detail=>
					ro_order_menu_detail.cr_menuitem.MenuItemID === menu_cartitem.menuitem.MenuItemID)
				// If found menu detail
				if (ro_order_detail) {
					ro_order_detail.shouldDelete = true
				}
				await this.shopping_cart.remove_menu_cartitem(menu_cartitem)
			}
		}
	}
	public readonly addCouponCode = (restaurant_cartitem:RestaurantCartitem_I)=>{
		const selectedCoupon = (this.coupons$.$ as RoCoupon[]).find(c=>c.is_selected)
		if (selectedCoupon) {
			restaurant_cartitem.coupon_code = selectedCoupon.CouponCode
			const applied_coupon = restaurant_cartitem.applied_coupons.find(
				c=>c.CouponCode === restaurant_cartitem.coupon_code)
			if (applied_coupon) {
				this.notyf_error('RoCoupon Code already exists.')
			} else {
				const added = this.addCouponCodeToCartItem(restaurant_cartitem, restaurant_cartitem.coupon_code)
				if (added) {
					restaurant_cartitem.coupon_code = ''
				} else {
					this.notyf_error('Invalid RoCoupon Code.')
				}
			}
		} else {
			this.notyf_error('Please select a RoCoupon Code.')
		}
	}
	public readonly remove_applied_coupon = (restaurant_cartitem:RestaurantCartitem_I, couponIndex:number)=>{
		restaurant_cartitem.applied_coupons.splice(couponIndex, 1)
		this.restaurant_cartitems$.refresh()
	}
	readonly saveOrder = async (accept_order)=>{
		if (accept_order) {
			this.save_and_accept_order_busy$.$ = true
		} else {
			this.save_order_busy$.$ = true
		}
		try {
			let API_ORDERS_details_update_requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(API_ORDERS_details_update_requestData, this.params_fireFlyID$.$)
			RoRequestQuery.fill_OrderID(API_ORDERS_details_update_requestData, this.params_orderID$.$)
			const restaurant_cartitem = this.calculated_restaurant_cartitems$.$[0]
			let menuDetailList:RoOrderMenuItemDetail[] = []
			const order_info = this.order_info$.$
			for (const menu_cartitem of restaurant_cartitem.menu_cartitems || []) {
				const cr_menuitem = menu_cartitem.menuitem
				const menuDetail = new RoOrderMenuItemDetail()
				const order_menuDetail =
					order_info.MenuDetail.find(ro_order_detail=>
						ro_order_detail.cr_menuitem === cr_menuitem)
				if (order_menuDetail) {
					menuDetail.ID = order_menuDetail.ID
				}
				menuDetail.ItemID = cr_menuitem.MenuItemID
				menuDetail.ItemName = cr_menuitem.MenuItemName
				menuDetail.Qty = menu_cartitem.quantity
				menuDetail.OptionDetails = []
				if (menu_cartitem.selected_menuoptionsize) {
					menuDetail.SizeID = menu_cartitem.selected_menuoptionsize.id
				}
				for (const menuoption of (menu_cartitem.menuoptions || [])) {
					const order_menuoptiondetail = new OrderMenuoptiondetail()
					assign(order_menuoptiondetail, {
						OptionID: menuoption.OptionID,
						OptionItemName: menuoption.OptionHeader,
						Qty: 0,
						Amount: 0,
						Total: 0,
						OptionItem: [],
					} as OrderMenuoptiondetail_I)
					if (menuoption.Is_Single_Select) {
						if (menuoption.selected_OptionItem) {
							const order_menuoptiondetail = new OrderMenuoptiondetail()
							assign(order_menuoptiondetail, {
								OptionID: menuoption.selected_OptionItem.ID,
								OptionItemName: menuoption.selected_OptionItem.Name,
								Qty: 0,
								Amount: 0,
								Total: 0,
							} as OrderMenuoptiondetail_I)
							order_menuoptiondetail.OptionItem.push(order_menuoptiondetail)
						}
					} else {
						for (const item of menuoption.OptionItems) {
							if (item.is_selected) {
								const order_menuoptiondetail = new OrderMenuoptiondetail()
								assign(order_menuoptiondetail, {
									OptionID: item.ID,
									OptionItemName: item.Name,
									Qty: 0,
									Amount: 0,
									Total: 0,
								} as OrderMenuoptiondetail_I)
								order_menuoptiondetail.OptionItem.push(order_menuoptiondetail)
							}
						}
					}
					if (order_menuoptiondetail.OptionItem.length) {
						menuDetail.OptionDetails.push(order_menuoptiondetail)
					}
				}
				menuDetailList.push(menuDetail)
			}
			// Add deleted items
			menuDetailList = menuDetailList.concat(order_info.MenuDetail.filter(m=>m.shouldDelete))
			const body = {
				MenuDetail: menuDetailList
			}
			const API_ORDERS_details_update_payload =
				await this.API_ORDERS_details_update(API_ORDERS_details_update_requestData, body)
			if (accept_order) {
				const API_ORDERS_accept_requestData = new RoRequestQuery()
				API_ORDERS_accept_requestData.ff = this.params_fireFlyID$.$
				API_ORDERS_accept_requestData.oid = this.params_orderID$.$
				await this.API_ORDERS_accept(API_ORDERS_accept_requestData)
			}
			if (accept_order) {
				if (API_ORDERS_details_update_payload.Status === STATUS_SUCCESS) {
					order_info.OrderDetail.Status = API_ORDERS_details_update_payload.Data.Status
					order_info.OrderDetail.StatusID = API_ORDERS_details_update_payload.Data.StatusID
				}
				this.order_info$.refresh()
				this.notyf_success('Order saved and accepted successfully.')
			} else {
				this.notyf_success('Order saved successfully.')
			}
		} finally {
			if (accept_order) {
				this.save_and_accept_order_busy$.$ = false
			} else {
				this.save_order_busy$.$ = false
			}
		}
		await this.goBack()
		log(this.ctx, Controller_name, 'saveOrder')
	}
	readonly undoChanges = ()=>{
		window.location.reload()
	}
	readonly goBack = async ()=>{
		// this.location.back();
		await this.navigating_goto(
			[
				`${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
				this.params_fireFlyID$.$,
				Path.RO.ORDER_DETAILS,
				this.params_orderID$.$,
			]
		)
		log(this.ctx, Controller_name, 'goBack')
	}
	private readonly addCouponCodeToCartItem = (restaurant_cartitem:RestaurantCartitem_I, coupon_code:string)=>{
		let added = false
		const coupon = (this.coupons$.$ as RoCoupon[]).find(c=>c.CouponCode === coupon_code)
		if (coupon) {
			added = true
			restaurant_cartitem.applied_coupons.push(this.createCartCouponByCoupon(coupon))
		}
		return added
	}
	readonly createCartCouponByCoupon = (ro_coupon:RoCoupon)=>{
		const cart_coupon = {
			CouponID: ro_coupon.ID,
			CouponType: ro_coupon.CouponType,
			CouponCode: ro_coupon.CouponCode,
			DurationType: ro_coupon.DurationType,
			DiscountType: ro_coupon.DiscountType,
			DiscountCriteria: ro_coupon.DiscountCriteria,
			DiscountValue: ro_coupon.DiscountValue,
			MinOrder: ro_coupon.MinOrder,
			MaxOrder: ro_coupon.MaxOrder,
			Is_AllowBundle: ro_coupon.Is_AllowBundle,
			MenuItems: ro_coupon.MenuItems,
			StartDate: ro_coupon.StartDate,
			EndDate: ro_coupon.EndDate,
			DailyStartTime: ro_coupon.DailyStartTime,
			DailyEndTime: ro_coupon.DailyEndTime,
			MaxRedeemPerCustomer: ro_coupon.MaxRedeemPerCustomer,
			CustomerRedeemCount: null,
			ServiceTypes: [],
			invalid: ro_coupon.invalid,
			errors: ro_coupon.errors || [],
		} as CartCoupon_I
		if (ro_coupon.Delivery) {
			cart_coupon.ServiceTypes.push(DELIVERY_SERVICE_TYPE_ID)
		}
		if (ro_coupon.Pickup) {
			cart_coupon.ServiceTypes.push(PICKUP_SERVICE_TYPE_ID)
		}
		if (ro_coupon.Catering) {
			cart_coupon.ServiceTypes.push(CATERING_SERVICE_TYPE_ID)
		}
		if (ro_coupon.DiningIn) {
			cart_coupon.ServiceTypes.push(DINEIN_SERVICE_TYPE_ID)
		}
		return cart_coupon
	}
}
function write_proxy_(ctx) {
	const overlay = {}
	return new Proxy(ctx, {
		get(target, prop) {
			if (prop in overlay) {
				return overlay[prop]
			}
			if (prop in target) {
				return target[prop]
			}
		},
		set(_target, prop, value) {
			overlay[prop] = value
			return true
		},
	})
}
