import { CategoryScale, Chart, LinearScale, PieController } from 'chart.js'
import { assign } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { I } from '@ctx-core/combinators'
import { round } from '@ctx-core/number'
import { derived$, noinit_subscribe, Readable$, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { chartColors, timeout_ms } from '@menus/web-config'
import { ensure_chart_registry_item } from '@menus/chart.js'
import { BaseController } from '@menus/shared-ui-lib'
import { init_google_maps_promise_b } from '@menus/app'
import {
	API_CHARTS_resttype_payload_T, error_API_CHARTS_resttype_payload_T, ro_httpClient_b, RoRequestQuery,
	success_API_CHARTS_resttype_payload_T
} from '@menus/ro-http'
import { ro_login_user$_b, ro_login_user$_T } from '@menus/ro-user-common'
import { params_fireFlyID$_b } from '@menus/page'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
import { charts_proximity$_b } from '../charts_proximity$_b.js'
import type { OtherRest } from '../OtherRest'
import { charts_other_rest_a$_b } from '../charts_other_rest_a$_b.js'
const Controller_name = 'ChartRestType_c'
export class ChartRestType_c extends BaseController<ro_restaurant_ui_ChartsTab_Ctx> {
	readonly charts_other_rest_a$ = charts_other_rest_a$_b(this.ctx)
	readonly charts_proximity$ = charts_proximity$_b(this.ctx)
	readonly ChartRestType_busy$:Writable$<boolean> = writable$(false)
	readonly ChartRestType_canvas_a$:Writable$<HTMLCanvasElement[]> = writable$([])
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
	readonly API_CHARTS_resttype_payload$:Writable$<API_CHARTS_resttype_payload_T> = writable$(null)
	readonly chart_a$:Writable$<Chart<'pie'>[]> = writable$([])
	readonly ChartRestType_a$:Readable$<ChartRestType_T[]> = derived$(tup(this.charts_other_rest_a$, this.API_CHARTS_resttype_payload$),//region
		([charts_other_rest_a, API_CHARTS_resttype_payload])=>{
			return (
				API_CHARTS_resttype_payload
				? (
					[{
						Name: 'you',
						API_CHARTS_resttype_payload,
					}, ...charts_other_rest_a.map(r=>({
						Name: r.Name,
						API_CHARTS_resttype_payload: r.API_CHARTS_resttype_payload
					}))
					] as ChartRestType_T[]
				) : []
			)
		}
	)//endregion
	readonly valid_ChartRestType_a$:Readable$<ChartRestType_T[]> = derived$(this.ChartRestType_a$,//region
		(ChartRestType_a:ChartRestType_T[])=>{
			const valid_ChartRestType_a = (ChartRestType_a || []).filter(ChartRestType=>{
				const API_CHARTS_resttype_payload =
					ChartRestType.API_CHARTS_resttype_payload as error_API_CHARTS_resttype_payload_T
				return API_CHARTS_resttype_payload && API_CHARTS_resttype_payload.Status !== 'error'
			}).map(ChartRestType=>{
				const API_CHARTS_resttype_payload =
					ChartRestType.API_CHARTS_resttype_payload as success_API_CHARTS_resttype_payload_T
				const totalCount = API_CHARTS_resttype_payload.reduce(
					(totalCount, API_CHARTS_resttype_payload_item)=>
						totalCount + API_CHARTS_resttype_payload_item.Count,
					0)
				return assign(ChartRestType, {
					bgColors: [chartColors.red, chartColors.blue,],
					labels: API_CHARTS_resttype_payload.map(API_CHARTS_resttype_payload_item=>
						API_CHARTS_resttype_payload_item.RestaurantType),
					arcs: API_CHARTS_resttype_payload.map(API_CHARTS_resttype_payload_item=>
						round((API_CHARTS_resttype_payload_item.Count / totalCount) * 100)),
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
			noinit_subscribe(this.charts_proximity$, this.load_data),
			noinit_subscribe(this.ChartRestType_canvas_a$, this.reset_chart_a),
			noinit_subscribe(this.charts_other_rest_a$, this.onchange_charts_other_rest_a),
		)
		await this.load_data()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		this.ChartRestType_busy$.$ = true
		try {
			const params_fireFlyID = await subscribe_wait_timeout(this.params_fireFlyID$, I, timeout_ms)
			const requestData:RoRequestQuery = await this.requestData_(params_fireFlyID)
			this.API_CHARTS_resttype_payload$.$ = await this.ro_httpClient.API_CHARTS_resttype(requestData)
			await this.reset_chart_a()
		} finally {
			this.ChartRestType_busy$.$ = false
		}
	}
	readonly reset_chart_a = async ()=>{
		const ChartRestType_canvas_a = this.ChartRestType_canvas_a$.$
		const valid_ChartRestType_a = this.valid_ChartRestType_a$.$
		if (!ChartRestType_canvas_a || ChartRestType_canvas_a.filter(I).length !== valid_ChartRestType_a.length) return
		const chart_a = this.chart_a$.$ || []
		this.chart_a$.set(
			valid_ChartRestType_a.map((valid_ChartRestType, idx)=>{
				const data = {
					labels: valid_ChartRestType.labels,
					datasets: [
						{
							data: valid_ChartRestType.arcs,
							backgroundColor: valid_ChartRestType.bgColors,
							hoverBackgroundColor: valid_ChartRestType.bgColors
						}
					]
				}
				chart_a[idx]?.destroy()
				// For a pie chart
				return new Chart<'pie'>(ChartRestType_canvas_a[idx], {
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
									label({ label, raw }) {
										return `${label}: ${raw}%`
									}
								}
							}
						},
					}
				})
			})
		)
	}
	readonly onchange_charts_other_rest_a = async (charts_other_rest_a:OtherRest[])=>{
		try {
			for (const charts_other_rest of charts_other_rest_a) {
				if (!charts_other_rest || charts_other_rest.API_CHARTS_resttype_payload) continue
				this.ChartRestType_busy$.$ = true
				const requestData:RoRequestQuery = await this.requestData_(charts_other_rest.FireFlyID)
				charts_other_rest.API_CHARTS_resttype_payload = await this.ro_httpClient.API_CHARTS_resttype(requestData)
			}
		} finally {
			if (this.ChartRestType_busy$.$) {
				this.charts_other_rest_a$.refresh()
				this.ChartRestType_busy$.$ = false
			}
		}
	}
	readonly requestData_ = async (fireFlyID:string)=>{
		const requestData = new RoRequestQuery()
		const ro_login_user = await subscribe_wait_timeout(this.ro_login_user$, I, timeout_ms)
		RoRequestQuery.fill_login_user(requestData, ro_login_user)
		requestData.ff = fireFlyID
		requestData.proximity = this.charts_proximity$.$
		return requestData
	}
}
export interface ChartRestType_T {
	Name:string
	API_CHARTS_resttype_payload:API_CHARTS_resttype_payload_T
	chart?:Chart<'pie'>
	labels?:string[]
	bgColors?:string[]
	arcs:number[]
}
