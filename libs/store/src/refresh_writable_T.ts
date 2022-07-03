import type { Writable$ } from '@ctx-core/store'
import type { refresh_mixin_T } from './mixin_refresh.js'
export interface refresh_writable_T<I> extends Writable$<I>, refresh_mixin_T<I> {}
