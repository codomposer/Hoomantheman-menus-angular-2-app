import { run } from '@ctx-core/function'
import { is_cordova_app } from './is_cordova_app_.js'
import { resolveLocalFileSystemURL } from './resolveLocalFileSystemURL.js'
import { writeFile } from './writeFile.js'
export async function save_file(filename:string, data:BlobPart, mime_type:string):Promise<string> {
	const blob = new Blob([data], {
		type: mime_type
	})
	if (is_cordova_app) {
		const { cordova } = window
		const { file, platformId } = cordova
		file.externalDataDirectory
		const dir_path:string =
			platformId === 'android'
			? file.externalDataDirectory
			: file.documentsDirectory
		const dir = await resolveLocalFileSystemURL(dir_path) as DirectoryEntry
		await new Promise((resolve, reject)=>{
			try {
				dir.getFile(
					[dir.fullPath, filename].join(''),
					{ create: true },
					(file_entry:FileEntry)=>{
						run(async ()=>{
							resolve(await writeFile(file_entry, blob))
						}).then()
					}, reject
				)
			} catch (e) {
				reject(e)
			}
		})
		return [dir_path, filename].join('')
	} else {
		saveAs(blob, filename)
		return filename
	}
}
