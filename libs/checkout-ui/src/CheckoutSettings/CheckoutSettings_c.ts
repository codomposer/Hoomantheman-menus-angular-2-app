import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { deep_clone } from '@menus/util'
import { DEFAULT_MAP_OPTIONS } from '@menus/maps'
import { LatLngLiteral_ } from '@menus/geolocatable'
import { MAP_USER_ZINDEX, timeout_ms } from '@menus/web-config'
import { init_app_promise_b } from '@menus/app'
import { has_userAddress$_b, userAddress$_b } from '@menus/consumer-user-address'
import type { UserAddressListModal_I } from '@menus/user-address-ui'
import { deliveryNotes$_b } from '@menus/consumer-shopping-cart'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import type { checkout_ui_Ctx } from '../checkout_ui_Ctx.js'
const Controller_name = 'CheckoutSettings_c'
export class CheckoutSettings_c extends BaseController<checkout_ui_Ctx> {
	readonly deliveryNotes$ = deliveryNotes$_b(this.ctx)
	readonly has_userAddress$ = has_userAddress$_b(this.ctx)
	readonly init_app_promise = init_app_promise_b(this.ctx)
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly isLoggedOut$ = this.consumer_login_user$.isLoggedOut$
	readonly userAddress$ = userAddress$_b(this.ctx)
	readonly delivery_address_map_div$:Writable$<HTMLDivElement> = writable$(null)
	delivery_address_map:google.maps.Map = null
	readonly UserAddressListModal_i$:Writable$<UserAddressListModal_I> = writable$(null)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.unsubscribers.push(
			this.isLoggedOut$.subscribe(this.init_userAddress_map),
			this.delivery_address_map_div$.subscribe(this.init_userAddress_map),
		)
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly init_userAddress_map = async ()=>{
		if (this.isLoggedOut$.$ || !this.delivery_address_map_div$.$) return
		await this.init_app_promise
		const mapOptions = deep_clone(DEFAULT_MAP_OPTIONS)
		mapOptions.draggable = false
		if (this.has_userAddress$.$) {
			mapOptions.center = LatLngLiteral_(this.userAddress$.$)
		}
		await subscribe_wait_timeout(this.delivery_address_map_div$, I, timeout_ms)
		this.delivery_address_map = new google.maps.Map(
			this.delivery_address_map_div$.$, mapOptions
		)
		// User location Marker
		new google.maps.Marker({
			position: mapOptions.center,
			map: this.delivery_address_map,
			icon: {
				url: '/assets/img/cr/user-location.svg',
				size: new google.maps.Size(48, 48), // Height and width of icon
				origin: new google.maps.Point(0, -4), // -4px is used to nullify bottom spacing of icon
			},
			zIndex: MAP_USER_ZINDEX,
		})
	}
	readonly open_UserAddressListModal_i = async ()=>{
		await this.UserAddressListModal_i$.$.open()
		this.update_deliveryAddress_map()
	}
	readonly update_deliveryAddress_map = ()=>{
		if (this.delivery_address_map) {
			const latLngLiteral = LatLngLiteral_(this.userAddress$.$)
			this.delivery_address_map.setCenter(latLngLiteral)
		}
	}
}
