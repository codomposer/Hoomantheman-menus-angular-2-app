import type {
	Content, ContentImage, Margins, Style, TableCell, ContentText, ContentTable, ContentStack, TableLayout,
	StyleDictionary, Table, ContentColumns, Column, TDocumentDefinitions,
} from 'pdfmake/interfaces'
import { I } from '@ctx-core/combinators'
import { currency_str_ } from '@ctx-core/currency'
import { subscribe_wait_timeout, writable$, Writable$ } from '@ctx-core/store'
import { query_str_ } from '@ctx-core/uri'
import type { QueryParams } from '@menus/api'
import { shortDate_, shortDateTime_ } from '@menus/date'
import { navigating_goto_b, params_fireFlyID$_b, query_fsPage$_b, query_fsPageSize$_b } from '@menus/page'
import { createPdf } from '@menus/pdfmake'
import {
	API_FINANCIAL_statement_b, ro_httpClient_b, RoRequestQuery, success_API_RESTAURANT_info_payload_T
} from '@menus/ro-http'
import { API_RESTAURANT_info_payload$_b } from '@menus/ro-restaurant'
import type { DateTimeOptions, FinancialStatement_Detail, FinancialStatement_Summary, } from '@menus/ro-shared-models'
import { globalSettings$_b } from '@menus/ro-user'
import { Path } from '@menus/route'
import { BaseController } from '@menus/shared-ui-lib'
import { log } from '@menus/util'
import { BRAND_LOGO_BASE64, STATUS_SUCCESS, FIN_STATEMENT_TAB, timeout_ms } from '@menus/web-config'
import { print_pdf } from '@menus/web-cordova'
import type { ro_restaurant_ui_Ctx } from '../ro_restaurant_ui_Ctx.js'
const Controller_name = 'FinStatementTab_c'
export class FinStatementTab_c extends BaseController<ro_restaurant_ui_Ctx> {
	readonly API_FINANCIAL_statement = API_FINANCIAL_statement_b(this.ctx)
	readonly API_RESTAURANT_info_payload$ = API_RESTAURANT_info_payload$_b(this.ctx)
	readonly params_fireFlyID$ = params_fireFlyID$_b(this.ctx)
	readonly globalSettings$ = globalSettings$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly ro_httpClient = ro_httpClient_b(this.ctx)
	readonly query_fsPage$ = query_fsPage$_b(this.ctx)
	readonly query_fsPageSize$ = query_fsPageSize$_b(this.ctx)
	readonly busy$:Writable$<boolean> = writable$(false)
	readonly Details$:Writable$<FinancialStatement_Detail[]> = writable$([])
	readonly finStatementRangeDate$:Writable$<string[]> = writable$(null)
	readonly Summary$:Writable$<FinancialStatement_Summary> = writable$(null)
	readonly TotalPages$:Writable$<number> = writable$(0)
	readonly TotalRow$:Writable$<number> = writable$(0)
	readonly export_url$:Writable$<string> = writable$(null)
	DTOptions:DateTimeOptions
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
		this.load_data().then()
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly load_data = async ()=>{
		log(this.ctx, Controller_name, 'loadFinStatementTab()')
		this.busy$.$ = true
		try {
			const requestData = new RoRequestQuery()
			const params_fireFlyID = await subscribe_wait_timeout(this.params_fireFlyID$, I, timeout_ms)
			requestData.ff = params_fireFlyID
			RoRequestQuery.fill_page(requestData, this.query_fsPage$.$)
			RoRequestQuery.fill_pageSize(requestData, this.query_fsPageSize$.$)
			const finStatementRangeDate$ = this.finStatementRangeDate$.$ || []
			if (finStatementRangeDate$.length >= 2) {
				requestData.ds = finStatementRangeDate$[0]
				requestData.de = finStatementRangeDate$[1]
			}
			const request = await this.API_FINANCIAL_statement.API_FINANCIAL_statement_request_(requestData)
			this.export_url$.$ = `${request.url}&export=1`
			const payload = await this.API_FINANCIAL_statement(requestData)
			if (payload.Status === STATUS_SUCCESS) {
				this.Summary$.$ = payload.Summary
				this.Details$.$ = payload.Data.Details
				this.TotalPages$.$ = payload.Data.Pagination.TotalPages
				this.TotalRow$.$ = payload.Data.Pagination.TotalRow
			}
			log(this.ctx, Controller_name, 'API_FINANCIAL_statement', payload)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly onchange_finStatement = async ()=>{
		this.busy$.$ = true
		try {
			const query_params = {} as QueryParams
			query_params.fsPage = this.query_fsPage$.$
			query_params.fsPageSize = this.query_fsPageSize$.$
			await this.navigating_goto([
				Path.RO.BASE, Path.RO.MANAGE_RESTAURANT, FIN_STATEMENT_TAB,
				this.params_fireFlyID$.$,
				query_str_(query_params),
			])
			log(this.ctx, Controller_name, 'onchange_finStatement', query_params)
		} finally {
			this.busy$.$ = false
		}
	}
	readonly print_finStatement = async ()=>{
		const finStatementRangeDate = this.finStatementRangeDate$.$ || []
		let date_range_text = ''
		if (finStatementRangeDate.length >= 2) {
			date_range_text = `${shortDate_(finStatementRangeDate[0])} - ${shortDate_(finStatementRangeDate[1])}`
		}
		const orders_table_body = [[
			{ text: 'Order Date/Time', style: 'orders_table_header' } as TableCell,
			{ text: 'Order Number', style: 'orders_table_header' } as TableCell,
			{ text: 'Order Status', style: 'orders_table_header' } as TableCell,
			{ text: 'Customer', style: 'orders_table_header' } as TableCell,
			{ text: 'Pay Method', style: 'orders_table_header' } as TableCell,
			{ text: 'Order Subtot', style: 'orders_table_header' } as TableCell,
			{ text: 'RoCoupon Disct', style: 'orders_table_header' } as TableCell,
			{ text: 'Delivery Charge', style: 'orders_table_header' } as TableCell,
			{ text: 'Tax', style: 'orders_table_header' } as TableCell,
			{ text: 'Tip', style: 'orders_table_header' } as TableCell,
			{ text: 'Total Cust Paymt', style: 'orders_table_header' } as TableCell,
			{ text: 'Srvc Chrg', style: 'orders_table_header' } as TableCell,
			{ text: 'Net Acct Credit', style: 'orders_table_header' } as TableCell,
		]] as TableCell[][]
		for (const item of this.Details$.$) {
			orders_table_body.push([
				{ text: shortDateTime_(item.OrderDate), style: 'orders_table_row' } as TableCell,
				{ text: item.OrderNumber, style: 'orders_table_row', bold: true } as TableCell,
				{ text: item.OrderStatus, style: 'orders_table_row', bold: true } as TableCell,
				{ text: item.Customer, style: 'orders_table_row' } as TableCell,
				{ text: item.PaymentMethod, style: 'orders_table_row' } as TableCell,
				{ text: item.SubTotal, style: 'orders_table_row' } as TableCell,
				{
					text: item.Discount ? currency_str_(item.Discount, 'USD') : '-',
					style: 'orders_table_row'
				} as TableCell,
				{ text: currency_str_(item.DeliveryCharge || 0, 'USD'), style: 'orders_table_row' } as TableCell,
				{ text: currency_str_(item.Tax_Final || 0, 'USD'), style: 'orders_table_row' } as TableCell,
				{ text: currency_str_(item.Driver_Tip || 0, 'USD'), style: 'orders_table_row' } as TableCell,
				{ text: currency_str_(item.GrandTotal || 0, 'USD'), style: 'orders_table_row' } as TableCell,
				{ text: currency_str_(item.Owner_ServiceFee || 0, 'USD'), style: 'orders_table_row' } as TableCell,
				{
					text: currency_str_(item.Owner_NetAccountCredit || 0, 'USD'),
					style: 'orders_table_row'
				} as TableCell,
			] as TableCell[])
		}
		const Summary = this.Summary$.$
		const API_RESTAURANT_info_payload = this.API_RESTAURANT_info_payload$.$ as success_API_RESTAURANT_info_payload_T
		const dd = {
			pageSize: 'LETTER',
			pageOrientation: 'landscape',
			pageMargins: 5,
			content: [
				{
					alignment: 'justify',
					columns: [
						{
							image: BRAND_LOGO_BASE64,
							width: 93,
							height: 24,
						} as ContentImage,
						{
							alignment: 'right',
							fontSize: 14,
							stack: [
								{
									text: API_RESTAURANT_info_payload.Data.Name,
									bold: true,
								} as ContentText,
								`${API_RESTAURANT_info_payload.Data.Address_1} ${API_RESTAURANT_info_payload.Data.Address_2}`,
								API_RESTAURANT_info_payload.Data.Phone,
								API_RESTAURANT_info_payload.Data.Email,
							] as Content[]
						} as ContentStack
					] as Column[]
				} as ContentColumns,
				{
					margin: [0, 27, 0, 0] as Margins,
					text: 'Financial Statemant',
					fontSize: 32,
					bold: true,
				} as Content,
				{
					margin: [0, 4, 0, 0] as Margins,
					text: date_range_text,
					fontSize: 18,
					bold: true,
				} as Content,
				{
					margin: [0, 24, 0, 24] as Margins,
					table: {
						headerRows: 1,
						widths: ['*', '*'],
						body: [
							[
								{ text: 'Number of Orders' },
								{ text: Summary.Orders, bold: true, alignment: 'right' }
							],
							[
								{ text: 'Total Sales' },
								{
									text: currency_str_(Summary.Sales, 'USD'),
									bold: true,
									alignment: 'right'
								}
							],
							[
								{ text: 'Cash On Delivery Count' },
								{ text: Summary.COD_ItemsCount, bold: true, alignment: 'right' }
							],
							[
								{ text: 'Cash On Delivery Sales' },
								{
									text: currency_str_(Summary.COD_ItemsSales, 'USD'),
									bold: true,
									alignment: 'right'
								}
							],
							[
								{ text: 'Credit Card Count' },
								{
									text: Summary.CreditCard_ItemsCount,
									bold: true,
									alignment: 'right'
								}
							],
							[
								{ text: 'Credit Card Sales' },
								{
									text: currency_str_(Summary.CreditCard_ItemsSales, 'USD'),
									bold: true,
									alignment: 'right'
								}
							],
						]
					} as Table,
					layout: {
						defaultBorder: false,
					}
				} as ContentTable,
				{
					margin: [0, 24, 0, 24] as Margins,
					table: {
						headerRows: 1,
						widths: 'auto',
						body: orders_table_body,
					} as Table,
					layout: {
						hLineWidth(i, node) {
							if (i === 0) return i
							return (
											 i === 1 || i === node.table.body.length) ? 2 : 1
						},
						vLineWidth(_i, _node) {
							return 0
						},
						hLineColor(i, node) {
							return (
											 i === 1 || i === node.table.body.length) ? 'black' : 'gray'
						},
						vLineColor(i, node) {
							return (
											 i === 0 || i === node.table.widths.length) ? 'black' : 'gray'
						}
					} as TableLayout
				},
				{
					alignment: 'center',
					margin: [0, 18, 0, 0],
					text: [
						'If you need to reach Menus please feel free to call our restaurant customer service team at: ',
						{
							alignment: 'center',
							text: this.globalSettings$.$.CustomerService.Phone,
							bold: true,
						} as ContentText,
					],
				} as ContentText,
			] as Content,
			styles: {
				header: {
					fontSize: 18,
					bold: true
				},
				bigger: {
					fontSize: 15,
					italics: true,
				},
				orders_table_header: {
					bold: true,
					fontSize: 12,
					margin: [0, 14, 0, 14]
				},
				orders_table_row: {
					margin: [0, 14, 0, 14]
				}
			} as StyleDictionary,
			defaultStyle: {
				columnGap: 20,
			} as Style
		} as TDocumentDefinitions
		await print_pdf('FinStatementTab.pdf', createPdf(dd))
	}
}
