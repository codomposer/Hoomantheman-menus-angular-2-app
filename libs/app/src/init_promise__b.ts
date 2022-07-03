import { Be, be_ } from '@ctx-core/object'
export function init_promise__b</*@formatter:off*/
  Ctx extends object,
  Out extends unknown = unknown,
  Err extends unknown = unknown,
/*@formatter:on*/>(key:keyof Ctx):Be<Ctx, keyof Ctx, init_promise_T<Out, Err>> {
	return be_(key, ()=>{
		let resolve = null, reject = null
		const init_promise = new Promise((resolve_, reject_)=>{
			resolve = resolve_
			reject = reject_
		}) as init_promise_T<Out, Err>
		init_promise.resolve = resolve
		init_promise.reject = reject
		return init_promise as init_promise_T<Out, Err>
	})
}
export interface init_promise_T<Out extends unknown = unknown, Err extends unknown = unknown>
	extends Promise<Out> {
	resolve(val:Out):void
	reject(err:Err):void
}
export type init_promise__T<Out extends unknown = unknown, Err extends unknown = unknown> =
	init_promise_T<Out, Err>
