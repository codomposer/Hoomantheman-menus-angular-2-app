import type { CustomerService } from './CustomerService.js'
import type { DeliveryMode } from './DeliveryMode.js'
import type { Faq } from './Faq.js'
import type { Subscription } from './Subscription.js'
export interface GlobalSettings {
	CustomerService:CustomerService
	DeliveryModes:DeliveryMode[]
	DiscountCriteria:{
		ID:number
		Name:string
	}[]
	OrdersRefreshRate:number
	OwnerFAQ:Faq[]
	PrivacyPolicy:string
	TOS:string
	RestTerms:{
		id:number
		name:string
		Description:string
	}
	SoldOutAction:{
		Description:string
		ID:number
		IsDefault:boolean
		Name:string
	}[]
	Subscription:Subscription[]
	UserTerms:{
		id:number
		name:string
		Description:string
	}
}
