import { BaseModalController } from '@menus/modal'
import { deep_clone, log } from '@menus/util'
import { DEFAULT_MAP_OPTIONS } from '@menus/maps'
import { userAddress$_b } from '@menus/consumer-user-address'
import { LatLngLiteral_ } from '@menus/geolocatable'
import type { checkout_ui_Ctx } from '../checkout_ui_Ctx.js'
import type {
	CheckoutConfirmAddressModal_close_T, CheckoutConfirmAddressModal_open_T, CheckoutConfirmAddressModal_I
} from './CheckoutConfirmAddressModal_I.js'
const Controller_name = 'CheckoutConfirmAddressModal_c'
export class CheckoutConfirmAddressModal_c
	extends BaseModalController<CheckoutConfirmAddressModal_open_T, CheckoutConfirmAddressModal_close_T, checkout_ui_Ctx>
	implements CheckoutConfirmAddressModal_I {
	readonly userAddress$ = userAddress$_b(this.ctx)
	map:google.maps.Map
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async ()=>{
		setTimeout(()=>{
			log(this.ctx, Controller_name, 'init_map()')
			const mapOptions = deep_clone(DEFAULT_MAP_OPTIONS)
			const latLngLiteral = LatLngLiteral_(this.userAddress$.$)
			mapOptions.center = latLngLiteral
			mapOptions.draggable = false
			mapOptions.scrollwheel = false
			mapOptions.disableDoubleClickZoom = true
			this.map = new google.maps.Map(document.getElementById('checkout-confirm-address-map'), mapOptions)
			// Customer Marker
			new google.maps.Marker({
				position: latLngLiteral,
				map: this.map
			})
		}, 500)
	}
}
