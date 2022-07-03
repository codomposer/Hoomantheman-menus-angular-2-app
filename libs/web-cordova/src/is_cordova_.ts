import { has_dom } from '@ctx-core/dom'
export function is_cordova_():boolean {
	return !!(has_dom && window.cordova)
}
export const is_cordova = is_cordova_()
