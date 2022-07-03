import { neq_, run } from '@ctx-core/function'
import { has_dom } from '@ctx-core/dom'
import { derived$, Readable$, noinit_subscribe, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
import {
	API_USER_pass_b, API_USER_pass_payload_T, API_USER_usersettings_b, API_USER_usersettings_payload_T, ro_httpClient_b,
	RoRequestQuery
} from '@menus/ro-http'
import { ro_login_user$_b, Ro_User, setNotificationTone_b } from '@menus/ro-user-common'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { find_notification_tone, notification_tone_url_a } from '@menus/notification-tone'
import { login_user$_T } from '@menus/user-common'
import type { ro_settings_ui_Ctx } from '../ro_settings_ui_Ctx.js'
const Controller_name = 'Settings_c'
export class Settings_c extends BaseController<ro_settings_ui_Ctx> {
	readonly API_USER_usersettings = API_USER_usersettings_b(this.ctx)
	readonly API_USER_pass = API_USER_pass_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:login_user$_T<Ro_User> = ro_login_user$_b(this.ctx)
	readonly setNotificationTone = setNotificationTone_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly currentPassword_api_errors$:Writable$<string[]> = writable$([])
	readonly showRestTabNav$:Writable$<boolean> = writable$(false)
	readonly NotificationTone_url$:Writable$<string> = writable$(null)
	callRestaurant = false
	readonly password$:refresh_writable_T<Password> = refresh_writable_(password_())
	readonly hasPassword$:Readable$<boolean> = derived$(this.password$,//region
		(password:Password)=>
			!!(password.old?.length || password.new.length))//endregion
	audio:HTMLAudioElement
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		if (has_dom) {
			const ro_login_user = await subscribe_wait_timeout(
				this.ro_login_user$, neq_(null), timeout_ms
			) as Ro_User
			const { NotificationTone } = ro_login_user
			const NotificationTone_basename =
				NotificationTone
				? NotificationTone.split('.')[0] || ''
				: ''
			this.NotificationTone_url$.$ =
				notification_tone_url_a.find(url=>~url.indexOf(NotificationTone_basename))
				|| ''
			this.showRestTabNav$.$ = ro_login_user.ShowRestTabNav
			this.callRestaurant = ro_login_user.CallRestaurant
			this.unsubscribers.push(
				this.password$.subscribe(()=>this.currentPassword_api_errors$.$ = []),
				noinit_subscribe(this.NotificationTone_url$, this.onchange_NotificationTone),
			)
		}
	};
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly onchange_NotificationTone = ()=>{
		log(this.ctx, Controller_name, 'onchange_NotificationTone()', this.NotificationTone_url$.$)
		if (this.audio) {
			this.audio.pause()
			this.audio.currentTime = 0
		}
		this.audio = new Audio(
			find_notification_tone(this.NotificationTone_url$.$)
		)
		this.audio.play().then()
	}
	readonly save = async (form)=>{
		log(this.ctx, Controller_name, 'save()', form, this.password$)
		this.busy$.$ = true
		try {
			// Settings
			let requestData = new RoRequestQuery()
			const NotificationTone_url = this.NotificationTone_url$.$
			const NotificationTone =
				`${NotificationTone_url.split('/').reverse()[0].split('.')[0]}.mp3`
			requestData.notificationtone = NotificationTone
			requestData.showresttabnav = this.showRestTabNav$.$
			requestData.callrestaurant = this.callRestaurant
			const password = this.password$.$
			const hasPassword = this.hasPassword$.$
			const [
				API_USER_usersettings_payload,
				passwordResponse,
			] = await Promise.all([
				this.API_USER_usersettings(requestData),
				run(()=>{
					if (hasPassword) {
						requestData = new RoRequestQuery()
						requestData.op = password.old
						requestData.np = password.new
						return this.API_USER_pass(
							requestData, { ignoreLogin: false }
						)
					}
				})
			]) as [
				API_USER_usersettings_payload_T,
				API_USER_pass_payload_T,
			]
			let successSettings = true
			let successPassword = true
			if (API_USER_usersettings_payload.Status !== STATUS_SUCCESS) {
				successSettings = false
			}
			if (hasPassword) {
				if (passwordResponse.Status === STATUS_SUCCESS) {
					this.password$.$ = password_()
				} else {
					successPassword = false
				}
			}
			if (successSettings && successPassword) {
				await this.setNotificationTone(
					NotificationTone_url === ''
					? null
					: NotificationTone
				)
				this.ro_login_user$.refresh({
					ShowRestTabNav: this.showRestTabNav$.$
				})
				this.notyf_success('Settings saved successfully')
			} else if (!successPassword) {
				this.currentPassword_api_errors$.$ = ['The password you entered is wrong.']
				this.notyf_error('The password you entered is wrong.')
			} else if (!successSettings) {
				this.notyf_error('Unable to save settings at the moment.')
			}
		} finally {
			this.busy$.$ = false
		}
	}
}
function password_() {
	return {
		old: '',
		new: '',
		newConfirm: '',
	}
}
interface Password {
	old:string
	new:string
	newConfirm:string
}
