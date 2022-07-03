import { Chart, ChartOptions, Legend, Tooltip } from 'chart.js'
import { assign } from '@ctx-core/object'
import { I } from '@ctx-core/combinators'
import { round } from '@ctx-core/number'
import { query_str_, join_url } from '@ctx-core/uri'
import { derived$, noinit_subscribe, Readable$, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { deepmerge } from '@menus/deepmerge'
import { BaseController } from '@menus/shared-ui-lib'
import type { API_CHARTS_menucompetition_payload_T } from '@menus/ro-http'
import { params_fireFlyID$_b } from '@menus/page'
import { Path } from '@menus/route'
import { log } from '@menus/util'
import { API_CHARTS_menucompetition_Data_T, ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import { ro_login_user$_b, ro_login_user$_T } from '@menus/ro-user-common'
import { timeout_ms } from '@menus/web-config'
import { ensure_chart_registry_item, index_axis_T } from '@menus/chart.js'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
import { ChartType_radar, ChartType_values } from '../ChartType.js'
import type { ChartType, ChartType_select_value_T, } from '../ChartType.js'
import { charts_other_rest_a$_b } from '../charts_other_rest_a$_b.js'
import { charts_proximity$_b } from '../charts_proximity$_b.js'
import { Chart_options_ } from '../Chart_options_.js'
import { ChartType_ } from '../ChartType_.js'
import type { chart_o_T } from '../chart_o_T.js'
import { chart_data_ } from '../chart_data_.js'
import type { MenuChartDataset } from '../MenuChartDataset.js'
import { OtherRest } from '../OtherRest.js'
const Controller_name = 'ChartMenuCompetition_c'
export class ChartMenuCompetition_c extends BaseController<ro_restaurant_ui_ChartsTab_Ctx> {
	readonly charts_other_rest_a$ = charts_other_rest_a$_b(this.ctx)
	readonly charts_proximity$ = charts_proximity$_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_restaurant$ = ro_restaurant$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
	readonly ChartMenuCompetition_busy$:Writable$<boolean> = writable$(false)
	readonly ChartType_select_value$:Writable$<ChartType_select_value_T> = writable$(ChartType_values[ChartType_radar][0])
	readonly menu_competition_bar_chart_canvas$:Writable$<HTMLCanvasElement> = writable$(null)
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
	menu_competition_chart_o:chart_o_T = {
		pageSize: 25,
		chart: null
	}
	API_CHARTS_menucompetition_payload = {
		Pagination: {
			TotalRow: 0
		}
	} as API_CHARTS_menucompetition_payload_T
	readonly chart_options:Readable$<ChartOptions> = derived$(this.ChartType_select_value$,//region
		(ChartType_select_value)=>{
			const { index_axis } = ChartType_select_value
			const $chart_options:ChartOptions = assign(
				(index_axis ? { index_axis } : {}) as ChartOptions,
				{
					parsing: {
						xAxisKey: 'id',
					},
					responsive: true,
					maintainAspectRatio: false,
					animation: {
						animateScale: true
					},
					plugins: {
						tooltip: {
							callbacks: {
								title: (tooltipItems)=>{
									log(this.ctx, 'hover', tooltipItems)
									const [{ dataset, datasetIndex }] = tooltipItems
									const { data } = dataset
									return `${round(data[datasetIndex] as number)}%`
								},
								label: (tooltipItems)=>{
									log(this.ctx, 'hover', tooltipItems)
									const { dataset, raw } = tooltipItems
									const { label } = dataset
									return `${label}: ${round(raw as number)}%`
								},
							}
						},
						legend: { position: 'bottom' },
					},
				}
			)
			deepmerge($chart_options, Chart_options_(this.ChartType$.$))
			return $chart_options
		}
	)//endregion
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		ensure_chart_registry_item(Tooltip, Legend)
		this.unsubscribers.push(
			noinit_subscribe(this.charts_proximity$, this.load_data),
			noinit_subscribe(this.menu_competition_bar_chart_canvas$, this.reset_menu_competition_chart),
			noinit_subscribe(this.ChartType_select_value$, this.reset_menu_competition_chart),
			noinit_subscribe(this.charts_other_rest_a$, this.onchange_charts_other_rest_a),
		)
		await this.load_data()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		this.ChartMenuCompetition_busy$.$ = true
		try {
			const params_fireFlyID = await subscribe_wait_timeout(this.params_fireFlyID$, I, timeout_ms)
			const API_CHARTS_menucompetition_payload = await this.API_CHARTS_menucompetition(params_fireFlyID)
			this.API_CHARTS_menucompetition_payload = API_CHARTS_menucompetition_payload
		} finally {
			this.ChartMenuCompetition_busy$.$ = false
		}
		await this.reset_menu_competition_chart()
	}
	readonly reset_menu_competition_chart = ()=>{
		const menu_competition_bar_chart_canvas = this.menu_competition_bar_chart_canvas$.$
		if (!menu_competition_bar_chart_canvas) return
		const data = chart_data_<API_CHARTS_menucompetition_Data_T>(this, {
			identifier_key: 'id',
			allow_others: true,
			allow_all: false,
			allow_z_trends: false,
			union_by_other_rests: true,
			your_item_a: this.API_CHARTS_menucompetition_payload?.Data || [],
			other_rest_item_a_: o=>o.API_CHARTS_menucompetition_payload?.Data || [],
			yours_value_column_: o=>o.Yours_Percent,
			others_value_column_: o=>o.Others_Percent,
			all_value_column_: _o=>0,
			label_: o=>o.DishName,
			before_update: chart_data=>{
				for (const dataset of chart_data.datasets) {
					dataset.tempData = dataset.data
					dataset.data = []
					let sum = 0
					for (const number2 of dataset.tempData) {
						sum += number2 as number
					}
					dataset.sum = round(sum)
					for (const number2 of dataset.tempData) {
						dataset.data.push(100.0 * (number2 as number / dataset.sum))
					}
				}
			}
		})
		this.menu_competition_chart_o.chart?.destroy()
		this.menu_competition_chart_o.chart = new Chart(menu_competition_bar_chart_canvas, {
			type: ChartType_(this.ChartType$.$),
			data,
			options: this.chart_options.$,
		})
		menu_competition_bar_chart_canvas.addEventListener('click', (evt)=>{
			const activePoints =
				this.menu_competition_chart_o.chart.getElementsAtEventForMode(
					evt, 'nearest', { intersect: true }, false
				)
			this.menu_competition_chart_o.chart.getElementsAtEventForMode(
				evt, 'dataset', { intersect: true }, false
			)
			log(this.ctx, 'Menu Competition', activePoints)
			if (activePoints.length > 0) {
				// get the internal index of slice in pie chart
				const clickedElementIndex = activePoints[0].index
				const clickedDatasetIndex = activePoints[0].datasetIndex
				// get specific label by index
				const label = this.menu_competition_chart_o.chart.data.labels[clickedElementIndex]
				// get value by index
				const dataset:MenuChartDataset =
					this.menu_competition_chart_o.chart.data.datasets[clickedDatasetIndex]
				/* other stuff that requires slice's label and value */
				const query_params:any = {}
				const ro_restaurant = this.ro_restaurant$.$
				query_params.lat = ro_restaurant.Latitude
				query_params.lng = ro_restaurant.Longitude
				query_params.proximity = this.charts_proximity$.$
				query_params.keywords = label
				if (dataset.fireFlyID) {
					query_params.fireFlyID = dataset.fireFlyID
				} else if (dataset.cuisineID) {
					query_params.cuisineID = dataset.cuisineID
				}
				log(this.ctx, 'Menu Competition', dataset)
				window.open(join_url([
					`${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
					this.params_fireFlyID$.$,
					Path.RO.MENU_ITEMS,
					query_str_(query_params)
				]), '_blank')
			}
		})
	}
	readonly onchange_charts_other_rest_a = async (charts_other_rest_a:OtherRest[])=>{
		try {
			for (const charts_other_rest of charts_other_rest_a) {
				if (!charts_other_rest || charts_other_rest.API_CHARTS_menucompetition_payload) continue
				this.ChartMenuCompetition_busy$.$ = true
				charts_other_rest.API_CHARTS_menucompetition_payload =
					await this.API_CHARTS_menucompetition(charts_other_rest.FireFlyID)
			}
		} finally {
			if (this.ChartMenuCompetition_busy$.$) {
				this.charts_other_rest_a$.refresh()
				this.ChartMenuCompetition_busy$.$ = false
			}
		}
	}
	readonly API_CHARTS_menucompetition = async (fireFlyID:string)=>{
		const requestData = new RoRequestQuery()
		const ro_login_user = await subscribe_wait_timeout(this.ro_login_user$, I, timeout_ms)
		RoRequestQuery.fill_login_user(requestData, ro_login_user)
		requestData.ff = fireFlyID
		requestData.proximity = this.charts_proximity$.$
		requestData.ps = this.menu_competition_chart_o.pageSize
		// Menu Competition
		return this.ro_httpClient.API_CHARTS_menucompetition(requestData)
	}
}
