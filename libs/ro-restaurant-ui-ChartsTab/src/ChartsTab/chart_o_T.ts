import type { Chart, ChartType } from 'chart.js'
export interface chart_o_T<chart_T extends ChartType = ChartType> {
	pageSize:number
	chart:Chart<chart_T>
}
