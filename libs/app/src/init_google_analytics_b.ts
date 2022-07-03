import { B, be_ } from '@ctx-core/object'
import { no_dom } from '@ctx-core/dom'
import { Google_Analytics_ID$_b } from '@menus/platform-settings'
import { app_initializer_Ctx } from './app_initializer_Ctx.js'
const key = 'init_google_analytics'
export const init_google_analytics_b:B<app_initializer_Ctx, typeof key> = be_(key, ctx=>{
	const Google_Analytics_ID = Google_Analytics_ID$_b(ctx)
	return init_google_analytics as init_google_analytics_T
	async function init_google_analytics() {
		if (no_dom) return
		await new Promise((resolve)=>{
			(function (i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r
				i[r] = i[r] || function () {
					(i[r].q = i[r].q || []).push(arguments)
				}
				// @ts-ignore
				i[r].l = 1 * new Date()
				a = s.createElement(o)
				m = s.getElementsByTagName(o)[0]
				a.async = 1
				a.src = g
				m.parentNode.insertBefore(a, m)
				a.addEventListener('load', resolve)
			})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')
		})
		ga('create', Google_Analytics_ID.$, 'auto')
		ga('send', 'pageview')
	}
})
export type init_google_analytics_T = ()=>Promise<void>

