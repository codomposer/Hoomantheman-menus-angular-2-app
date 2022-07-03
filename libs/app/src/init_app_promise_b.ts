import { B, be_ } from '@ctx-core/object'
import type { app_initializer_Ctx } from './app_initializer_Ctx.js'
const key = 'init_app_promise'
export const init_app_promise_b:B<app_initializer_Ctx, typeof key> = be_(key, ()=>{
	let resolve = null, reject = null
	const init_app_promise = new Promise((resolve_, reject_)=>{
		resolve = resolve_
		reject = reject_
	}) as init_app_promise_T
	init_app_promise.resolve = resolve
	init_app_promise.reject = reject
	return init_app_promise
})
export interface init_app_promise_T extends Promise<void> {
	resolve():void
	reject(err:any):void
}
