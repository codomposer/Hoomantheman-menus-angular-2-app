import { consoleError, webConfig_Ctx } from '@menus/web-config'
export function error(ctx:webConfig_Ctx, ...args:any[]):void {
	consoleError(ctx, ...args)
}
