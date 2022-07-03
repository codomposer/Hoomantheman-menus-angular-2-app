export interface cordova_plugin_file_opener2_T {
	open(path:string, mime:string, params?:cordova_plugin_file_opener2_params_T)
}
export interface cordova_plugin_file_opener2_params_T {
	error?(e:cordova_plugin_file_opener2_params_error_T):void
	success():void
}
export interface cordova_plugin_file_opener2_params_error_T {
	status:string
	message:string
}
