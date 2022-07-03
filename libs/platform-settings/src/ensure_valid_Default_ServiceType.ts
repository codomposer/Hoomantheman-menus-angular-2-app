import {
	CATERING_SERVICE_TYPE_ID, DELIVERY_SERVICE_TYPE_ID, DINEIN_SERVICE_TYPE_ID, PICKUP_SERVICE_TYPE_ID
} from '@menus/service-type-common'
import { PlatformSettings } from '@menus/platform-settings-lib'
export function ensure_valid_Default_ServiceType(platform_settings:PlatformSettings):void {
	if (!platform_settings) return
	if (
		(!platform_settings.Enable_Delivery && platform_settings.Default_ServiceType === DELIVERY_SERVICE_TYPE_ID)
		|| (!platform_settings.Enable_DiningIn && platform_settings.Default_ServiceType === DINEIN_SERVICE_TYPE_ID)
		|| (!platform_settings.Enable_Pickup && platform_settings.Default_ServiceType === PICKUP_SERVICE_TYPE_ID)
		|| (!platform_settings.Enable_Catering && platform_settings.Default_ServiceType === CATERING_SERVICE_TYPE_ID)
	) {
		select_first_valid_Default_ServiceType(platform_settings)
	}
}
function select_first_valid_Default_ServiceType(platform_settings:PlatformSettings) {
	platform_settings.Default_ServiceType =
		platform_settings.Enable_Delivery
		? DELIVERY_SERVICE_TYPE_ID
		: platform_settings.Enable_DiningIn
			? DINEIN_SERVICE_TYPE_ID
			: platform_settings.Enable_Pickup
				? PICKUP_SERVICE_TYPE_ID
				: platform_settings.Enable_Catering
					? CATERING_SERVICE_TYPE_ID
					: null
}
