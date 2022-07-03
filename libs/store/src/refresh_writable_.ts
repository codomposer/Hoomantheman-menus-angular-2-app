import { writable$ } from '@ctx-core/store'
import { mixin_refresh } from './mixin_refresh.js'
import type { refresh_writable_T } from './refresh_writable_T.js'
export function refresh_writable_<I>(init:I):refresh_writable_T<I> {
	return mixin_refresh(writable$<I>(init)) as refresh_writable_T<I>
}
