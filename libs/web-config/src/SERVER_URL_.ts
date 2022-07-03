import type { WebConfig } from './WebConfig.js'
import { IS_ENV_LIVE_ } from './IS_ENV_LIVE_.js'
export function SERVER_URL_(webConfig:WebConfig):string {
	return (
		IS_ENV_LIVE_(webConfig)
		? `https://live.api.menu.com`
		: `https://dev.api.menu.com`
	)
}
