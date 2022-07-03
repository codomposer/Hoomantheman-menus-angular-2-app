export async function is_idfa_enabled_():Promise<boolean> {
	return new Promise(async resolve=>{
		const idfa = window.cordova?.plugins.idfa
		const info = await idfa.getInfo()
		if (!info.trackingLimited) {
			resolve(true)
		} else {
			if (info.trackingPermission === idfa.TRACKING_PERMISSION_NOT_DETERMINED) {
				const result = await idfa.requestPermission()
				resolve(result === idfa.TRACKING_PERMISSION_AUTHORIZED)
			} else {
				resolve(false)
			}
		}
	})
}
