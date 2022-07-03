import type { WebConfig } from './WebConfig.js'
import { SOCKET_SERVER_ } from './SOCKET_SERVER_.js'
export function SOCKET_SERVER_CHAT_(webConfig:WebConfig):string {
	return `${SOCKET_SERVER_(webConfig)}/chat`
}
