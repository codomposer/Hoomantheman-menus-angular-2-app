import { is_idfa_ } from './is_idfa_.js'
import { is_idfa_enabled_ } from './is_idfa_enabled_.js'
export async function idfa_info_():Promise<idfa_info_T|null> {
	if (is_idfa_()) {
		const trackingEnabled = await is_idfa_enabled_()
		return {
			appleTracking: trackingEnabled ? 1 : 0,
		}
	}
	return null
}
export interface idfa_info_T {
	appleTracking:number
}
