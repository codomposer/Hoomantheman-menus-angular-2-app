import type { OrderDetail_I } from './OrderDetail_I.js'
import type { CustomerInfo } from './CustomerInfo.js'
import type { RoOrderMenuItemDetail_I } from './RoOrderMenuItemDetail_I.js'
export interface RoOrder {
	OrderDetail:OrderDetail_I
	CustomerInfo:CustomerInfo
	MenuDetail:RoOrderMenuItemDetail_I[]
	// ui
	deliver_text:string
}
