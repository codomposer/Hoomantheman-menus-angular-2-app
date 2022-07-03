import { B, be_ } from '@ctx-core/object'
import { writable$, Writable$ } from '@ctx-core/store'
import type { manage_platform_ui_MobilePreview_Ctx } from '../manage_platform_ui_MobilePreview_Ctx.js'
const key = 'device_type$'
export const device_type$_b:B<manage_platform_ui_MobilePreview_Ctx, typeof key> = be_(key, ()=>
	writable$('iphone-x')
)
export type device_type$_T = Writable$<string>
