import { TCreatedPdf } from 'pdfmake/build/pdfmake.js'
import { CustomTableLayout, TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces.js'
export const createPdf:in_createPdf
export function createPdf(
	documentDefinitions:TDocumentDefinitions,
	tableLayouts?:{ [name:string]:CustomTableLayout },
	fonts?:TFontDictionary,
	vfs?:{ [file:string]:string },
):TCreatedPdf
