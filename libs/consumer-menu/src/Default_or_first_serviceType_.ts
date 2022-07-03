import type { SearchMenuitem_I } from '@menus/search-menu-common'
import { ServiceTypeID_r_ServiceType } from '@menus/service-type-common'
import type { PlatformSettings } from '@menus/platform-settings-lib'
import { first_serviceType_ } from './first_serviceType_.js'
export function Default_or_first_serviceType_(
	platform_settings:PlatformSettings, menuitem:SearchMenuitem_I
) {
	const Default_ServiceType = platform_settings?.Default_ServiceType
	return (
		Default_ServiceType
		? ServiceTypeID_r_ServiceType[Default_ServiceType]
		: first_serviceType_(menuitem)
	)
}
