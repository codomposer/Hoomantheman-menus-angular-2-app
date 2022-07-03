import { is_hash_routing_ } from './is_hash_routing.js'
export function is_path_routing_() {
	return !is_hash_routing_()
}
export const is_path_routing = is_path_routing_()
