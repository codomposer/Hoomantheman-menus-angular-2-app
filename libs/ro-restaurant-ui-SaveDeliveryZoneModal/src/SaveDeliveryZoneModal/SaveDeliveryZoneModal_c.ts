import { I } from '@ctx-core/combinators'
import { derived$, Readable$, subscribe_wait_timeout, Unsubscriber, Writable$, writable$ } from '@ctx-core/store'
import { confirmModal$_b } from '@menus/shared-ui'
import { DeliveryZoneItem, set_list_SortID } from '@menus/ro-shared-models'
import { Restaurant } from '@menus/restaurant'
import { BaseModalController } from '@menus/modal'
import { colors, timeout_ms, ZONE_TYPE_POLYGON } from '@menus/web-config'
import { deep_clone, getMetersByMiles, isDefined, log, merge } from '@menus/util'
import { DEFAULT_MAP_OPTIONS } from '@menus/maps'
import { init_google_maps_promise_b } from '@menus/app'
import { API_MENUS_dzone_sort_b, ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { notyf_error_b, notyf_success_b } from '@menus/notyf'
import type { ro_restaurant_ui_Ctx } from '@menus/ro-restaurant-ui'
import type { SaveDeliveryZoneModal_close_T, SaveDeliveryZoneModal_open_T } from './SaveDeliveryZoneModal_I.js'
const Controller_name = 'SaveDeliveryZoneModal_c.js'
export class SaveDeliveryZoneModal_c
	extends BaseModalController<SaveDeliveryZoneModal_open_T, SaveDeliveryZoneModal_close_T, ro_restaurant_ui_Ctx> {
	DeliveryZone:DeliveryZoneItem[]
	fireFlyID:string
	restInfo:Restaurant
	private in_deliveryZoneItem:DeliveryZoneItem
	readonly base_API_MENUS_dzone_sort = API_MENUS_dzone_sort_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$<boolean>(false)
	readonly confirmModal$ = confirmModal$_b(this.ctx)
	readonly delivery_zone_map_el$ = writable$<HTMLDivElement>(null)
	readonly deliveryZoneItem$ = writable$<DeliveryZoneItem>(null)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly notyf_error = notyf_error_b(this.ctx)
	readonly notyf_success = notyf_success_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	confirmModal$_unsubscriber:Unsubscriber
	readonly confirmModal_is_modal_open$:Readable$<boolean> = derived$(this.confirmModal$, (
		confirmModal, set
	)=>{
		this.unsubscribe_confirmModal$()
		this.confirmModal$_unsubscriber =
			confirmModal?.is_modal_open$.subscribe(is_modal_subscribe=>
				set(is_modal_subscribe)
			)
	})
	map:google.maps.Map
	mapShape:google.maps.Polygon|google.maps.Circle
	saveMode:boolean
	drawingManager:google.maps.drawing.DrawingManager
	readonly unsubscribe_confirmModal$ = ()=>{
		const { confirmModal$_unsubscriber } = this
		if (confirmModal$_unsubscriber) {
			confirmModal$_unsubscriber()
			this.confirmModal$_unsubscriber = undefined
		}
	}
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		this.unsubscribe_confirmModal$()
		await super.onDestroy()
	}
	public get isNewDeliveryZone():boolean {
		return !this.deliveryZoneItem$.$?.ID
	}
	readonly before_open_modal = async (data)=>{
		this.fireFlyID = data.fireFlyID
		this.restInfo = new Restaurant(data.restInfo)
		this.DeliveryZone = data.DeliveryZone
		this.in_deliveryZoneItem = data.deliveryZoneItem
		this.openDeliveryZone().then()
	}
	readonly openDeliveryZone = async ()=>{
		const { in_deliveryZoneItem } = this
		if (in_deliveryZoneItem) {
			this.deliveryZoneItem$.$ = deep_clone(in_deliveryZoneItem)
		} else {
			const $deliveryZoneItem = new DeliveryZoneItem()
			$deliveryZoneItem.ID = 0
			this.deliveryZoneItem$.$ = $deliveryZoneItem
		}
		this.saveMode = true
		await this.init_map()
	}
	readonly onDragSuccess = async (event)=>{
		log(this.ctx, Controller_name, 'onDragSuccess', event, this.DeliveryZone)
		set_list_SortID(this.DeliveryZone)
		await this.API_MENUS_dzone_sort()
	}
	readonly API_MENUS_dzone_sort = async ()=>{
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			RoRequestQuery.fill_fireFlyID(requestData, this.fireFlyID)
			const body = {
				SortDetails: []
			}
			for (const deliveryZoneItem of this.DeliveryZone) {
				if (deliveryZoneItem.ID > 0) {
					body.SortDetails.push({
						ID: deliveryZoneItem.ID,
						SortID: deliveryZoneItem.SortID,
					})
				}
			}
			const payload = await this.base_API_MENUS_dzone_sort(requestData, body)
			log(this.ctx, Controller_name, 'API_MENUS_dzone_sort', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly init_map = async ()=>{
		await this.init_google_maps_promise
		this.mapShape = null
		const { LatLngLiteral } = this.restInfo
		const mapOptions = deep_clone(DEFAULT_MAP_OPTIONS)
		mapOptions.center = LatLngLiteral
		await subscribe_wait_timeout(this.delivery_zone_map_el$, I, timeout_ms)
		this.map = new google.maps.Map(this.delivery_zone_map_el$.$, mapOptions)
		// Rest Marker
		new google.maps.Marker({
			position: LatLngLiteral,
			map: this.map,
			icon: {
				url: '/assets/img/ro/restaurant-map.svg',
				size: new google.maps.Size(40, 40),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(20, 21)
			}
		})
		// Creates a drawing manager attached to the map that allows the user to draw markers, lines, and shapes.
		this.drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode: google.maps.drawing.OverlayType.POLYGON,
			drawingControlOptions: {
				drawingModes: [
					google.maps.drawing.OverlayType.POLYGON
				]
			},
			polygonOptions: {
				strokeColor: colors.brandSuccess,
				strokeOpacity: 1,
				strokeWeight: 3,
				fillColor: colors.brandSuccess,
				fillOpacity: 0.19
			},
			map: this.map
		})
		google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (e)=>{
			if (e.type !== google.maps.drawing.OverlayType.MARKER) {
				// Disable drawing mode
				this.enableDrawingMode(false)
				const newShape = e.overlay
				newShape.type = e.type as google.maps.drawing.OverlayType
				this.mapShape = newShape
				this.mapShape.setEditable(true)
			}
		})
		if (this.deliveryZoneItem$.$.ZoneType === ZONE_TYPE_POLYGON) {
			this.onPolygonSelected()
		} else {
			this.onCircleRadiusSelected()
		}
		this.drawOtherShapes()
	}
	readonly drawOtherShapes = ()=>{
		for (const zone of this.DeliveryZone) {
			if (zone.ID !== this.deliveryZoneItem$.$.ID) {
				if (zone.ZoneType === ZONE_TYPE_POLYGON) {
					const paths = this.polygon_LatLngLiteral_paths_(zone.PolygonData)
					this.makePolygon({
						editable: false,
						paths,
						strokeColor: colors.darkGray,
						fillColor: colors.darkGray,
					})
				} else {
					this.makeCircle({
						radius: getMetersByMiles(parseFloat(zone.CircleRadius)),
						strokeColor: colors.darkGray,
						fillColor: colors.darkGray,
					})
				}
			}
		}
	}
	readonly makePolygon = (newOptions)=>{
		const options = {
			map: this.map,
			editable: true,
			strokeColor: colors.brandSuccess,
			strokeOpacity: 1,
			strokeWeight: 3,
			fillColor: colors.brandSuccess,
			fillOpacity: 0.19
		}
		merge(options, newOptions)
		return new google.maps.Polygon(options)
	}
	readonly makeCircle = (newOptions)=>{
		const options = {
			map: this.map,
			center: this.restInfo.LatLngLiteral,
			strokeColor: colors.brandSuccess,
			strokeOpacity: 1,
			strokeWeight: 3,
			fillColor: colors.brandSuccess,
			fillOpacity: 0.19,
		}
		merge(options, newOptions)
		return new google.maps.Circle(options)
	}
	readonly enableDrawingMode = (enable)=>{
		if (enable) {
			this.drawingManager.setOptions({
				drawingControl: true,
				drawingMode: google.maps.drawing.OverlayType.POLYGON,
			})
		} else {
			// Switch back to non-drawing mode after drawing a shape.
			this.drawingManager.setDrawingMode(null)
			this.drawingManager.setOptions({
				drawingControl: false
			})
		}
	}
	readonly onPolygonSelected = ()=>{
		if (this.mapShape) {
			this.mapShape.setMap(null)
		}
		if (isDefined(this.deliveryZoneItem$.$.PolygonData) && this.deliveryZoneItem$.$.PolygonData.length > 0) {
			this.enableDrawingMode(false)
			const paths = this.polygon_LatLngLiteral_paths_(this.deliveryZoneItem$.$.PolygonData)
			// Add Polygon overlay and bind to marker
			this.mapShape = this.makePolygon({
				paths,
			})
		} else {
			this.enableDrawingMode(true)
		}
	}
	readonly clearPolygonShape = ()=>{
		this.deliveryZoneItem$.$.PolygonData = ''
		this.onPolygonSelected()
	}
	readonly onCircleRadiusSelected = ()=>{
		log(this.ctx, Controller_name, 'onCircleRadiusSelected')
		// Disable drawing mode
		this.enableDrawingMode(false)
		if (this.mapShape) {
			this.mapShape.setMap(null)
		}
		// Add circle overlay and bind to marker
		this.mapShape = this.makeCircle({
			radius: getMetersByMiles(parseFloat(this.deliveryZoneItem$.$.CircleRadius))
		})
	}
	readonly onCircleRadiusChanged = ()=>{
		log(this.ctx, Controller_name, 'onCircleRadiusChanged', this.deliveryZoneItem$.$.CircleRadius);
		(
			this.mapShape as google.maps.Circle
		).setRadius(getMetersByMiles(parseFloat(this.deliveryZoneItem$.$.CircleRadius)))
	}
	readonly save = async ()=>{
		log(this.ctx, Controller_name, 'save')
		if (!this.deliveryZoneItem$.$.ZoneType) {
			this.notyf_error('Please choose a zone type')
			return
		} else if (this.deliveryZoneItem$.$.ZoneType === ZONE_TYPE_POLYGON && !this.mapShape) {
			this.notyf_error('Please draw a valid polygon shape')
			return
		}
		this.busy$.$ = true
		try {
			this.deliveryZoneItem$.$.PolygonData = ''
			if (this.deliveryZoneItem$.$.ZoneType === ZONE_TYPE_POLYGON) {
				const mapShape = this.mapShape as google.maps.Polygon
				const length = mapShape.getPath().getLength()
				for (let i = 0; i < length; i++) {
					this.deliveryZoneItem$.$.PolygonData +=
						mapShape.getPath().getAt(i).toUrlValue()
					if (i < length - 1) {
						this.deliveryZoneItem$.$.PolygonData += '|'
					}
				}
			}
			if (this.isNewDeliveryZone) {
				this.DeliveryZone.push(this.deliveryZoneItem$.$)
			} else {
				merge(this.in_deliveryZoneItem, this.deliveryZoneItem$.$)
			}
			await this.close()
			log(this.ctx, Controller_name, 'save', this.deliveryZoneItem$.$)
		} finally {
			this.busy$.$ = false
		}
	}
	private readonly polygon_LatLngLiteral_paths_ = (value:string)=>{
		const a = value.split('|')
		const LatlngLiteral_paths:google.maps.LatLngLiteral[] = []
		for (const item of a) {
			const coord = item.split(',')
			const LatLngLiteral = {
				lat: parseFloat(coord[0]),
				lng: parseFloat(coord[1]),
			}
			LatlngLiteral_paths.push(LatLngLiteral)
		}
		return LatlngLiteral_paths
	}
}
