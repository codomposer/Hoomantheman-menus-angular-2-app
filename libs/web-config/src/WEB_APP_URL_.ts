import type { WebConfig } from './WebConfig.js'
import { IS_ENV_LIVE_ } from './IS_ENV_LIVE_.js'
import { IS_ENV_DEV_ } from './IS_ENV_DEV_.js'
import { IS_ENV_LOCAL_ } from './IS_ENV_LOCAL_.js'
export function WEB_APP_URL_(webConfig:WebConfig):string {
	return (
		IS_ENV_LIVE_(webConfig)
		? 'https://menu.com'
		: IS_ENV_DEV_(webConfig)
			? 'https://dev.menu.com'
			: IS_ENV_LOCAL_(webConfig)
				? 'http://localhost:8004'
				: 'https://menu.com'
	)
}
