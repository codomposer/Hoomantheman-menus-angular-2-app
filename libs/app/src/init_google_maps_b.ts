import { B, be_ } from '@ctx-core/object'
import { no_dom } from '@ctx-core/dom'
import { Google_Maps_Key$_b } from '@menus/platform-settings'
import { init_google_maps_promise_b } from './init_google_maps_promise_b.js'
import { app_initializer_Ctx } from './app_initializer_Ctx.js'
const key = 'init_google_maps'
export const init_google_maps_b:B<app_initializer_Ctx, typeof key> = be_(key, ctx=>{
	const init_google_maps_promise = init_google_maps_promise_b(ctx)
	return init_google_maps as init_google_maps_T
	async function init_google_maps() {
		if (no_dom) return
		const Google_Maps_Key = Google_Maps_Key$_b(ctx)
		const $Google_Maps_Key = Google_Maps_Key.$
		const google_maps_script_id = 'app-google-maps-script'
		const { document } = window
		let google_maps_script = document.getElementById(google_maps_script_id)
		if (!google_maps_script) {
			google_maps_script = document.createElement('script')
			google_maps_script.setAttribute('id', google_maps_script_id)
			google_maps_script.setAttribute('type', 'text/javascript')
			google_maps_script.setAttribute('async', 'true')
			google_maps_script.setAttribute('charset', 'utf-8')
			google_maps_script.setAttribute(
				'src',
				`https://maps-api-ssl.google.com/maps/api/js?key=${
					$Google_Maps_Key
				}&libraries=places,drawing`
			)
			google_maps_script.addEventListener('load', _evt=>{
				init_google_maps_promise.resolve()
			})
			document.getElementsByTagName('head')[0].appendChild(google_maps_script)
		}
		return init_google_maps_promise
	}
})
export type init_google_maps_T = ()=>Promise<void>
