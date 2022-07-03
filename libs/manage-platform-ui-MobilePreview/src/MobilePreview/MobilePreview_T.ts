import type { SvelteComponentTyped } from 'svelte'
import type { PlatformSettings } from '@menus/platform-settings-lib'
import type { Address } from '@menus/address'
export interface MobilePreview_T extends SvelteComponentTyped<{}> {
	publish_settings(iframe_publish_settings:iframe_publish_settings_T):void
}
export interface publish_settings_message_T {
	type:string
	platform_settings:PlatformSettings
	address:Address
	publicKey:string
	env:string
	action:string
}
export interface iframe_publish_settings_T {
	action:string
}
