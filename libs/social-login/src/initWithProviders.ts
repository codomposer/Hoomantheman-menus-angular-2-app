import type { IProviders } from './IProviders.js'
/**
 * External Library Code: https://github.com/heresy/angular2-social-login
 */
export function initWithProviders(config:IProviders):void {
	const loadProvidersScripts = {
		google: (info)=>{
			const d = document
			const ref = d.getElementsByTagName('script')[0]
			let gJs
			gJs = d.createElement('script')
			gJs.async = true
			gJs.src = 'https://apis.google.com/js/platform.js'
			gJs.onload = ()=>{
				gapi.load('auth2', ()=>{
					gapi.auth2.init({
						client_id: info.clientId,
						scope: 'email'
					})
				})
			}
			ref.parentNode.insertBefore(gJs, ref)
		},
		linkedin: (info)=>{
			let lIN
			const d = document
			const ref = d.getElementsByTagName('script')[0]
			lIN = d.createElement('script')
			lIN.async = false
			lIN.src = 'https://platform.linkedin.com/in.js'
			lIN.text = (`api_key: ${info.clientId}`).replace('"', '')
			ref.parentNode.insertBefore(lIN, ref)
		},
		facebook: (info)=>{
			const d = document
			const id = 'facebook-jssdk'
			const ref = d.getElementsByTagName('script')[0]
			let fbJs
			fbJs = d.createElement('script')
			fbJs.id = id
			fbJs.async = true
			fbJs.src = 'https://connect.facebook.net/en_US/sdk.js'
			fbJs.onload = ()=>{
				window.FB.init({
					appId: info.clientId,
					status: true,
					cookie: true,
					xfbml: true,
					version: info.apiVersion
				})
			}
			ref.parentNode.insertBefore(fbJs, ref)
		}
	}
	Object.entries(config).forEach(([provider, val])=>{
		loadProvidersScripts[provider](val)
	})
}
