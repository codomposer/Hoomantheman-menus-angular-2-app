import type {
	CanvasElement, CanvasLine, CanvasRect, Column, Content, ContentCanvas, ContentColumns, ContentImage, ContentStack,
	ContentTable, ContentText, Margins, Style, StyleDictionary, Table, TableCell, TableLayout, TDocumentDefinitions,
} from 'pdfmake/interfaces'
import { I } from '@ctx-core/combinators'
import { currency_str_ } from '@ctx-core/currency'
import { assign } from '@ctx-core/object'
import { derived$, Readable$, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { globalSettings$_b, ro_auth_rules$_b, ro_login_user$_b, ro_login_user$_T } from '@menus/ro-user'
import { log } from '@menus/util'
import { Path } from '@menus/route'
import {
	API_ORDERS_accept_b, API_ORDERS_accept_payload_T, API_ORDERS_cancel_payload_T, API_ORDERS_detail_b, ro_httpClient_b,
	RoRequestQuery, success_API_ORDERS_detail_payload_T,
} from '@menus/ro-http'
import { url_friendly_names$_b } from '@menus/breadcrumb'
import { shortDateTime_ } from '@menus/date'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { createPdf } from '@menus/pdfmake'
import { phone_str_ } from '@menus/phone'
import { params_fireFlyID$_b, params_orderID$_b } from '@menus/page'
import { ro_restaurant$_b, RoRestaurant_I } from '@menus/ro-restaurant'
import { deliver_text_, MapCustomerRouteModal_I } from '@menus/ro-restaurant-ui'
import type { RoOrder, RoOrderMenuItemDetail_I } from '@menus/ro-shared-models'
import {
	CATERING_SERVICE_TYPE_ID, DELIVERY_SERVICE_TYPE_ID, is_ServiceType_Deliverable_,
} from '@menus/service-type-common'
import type { OrderMenuoptiondetail } from '@menus/shared-order'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { goto_b, goto_T } from '@menus/ui'
import {
	is_DeliveryMode_restaurant_, BRAND_LOGO_BASE64, STATUS_SUCCESS, ORDERS_TAB, ORDER_PRICE_FEATURE, timeout_ms
} from '@menus/web-config'
import { print_pdf } from '@menus/web-cordova'
import type { ro_orders_ui_Ctx } from '../ro_orders_ui_Ctx.js'
const Controller_name = 'OrderDetails_c'
export class OrderDetails_c extends BaseController<ro_orders_ui_Ctx> {
	readonly API_ORDERS_accept = API_ORDERS_accept_b(this.ctx)
	readonly mapCustomerRouteModal$:Writable$<MapCustomerRouteModal_I> = writable$(null)
	// readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly params_fireFlyID$ = writable$(null)
	// readonly params_orderID$ = params_orderID$_b(this.ctx)
	readonly params_orderID$ = writable$(null)
	readonly globalSettings$ = globalSettings$_b(this.ctx)
	readonly goto:goto_T = goto_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_restaurant$ = ro_restaurant$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_auth_rules$ = ro_auth_rules$_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
	readonly url_friendly_names$ = url_friendly_names$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly accept_order_busy$:Writable$<boolean> = writable$(false)
	readonly coupon_discount$:Writable$<number> = writable$(0)
	readonly order$:refresh_writable_T<RoOrder> = refresh_writable_(null)
	readonly offset_minutes$ = writable$<number>(0)
	readonly back_url$:Readable$<string> = derived$(this.params_fireFlyID$, (params_fireFlyID)=>{//region
		return `${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/${params_fireFlyID}/${ORDERS_TAB}`
	})//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
		)
		this.load_data().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'onMount()')
		this.busy$.$ = true
		try {
			await subscribe_wait_timeout(this.ro_login_user$.ready$, I, timeout_ms)
			const API_ORDERS_detail_payload = await this.API_ORDERS_detail()
			const order = API_ORDERS_detail_payload as success_API_ORDERS_detail_payload_T
			this.order$.$ = order
			// RoCoupon Discount
			let coupon_discount = this.coupon_discount$.$
			let params_fireFlyID = this.params_fireFlyID$.$
			const { OrderDetail } = order
			for (const couponDetail of (OrderDetail?.CouponDetail || [])) {
				if (couponDetail.DiscountPrice) {
					coupon_discount += couponDetail.DiscountPrice
				}
			}
			this.coupon_discount$.$ = coupon_discount
			const ro_restaurant = await subscribe_wait_timeout(this.ro_restaurant$, I, timeout_ms) as RoRestaurant_I
			const url_friendly_names = this.url_friendly_names$._
			url_friendly_names.set(
				`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/${params_fireFlyID}`,
				ro_restaurant.Name
			)
			url_friendly_names.set(
				`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}/${params_fireFlyID}/${Path.RO.ORDER_DETAILS}/${this.params_orderID$.$}`,
				OrderDetail.OrderNumber
			)
			this.url_friendly_names$._ = url_friendly_names
			const deliver_text = deliver_text_(OrderDetail.ServiceTypeID, OrderDetail.DeliveryModeID)
			order.deliver_text = `${deliver_text} ${shortDateTime_(OrderDetail.OrderETA)}`
			this.order$.refresh()
		} finally {
			this.busy$.$ = false
		}
	}
	readonly API_ORDERS_detail = async ()=>{
		const requestData = new RoRequestQuery()
		RoRequestQuery.fill_fireFlyID(requestData, this.params_fireFlyID$.$)
		RoRequestQuery.fill_OrderID(requestData, this.params_orderID$.$)
		return await API_ORDERS_detail_b(this.ctx)(requestData)
	}
	readonly accept_order = async ()=>{
		log(this.ctx, Controller_name, 'accept_order()')
		const requestData = new RoRequestQuery()
		requestData.ff = this.params_fireFlyID$.$
		requestData.oid = this.params_orderID$.$
		requestData.eta = this.offset_minutes$.$
		let payload:API_ORDERS_accept_payload_T|API_ORDERS_cancel_payload_T
		try {
			this.accept_order_busy$.$ = true
			payload = await this.API_ORDERS_accept(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				this.order$.update(order=>{
					assign(order.OrderDetail, payload.Data)
					return order
				})
				this.notyf_success('Order accepted successfully.')
			} else {
				this.notyf_error('Unable to update item, Please try later.')
			}
			log(this.ctx, Controller_name, 'accept_order', payload)
		} finally {
			this.accept_order_busy$.$ = false
		}
	}
	readonly open_MapCustomerRouteModal = async ()=>{
		await this.mapCustomerRouteModal$.$.open({
			fireFlyID: this.params_fireFlyID$.$,
			orderID: this.params_orderID$.$,
		})
	}
	readonly hide_order_details = async ()=>{
		this.dispatch('hideOrderDetails')
	}
	readonly print_order = async ()=>{
		const ro_auth_rules = this.ro_auth_rules$.$
		// Items table section body
		const itemsTableSection_body:TableCell[][] = [
			[
				{ text: 'Qty', style: 'itemsTableHeader' },
				{ text: 'Item', style: 'itemsTableHeader' },
				...(
					ro_auth_rules[ORDER_PRICE_FEATURE]
					? [{ text: 'Price', style: 'itemsTableHeader', alignment: 'right' }]
					: []
				)
			],
		]
		const order = await subscribe_wait_timeout(
			this.order$, I, timeout_ms
		) as success_API_ORDERS_detail_payload_T
		for (const ro_order_menu_item_detail of (order.MenuDetail as RoOrderMenuItemDetail_I[])) {
			const itemsTableSection_body_option_items:Column[][] = []
			const OptionDetails:OrderMenuoptiondetail[] = ro_order_menu_item_detail.OptionDetails || []
			for (const OptionDetail_idx in OptionDetails) {
				if (!OptionDetails.hasOwnProperty(OptionDetail_idx)) continue
				const optionDetail = OptionDetails[OptionDetail_idx]
				const marginTop = (parseInt(OptionDetail_idx, 10) === 0 ? 9 : 4)
				let optionItemsText = ''
				for (const optionItem of optionDetail.OptionItem) {
					optionItemsText += `${optionItem.OptionItemName} (${currency_str_(optionItem.Amount, 'USD')}) `
				}
				itemsTableSection_body_option_items.push([
					{
						text: optionDetail.OptionItemName,
						margin: [0, marginTop, 0, 0] as Margins,
						bold: true
					} as ContentText,
					{ text: optionItemsText, margin: [0, marginTop, 0, 0] as Margins } as ContentText,
				] as Column[])
			}
			const itemsTableSection_body_stack = [
				{ text: ro_order_menu_item_detail.ItemName } as ContentText,
			] as Content[]
			if (itemsTableSection_body_option_items.length > 0) {
				itemsTableSection_body_stack.push({
					table: {
						widths: ['*', '*'],
						body: itemsTableSection_body_option_items,
					} as Table,
					layout: {
						defaultBorder: false,
					} as TableLayout,
				} as ContentTable)
			}
			itemsTableSection_body.push([
				{ text: `${ro_order_menu_item_detail.Qty}x`, style: 'itemsTableRow' } as ContentText,
				{
					style: 'itemsTableRow',
					stack: itemsTableSection_body_stack,
				} as ContentStack,
				...(
					ro_auth_rules[ORDER_PRICE_FEATURE]
					? [{
							text: `${currency_str_(ro_order_menu_item_detail.Price, 'USD')}`,
							style: 'itemsTableRow',
							alignment: 'right'
						} as ContentText]
					: []
				)
			])
		}
		// Items table section
		const itemsTableSection = {
			margin: [0, 36, 0, 24] as Margins,
			table: {
				headerRows: 1,
				widths: ['auto', '*', ...(ro_auth_rules[ORDER_PRICE_FEATURE] ? ['auto'] : [])],
				body: itemsTableSection_body
			} as Table,
			layout: {
				hLineWidth(i, node) {
					const length = node.table.body ? node.table.body.length : 0
					return (i === 0 || i === length) ? 2 : 1
				},
				vLineWidth(_i, _node) {
					return 0
				},
				hLineColor(i, node) {
					const length = node.table.body ? node.table.body.length : 0
					return (i === 0 || i === length) ? 'black' : 'gray'
				},
				vLineColor(i, node) {
					const length = node.table.widths ? node.table.widths.length : 0
					return (i === 0 || i === length) ? 'black' : 'gray'
				}
			} as TableLayout
		} as ContentTable
		let total_idx = 0
		const calculations_body = []
		if (ro_auth_rules[ORDER_PRICE_FEATURE]) {
			/**
			 * Calculations
			 */
			calculations_body.push([
				'Subtotal:',
				`${currency_str_(order.OrderDetail.SubTotal, 'USD')} +`
			] as TableCell[])
			total_idx++
			if (
				order.OrderDetail.ServiceTypeID === DELIVERY_SERVICE_TYPE_ID
				|| order.OrderDetail.ServiceTypeID === CATERING_SERVICE_TYPE_ID
			) {
				// Delivery Charge
				let label = 'Delivery Charge'
				if (!is_DeliveryMode_restaurant_(order.OrderDetail.DeliveryModeID)) {
					label += ' by Customer'
				}
				calculations_body.push([
					`${label}:`,
					`${currency_str_(order.OrderDetail.DeliveryCharge)} +`,
				])
				total_idx++
				// Tip
				calculations_body.push([
					`Tip (${order.OrderDetail.Driver_Tip_Percent}%):`,
					`${currency_str_(order.OrderDetail.Driver_Tip, 'USD')} +`
				])
				total_idx++
			}
			// Tax
			calculations_body.push([
				`Tax (${order.OrderDetail.Tax_Rate * 100}%):`,
				`${currency_str_(order.OrderDetail.Tax, 'USD')} +`
			])
			total_idx++
			// Total
			calculations_body.push([
				{
					text: `Total (Customer Paid):`,
					fontSize: 14,
					bold: true,
				},
				{
					text: `${currency_str_(order.OrderDetail.Total, 'USD')} =`,
					fontSize: 14,
					bold: true,
				}
			])
			// Service Charge
			calculations_body.push([
				`Service Charge:`,
				`${currency_str_(order.OrderDetail.ServiceFee, 'USD')} -`,
			])
			if (is_ServiceType_Deliverable_(order.OrderDetail.ServiceTypeID)) {
				if (!is_DeliveryMode_restaurant_(order.OrderDetail.DeliveryModeID)) {
					// Delivery Charge
					calculations_body.push([
						`Delivery Charge:`,
						`${currency_str_(order.OrderDetail.Owner_DeliveryCharge_Restaurant, 'USD')} -`,
					])
					// Tip
					calculations_body.push([
						`Tip (${order.OrderDetail.Driver_Tip_Percent}%) (Paid to Driver):`,
						`${currency_str_(order.OrderDetail.Driver_Tip, 'USD')} -`,
					])
				}
			}
			// Net Account Credit
			calculations_body.push([
				{
					text: `Net Account Credit:`,
					fontSize: 18,
					bold: true,
				},
				{
					text: `${currency_str_(order.OrderDetail.Owner_NetAccountCredit, 'USD')} =`,
					fontSize: 18,
					bold: true,
				}
			])
		}
		/**
		 * Print Object
		 */
		const dd = {
			content: [
				{
					alignment: 'justify',
					columns: [
						{
							image: BRAND_LOGO_BASE64,
							width: 93,
							height: 24,
						} as ContentImage,
						{
							style: {
								alignment: 'right',
								fontSize: 14,
							} as Style,
							stack: [
								{
									text: order.OrderDetail.Restaurant,
									bold: true,
								} as ContentText,
								{
									margin: [0, 4, 0, 0] as Margins,
									text: order.OrderDetail.RestaurantAddress,
								} as ContentText,
								{
									margin: [0, 4, 0, 0] as Margins,
									text: order.OrderDetail.RestPhone,
								} as ContentText,
								{
									margin: [0, 4, 0, 0] as Margins,
									text: order.OrderDetail.RestEmail,
								} as ContentText,
							] as Content[],
						} as ContentStack,
					] as Column[]
				} as ContentColumns,
				{
					margin: [0, 24, 0, 24] as Margins,
					stack: [
						{
							margin: [0, 18, 0, 0] as Margins,
							alignment: 'center',
							text: `Order Number: ${order.OrderDetail.OrderNumber}`,
							bold: true,
						} as ContentText,
						{
							style: {
								fontSize: 15,
								bold: true,
								alignment: 'center',
							} as Style,
							text: order.deliver_text
						} as ContentText,
						{
							canvas: [
								{
									type: 'rect',
									x: 0,
									y: -43,
									w: 500,
									h: 50,
									r: 4,
									lineColor: 'black',
								} as CanvasRect,
							]
						}
					] as Content[],
				},
				{
					columns: [
						{
							margin: [16, 9, 16, 9] as Margins,
							stack: [
								{
									relativePosition: { x: 0, y: 0 },
									canvas: [
										{
											type: 'rect',
											x: -16,
											y: -9,
											w: 230,
											h: 105,
											r: 4,
											lineColor: 'black',
										} as CanvasRect,
									]
								} as ContentCanvas,
								{
									margin: [0, 4, 0, 0] as Margins,
									bold: true,
									text: order.CustomerInfo.FullName,
								} as ContentText,
								{
									margin: [0, 4, 0, 0] as Margins,
									text: order.CustomerInfo.Phone ? phone_str_(order.CustomerInfo.Phone) : ' '
								} as ContentText,
								{
									margin: [0, 4, 0, 10] as Margins,
									width: 10,
									text: order.OrderDetail.DeliveryAddress || 'N/A',
								} as ContentText,
							] as Content[],
						} as ContentStack,
						{
							margin: [16, 9, 16, 9] as Margins,
							stack: [
								{
									text: 'Instructions:',
									bold: true,
								} as ContentText,
								{
									margin: [0, 4, 50, 0] as Margins,
									text: order.OrderDetail.Instructions || 'N/A',
								} as ContentText,
							] as Content[]
						} as ContentStack
					] as Column[]
				},
				itemsTableSection,
				...(
					ro_auth_rules[ORDER_PRICE_FEATURE]
					? [{
							alignment: 'justify',
							columns: [
								{
									width: 135,
									stack: [
										[
											{
												margin: [0, 0, 0, 0] as Margins,
												fontSize: 14,
												text: 'Pre paid By',
												alignment: 'center',
											} as ContentText,
											{
												margin: [0, 0, 0, 0] as Margins,
												fontSize: 18,
												text: order.OrderDetail.PaymentMethod.toUpperCase(),
												alignment: 'center',
												bold: true,
											} as ContentText
										],
										{
											canvas: [
												{
													type: 'rect',
													x: 0,
													y: -50,
													w: 135,
													h: 60,
													r: 4,
													lineColor: 'black',
												} as CanvasRect,
											] as CanvasElement[]
										} as ContentCanvas,
									] as Content[]
								} as ContentStack,
								{
									width: '*',
									alignment: 'right',
									table: {
										widths: ['70%', '30%'],
										body: calculations_body,
									} as Table,
									layout: {
										hLineWidth(i) {
											return i === (total_idx + 1) ? 2 : 0
										},
										vLineWidth() {
											return 0
										},
										hLineColor() {
											return 'black'
										},
										vLineColor() {
											return 'black'
										},
									} as TableLayout,
								} as ContentTable,
							] as Column[],
						} as ContentColumns]
					: []
				),
				{
					margin: [0, 24, 0, 0] as Margins,
					canvas: [
						{
							type: 'line',
							x1: 0, y1: 0,
							x2: 510, y2: 0,
							lineWidth: 0,
							dash: { length: 3 },
						} as CanvasLine
					]
				} as ContentCanvas,
				{
					canvas: [
						{
							type: 'line',
							x1: 0, y1: 0,
							x2: 510, y2: 0,
							lineWidth: 0,
							dash: { length: 3 },
						},
					]
				} as ContentCanvas,
			],
			styles: {
				header: {
					fontSize: 18,
					bold: true
				},
				bigger: {
					fontSize: 15,
					italics: true,
				},
				itemsTableHeader: {
					bold: true,
					margin: [0, 14, 0, 14] as Margins,
				},
				itemsTableRow: {
					margin: [0, 14, 0, 14] as Margins,
				}
			} as StyleDictionary,
			defaultStyle: {
				columnGap: 20,
			} as Style,
		} as TDocumentDefinitions
		await print_pdf('OrderDetails.pdf', createPdf(dd))
	}
}
