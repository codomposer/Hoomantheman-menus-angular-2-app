import { union_by_ } from '@ctx-core/array'
import { Readable$ } from '@ctx-core/store'
import { chartColorsArray } from '@menus/web-config'
import { hexToRgba } from '@menus/color'
import { ro_restaurant$_T } from '@menus/ro-restaurant'
import { your_label } from './your_label.js'
import { ztrends_label } from './ztrends_label.js'
import { all_label } from './all_label.js'
import type { charts_other_rest_a$_T } from './charts_other_rest_a$_b.js'
import type { MenuChartDataset } from './MenuChartDataset.js'
import { CHART_COLORS_ARRAY_REST_START_INDEX } from './CHART_COLORS_ARRAY_REST_START_INDEX.js'
import { OtherRest } from './OtherRest.js'
import { ChartType } from './ChartType.js'
import { update_ChartType_bubble } from './update_ChartType_bubble.js'
export function chart_data_<Item extends object = object>(
	controller:chart_data__controller_T, params:MakeChartParams<Item>
):chart_data_T {
	let all_item_a:Item[] = []
	const rest_item_a:chart_data__rest_item_I<Item>[] = []
	const { your_item_a } = params
	all_item_a = union_by_(
		[all_item_a || [], your_item_a || []],
		i=>i?.[params.identifier_key]) as chart_data__rest_item_I<Item>[] as Item[]
	const restaurant = controller.ro_restaurant$.$
	rest_item_a.push({
		label: your_label,
		list: your_item_a,
		fireFlyID: restaurant.FireFlyID,
		cuisineID: restaurant.CuisineID,
	})
	for (const charts_other_rest of controller.charts_other_rest_a$.$) {
		if (!charts_other_rest.busy) {
			const other_rest_item_a = params.other_rest_item_a_(charts_other_rest)
			if (params.union_by_other_rests) {
				all_item_a = union_by_(
					[all_item_a, other_rest_item_a],
					i=>i[params.identifier_key])
			}
			rest_item_a.push({
				label: charts_other_rest.Name,
				list: other_rest_item_a,
				fireFlyID: charts_other_rest.FireFlyID,
			} as chart_data__rest_item_I<Item>)
		}
	}
	const labels:string[] = []
	const rest_line_point_a:rest_line_point_T[] = []
	for (let index = 0; index < all_item_a.length; index += 1) {
		const item = all_item_a[index]
		labels.push(params.label_(item))
		for (let rest_item_a_index = 0; rest_item_a_index < rest_item_a.length; rest_item_a_index += 1) {
			const rest_item = rest_item_a[rest_item_a_index]
			if (index === 0) {
				rest_line_point_a[rest_item_a_index] = {
					label: rest_item.label,
					yoursList: [],
					othersList: [],
					allList: [],
					zTrendList: [],
				}
				if (rest_item.fireFlyID) {
					rest_line_point_a[rest_item_a_index].fireFlyID = rest_item.fireFlyID
				}
				if (rest_item.cuisineID) {
					rest_line_point_a[rest_item_a_index].cuisineID = rest_item.cuisineID
				}
			}
			const found_item = rest_item.list.find(a=>
				a[params.identifier_key] === item[params.identifier_key]
			)
			if (found_item) {
				const yours = params.yours_value_column_(found_item) || 0
				const others = params.others_value_column_(found_item) || 0
				const all = params.all_value_column_(found_item) || 0
				rest_line_point_a[rest_item_a_index].yoursList.push(yours)
				if (params.allow_z_trends) {
					const zTrend = 0.5 * ((0.5 * all + 0.5 * others) - yours) + yours
					rest_line_point_a[rest_item_a_index].zTrendList.push(zTrend)
				}
				if (params.allow_others) {
					rest_line_point_a[rest_item_a_index].othersList.push(others)
				}
				if (params.allow_all) {
					rest_line_point_a[rest_item_a_index].allList.push(all)
				}
			} else {
				rest_line_point_a[rest_item_a_index].yoursList.push(0)
				if (params.allow_z_trends) {
					rest_line_point_a[rest_item_a_index].zTrendList.push(0)
				}
				if (params.allow_others) {
					rest_line_point_a[rest_item_a_index].othersList.push(0)
				}
				if (params.allow_all) {
					rest_line_point_a[rest_item_a_index].allList.push(0)
				}
			}
		}
	}
	const datasets:MenuChartDataset[] = []
	let color_index = CHART_COLORS_ARRAY_REST_START_INDEX
	const alphaExceptZTrends = params.allow_z_trends ? 0.3 : 1.0
	for (let rests_line_points_idx = 0; rests_line_points_idx < rest_line_point_a.length; rests_line_points_idx += 1) {
		const item = rest_line_point_a[rests_line_points_idx]
		let color = chartColorsArray[color_index++]
		let rgba = hexToRgba(color, alphaExceptZTrends)
		if (rests_line_points_idx === 0) {
			if (params.allow_z_trends) {
				color = '#39CE7B'
				datasets.push({
					label: ztrends_label,
					fill: false,
					backgroundColor: color,
					borderColor: color,
					pointBackgroundColor: color,
					pointBorderColor: color,
					data: item.zTrendList,
					cubicInterpolationMode: 'default',
				})
			}
		}
		datasets.push({
			label: item.label,
			fill: false,
			backgroundColor: rgba,
			borderColor: rgba,
			pointBackgroundColor: rgba,
			pointBorderColor: rgba,
			data: item.yoursList,
			cubicInterpolationMode: 'default',
			fireFlyID: item.fireFlyID || null,
			cuisineID: item.cuisineID || null,
		} as MenuChartDataset)
		if (rests_line_points_idx === 0) {
			if (params.allow_others) {
				color = chartColorsArray[0]
				rgba = hexToRgba(color, alphaExceptZTrends)
				datasets.push({
					label: `Other surrounding ${controller.ro_restaurant$.$.Cuisine} `,
					fill: false,
					backgroundColor: rgba,
					borderColor: rgba,
					pointBackgroundColor: rgba,
					pointBorderColor: rgba,
					data: item.othersList,
					cubicInterpolationMode: 'default',
					cuisineID: item.cuisineID || null,
				})
			}
			if (params.allow_all) {
				color = chartColorsArray[1]
				rgba = hexToRgba(color, alphaExceptZTrends)
				datasets.push({
					label: all_label,
					fill: false,
					backgroundColor: rgba,
					borderColor: rgba,
					pointBackgroundColor: rgba,
					pointBorderColor: rgba,
					data: item.allList,
					cubicInterpolationMode: 'default',
				})
			}
		}
	}
	const chart_data:chart_data_T = {
		labels,
		datasets,
	}
	update_ChartType_bubble(controller.ChartType$.$, chart_data)
	return chart_data
}
export interface MakeChartParams<Item extends object = object> {
	identifier_key:string
	allow_z_trends:boolean
	allow_others:boolean
	allow_all:boolean
	union_by_other_rests:boolean
	your_item_a:Item[]
	other_rest_item_a_(other_rest:OtherRest):any[]
	yours_value_column_(item:Item):number
	others_value_column_(item:Item):number
	all_value_column_(item:Item):number
	label_(item:Item):string
	before_update?:(chart_data:chart_data_T)=>void
}
export interface chart_data_T {
	labels:string[]
	datasets:MenuChartDataset[]
}
export interface chart_data__controller_T {
	ro_restaurant$:ro_restaurant$_T
	charts_other_rest_a$:charts_other_rest_a$_T
	ChartType$:Readable$<ChartType>
}
export interface chart_data__rest_item_I<Item extends object = object> {
	label:string
	list:Item[]
	fireFlyID:string
	cuisineID:number
}
export interface rest_line_point_T {
	label:string
	fireFlyID?:string
	cuisineID?:number
	yoursList:number[]
	othersList:number[]
	allList:number[]
	zTrendList:number[]
}
