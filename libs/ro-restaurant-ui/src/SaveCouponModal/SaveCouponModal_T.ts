import type { SvelteComponentTyped } from 'svelte'
import type { Modal_I_close_T, Modal_I_open_T } from '@menus/modal'
import type { SaveCouponModal_c } from './SaveCouponModal_c.js'
import type { SaveCouponModal_close_T, SaveCouponModal_open_T } from './SaveCouponModal_I.js'
export interface SaveCouponModal_T extends SvelteComponentTyped {
	readonly _:SaveCouponModal_c
	readonly open:Modal_I_open_T<SaveCouponModal_open_T, SaveCouponModal_close_T>
	readonly close:Modal_I_close_T<SaveCouponModal_close_T>
}
