import { tup } from '@ctx-core/array'
import { derived$, Readable$, writable$, Writable$ } from '@ctx-core/store'
import { is_route_hidden_b, url_friendly_names$_b, url_regex_friendly_names$_b } from '@menus/breadcrumb'
import { url$_b } from '@menus/page'
import { BaseController } from '@menus/shared-ui-lib'
import type { breadcrumb_ui_Ctx } from '../breadcrumb_ui_Ctx.js'
const Controller_name = 'Breadcrumb_c'
export class Breadcrumb_c extends BaseController<breadcrumb_ui_Ctx> {
	readonly is_route_hidden = is_route_hidden_b(this.ctx)
	readonly prefix$:Writable$<string> = writable$(null)
	readonly url$ = url$_b(this.ctx)
	readonly url_friendly_names$ = url_friendly_names$_b(this.ctx)
	readonly url_regex_friendly_names$ = url_regex_friendly_names$_b(this.ctx)
	readonly breadcrumb_url_a$:Readable$<string[]> = derived$(tup(this.url$, this.prefix$),//region
		([url, prefix])=>{
			const url_a:string[] = url.split('/')
			const breadcrumb_url_a = url_a.reduce<string[]>((breadcrumb_url_a, _segment, idx)=>{
				const breadcrumb_url = url_a.slice(0, idx + 1).join('/')
				if (breadcrumb_url && !this.is_route_hidden(breadcrumb_url)) {
					if (!prefix || !~breadcrumb_url.indexOf(prefix)) {
						breadcrumb_url_a.push(breadcrumb_url)
					}
				}
				return breadcrumb_url_a
			}, prefix ? [prefix] : [])
			return breadcrumb_url_a
		})//endregion
	readonly friendly_name_a$:Readable$<string[]> = derived$(//region
		tup(this.breadcrumb_url_a$, this.prefix$, this.url_friendly_names$, this.url_regex_friendly_names$),
		([
			 breadcrumb_url_a,
			 prefix,
			 url_friendly_names,
			 url_regex_friendly_names
		 ])=>{
			return breadcrumb_url_a.map(breadcrumb_url=>{
				const friendly_name = (!breadcrumb_url ? '' : url_friendly_name_(breadcrumb_url))
				if (friendly_name) return friendly_name
				return (
					prefix
					? breadcrumb_url.slice(breadcrumb_url.indexOf(prefix))
					: breadcrumb_url
				)
			})
			function url_friendly_name_(breadcrumb_url) {
				for (const [key, value] of url_friendly_names) {
					if (key === breadcrumb_url) {
						return value
					}
				}
				for (const [regexp, value] of url_regex_friendly_names) {
					if (regexp.test(breadcrumb_url)) {
						return value
					}
				}
				const route_a = breadcrumb_url.split('/')
				return route_a[route_a.length - 1].split('?')[0]
			}
		})//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
}
