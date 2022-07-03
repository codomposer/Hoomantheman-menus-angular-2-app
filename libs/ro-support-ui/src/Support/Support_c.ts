import { BaseController } from '@menus/shared-ui-lib'
import type { Faq } from '@menus/ro-user-common'
import { globalSettings$_b } from '@menus/ro-user'
import type { ro_support_ui_Ctx } from '../ro_support_ui_Ctx.js'
export class Support_c extends BaseController<ro_support_ui_Ctx> {
	readonly globalSettings$ = globalSettings$_b(this.ctx)
	readonly toggleFAQ = (faq:Faq)=>{
		faq.isOpen = !faq.isOpen
		this.globalSettings$.refresh()
	}
}
