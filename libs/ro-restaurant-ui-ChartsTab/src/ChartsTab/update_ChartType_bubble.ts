import { round } from '@ctx-core/number'
import { ChartType, ChartType_bubble } from './ChartType.js'
export function update_ChartType_bubble(chart_type:ChartType, data):void {
	if (chart_type === ChartType_bubble) {
		// Calculating the `PointRadius` for each point based on its value
		const MIN_POINT_RADIUS = 2
		const MAX_POINT_RADIUS = 20
		for (const dataset of data.datasets) {
			const pointRadiusList:number[] = []
			let MAX = 0, MIN = 0
			for (const num of dataset.data) {
				if (num > MAX) {
					MAX = num
				}
				if (num < MIN) {
					MIN = num
				}
			}
			for (const num of dataset.data) {
				let value = (num / MAX) * MAX_POINT_RADIUS
				if (value < MIN_POINT_RADIUS) {
					value = MIN_POINT_RADIUS
				}
				pointRadiusList.push(round(value))
			}
			dataset.pointRadius = pointRadiusList
			dataset.pointHoverRadius = pointRadiusList
		}
	}
}
