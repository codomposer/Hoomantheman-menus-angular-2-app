import type { cordova_T } from './cordova_T.js'
export {}
export interface fileOpener2_T {
	open(url:URL, mime_type:string, callbacks:{
		error(err:any):void
		success():void
	})
}
declare global {
	interface Window {
		cordova:cordova_T
		device?:{
			platform:string
		}
		ionic?:{
			Platform:{
				isAndroid():boolean
			}
		},
		resolveLocalFileSystemURL(
			folder_path:string,
			cb_:(dir:Entry)=>void,
			err_:(err:any)=>void
		):void,
	}
}
