import type { WebConfig } from './WebConfig.js'
import { IS_ENV_LIVE_ } from './IS_ENV_LIVE_.js'
export function RECAPTCHA_SITE_KEY_(webConfig:WebConfig):string {
	return (
		IS_ENV_LIVE_(webConfig)
		? process.env.LIVE_RECAPTCHA_SITE_KEY
		: process.env.DEV_RECAPTCHA_SITE_KEY
	)
}
