import { writable$, Writable$ } from '@ctx-core/store'
import { enableBodyScroll } from '@menus/util'
import { BaseController } from '@menus/shared-ui-lib'
import { onchange_modal_state_b } from './onchange_modal_state_b.js'
import type { Modal_I } from './Modal_I.js'
import type { Modal_I_close_T, Modal_I_open_T } from './Modal_I.js'
import type { modal_Ctx } from './modal_Ctx.js'
export const EVENT_ADD_ITEM = 'EVENT_ADD_ITEM'
export const EVENT_MODAL_CLOSE = 'EVENT_MODAL_CLOSE.js'
export const STATE_OPENED = 1
export const STATE_CLOSED = 2
export abstract class BaseModalController<open_T, close_T, Ctx extends modal_Ctx = modal_Ctx>/*@formatter:off*/
  extends BaseController<Ctx> implements Modal_I<open_T, close_T>
{/*@formatter:on*/
	public static readonly EVENT_ADD_ITEM = EVENT_ADD_ITEM
	public static readonly EVENT_MODAL_CLOSE = EVENT_MODAL_CLOSE
	public static STATE_OPENED = STATE_OPENED
	public static STATE_CLOSED = STATE_CLOSED
	protected readonly onchange_modal_state = onchange_modal_state_b(this.ctx)
	readonly emit_onchange_modal_state = this.onchange_modal_state.emit_onchange_modal_state
	public readonly is_modal_open$:is_modal_open$_T = writable$(false)
	public readonly is_modal_open_animate$:is_modal_open_animate$_T = writable$(false)
	protected reject:(err:any)=>void
	protected resolve:(val:close_T)=>void
	public async onDestroy() {
		if (this.is_modal_open$.$) {
			await this.close_modal()
		}
		await super.onDestroy()
	}
	public close:Modal_I_close_T<close_T> = async (data?:close_T)=>{
		if (this.is_modal_open$.$ && this.resolve) {
			this.resolve(data)
			this.resolve = null
			await this.close_modal()
		}
	}
	public error = async (data?)=>{
		if (this.reject) {
			this.reject(data)
			this.reject = null
			await this.close_modal()
		}
	}
	public close_modal = async ()=>{
		this.is_modal_open_animate$.$ = false
		setTimeout(()=>{
			this.is_modal_open$.$ = false
		}, 50)
		enableBodyScroll(true, { mode: 'hide-scroll' })
		await this.on_close_modal()
		this.emit_onchange_modal_state({
			state: BaseModalController.STATE_CLOSED,
		})
	}
	protected async on_close_modal() {}
	public open:Modal_I_open_T<open_T, close_T> = async (data?:open_T):Promise<close_T>=>{
		await this.before_open_modal(data)
		this.open_modal()
		await this.after_open_modal(data)
		return new Promise<close_T>((resolve, reject)=>{
			this.resolve = resolve
			this.reject = reject
		})
	}
	protected async before_open_modal(_data?:open_T) {}
	protected open_modal = ()=>{
		this.is_modal_open$.$ = true
		setTimeout(()=>{
			this.is_modal_open_animate$.$ = true
		}, 50)
		enableBodyScroll(false, { mode: 'hide-scroll' })
		this.emit_onchange_modal_state({
			state: BaseModalController.STATE_OPENED,
		})
	}
	protected async after_open_modal(_data?:open_T) {}
}
export type is_modal_open$_T = Writable$<boolean>
export type is_modal_open_animate$_T = Writable$<boolean>
