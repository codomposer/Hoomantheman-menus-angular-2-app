import type { MenuCartitem_I } from '@menus/consumer-menu'
import { UserAPIRequestQuery } from '@menus/consumer-user-common'
import { cart_menuitem_Price_ } from '@menus/shopping-cart-common'
export class OrderItemAPIRequestQuery extends UserAPIRequestQuery {
	public b:number // order ID
	public c:number // Restaurant ID
	public d:number // Item ID
	public e:string // Item Name
	public f:number // Qty
	public g:number // Price
	public m:string // menu Item Suggestion
	public s:number // menu Item Size ID
	public static fill_menuitem = (requestData:OrderItemAPIRequestQuery, menu_cartitem:MenuCartitem_I)=>{
		const { menuitem } = menu_cartitem
		requestData.c = menuitem.RestaurantID
		requestData.d = menuitem.MenuItemID
		requestData.e = menuitem.MenuItemName
		requestData.f = menu_cartitem.quantity
		requestData.g = cart_menuitem_Price_(menu_cartitem)
		requestData.m = menu_cartitem.suggestion
		requestData.s = menu_cartitem.selected_menuoptionsize?.id
	}
	public static _add_order_menu_cartitem_body = (menu_cartitem:MenuCartitem_I)=>{
		const o = []
		if (menu_cartitem.menuoptions) {
			for (const menuoption of menu_cartitem.menuoptions) {
				const option = {
					OptionID: menuoption.OptionID,
					OptionHeader: menuoption.OptionHeader,
					OptionItems: [] as OptionItems_T[],
				} as OrderItemOption_T
				if (menuoption.Is_Single_Select) {
					const { selected_OptionItem } = menuoption
					if (selected_OptionItem) {
						option.OptionItems.push({
							ID: menuoption.selected_OptionItem.ID,
							Name: menuoption.selected_OptionItem.Name,
							Price: menuoption.selected_OptionItem.Price,
						} as OptionItems_T)
					}
				} else {
					for (const optionItem of menuoption.OptionItems) {
						if (optionItem.is_selected) {
							option.OptionItems.push({
								ID: optionItem.ID,
								Name: optionItem.Name,
								Price: optionItem.Price,
							} as OptionItems_T)
						}
					}
				}
				o.push(option)
			}
		}
		return {
			o,
		} as add_order_item_body_T
	}
}
export interface OrderItemOption_T {
	OptionID:number
	OptionHeader:string
	OptionItems:OptionItems_T[]
}
export interface OptionItems_T {
	ID:number
	Name:string
	Price:number
}
export interface add_order_item_body_T {
	o:{
		ID:number
		Name:string
		Price:number
	}[]
}
