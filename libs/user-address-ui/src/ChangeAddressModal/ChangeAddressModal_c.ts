import { deep_equal } from '@menus/fast-deep-equal'
import { neq_ } from '@ctx-core/function'
import { I } from '@ctx-core/combinators'
import { has_dom } from '@ctx-core/dom'
import { subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import {
	userAddress_text_, geocoded_userAddress_, UserAddress, pending_userAddress$_b, default_location$_b,
} from '@menus/consumer-user-address'
import { log, } from '@menus/util'
import { map_options_ } from '@menus/maps'
import { BaseModalController } from '@menus/modal'
import { init_google_maps_promise_b } from '@menus/app'
import { notyf_error_b } from '@menus/notyf'
import { LatLngLiteral_, location_T } from '@menus/geolocatable'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import { timeout_ms } from '@menus/web-config'
import type { user_address_ui_Ctx } from '../user_address_ui_Ctx.js'
import type {
	ChangeAddressModal_I, ChangeAddressModal_close_T, ChangeAddressModal_open_T
} from './ChangeAddressModal_T.js'
const Controller_name = 'ChangeAddressModal_c.js'
export class ChangeAddressModal_c
	extends BaseModalController<ChangeAddressModal_open_T, ChangeAddressModal_close_T, user_address_ui_Ctx>
	implements ChangeAddressModal_I {
	autocomplete:google.maps.places.Autocomplete
	readonly default_location$ = default_location$_b(this.ctx)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly pending_userAddress$ = pending_userAddress$_b(this.ctx)
	public busy$:Writable$<boolean> = writable$<boolean>(false)
	readonly changeAddress_map$:Writable$<HTMLDivElement> = writable$(undefined)
	readonly input$:Writable$<HTMLInputElement> = writable$(undefined)
	readonly map$:Writable$<google.maps.Map> = writable$(undefined)
	resolve:(data:any)=>undefined
	readonly userAddress$:refresh_writable_T<UserAddress|undefined> = refresh_writable_(undefined)
	readonly userAddress_text$:Writable$<string> = writable$('')
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async (data?:ChangeAddressModal_open_T)=>{
		let userAddress:UserAddress|undefined = data?.userAddress
		if (!userAddress) {
			await this.init_userAddress(false)
			userAddress = this.userAddress$.$
		}
		this.userAddress$.$ = userAddress
		this.unsubscribers.push(
			this.userAddress$.subscribe(
				async (userAddress:UserAddress)=>{
					const userAddress_text = userAddress_text_(userAddress)
					if (this.userAddress_text$.$ !== userAddress_text) {
						this.userAddress_text$.$ = userAddress_text
					}
					const map = await subscribe_wait_timeout(this.map$, I, timeout_ms)
					const latLngLiteral = LatLngLiteral_(userAddress)
					map.setCenter(latLngLiteral)
				}
			),
			this.userAddress_text$.subscribe(
				async (userAddress_text:string)=>{
					const userAddress = this.userAddress$.$
					if (userAddress && userAddress_text !== userAddress_text_(userAddress)) {
						if (!userAddress_text) {
							this.userAddress$.$ = null
							return
						}
						userAddress.Address = userAddress_text
						this.userAddress$.$ = userAddress
					}
				}
			),
		)
	}
	readonly after_open_modal = async ()=>{
		await this.init_google_maps_promise
		await this.init_address_autocomplete()
		await this.init_map()
	}
	readonly init_map = async ()=>{
		if (!has_dom) return
		await this.init_google_maps_promise
		const changeAddress_map = await subscribe_wait_timeout(this.changeAddress_map$, I, timeout_ms)
		let center = LatLngLiteral_(this.userAddress$.$) || this.default_location$.$
		if (!center) {
			await this.init_userAddress(false)
			return
		}
		const map_options = map_options_(center ? { center } : null)
		const map = new google.maps.Map(changeAddress_map, map_options)
		this.map$.$ = map
		google.maps.event.addListener(map, 'idle', async ()=>{
			const map_center = map.getCenter()
			if (!map_center) {
				// This case occurs on Chrome when ChangeAddress is opened on page load
				// e.g. /restaurant/delivery/[cuisine]/[name]/[fireFlyID]
				map.setCenter(center)
				return
			}
			const new_center = LatLngLiteral_({
				Latitude: map_center.lat(),
				Longitude: map_center.lng(),
			})
			if (deep_equal(center, new_center)) return
			center = new_center
			try {
				this.userAddress$.$ = await this._geocode_userAddress(center)
			} catch (e) {
				console.error(e)
				throw e
			}
		})
	}
	readonly _geocode_userAddress = (location:location_T):Promise<UserAddress|undefined>=>{
		return new Promise(async (resolve, reject)=>{
			await this.init_google_maps_promise
			const geocoder = new google.maps.Geocoder()
			try {
				geocoder.geocode({
					location: new google.maps.LatLng(location.lat, location.lng)
				}, async (data, status)=>{
					try {
						if (status === google.maps.GeocoderStatus.OK) {
							const userAddress = await geocoded_userAddress_(data[0])
							resolve(userAddress)
							return
						}
						reject(status)
					} catch (e) {
						console.error({ e })
						reject(e)
					}
				})
			} catch (e) {
				console.error({ e })
				reject(e)
			}
		})
	}
	readonly init_userAddress = async (user_clicked:boolean)=>{
		log(this.ctx, Controller_name, 'init_userAddress')
		if (navigator.geolocation) {
			await this.update_userAddress(user_clicked)
		} else {
			if (user_clicked) {
				this.notyf_error('GPS is not available on your device.')
			}
			log(this.ctx, Controller_name, 'Not available')
		}
	}
	readonly update_userAddress = async (user_clicked:boolean)=>{
		return await new Promise((resolve, reject)=>{
			navigator.geolocation.getCurrentPosition((position)=>{
				log(this.ctx, Controller_name, 'update_userAddress', position)
				const { latitude, longitude } = position.coords
				const geocoder = new google.maps.Geocoder()
				const latlng = { lat: latitude, lng: longitude }
				geocoder.geocode({ location: latlng }, async (results, status)=>{
					try {
						if (status === 'OK') {
							if (results[0]) {
								const userAddress = await geocoded_userAddress_(results[0])
								this.userAddress$.$ = userAddress
								log(this.ctx, Controller_name, 'address', results)
								resolve(userAddress)
								return
							} else {
								log(this.ctx, Controller_name, 'No results found')
							}
						} else {
							log(this.ctx, Controller_name, 'Geocoder failed due to: ', status)
						}
						resolve(null)
					} catch (e) {
						console.error(e)
						reject(e)
					}
				})
			}, (err)=>{
				if (user_clicked) {
					this.notyf_error('You need to allow access to your location.')
				}
				log(this.ctx, Controller_name, 'Not available err', err)
				resolve(null)
			}, { timeout: 1000, maximumAge: Infinity })
		})
	}
	readonly init_address_autocomplete = async ()=>{
		if (!has_dom) return
		await this.init_google_maps_promise
		const input = await subscribe_wait_timeout(this.input$, neq_(null), timeout_ms)
		this.autocomplete = new google.maps.places.Autocomplete(
			input,
			{ types: ['geocode'] },
		)
		this.autocomplete.addListener('place_changed', async ()=>{
			const place = this.autocomplete.getPlace()
			const userAddress = await geocoded_userAddress_(place)
			this.userAddress$.$ = userAddress
		})
		log(this.ctx, Controller_name, 'init_autocomplete_location()')
	}
	readonly save_userAddress = async ()=>{
		const userAddress = this.userAddress$.$
		log(this.ctx, Controller_name, 'save_userAddress', userAddress)
		await this.pending_userAddress$.set(userAddress)
		await this.close({ userAddress })
	}
}
