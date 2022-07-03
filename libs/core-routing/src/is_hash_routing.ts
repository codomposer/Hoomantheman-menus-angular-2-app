import { has_dom } from '@ctx-core/dom'
const file_regex = /^file:\/\//
export function is_hash_routing_() {
	return !!(has_dom && (file_regex.test(window.location.origin) || (window as any).cordova))
}
export const is_hash_routing = is_hash_routing_()
