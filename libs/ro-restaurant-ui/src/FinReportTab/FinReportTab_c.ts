import { BarController, BarElement, CategoryScale, Chart, LinearScale, Tooltip } from 'chart.js'
import { I } from '@ctx-core/combinators'
import { subscribe_wait_timeout, Writable$, writable$ } from '@ctx-core/store'
import type { ChartData_labels_T } from '@menus/chart.js'
import { ensure_chart_registry_item } from '@menus/chart.js'
import { shortDate_ } from '@menus/date'
import { params_fireFlyID$_b } from '@menus/page'
import { API_FINANCIAL_report_b, ro_httpClient_b, RoRequestQuery } from '@menus/ro-http'
import type { DateTimeOptions, FinancialStatement_Detail, GraphDatum, } from '@menus/ro-shared-models'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { STATUS_SUCCESS, timeout_ms } from '@menus/web-config'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
const Controller_name = 'FinReportTab_c'
export class FinReportTab_c extends BaseController<ro_restaurant_ui_Ctx> {
	readonly API_FINANCIAL_report = API_FINANCIAL_report_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly Details$:Writable$<FinancialStatement_Detail[]> = writable$([])
	readonly fin_report_range_date$:Writable$<string[]> = writable$([])
	readonly fin_sales_orders_chart$:Writable$<Chart<'bar'>> = writable$(null)
	readonly fin_sales_orders_chart_canvas$:Writable$<HTMLCanvasElement> = writable$(null)
	readonly GraphData$:Writable$<GraphDatum[]> = writable$([])
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly total$:Writable$<number> = writable$(null)
	DTOptions:DateTimeOptions
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		ensure_chart_registry_item(BarController, BarElement, CategoryScale, LinearScale, Tooltip)
		this.load_data().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'load_data()')
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			requestData.ff = this.params_fireFlyID$.$
			const fin_report_range_date = this.fin_report_range_date$.$ || []
			if (fin_report_range_date.length >= 2) {
				requestData.ds = fin_report_range_date[0]
				requestData.de = fin_report_range_date[1]
			}
			const payload = await this.API_FINANCIAL_report(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				this.GraphData$.$ = payload.GraphData
				const Details = payload.Data.Details
				this.Details$.$ = Details
				// Calculating total
				let total = 0
				for (const item of Details) {
					total += parseFloat(item.TotalSales)
				}
				this.total$.$ = total
			}
			log(this.ctx, Controller_name, 'API_FINANCIAL_report', payload)
		} finally {
			this.busy$.$ = false
		}
		await this.init_fin_sales_orders_chart()
	}
	readonly init_fin_sales_orders_chart = async ()=>{
		const labels:ChartData_labels_T = []
		const sales:number[] = []
		const orders:number[] = []
		await subscribe_wait_timeout(this.GraphData$, I, timeout_ms)
		const GraphData = this.GraphData$.$
		for (const item of GraphData) {
			labels.push(shortDate_(item.Date.toString()))
			sales.push(item.Sales)
			orders.push(item.Orders)
		}
		await subscribe_wait_timeout(this.fin_sales_orders_chart_canvas$, I, timeout_ms)
		this.fin_sales_orders_chart$.$ = new Chart<'bar'>(
			this.fin_sales_orders_chart_canvas$.$, {
				type: 'bar',
				data: {
					labels,
					datasets: [
						{
							label: 'Sales ($)',
							backgroundColor: '#FF6384',
							data: sales,
						},
						{
							label: 'Orders (#)',
							backgroundColor: '#36A2EB',
							data: orders,
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						tooltip: {
							callbacks: {
								label: (tooltip_item)=>{
									if (tooltip_item.datasetIndex === 0) {
										return ` $${tooltip_item.parsed.y}`
									} else {
										return ` ${tooltip_item.parsed.y}`
									}
								}
							}
						}
					},
				}
			})
	}
	readonly onFinReportDateChanged = async (event)=>{
		if (!event.beginJsDate) {
			this.fin_report_range_date$.$ = null
			await this.load_data()
		}
	}
}
