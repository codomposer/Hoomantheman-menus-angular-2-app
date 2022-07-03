import type { Readable$ } from '@ctx-core/store'
import type { refresh_mixin_T } from './mixin_refresh.js'
export interface refresh_readable_T<I> extends Readable$<I>, refresh_mixin_T<I> {}
