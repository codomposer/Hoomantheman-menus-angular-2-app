import { baseURI_ } from '@ctx-core/dom'
import { B, be_ } from '@ctx-core/object'
import { is_hash_routing } from '@menus/core-routing'
import { is_navigating$_b } from './is_navigating$_b.js'
import type { page_Ctx } from './page_Ctx.js'
const key = 'is_navigating_onclick'
export const is_navigating_onclick_b:B<page_Ctx, typeof key> = be_(key, ctx=>{
	const is_navigating$ = is_navigating$_b(ctx)
	return is_navigating_onclick as is_navigating_onclick_T
	async function is_navigating_onclick(evt:MouseEvent) {
		const baseURI = baseURI_()
		const current_url = new URL(window.location.href, baseURI)
		const current_href =
			is_hash_routing
			? current_url.hash.split('#').slice(1).join('#')
			: `${current_url.pathname}${current_url.search}${current_url.hash}`
		const target_href = (evt.target as HTMLAnchorElement).getAttribute('href')
		if (current_href !== target_href) {
			await is_navigating$.start(async ()=>{})
		}
	}
})
export type is_navigating_onclick_T = (evt:Event)=>void
