import { assign } from '@ctx-core/object'
import { get, Writable, Readable, Subscriber, WritableOrReadable } from '@ctx-core/store'
export function mixin_refresh<store_T extends unknown = unknown, store$_T extends Readable<store_T> = Readable<store_T>>(
	readable:WritableOrReadable<store_T, store$_T>,
	set?:typeof readable extends Writable<store_T> ? undefined : Subscriber<store_T>
) {
	return assign(readable, {
		refresh: function (this:typeof readable, in_val:Partial<store_T>) {
			if (set) {
				const _this = get(this)
				if (typeof _this === 'object') {
					set(assign(_this as object, in_val) as store_T)
				} else {
					set(in_val as store_T)
				}
			} else if ((this as unknown as Writable<store_T>).update) {
				try {
					(this as unknown as Writable<store_T>).update(_this=>{
						if (_this && typeof _this === 'object') {
							return assign(_this as object, in_val) as store_T
						} else {
							return in_val as store_T
						}
					})
				} catch (err) {
					console.trace(err)
					throw err
				}
			} else {
				throw 'refresh only works on Readable$ with a set argument or a Writable'
			}
		}.bind(readable),
	}) as refresh_mixin_T<store_T>
}
export type refresh_T<I> = (val?:Partial<I>)=>void
export interface refresh_mixin_T<I extends unknown = unknown> extends Readable<I> {
	refresh:refresh_T<I>
}
