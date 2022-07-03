import type { WebConfig } from './WebConfig.js'
export function consoleLog({ webConfig }:webConfig_Ctx, ...args:any[]) {
	if (webConfig && webConfig.DEBUG)
		console.log.apply(console, args)
}
export function consoleError({ webConfig }:webConfig_Ctx, ...args:any[]) {
	if (webConfig && webConfig.DEBUG)
		console.error.apply(console, args)
}
export interface webConfig_Ctx {webConfig:WebConfig}
