import type { ChartOptions, ChartType } from 'chart.js'
import { ChartType_bubble, ChartType_radar } from './ChartType.js'
export function Chart_options_(chart_type:ChartType):ChartOptions {
	const options = {} as ChartOptions
	if (chart_type === ChartType_bubble) {
		const bubble_options = options as ChartOptions<'bubble'>
		// bubble_options.showLine = false
		bubble_options.layout = {
			padding: {
				left: 0,
				right: 0,
				top: 25,
				bottom: 0
			}
		}
		bubble_options.scales = {
			y: {
				ticks: {
					padding: 25
				}
			},
		}
	} else if (chart_type === ChartType_radar) {
		const radar_options = options as ChartOptions<'radar'>
		radar_options.plugins = {
			tooltip: {
				mode: 'index'
			}
		}
	}
	return options
}
