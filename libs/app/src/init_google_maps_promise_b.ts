import { init_promise__b, init_promise_T } from './init_promise__b.js'
import { app_initializer_Ctx } from './app_initializer_Ctx.js'
import { Be } from '@ctx-core/object'
const key = 'init_google_maps_promise'
export const init_google_maps_promise_b:Be<app_initializer_Ctx, keyof app_initializer_Ctx, init_promise_T<void, any>> =
	init_promise__b<app_initializer_Ctx, void, any>(key)
export type init_google_maps_promise_T = init_promise_T<void, any>
