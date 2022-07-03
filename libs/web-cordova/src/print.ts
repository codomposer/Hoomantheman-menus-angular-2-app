import { cordova_plugin_printer_T } from './cordova_plugin_printer.js'
import { save_file } from './save_file.js'
export async function print(filename:string, blob_part:BlobPart):Promise<void> {
	const printer = (cordova.plugins as any).printer as cordova_plugin_printer_T
	const path = await save_file(filename, blob_part, 'application/pdf')
	return new Promise((resolve, reject)=>{
		try {
			// See https://github.com/katzer/cordova-plugin-printer/blob/master/README.md
			printer.print(path, {}, ()=>resolve())
		} catch (e) {
			reject(e)
		}
	})
}
