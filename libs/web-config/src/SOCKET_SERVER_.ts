import type { WebConfig } from './WebConfig.js'
import { IS_ENV_LIVE_ } from './IS_ENV_LIVE_.js'
import { IS_ENV_DEV_ } from './IS_ENV_DEV_.js'
export function SOCKET_SERVER_(webConfig:WebConfig):string {
	return (
		IS_ENV_LIVE_(webConfig)
		? `https://live.api.menu.com`
		: IS_ENV_DEV_(webConfig)
			? `https://dev.api.menu.com`
			: 'http://localhost:8004'
	)
}
