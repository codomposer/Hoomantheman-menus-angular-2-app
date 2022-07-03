import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { B, be_ } from '@ctx-core/object'
import type { Goto, Goto_opts_T } from '@ctx-core/sapper'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { join_url } from '@ctx-core/uri'
import { timeout_ms } from '@menus/web-config'
import { dom_goto$_b } from './dom_goto$_b.js'
import type { ui_Ctx } from './ui_Ctx.js'
const key = 'goto'
export const goto_b:B<ui_Ctx, typeof key> = be_(key, ctx=>{
	return goto as goto_T
	async function goto(url:url_T, opts?:Goto_opts_T):Promise<void> {
		const href = join_url([url].flat())
		if (!has_dom) throw `SSR goto is not supported`
		const _goto = await subscribe_wait_timeout(dom_goto$_b(ctx), I, timeout_ms) as Goto
		console.info('goto', href, opts)
		console.trace('goto', href, opts)
		await _goto(href, opts)
	}
})
export type url_T = string|(string|number)[]
export type goto_return_T = Promise<void>
export type goto_T = Goto
