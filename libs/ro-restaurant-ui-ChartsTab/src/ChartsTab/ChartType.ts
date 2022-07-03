import {
	ChartType, LineController, BarController, RadarController, BubbleController, BarElement, LineElement,
	RadialLinearScale, ArcElement, PointElement
} from 'chart.js'
import { ensure_chart_registry_item } from '@menus/chart.js'
export type { ChartType }
export const ChartType_line:ChartType = 'line'
export const ChartType_bar:ChartType = 'bar'
export const ChartType_radar:ChartType = 'radar'
export const ChartType_bubble:ChartType = 'bubble'
ensure_chart_registry_item(
	LineController, LineElement, BarController, BarElement, RadarController, RadialLinearScale, BubbleController,
	ArcElement, PointElement,
)
export const ChartType_values:Record<string, ChartType_select_value_T[]> = {
	[ChartType_line]: [{ type: ChartType_line }],
	[ChartType_bar]: [{ type: ChartType_bar, index_axis: 'x' }, { type: ChartType_bar, index_axis: 'y' }],
	[ChartType_radar]: [{ type: ChartType_radar }],
	[ChartType_bubble]: [{ type: ChartType_bubble }],
}
export const ChartType_select_ctx_a:ChartType_select_item_T[] = [
	{ value: ChartType_values[ChartType_line][0], label: 'Line Chart' },
	{ value: ChartType_values[ChartType_bar][0], label: 'Vertical Bar Chart' },
	{ value: ChartType_values[ChartType_bar][1], label: 'Horizontal Bar Chart' },
	{ value: ChartType_values[ChartType_radar][0], label: 'Menuradar ™ Chart' },
]
export interface ChartType_select_value_T {
	type:ChartType
	index_axis?:'x'|'y'
}
export interface ChartType_select_item_T {
	value:ChartType_select_value_T
	label:string
}
