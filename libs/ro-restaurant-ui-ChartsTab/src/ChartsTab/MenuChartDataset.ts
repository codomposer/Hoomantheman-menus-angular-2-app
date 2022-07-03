import type { ChartDataset } from 'chart.js'
import type { ChartType, DefaultDataPoint } from 'chart.js'
export type MenuChartDataset = ChartDataset&{
	fireFlyID?:string
	cuisineID?:number
	tempData?:DefaultDataPoint<ChartType>
	sum?:number
}
