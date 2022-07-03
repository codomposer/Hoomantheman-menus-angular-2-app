import type { WebConfig } from './WebConfig.js'
import { ENV_DEV } from './ENV_DEV.js'
export function IS_ENV_DEV_(webConfig:WebConfig):boolean {
	return webConfig.ENV === ENV_DEV
}
