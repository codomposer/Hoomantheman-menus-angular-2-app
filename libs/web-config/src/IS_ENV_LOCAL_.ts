import { ENV_LOCAL } from './ENV_LOCAL.js'
import type { WebConfig } from './WebConfig.js'
export function IS_ENV_LOCAL_(webConfig:WebConfig):boolean {
	return webConfig.ENV === ENV_LOCAL
}
