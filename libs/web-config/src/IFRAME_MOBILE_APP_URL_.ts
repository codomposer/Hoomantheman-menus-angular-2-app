import { WebConfig } from './WebConfig.js'
import { IS_ENV_LIVE_ } from './IS_ENV_LIVE_.js'
import { IS_ENV_DEV_ } from './IS_ENV_DEV_.js'
export function IFRAME_MOBILE_APP_URL_(webConfig:WebConfig):string {
	const mapp_url =
		IS_ENV_LIVE_(webConfig)
		? 'https://menu.com/mapp'
		: IS_ENV_DEV_(webConfig)
			? 'https://dev.menu.com/mapp'
			: process.env.MAPP_URL
	return `${mapp_url}/index.html`
}
