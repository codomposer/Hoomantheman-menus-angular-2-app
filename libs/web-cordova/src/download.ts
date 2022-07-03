import 'file-saver'
import type { cordova_plugin_file_opener2_T } from './cordova_plugin_file_opener2.js'
import { is_cordova_app } from './is_cordova_app_.js'
import { save_file } from './save_file'
/**
 * @See {@link https://esstudio.site/2019/02/16/downloading-saving-and-opening-files-with-cordova.html}
 */
export async function download(filename:string, data:BlobPart, mime_type:string) {
	const blob = new Blob([data], {
		type: mime_type
	})
	const path = await save_file(filename, blob, mime_type)
	if (is_cordova_app) {
		const fileOpener2 = (cordova.plugins as any).fileOpener2 as cordova_plugin_file_opener2_T
		fileOpener2.open(
			path, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Downloads/starwars.pdf
			'text/plain',
			{
				error: function (e) {
					console.error('Error', e)
				},
				success: function () {
					console.log('file opened successfully')
				}
			}
		)
	}
}
