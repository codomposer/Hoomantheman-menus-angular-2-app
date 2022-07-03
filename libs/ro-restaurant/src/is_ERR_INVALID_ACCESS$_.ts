import { derived$, Readable, Readable$ } from '@ctx-core/store'
import type { API_error_T } from '@menus/api'
export function is_ERR_INVALID_ACCESS$_(parent_store:Readable<API_error_T>):is_ERR_INVALID_ACCESS$_T {
	return derived$(parent_store, is_ERR_INVALID_ACCESS_)
}
export function is_ERR_INVALID_ACCESS_(val:API_error_T) {
	return val
		&& val.Status === 'error'
		&& val.Code === 'ERR_INVALID_ACCESS'
}
export type is_ERR_INVALID_ACCESS$_T = Readable$<boolean>
export interface is_ERR_INVALID_ACCESS$_mixin_T {
	is_ERR_INVALID_ACCESS$:is_ERR_INVALID_ACCESS$_T
}
