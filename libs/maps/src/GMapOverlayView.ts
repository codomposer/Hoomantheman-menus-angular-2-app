import { has_dom } from '@ctx-core/dom'
import { isDefined } from '@menus/util'
import { SCREEN_SM_MIN } from '@menus/css'
import { GMapOverlayViewConfig } from './GMapOverlayViewConfig.js'
export class GMapOverlayView {
	private overlayView:any
	private config:GMapOverlayViewConfig
	constructor(
		element,
		map,
		clickCallback,
		config = new GMapOverlayViewConfig()
	) {
		this.overlayView = new google.maps.OverlayView()
		this.bounds = null
		this.element = element
		this.map = map
		this.clickCallback = clickCallback
		this.config = config
		this.setMap(map)
		if (has_dom) {
			window.addEventListener('resize', this.draw)
		}
	}
	onDestroy = ()=>{
		if (has_dom) {
			window.removeEventListener('resize', this.draw)
		}
	}
	get bounds() {return this.overlayView.bounds}//region
	set bounds(value) {this.overlayView.bounds = value}//endregion
	clickCallback = ()=>{return this.overlayView.clickCallback()}
	get data() {return this.overlayView.data}//region
	set data(value) {this.overlayView.data = value}//endregion
	get element() {return this.overlayView.element}//region
	set element(value) {this.overlayView.element = value}//endregion
	get floatPane() {return this.getPanes().floatPane}
	getMap = ()=>{return this.overlayView.getMap()}
	setMap = (map)=>{this.overlayView.setMap(map)}
	getPanes = ()=>{return this.overlayView.getPanes()}
	getProjection = ()=>{return this.overlayView.getProjection()}
	get map() {return this.overlayView.map}//region
	set map(value) {this.overlayView.map = value}//endregion
	onAdd = ()=>{
		// Add the element to the "overlayLayer" pane.
		this.floatPane.appendChild(this.element)
	}
	draw = ()=>{
		const overlayProjection = this.getProjection()
		if (this.bounds && isDefined(overlayProjection)) {
			setTimeout(()=>{
				const width = this.element.offsetWidth
				const height = this.element.offsetHeight
				const defaultStyle = {
					top: 'auto',
					bottom: 'auto',
					zIndex: 1,
				}
				if (window.innerWidth >= SCREEN_SM_MIN) {
					const sw =
						overlayProjection.fromLatLngToContainerPixel(
							this.bounds.getSouthWest())
					const ne =
						overlayProjection.fromLatLngToContainerPixel(
							this.bounds.getNorthEast())
					Object.assign(this.element.style, defaultStyle, {
						left: `${sw.x - (
							width / 2)}px`,
						top: `${ne.y - height - this.config.marginBottom}px`,
						minWidth: '370px',
					})
					this.resetElement()
				} else {
					Object.assign(this.element.style, defaultStyle, {
						left: 0,
						bottom: 0,
						minWidth: '100vw',
					})
					const container = this.findContainer()
					if (container) {
						const scrollButtons:HTMLElement = container.querySelector(
							'.gm-bundled-control-on-bottom'
						)
						if (scrollButtons) {
							scrollButtons.style.display = 'none'
						}
						container.querySelectorAll<HTMLElement>(
							`.gmnoprint, [rel='noopener']`
						).forEach(el=>
							el.style.display = 'none'
						)
					}
				}
				this.element.style.visibility = 'visible'
			})
		} else {
			this.element.style.visibility = 'hidden'
			this.resetElement()
		}
	}
	resetElement = ()=>{
		const container = this.findContainer()
		if (container) {
			const scollButtons:HTMLElement = container.querySelector(
				'.gm-bundled-control-on-bottom'
			)
			if (scollButtons) {
				scollButtons.style.display = ''
			}
			container.querySelectorAll<HTMLElement>(
				`.gmnoprint, [rel='noopener']`
			).forEach(el=>
				el.style.display = ''
			)
		}
	}
	findContainer:()=>HTMLElement = ()=>{
		return this.element.closest('#map')
	}
	onRemove = ()=>{
		this.element.parentNode.removeChild(this.element)
		this.element = null
	}
	open = (latlng, data)=>{
		this.data = data
		this.setBounds(new google.maps.LatLngBounds(latlng, latlng))
		this.draw()
	}
	close = ()=>{
		this.setBounds(null)
		this.draw()
	}
	private setBounds = (bounds)=>{
		this.bounds = bounds
	}
}
