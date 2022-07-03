import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { init_google_maps_promise_b } from '@menus/app'
import {
	geocoded_userAddress_, has_userAddress$_b, Geocoded, pending_userAddress$_b
} from '@menus/consumer-user-address'
import { notyf_error_b } from '@menus/notyf'
import { BaseController } from '@menus/shared-ui-lib'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { log } from '@menus/util'
import { timeout_ms } from '@menus/web-config'
import type { shared_ui_Ctx } from '../shared_ui_Ctx.js'
import type { LocationAutocomplete_I } from './LocationAutocomplete_I.js'
const Controller_name = 'LocationAutocomplete_c.js'
export class LocationAutocomplete_c extends BaseController<shared_ui_Ctx> implements LocationAutocomplete_I {
	readonly has_userAddress$ = has_userAddress$_b(this.ctx)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly pending_userAddress$ = pending_userAddress$_b(this.ctx)
	readonly input$:refresh_writable_T<HTMLInputElement> = refresh_writable_(null)
	autocomplete:google.maps.places.Autocomplete
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		if (has_dom) {
			if (!this.has_userAddress$.$) {
				this.init_userAddress(false)
			}
			await this.init_autocomplete_location()
		}
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly clear = ()=>{
		this.input$.$.value = ''
		this.input$.refresh()
	}
	readonly focus = ()=>{
		this.input$.$.focus()
	}
	readonly init_userAddress = (user_clicked:boolean)=>{
		log(this.ctx, Controller_name, 'init_userAddress')
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position)=>{
				log(this.ctx, Controller_name, 'getCurrentPosition', position)
				await this.init_google_maps_promise
				const { latitude, longitude } = position.coords
				const geocoder = new google.maps.Geocoder()
				const latlng = { lat: latitude, lng: longitude }
				await geocoder.geocode(
					{ location: latlng },
					async (results, status)=>{
						if (status === 'OK') {
							const geocoded = results[0] as Geocoded
							if (geocoded) {
								this.pending_userAddress$.$ = await geocoded_userAddress_(geocoded)
								this.input$.$.focus()
								log(this.ctx, Controller_name, 'address', results)
							} else {
								log(this.ctx, Controller_name, 'No results found')
							}
						} else {
							log(this.ctx, Controller_name, 'Geocoder failed due to: ', status)
						}
					})
			}, (err)=>{
				if (user_clicked) {
					this.notyf_error('You need to allow access to your location.').then()
				}
				log(this.ctx, Controller_name, 'Not available err', err)
			})
		} else {
			if (user_clicked) {
				this.notyf_error('GPS is not available on your device.').then()
			}
			log(this.ctx, Controller_name, 'Not available')
		}
	}
	readonly init_autocomplete_location = async ()=>{
		await this.init_google_maps_promise
		await subscribe_wait_timeout(this.input$, I, timeout_ms)
		// Create the autocomplete object, restricting the search to geographical
		// location types.
		const autocomplete = new google.maps.places.Autocomplete(this.input$.$, { types: ['geocode'] })
		this.autocomplete = autocomplete
		// When the user selects an address from the dropdown, populate the address
		// fields in the form.
		autocomplete.addListener(
			'place_changed',
			this.onPlaceChanged
		)
		this.input$.$.setAttribute('autocomplete', 'disable')
		setTimeout(()=>{
			this.input$.$.setAttribute('autocomplete', 'disable')
		}, 1)
		log(this.ctx, Controller_name, 'init_autocomplete_location()')
	}
	readonly onPlaceChanged = async ()=>{
		const geocoded = this.autocomplete.getPlace() as Geocoded
		if (!geocoded) return
		this.pending_userAddress$.$ = await geocoded_userAddress_(geocoded)
		log(this.ctx, Controller_name, 'place changed', geocoded)
	}
}
