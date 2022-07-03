import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { event_log$_b } from '@ctx-core/event-log'
import { neq_ } from '@ctx-core/function'
import { B, be_, assign } from '@ctx-core/object'
import { Readable$, readable$_set_ctx_, noinit_subscribe, subscribe_wait_timeout } from '@ctx-core/store'
import { consumer_http_client_b, save_userAddress_payload_T } from '@menus/consumer-http'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { idb_writable_, idb_writable_T } from '@menus/idb'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import { reset_selected_cuisines_b } from '@menus/search-menu-common'
import { mixin_refresh, refresh_writable_T } from '@menus/store'
import { userAddress_eq_, UserAddress, validate_userAddress_b } from '@menus/user-address-common'
import { error_message_ } from '@menus/util'
import { timeout_ms } from '@menus/web-config'
import type { consumer_user_address_Ctx } from './consumer_user_address_Ctx.js'
import { default_userAddress$_b } from './default_userAddress$_b.js'
import { userAddress_a$_b } from './userAddress_a$_b.js'
const key = 'pending_userAddress$'
export const pending_userAddress$_b:B<consumer_user_address_Ctx, typeof key> = be_(key, ctx=>{
	const consumer_http_client = consumer_http_client_b(ctx)
	const consumer_login_user$ = consumer_login_user$_b(ctx)
	const default_userAddress$ = default_userAddress$_b(ctx)
	const event_log$ = event_log$_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	const notyf_success = notyf_success_b(ctx)
	const userAddress_a$ = userAddress_a$_b(ctx)
	const validate_userAddress = validate_userAddress_b(ctx)
	const { store: save_success_Message$, set: set_save_success_Message } = readable$_set_ctx_<string>('')
	const { store: save_error_Message$, set: set_save_error_Message } = readable$_set_ctx_<string>('')
	const pending_userAddress$ = mixin_refresh(
		idb_writable_<pending_userAddress_T>('pending_userAddress', pending_userAddress=>{
			return pending_userAddress === undefined ? null : pending_userAddress
		})
	) as refresh_idb_pending_userAddress_T
	pending_userAddress$.subscribe(pending_userAddress=>{
		event_log$.add({ pending_userAddress })
	})
	if (has_dom) {
		consumer_login_user$.subscribe(async ()=>{
			await save()
		})
		pending_userAddress$.subscribe(async (pending_userAddress)=>{
			if (pending_userAddress) {
				if (await validate_userAddress(pending_userAddress)) {
					await save()
				} else {
					pending_userAddress$.set(null)
				}
			}
		})
		const reset_selected_cuisines = reset_selected_cuisines_b(ctx)
		noinit_subscribe(pending_userAddress$, reset_selected_cuisines)
	}
	return assign(pending_userAddress$, {
		save, save_success_Message$, save_error_Message$,
	}) as pending_userAddress$_T
	async function save() {
		const consumer_login_user = consumer_login_user$.$
		const pending_userAddress:pending_userAddress_T = pending_userAddress$.$
		if (consumer_login_user && pending_userAddress) {
			if (await validate_userAddress(pending_userAddress)) {
				const userAddress_a = await subscribe_wait_timeout(userAddress_a$, I, timeout_ms) as UserAddress[]
				const matching_userAddress = userAddress_a.find(userAddress=>{
					return userAddress_eq_(userAddress, pending_userAddress)
				})
				if (matching_userAddress) {
					const default_userAddress =
						await subscribe_wait_timeout(default_userAddress$, neq_(null), timeout_ms)
					if (!userAddress_eq_(default_userAddress, matching_userAddress)) {
						await default_userAddress$.save(matching_userAddress)
					}
				} else {
					const payload = await consumer_http_client.save_userAddress(pending_userAddress)
					const { Code } = payload
					if (Code === 'ADD_DELIVERY_ADDRESS') {
						await save_success(payload, 'Address added successfully.')
					} else if (Code === 'UPDATE_DELIVERY_ADDRESS') {
						await save_success(payload, 'Address updated successfully.')
					} else {
						set_save_success_Message('')
						set_save_error_Message(error_message_('add delivery address'))
						await notyf_error('Error saving User Address')
						console.error('Error saving User Address', payload)
					}
				}
				await pending_userAddress$.set(null)
			}
		}
	}
	async function save_success(payload:save_userAddress_payload_T, msg) {
		const userAddress_a = (await userAddress_a$.reload()) as UserAddress[]
		const userAddress_ID = parseInt(payload.NewID)
		const default_userAddress = userAddress_a.find(
			userAddress=>userAddress.ID === userAddress_ID
		)
		set_save_success_Message(payload.Message)
		set_save_error_Message('')
		await default_userAddress$.save(default_userAddress)
		await notyf_success(msg)
	}
})
export type pending_userAddress_save_success_Message$_T = Readable$<string>
export type pending_userAddress_save_error_Message$_T = Readable$<string>
export type pending_userAddress_T = UserAddress|undefined
export interface pending_userAddress$_T
	extends refresh_writable_T<pending_userAddress_T>,
		idb_writable_T<pending_userAddress_T> {
	set(userAddress:pending_userAddress_T):Promise<undefined>
	save():Promise<void>
	save_success_Message$:pending_userAddress_save_success_Message$_T
	save_error_Message$:pending_userAddress_save_error_Message$_T
}
export interface refresh_idb_pending_userAddress_T
	extends refresh_writable_T<pending_userAddress_T>,
		idb_writable_T<pending_userAddress_T> {}
