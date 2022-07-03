import type { PlatformSettings } from '@menus/platform-settings-lib'
export function isPlatform_(platform_settings:PlatformSettings):boolean {
	if (!platform_settings) return null
	return !!(platform_settings.PublicKey || '').length
}
