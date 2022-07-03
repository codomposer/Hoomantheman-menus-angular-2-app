import { tup } from '@ctx-core/array'
import { has_dom } from '@ctx-core/dom'
import { I } from '@ctx-core/combinators'
import { derived$, Readable$, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import {
	geocoded_userAddress_, userAddress_isValid_, userAddress$_b, pending_userAddress$_b, userAddress_a$_b, UserAddress,
} from '@menus/consumer-user-address'
import { log, error_message_ } from '@menus/util'
import { consumer_http_client_b } from '@menus/consumer-http'
import { init_app_promise_b } from '@menus/app'
import { UserAddressAPIRequestQuery } from '@menus/consumer-user-common'
import { timeout_ms } from '@menus/web-config'
export class UserAddresses_c extends BaseController {
	readonly consumer_http_client = consumer_http_client_b(this.ctx)
	readonly init_app_promise = init_app_promise_b(this.ctx)
	readonly pending_userAddress$ = pending_userAddress$_b(this.ctx)
	readonly userAddress$ = userAddress$_b(this.ctx)
	readonly userAddress_a$ = userAddress_a$_b(this.ctx)
	readonly autocomplete_new_userAddress$:Writable$<HTMLInputElement> = writable$(null)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly new_userAddress$:Writable$<UserAddress|undefined> = writable$(undefined)
	readonly new_userAddress_text$:Writable$<string> = writable$('')
	readonly delete_error_message$:Writable$<string> = writable$('')
	readonly delete_success_message$:Writable$<string> = writable$('')
	readonly error_message$:Readable$<string> = derived$(tup(//region
			this.pending_userAddress$.save_error_Message$, this.delete_error_message$),
		([save_error_Message, delete_error_message])=>{
			return save_error_Message || delete_error_message || ''
		}
	)//endregion
	readonly success_message$:Readable$<string> = derived$(tup(//region
			this.pending_userAddress$.save_success_Message$, this.delete_success_message$
		),
		([save_success_Message, delete_success_message])=>{
			return save_success_Message || delete_success_message || ''
		}
	)//endregion
	readonly onInit = async ()=>{
		log(this.ctx, 'onInit()')
		await this.init_app_promise
		if (has_dom) {
			this.init_autocomplete_location()
		}
		await this.load_data()
	}
	readonly init_autocomplete_location = ()=>{
		// Create the autocomplete object, restricting the search to geographical
		// location types.
		const autocomplete = new google.maps.places.Autocomplete(
			this.autocomplete_new_userAddress$.$, { types: ['geocode'] }
		)
		// When the user selects an address from the dropdown, populate the address
		// fields in the form.
		autocomplete.addListener('place_changed', async ()=>{
			const place = autocomplete.getPlace()
			this.new_userAddress$.$ = await geocoded_userAddress_(place)
			log(this.ctx, 'place changed', autocomplete, place, this.new_userAddress$.$)
		})
		log(this.ctx, 'init_autocomplete_location()')
	}
	readonly load_data = async ()=>{
		this.busy$.$ = true
		try {
			await subscribe_wait_timeout(this.userAddress_a$, I, timeout_ms)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly addnew_userAddress = async ()=>{
		const new_userAddress = this.new_userAddress$.$
		if (!new_userAddress) {
			alert('You need to provide a location')
		} else if (!userAddress_isValid_(new_userAddress)) {
			alert('You need to enter a valid specific address.')
		} else {
			this.busy$.$ = true
			try {
				await this.pending_userAddress$.set(new_userAddress)
				this.new_userAddress$.$ = null
				this.new_userAddress_text$.$ = ''
				log(this.ctx, 'addnew_userAddress()')
			} finally {
				this.busy$.$ = false
			}
		}
		log(this.ctx, 'addnew_userAddress()', new_userAddress)
	}
	readonly delete_userAddress = async (userAddress:UserAddress|undefined)=>{
		this.busy$.$ = true
		try {
			const requestData = new UserAddressAPIRequestQuery()
			requestData.a = (userAddress as UserAddress)?.ID
			const payload = await this.consumer_http_client.delete_userAddress(requestData)
			if (payload?.Code === 'DELETE_DELIVERY_ADDRESS') {
				await this.userAddress_a$.reload()
				this.delete_success_message$.$ = payload.Message
				this.delete_error_message$.$ = ''
			} else {
				this.delete_success_message$.$ = ''
				this.delete_error_message$.$ = error_message_('delete delivery address')
			}
			log(this.ctx, 'delete_userAddress()', payload)
		} finally {
			this.busy$.$ = false
			setTimeout(()=>this.clear_delete_message, 5000)
		}
	}
	readonly oninput_new_userAddress = ()=>{
		this.new_userAddress$.$ = null
		log(this.ctx, 'user typed address')
	}
	readonly clear_delete_message = ()=>{
		this.delete_error_message$.$ = ''
		this.delete_success_message$.$ = ''
	}
}
