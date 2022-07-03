import type { ServiceType } from '@menus/service-type'
import type { UserAddress } from '@menus/user-address-common'
export interface restaurant_frame_sync_T {
	fireFlyID:string
	serviceType:ServiceType
	userAddress?:UserAddress|false|undefined
}
