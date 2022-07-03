import { has_dom } from '@ctx-core/dom'
import { B, be_ } from '@ctx-core/object'
import { join_url } from '@ctx-core/uri'
import { goto_b, url_T } from '@menus/ui'
import { is_navigating$_b } from './is_navigating$_b.js'
import type { page_Ctx } from './page_Ctx.js'
const key = 'navigating_goto'
export const navigating_goto_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const goto = goto_b(ctx)
	const is_navigating$ = is_navigating$_b(ctx)
	return navigating_goto as navigating_goto_T
	async function navigating_goto(in_url:url_T) {
		if (is_navigating$.$) return
		const url = join_url([in_url].flat())
		if (
			has_dom && (
				url === window.location.href
				|| url === `${window.location.pathname}${window.location.search}`
			)
		) {
			console.info('navigating_goto|noop', url)
		} else {
			await is_navigating$.start(async ()=>await goto(url))
		}
	}
})
export type navigating_goto_T = (url:url_T)=>Promise<void>
