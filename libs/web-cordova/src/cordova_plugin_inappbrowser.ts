import { has_dom } from '@ctx-core/dom'
import { is_cordova_app } from './is_cordova_app_.js'
if (is_cordova_app && has_dom) {
	document.addEventListener('deviceready', ()=>{
		window.open = ((cordova as any).InAppBrowser as cordova_plugin_inappbrowser_T).open
	}, false)
}
export interface cordova_plugin_inappbrowser_T {
	open(href:string, target:string):Window
}
