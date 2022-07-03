import { Chart, ChartOptions, Legend, Tooltip } from 'chart.js'
import { I } from '@ctx-core/combinators'
import { currency_str_ } from '@ctx-core/currency'
import { assign } from '@ctx-core/object'
import { derived$, noinit_subscribe, Readable$, subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import { query_str_, join_url } from '@ctx-core/uri'
import type { QueryParams } from '@menus/api'
import { init_google_maps_promise_b } from '@menus/app'
import { ensure_chart_registry_item, index_axis_T } from '@menus/chart.js'
import { deepmerge } from '@menus/deepmerge'
import { params_fireFlyID$_b } from '@menus/page'
import {
	API_CHARTS_compare_Data_T, API_CHARTS_compare_payload_T, ro_httpClient_b, RoRequestQuery
} from '@menus/ro-http'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import { ro_login_user$_b, ro_login_user$_T, } from '@menus/ro-user-common'
import { Path } from '@menus/route'
import { BaseController } from '@menus/shared-ui-lib'
import { timeout_ms } from '@menus/web-config'
import { is_cordova_app } from '@menus/web-cordova'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
import { all_label } from '../all_label.js'
import { chart_data_, chart_data__controller_T } from '../chart_data_.js'
import type { chart_o_T } from '../chart_o_T.js'
import { Chart_options_ } from '../Chart_options_.js'
import { charts_other_rest_a$_b } from '../charts_other_rest_a$_b.js'
import { charts_proximity$_b } from '../charts_proximity$_b.js'
import { ChartType, ChartType_line, ChartType_select_value_T, ChartType_values } from '../ChartType.js'
import { ChartType_ } from '../ChartType_.js'
import { OtherRest } from '../OtherRest.js'
import type { MenuChartDataset } from '../MenuChartDataset.js'
import { your_label } from '../your_label.js'
import { ztrends_label } from '../ztrends_label.js'
const Controller_name = 'ItemCompareChart_c'
export class ItemCompareChart_c extends BaseController<ro_restaurant_ui_ChartsTab_Ctx> implements chart_data__controller_T {
	readonly ChartCompare_busy$:Writable$<boolean> = writable$(false)
	readonly charts_other_rest_a$ = charts_other_rest_a$_b(this.ctx)
	readonly charts_proximity$ = charts_proximity$_b(this.ctx)
	readonly ChartType_select_value$:Writable$<ChartType_select_value_T> = writable$(ChartType_values[ChartType_line][0])
	readonly exclude_catering$:Writable$<boolean> = writable$(false)
	readonly init_google_maps_promise = init_google_maps_promise_b(this.ctx)
	readonly item_compare_chart_canvas$:Writable$<HTMLCanvasElement> = writable$(null)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
	readonly ro_restaurant$ = ro_restaurant$_b(this.ctx)
	readonly ChartType$:Readable$<ChartType> = derived$(this.ChartType_select_value$,//region
		(ChartType_select_value:ChartType_select_value_T)=>{
			return ChartType_select_value?.type
		}
	)//endregion
	readonly index_axis$:Readable$<index_axis_T> = derived$(this.ChartType_select_value$,//region
		(ChartType_select_value:ChartType_select_value_T)=>{
			return ChartType_select_value?.index_axis
		}
	)//endregion
	readonly chart_options$:Readable$<ChartOptions> = derived$(this.ChartType_select_value$,//region
		(ChartType_select_value)=>{
			const { index_axis } = ChartType_select_value
			const options = assign(
				(index_axis ? { index_axis } : {}) as ChartOptions,
				{
					responsive: true,
					maintainAspectRatio: false,
					animation: {
						animateScale: true
					},
					plugins: {
						legend: { position: 'bottom' },
						tooltip: {
							mode: 'index',
							callbacks: {
								title: (tooltipItems)=>{
									return tooltipItems[0].label
								},
								label: (tooltipItem)=>{
									const { dataset, raw } = tooltipItem
									const { label } = dataset
									const price_txt = price_txt_(raw)
									if (label === ztrends_label) {
										return `z-Trend suggested price: ${price_txt}`
									} else if (label === your_label) {
										return `Your Price is ${price_txt}`
									} else if (/^Other surrounding /.test(label)) {
										return `Other surrounding ${this.ro_restaurant$.$.Cuisine} is ${price_txt}`
									} else if (label === all_label) {
										return
									} else {
										return `${label} is ${price_txt}`
									}
								}
							}
						}
					},
				} as ChartOptions)
			deepmerge(options, Chart_options_(ChartType_select_value.type))
			return options
		}
	)//endregion
	API_CHARTS_compare_payload = {
		Pagination: {
			TotalRow: 0
		}
	} as API_CHARTS_compare_payload_T
	item_compare_chart_o:chart_o_T = {
		pageSize: 25,
		chart: null
	}
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		ensure_chart_registry_item(Legend, Tooltip)
		this.unsubscribers.push(
			noinit_subscribe(this.charts_proximity$, this.load_data),
			noinit_subscribe(this.item_compare_chart_canvas$, this.reset_item_compare_chart),
			noinit_subscribe(this.ChartType_select_value$, this.reset_item_compare_chart),
			noinit_subscribe(this.exclude_catering$, this.load_API_CHARTS_compare_payload),
			noinit_subscribe(this.charts_other_rest_a$, this.onchange_charts_other_rest_a),
		)
		await this.load_data()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		this.ChartCompare_busy$.$ = true
		try {
			const params_fireFlyID = await subscribe_wait_timeout(this.params_fireFlyID$, I, timeout_ms)
			const API_CHARTS_compare_payload = await this.API_CHARTS_compare(params_fireFlyID, this.exclude_catering$.$)
			// Chart Compare Info
			this.API_CHARTS_compare_payload = API_CHARTS_compare_payload
		} finally {
			this.ChartCompare_busy$.$ = false
		}
		await this.reset_item_compare_chart()
	}
	readonly reset_item_compare_chart = ()=>{
		const item_compare_chart_canvas = this.item_compare_chart_canvas$.$
		if (!item_compare_chart_canvas) return
		const data = chart_data_<API_CHARTS_compare_Data_T>(this, {
			identifier_key: 'id',
			allow_others: true,
			allow_all: true,
			allow_z_trends: true,
			union_by_other_rests: false,
			your_item_a: this.API_CHARTS_compare_payload?.Data || [],
			other_rest_item_a_: o=>o.API_CHARTS_compare_payload?.Data || [],
			yours_value_column_: o=>o.Yours.AvgPrice,
			others_value_column_: o=>o.Others?.AvgPrice,
			all_value_column_: o=>o.All?.AvgPrice,
			label_: o=>o.Name,
		})
		this.item_compare_chart_o.chart?.destroy()
		this.item_compare_chart_o.chart = new Chart(item_compare_chart_canvas, {
			type: ChartType_(this.ChartType$.$),
			data,
			options: this.chart_options$.$,
		})
		item_compare_chart_canvas.addEventListener('click', async (evt)=>{
			const activePoints = this.item_compare_chart_o.chart.getElementsAtEventForMode(
				evt, 'nearest', { intersect: true }, false
			)
			if (activePoints.length) {
				// get the internal index of slice in pie chart
				const clicked_element_idx = activePoints[0].index
				const clicked_dataset_idx = activePoints[0].datasetIndex
				// get specific label by index
				const label =
					this.item_compare_chart_o.chart.data.labels[clicked_element_idx] as string
				// get value by index
				const dataset:MenuChartDataset =
					this.item_compare_chart_o.chart.data.datasets[clicked_dataset_idx]
				/* other stuff that requires slice's label and value */
				const query_params = {} as QueryParams
				const ro_restaurant$ = this.ro_restaurant$.$
				query_params.keywords = label
				query_params.lat = ro_restaurant$.Latitude
				query_params.lng = ro_restaurant$.Longitude
				query_params.proximity = this.charts_proximity$.$
				if (dataset.fireFlyID) {
					query_params.fireFlyID = dataset.fireFlyID
				} else if (dataset.cuisineID) {
					query_params.cuisineID = dataset.cuisineID.toString()
				}
				window.open(join_url([
					Path.RO.BASE,
					Path.RO.MANAGE_RESTAURANT,
					this.params_fireFlyID$.$,
					Path.RO.MENU_ITEMS,
					query_str_(query_params),
				]), is_cordova_app ? '_system' : '_blank')
			}
		})
	}
	readonly load_API_CHARTS_compare_payload = async (exclude_catering:boolean)=>{
		this.ChartCompare_busy$.$ = true
		try {
			const payloads = await Promise.all([
				this.API_CHARTS_compare(this.params_fireFlyID$.$, exclude_catering),
				...this.charts_other_rest_a$.$.map(charts_other_rest=>
					this.API_CHARTS_compare(charts_other_rest.FireFlyID, exclude_catering))
			])
			// Chart Compare Info
			this.API_CHARTS_compare_payload = payloads[0]
			this.charts_other_rest_a$.$.forEach((charts_other_rest, i)=>{
				charts_other_rest.API_CHARTS_compare_payload = payloads[i + 1]
			})
		} finally {
			this.ChartCompare_busy$.$ = false
		}
		await this.reset_item_compare_chart()
	}
	readonly onchange_charts_other_rest_a = async (charts_other_rest_a:OtherRest[])=>{
		try {
			for (const charts_other_rest of charts_other_rest_a) {
				if (!charts_other_rest || charts_other_rest.API_CHARTS_compare_payload) continue
				this.ChartCompare_busy$.$ = true
				charts_other_rest.API_CHARTS_compare_payload =
					await this.API_CHARTS_compare(charts_other_rest.FireFlyID, this.exclude_catering$.$)
			}
		} finally {
			if (this.ChartCompare_busy$.$) {
				this.charts_other_rest_a$.refresh()
				this.ChartCompare_busy$.$ = false
			}
		}
	}
	private API_CHARTS_compare = async (fireFlyID:string, exclude_catering:boolean)=>{
		const requestData = new RoRequestQuery()
		const ro_login_user = await subscribe_wait_timeout(this.ro_login_user$, I, timeout_ms)
		RoRequestQuery.fill_login_user(requestData, ro_login_user)
		requestData.ff = fireFlyID
		requestData.excludecatering = exclude_catering
		requestData.proximity = this.charts_proximity$.$
		// requestData.ps = this.item_compare_chart_o.pageSize;
		// Get Chart Compare Info
		return this.ro_httpClient.API_CHARTS_compare(requestData)
	}
}
function price_txt_(value) {
	return currency_str_(parseFloat(value).toFixed(1), 'USD')
}
