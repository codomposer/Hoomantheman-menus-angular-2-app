import { has_dom } from '@ctx-core/dom'
import { assign } from '@ctx-core/object'
import { is_hash_routing } from '@menus/core-routing'
import type { webConfig_Ctx } from './console.js'
import { ENV_LIVE } from './ENV_LIVE.js'
import { ENV_DEV } from './ENV_DEV.js'
import type { WebConfig } from './WebConfig.js'
const dev_host_regex_a = [
	/\.mine\.nu$/,
	/^dev\.menu\.com$/,
	/\.?dev\.menu\.com$/,
	/\.lvh\.me$/,
	/localhost/,
]
export const live_webConfig:WebConfig = {
	APP_VERSION: process.env.APP_VERSION,
	DEBUG: false,
	ENV: ENV_LIVE,
	INTERNAL_DEBUG: false,
}
export const dev_webConfig:WebConfig = {
	APP_VERSION: process.env.APP_VERSION,
	DEBUG: true,
	ENV: ENV_DEV,
	INTERNAL_DEBUG: true,
}
if (has_dom) {
	window.webConfig = webConfig_(window.location.host)
	window.webConfig_ctx = { webConfig: window.webConfig }
}
export function webConfig_(host?:string) {
	if (process.env.DEV) return dev_webConfig
	if (process.env.LIVE) return live_webConfig
	if (is_hash_routing) {
		return new URL(window.location.href).searchParams.get('dev') == null ? live_webConfig : dev_webConfig
	}
	const webConfig = assign(
		{ host },
		dev_host_regex_a.some(regex=>regex.exec(host || ''))
		? dev_webConfig
		: live_webConfig
	) as WebConfig
	return webConfig
}
declare global {
	interface Window {
		webConfig:WebConfig;
		webConfig_ctx:webConfig_Ctx;
	}
}
