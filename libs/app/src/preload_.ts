import type { Page, PreloadContext } from '@ctx-core/sapper'
import { ssr_ui_ctx_ } from '@menus/ui'
export function preload_(
	fn:(this:PreloadContext, page:Page, session:any)=>Promise<any>
):(this:PreloadContext, page:Page, session:any)=>Promise<any> {
	return preload
	function preload(this:PreloadContext, page:Page, session:any) {
		ssr_ui_ctx_(page, session)
	  return fn.call(this, page, session)
	}
}
