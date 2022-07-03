import type { TCreatedPdf } from 'pdfmake/build/pdfmake.js'
import { is_cordova_app } from './is_cordova_app_.js'
import { print } from './print.js'
export async function print_pdf(filename:string, pdf:TCreatedPdf):Promise<void> {
	if (is_cordova_app) {
		await new Promise((resolve, reject)=>{
			try {
				pdf.getBlob(async pdf_blob=>{
					try {
						await print(filename, pdf_blob)
						resolve(null)
					} catch (e) {
						reject(e)
					}
				})
			} catch (e) {
				reject(e)
			}
		})
	} else {
		pdf.print()
	}
}
