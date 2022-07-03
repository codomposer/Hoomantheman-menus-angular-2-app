import { Chart, ChartOptions, ChartType, Legend, Tooltip } from 'chart.js'
import { assign } from '@ctx-core/object'
import { I } from '@ctx-core/combinators'
import { round } from '@ctx-core/number'
import { query_str_, join_url } from '@ctx-core/uri'
import { derived$, noinit_subscribe, Readable$, subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { deepmerge } from '@menus/deepmerge'
import { BaseController } from '@menus/shared-ui-lib'
import { ensure_chart_registry_item, index_axis_T } from '@menus/chart.js'
import {
	API_CHARTS_missingmenu_Data_T, API_CHARTS_missingmenu_payload_T, ro_httpClient_b, RoRequestQuery
} from '@menus/ro-http'
import { deep_clone, log } from '@menus/util'
import { params_fireFlyID$_b } from '@menus/page'
import { Path } from '@menus/route'
import { ro_login_user$_b, ro_login_user$_T } from '@menus/ro-user-common'
import { timeout_ms } from '@menus/web-config'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import type { ro_restaurant_ui_ChartsTab_Ctx } from '../../ro_restaurant_ui_ChartsTab_Ctx.js'
import { Chart_options_ } from '../Chart_options_.js'
import { ChartType_ } from '../ChartType_.js'
import type { chart_o_T } from '../chart_o_T.js'
import { chart_data_ } from '../chart_data_.js'
import { charts_other_rest_a$_b } from '../charts_other_rest_a$_b.js'
import { charts_proximity$_b } from '../charts_proximity$_b.js'
import { ChartType_line, ChartType_select_value_T, ChartType_values } from '../ChartType.js'
import { OtherRest } from '../OtherRest.js'
const Controller_name = 'ChartMissingMenu_c'
export class ChartMissingMenu_c extends BaseController<ro_restaurant_ui_ChartsTab_Ctx> {
	readonly charts_other_rest_a$ = charts_other_rest_a$_b(this.ctx)
	readonly ChartMissingMenu_busy$:Writable$<boolean> = writable$(false)
	readonly charts_proximity$ = charts_proximity$_b(this.ctx)
	readonly ChartType_select_value$:Writable$<ChartType_select_value_T> = writable$(ChartType_values[ChartType_line][0])
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly missing_menu_chart_canvas$:Writable$<HTMLCanvasElement> = writable$(null)
	readonly ro_restaurant$ = ro_restaurant$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly ro_login_user$:ro_login_user$_T = ro_login_user$_b(this.ctx)
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
			const generalOptions = Chart_options_(this.ChartType$.$)
			const { index_axis } = ChartType_select_value
			const options:ChartOptions = assign(
				(index_axis ? { index_axis } : {}) as ChartOptions,
				{
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: { position: 'bottom' },
						tooltip: {
							callbacks: {
								title: (tooltipItems)=>{
									log(this.ctx, 'hover', tooltipItems)
									const [{ label, raw }] = tooltipItems
									const round_value = round(parseFloat(raw as string))
									return `${round_value}% of your competitors have ${label}`
								},
								label: (_tooltipItems)=>{
									return ''
								},
							}
						}
					},
				}
			)
			deepmerge(options, generalOptions)
			return options
		}
	)//endregion
	API_CHARTS_missingmenu_payload = {
		Pagination: {
			TotalRow: 0
		}
	} as API_CHARTS_missingmenu_payload_T
	missing_menu_chart_o:chart_o_T = {
		pageSize: 25,
		chart: null
	}
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		ensure_chart_registry_item(Legend, Tooltip)
		this.unsubscribers.push(
			noinit_subscribe(this.charts_proximity$, this.load_data),
			noinit_subscribe(this.missing_menu_chart_canvas$, this.reset_missing_menu_chart),
			noinit_subscribe(this.ChartType_select_value$, this.reset_missing_menu_chart),
			noinit_subscribe(this.charts_other_rest_a$, this.onchange_charts_other_rest_a),
		)
		await this.load_data()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		this.ChartMissingMenu_busy$.$ = true
		try {
			const params_fireFlyID = await subscribe_wait_timeout(this.params_fireFlyID$, I, timeout_ms)
			const API_CHARTS_missingmenu_payload = await this.API_CHARTS_missingmenu(params_fireFlyID)
			this.API_CHARTS_missingmenu_payload = API_CHARTS_missingmenu_payload
		} finally {
			this.ChartMissingMenu_busy$.$ = false
		}
		await this.reset_missing_menu_chart()
	}
	readonly reset_missing_menu_chart = ()=>{
		const missing_menu_chart_canvas = this.missing_menu_chart_canvas$.$
		if (!missing_menu_chart_canvas) return
		const data = chart_data_<API_CHARTS_missingmenu_Data_T>(this, {
			identifier_key: 'id',
			allow_others: false,
			allow_all: false,
			allow_z_trends: false,
			union_by_other_rests: true,
			your_item_a: this.API_CHARTS_missingmenu_payload?.Data || [],
			other_rest_item_a_: other_rest=>other_rest.API_CHARTS_missingmenu_payload?.Data || [],
			yours_value_column_: o=>o.Others_PEN_Percent,
			others_value_column_: _o=>0,
			all_value_column_: _o=>0,
			label_: o=>o.DishName,
		})
		for (const dataset of data.datasets) {
			dataset.data = dataset.data.slice(0, 5)
		}
		data.labels = data.labels.slice(0, 5)
		this.missing_menu_chart_o.chart?.destroy()
		this.missing_menu_chart_o.chart = new Chart(missing_menu_chart_canvas, {
			type: ChartType_(this.ChartType$.$),
			data,
			options: this.chart_options$.$
		})
		missing_menu_chart_canvas.onclick = async (evt)=>{
			const activePoints = this.missing_menu_chart_o.chart.getElementsAtEventForMode(
				evt, 'newest', { intersect: true }, false
			)
			if (activePoints.length > 0) {
				// get the internal index of slice in pie chart
				const clickedElementIndex = activePoints[0].index
				// get specific label by index
				const label = this.missing_menu_chart_o.chart.data.labels[clickedElementIndex]
				// get value by index
				/* other stuff that requires slice's label and value */
				const query_params:any = {}
				const ro_restaurant = this.ro_restaurant$.$
				query_params.lat = ro_restaurant.Latitude
				query_params.lng = ro_restaurant.Longitude
				query_params.proximity = this.charts_proximity$.$
				query_params.keywords = label
				window.open(join_url([
					`${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`,
					this.params_fireFlyID$.$,
					Path.RO.MENU_ITEMS,
					query_str_(query_params)
				]), '_blank')
			}
		}
	}
	readonly onchange_charts_other_rest_a = async (charts_other_rest_a:OtherRest[])=>{
		try {
			for (const other_rest of charts_other_rest_a) {
				if (!other_rest || other_rest.API_CHARTS_missingmenu_payload) continue
				this.ChartMissingMenu_busy$.$ = true
				other_rest.API_CHARTS_missingmenu_payload = await this.API_CHARTS_missingmenu(other_rest.FireFlyID)
			}
		} finally {
			if (this.ChartMissingMenu_busy$.$) {
				this.charts_other_rest_a$.refresh()
				this.ChartMissingMenu_busy$.$ = false
			}
		}
	}
	readonly API_CHARTS_missingmenu = async (fireFlyID:string)=>{
		const requestData = new RoRequestQuery()
		const ro_login_user = await subscribe_wait_timeout(this.ro_login_user$, I, timeout_ms)
		RoRequestQuery.fill_login_user(requestData, ro_login_user)
		requestData.ff = fireFlyID
		requestData.proximity = this.charts_proximity$.$
		requestData.ps = this.missing_menu_chart_o.pageSize
		// Missing Menu
		return this.ro_httpClient.API_CHARTS_missingmenu(deep_clone(requestData))
	}
}
