import { derived$, Readable$, Writable$, writable$ } from '@ctx-core/store'
import { BaseModalController } from '@menus/modal'
import { Ro_User } from '@menus/ro-user-common'
import type { RoRestaurant } from '@menus/ro-restaurant'
import { arrayDiff, deep_clone, log, merge } from '@menus/util'
import {
	API_USER_restlist_b, API_USER_restlist_update_b, API_USER_save_b, ro_httpClient_b, RoRequestQuery,
} from '@menus/ro-http'
import { STATUS_SUCCESS } from '@menus/web-config'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { refresh_writable_ } from '@menus/store'
import type { ro_user_ui_Ctx } from '../ro_user_ui_Ctx.js'
import type {
	Edit_Ro_User_Modal_close_T, Edit_Ro_User_Modal_open_T, Edit_Ro_User_Modal_I
} from './Edit_Ro_User_Modal_I.js'
export const TAB_PROFILE = 'TAB_PROFILE'
export const TAB_ASSOC_REST = 'TAB_ASSOC_REST.js'
export const user_rest_ffid_a_error_msg = 'At least 1 Restaurant must be selected...'
const Controller_name = 'Edit_Ro_User_Modal_c'
export class Edit_Ro_User_Modal_c
	extends BaseModalController<Edit_Ro_User_Modal_open_T, Edit_Ro_User_Modal_close_T, ro_user_ui_Ctx>
	implements Edit_Ro_User_Modal_I {
	readonly API_USER_save = API_USER_save_b(this.ctx)
	readonly _API_USER_restlist = API_USER_restlist_b(this.ctx)
	readonly API_USER_restlist_update = API_USER_restlist_update_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly active_tab$:Writable$<string> = writable$(null)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly in_ro_user$:Writable$<Ro_User> = writable$(null)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_user$ = refresh_writable_<Ro_User>(null)
	readonly save_busy$:Writable$<boolean> = writable$(false)
	readonly isNewUser$:Readable$<boolean> = derived$(this.ro_user$,//region
		(ro_user:Ro_User)=>{ return !ro_user?.id })//endregion
	readonly Email_save_errors$:Writable$<string[]> = writable$([])
	readonly owner_rest_a$:Writable$<RoRestaurant[]> = writable$([])
	readonly user_rest_a$:Writable$<RoRestaurant[]> = writable$([])
	readonly user_rest_ffid_a$:Writable$<string[]> = writable$([])
	readonly select_all_rest$:Writable$<boolean> = writable$(false)
	readonly rest_keywords$:Writable$<string> = writable$('')
	readonly rest_search_hidden_count$:Writable$<number> = writable$(0)
	readonly Email$:Readable$<string> = derived$(this.ro_user$,//region
		(ro_user:Ro_User)=>{ return ro_user?.Email })//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (data)=>{
		this.ro_user$.$ = new Ro_User()
		this.owner_rest_a$.$ = []
		this.user_rest_a$.$ = []
		this.user_rest_ffid_a$.$ = []
		this.select_all_rest$.$ = false
		this.busy$.$ = false
		this.save_busy$.$ = false
		this.unsubscribers.push(
			this.Email$.subscribe(_$Email=>this.Email_save_errors$.$ = []),
			this.rest_keywords$.subscribe(this.onchange_rest_search_text),
			this.select_all_rest$.subscribe(this.onchange_select_all_rest),
		)
		this.init(data).then()
	}
	readonly init = async (data:Edit_Ro_User_Modal_open_T)=>{
		const { ro_user } = data
		if (ro_user) {
			this.in_ro_user$.$ = ro_user
			this.ro_user$.$ = deep_clone(this.in_ro_user$.$)
		} else {
			this.ro_user$.$ = new Ro_User()
		}
		await this.API_USER_restlist()
		this.select_ro_restaurant_tab(TAB_PROFILE)
	}
	readonly select_ro_restaurant_tab = (tab:string)=>{
		this.active_tab$.$ = tab
	}
	readonly API_USER_restlist = async ()=>{
		log(this.ctx, Controller_name, 'loadAssocRestTab()')
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			if (!this.isNewUser$.$)
				RoRequestQuery.fill_ID(requestData, this.ro_user$.$.id)
			const restaurant_a_promise = this._API_USER_restlist(requestData)
			const payload = await restaurant_a_promise
			if (payload.Status === STATUS_SUCCESS) {
				const owner_rest_a = payload.Data
				const user_rest_a = payload.UserData || []
				const user_rest_ffid_a = []
				for (const owner_rest of owner_rest_a) {
					owner_rest.is_selected = false
					for (const user_rest of user_rest_a) {
						if (owner_rest.FireFlyID === user_rest.FireFlyID) {
							owner_rest.is_selected = true
							user_rest_ffid_a.push(owner_rest.FireFlyID)
							break
						}
					}
				}
				this.owner_rest_a$.$ = owner_rest_a
				this.user_rest_a$.$ = user_rest_a
				this.user_rest_ffid_a$.$ = user_rest_ffid_a
			}
			log(this.ctx, Controller_name, 'API_USER_restlist', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly onchange_rest_search_text = (rest_search_text:string)=>{
		let rest_search_hidden_count = 0
		const owner_rest_a = this.owner_rest_a$.$
		for (const owner_rest of owner_rest_a) {
			owner_rest.isHidden = owner_rest.Name.toLowerCase().indexOf(rest_search_text.toLowerCase()) === -1
			if (owner_rest.isHidden) {
				rest_search_hidden_count += 1
			}
		}
		this.owner_rest_a$.$ = owner_rest_a
		this.rest_search_hidden_count$.$ = rest_search_hidden_count
	}
	readonly onchange_select_all_rest = ()=>{
		const user_rest_ffid_a = []
		const select_all_rest = this.select_all_rest$.$
		const owner_rest_a = this.owner_rest_a$.$
		for (const owner_rest of owner_rest_a) {
			owner_rest.is_selected = select_all_rest
			if (owner_rest.is_selected) {
				user_rest_ffid_a.push(owner_rest.FireFlyID)
			}
		}
		this.owner_rest_a$.$ = owner_rest_a
		this.user_rest_ffid_a$.$ = user_rest_ffid_a
	}
	readonly onchange_owner_rest_a_item_is_selected = (owner_rest:RoRestaurant)=>{
		const user_rest_ffid_a = this.user_rest_ffid_a$.$
		const rest_index = user_rest_ffid_a.indexOf(owner_rest.FireFlyID)
		if (owner_rest.is_selected) {
			user_rest_ffid_a.push(owner_rest.FireFlyID)
		} else {
			user_rest_ffid_a.splice(rest_index, 1)
		}
		this.user_rest_ffid_a$.$ = user_rest_ffid_a
		log(this.ctx, Controller_name, 'onchange_owner_rest_a_item_is_selected', owner_rest.is_selected)
	}
	readonly save = async (form_errors:string)=>{
		if (form_errors.length) {
			this.notyf_error('Form contains some errors.')
			console.error(form_errors)
			return
		}
		const old_ffid_a = this.user_rest_a$.$.map((a)=>a.FireFlyID)
		const new_ffid_a = this.user_rest_ffid_a$.$
		if (new_ffid_a.length === 0) {
			this.notyf_error(user_rest_ffid_a_error_msg)
			throw(user_rest_ffid_a_error_msg)
		}
		const ffadd_a:string[] = arrayDiff(new_ffid_a, old_ffid_a)
		const ffdelete_a:string[] = arrayDiff(old_ffid_a, new_ffid_a)
		log(this.ctx, Controller_name, 'save', { ffadd_a, ffdelete_a })
		this.save_busy$.$ = true
		try {
			const payload = await this.API_USER_save({ user: this.ro_user$.$ })
			if (payload.Status === STATUS_SUCCESS) {
				if (this.isNewUser$.$) {
					const ro_user = payload.Data
					ro_user.Password = ''
					ro_user.ConfirmPassword = ''
					this.in_ro_user$.$ = ro_user
					this.ro_user$.$ = deep_clone(this.in_ro_user$.$)
				} else {
					this.ro_user$.refresh({
						Password: '',
						ConfirmPassword: '',
					})
					merge(this.in_ro_user$.$, this.ro_user$.$)
				}
				this.dispatch(this.isNewUser$.$ ? 'create' : 'update', this.in_ro_user$.$)
				if (ffadd_a.length || ffdelete_a.length) {
					const requestData = new RoRequestQuery()
					requestData.ffadd = ffadd_a.join(',')
					requestData.ffdelete = ffdelete_a.join(',')
					RoRequestQuery.fill_ID(requestData, this.ro_user$.$.id)
					const updateUserRestListPayload = await this.API_USER_restlist_update(requestData)
					await this.onsave_success(updateUserRestListPayload.Status)
				} else {
					await this.onsave_success(payload.Status)
				}
				log(this.ctx, Controller_name, 'addUser', payload)
			} else {
				if (payload.Code === 'ERR_EMAIL_EXIST') {
					this.Email_save_errors$.$ = ['Email already exists']
				}
				this.notyf_error('Sorry, Unable to save item')
			}
		} finally {
			this.save_busy$.$ = false
		}
	}
	readonly onsave_success = async (status:string)=>{
		if (status === STATUS_SUCCESS) {
			this.notyf_success('Saved user successfully')
			await this.close()
		}
	}
}
