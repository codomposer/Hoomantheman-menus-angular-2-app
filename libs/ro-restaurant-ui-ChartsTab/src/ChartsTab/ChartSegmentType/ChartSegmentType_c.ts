import { CategoryScale, Chart, LinearScale, PieController } from 'chart.js'
import { assign } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { I } from '@ctx-core/combinators'
import { derived$, Readable$, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import { ensure_chart_registry_item } from '@menus/chart.js'
import {
	API_CHARTS_segment_payload_T, error_API_CHARTS_segment_payload_T, ro_httpClient_b, RoRequestQuery,
	success_API_CHARTS_segment_payload_T
} from '@menus/ro-http'
import { chartColorsArray, timeout_ms } from '@menus/web-config'
import { params_fireFlyID$_b } from '@menus/page'
import { ro_login_user$_b, ro_login_user$_T } from '@menus/ro-user-common'
import { init_google_maps_promise_b } from '@menus/app'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx'
import { charts_proximity$_b } from '../charts_proximity$_b.js'
import { charts_other_rest_a$_b } from '../charts_other_rest_a$_b.js'
const Controller_name = 'ChartSegmentType_c'
export class ChartSegmentType_c extends BaseController<ro_restaurant_ui_ChartsTab_Ctx> {
	readonly charts_other_rest_a$ = charts_other_rest_a$_b(this.ctx)
	readonly charts_proximity$ = charts_proximity$_b(this.ctx)
	readonly ChartSegmentType_busy$:Writable$<boolean> = writable$(false)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly ro_restaurant$ = ro_restaurant$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
	readonly ChartSegmentType_canvas_a$:Writable$<HTMLCanvasElement[]> = writable$([])
	readonly API_CHARTS_segment_payload$:Writable$<API_CHARTS_segment_payload_T> = writable$(null)
	readonly chart_a$:Writable$<Chart<'pie'>[]> = writable$([])
	readonly ChartSegmentType_a$:Readable$<ChartSegmentType_T[]> = derived$(tup(this.charts_other_rest_a$, this.API_CHARTS_segment_payload$),//region
		([charts_other_rest_a, API_CHARTS_segment_payload])=>{
			return (
				API_CHARTS_segment_payload
				? (
					[{
						Name: 'you',
						API_CHARTS_segment_payload,
					}, ...charts_other_rest_a.map((r)=>({
						Name: r.Name,
						API_CHARTS_segment_payload: r.API_CHARTS_segment_payload,
					}))] as ChartSegmentType_T[]
				) : []
			)
		}
	)//endregion
	readonly valid_ChartSegmentType_a$:Readable$<ChartSegmentType_T[]> = derived$(this.ChartSegmentType_a$,//region
		(ChartSegmentType_a)=>{
			let bgColors_index = 0
			const valid_ChartRestType_a =
				(ChartSegmentType_a || []).filter(ChartSegmentType=>{
					const API_CHARTS_resttype_payload =
						ChartSegmentType.API_CHARTS_segment_payload as error_API_CHARTS_segment_payload_T
					return API_CHARTS_resttype_payload && API_CHARTS_resttype_payload.Status !== 'error'
				}).map($ChartSegmentType=>{
					const API_CHARTS_segment_payload = $ChartSegmentType.API_CHARTS_segment_payload as success_API_CHARTS_segment_payload_T
					const bgColors_cache = API_CHARTS_segment_payload.reduce((bgColorsCache, API_CHARTS_segment_payload_item)=>{
						return assign(bgColorsCache, {
							[API_CHARTS_segment_payload_item.SegmentID]: (
								bgColorsCache[API_CHARTS_segment_payload_item.SegmentID]
								|| chartColorsArray[bgColors_index++]
							)
						})
					}, {} as Record<number, string>)
					return assign($ChartSegmentType, {
						labels: API_CHARTS_segment_payload.map(API_CHARTS_segment_payload=>
							API_CHARTS_segment_payload.SegmentName),
						bgColors: API_CHARTS_segment_payload.map(API_CHARTS_segment_payload=>
							bgColors_cache[API_CHARTS_segment_payload.SegmentID]),
						arcs: API_CHARTS_segment_payload.map(API_CHARTS_segment_payload=>
							API_CHARTS_segment_payload.Inc_Percent),
					})
				})
			return valid_ChartRestType_a
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		ensure_chart_registry_item(PieController, CategoryScale, LinearScale)
		this.unsubscribers.push(
			this.charts_proximity$.subscribe(this.load_data),
			// this.ChartSegmentType_canvas_a$.subscribe(this.onchange_ChartSegmentType_canvas_a1),
			this.ChartSegmentType_canvas_a$.subscribe(this.reset_chart_a),
		)
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		this.ChartSegmentType_busy$.$ = true
		try {
			const requestData:RoRequestQuery = await this.requestData_()
			const API_CHARTS_segment_payload = await this.ro_httpClient.API_CHARTS_segment(requestData)
			this.API_CHARTS_segment_payload$.$ = API_CHARTS_segment_payload
		} finally {
			this.ChartSegmentType_busy$.$ = false
		}
	}
	readonly reset_chart_a = (ChartSegmentType_canvas_a:HTMLCanvasElement[])=>{
		const chart_a = this.chart_a$.$ || []
		for (const chart of chart_a) {
			chart.destroy()
		}
		if (!ChartSegmentType_canvas_a) return
		const valid_ChartSegmentType_a = this.valid_ChartSegmentType_a$.$
		this.chart_a$.set(
			valid_ChartSegmentType_a.map($ChartSegmentType=>{
				const data = {
					labels: $ChartSegmentType.labels,
					datasets: [
						{
							data: $ChartSegmentType.arcs,
							backgroundColor: $ChartSegmentType.bgColors
						}
					]
				}
				return new Chart<'pie'>(ChartSegmentType_canvas_a, {
					type: 'pie',
					data,
					options: {
						maintainAspectRatio: false,
						animation: {
							animateRotate: true,
							animateScale: true,
						},
						plugins: {
							legend: {
								display: false
							},
							tooltip: {
								callbacks: {
									label(tooltipItem) {
										const { dataset, label, raw } = tooltipItem
										// calculate the total of this data set
										const total = (dataset.data as number[]).reduce(
											(previousValue, currentValue2, _currentIndex, _array)=>{
												return previousValue + currentValue2
											})
										// get the current items value
										const raw_number = raw as number
										// calculate the percentage based on the total and current item,
										// also this does a rough rounding to give a whole number
										const percentage = Math.floor(((raw_number / total) * 100) + 0.5)
										return `${label}: ${percentage}%`
									}
								}
							}
						},
					}
				})
			})
		)
	}
	readonly requestData_ = async ()=>{
		const requestData = new RoRequestQuery()
		await subscribe_wait_timeout(this.ro_restaurant$, I, timeout_ms)
		const ro_login_user = await subscribe_wait_timeout(this.ro_login_user$, I, timeout_ms)
		RoRequestQuery.fill_login_user(requestData, ro_login_user)
		requestData.ff = this.params_fireFlyID$.$
		requestData.proximity = this.charts_proximity$.$
		return requestData
	}
}
export interface ChartSegmentType_T {
	Name:string
	API_CHARTS_segment_payload:API_CHARTS_segment_payload_T
	chart?:Chart<'pie'>
	labels?:string[]
	bgColors?:string[]
	arcs?:number[]
}
