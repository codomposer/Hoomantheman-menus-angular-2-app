import type { Modal_I } from '@menus/modal'
import type { Subscription } from '@menus/ro-user-common'
export interface SubscriptionCheckoutModal_open_T {
	fireFlyID:string
	currentSubscription:Subscription
	nextSubscription:Subscription
	nextSubscriptionStartDate:string
	Subscription_Expired:boolean
	Subscription_Expiration:string
}
export interface SubscriptionCheckoutModal_close_T {
	subscription:Subscription
}
export interface SubscriptionCheckoutModal_I
	extends Modal_I<SubscriptionCheckoutModal_open_T, SubscriptionCheckoutModal_close_T> {}
