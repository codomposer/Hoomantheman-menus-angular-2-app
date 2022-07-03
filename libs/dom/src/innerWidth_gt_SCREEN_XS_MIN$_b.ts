import { _b, B } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { SCREEN_XS_MIN } from '@menus/css'
import type { dom_Ctx } from './dom_Ctx.js'
import { innerWidth$_b } from './innerWidth$_b.js'
const key = 'innerWidth_gt_SCREEN_XS_MIN$'
export const innerWidth_gt_SCREEN_XS_MIN$_b:B<dom_Ctx, typeof key> = _b(key, (ctx)=>{
	const innerWidth$ = innerWidth$_b(ctx)
	return derived$(innerWidth$, innerWidth=>
		innerWidth > SCREEN_XS_MIN
	)
})
export type innerWidth_gt_SCREEN_XS_MIN$_T = Readable$<boolean>
