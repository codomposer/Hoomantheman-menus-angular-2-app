import { consoleLog, webConfig_Ctx } from '@menus/web-config'
export function log(ctx:webConfig_Ctx, ...args:any[]):void {
	consoleLog(ctx, ...args)
}
