import type { SvelteComponentTyped } from 'svelte'
import type { Modal_I_close_T, Modal_I_open_T } from '@menus/modal'
import type { ThankYouOrderModal_c } from './ThankYouOrderModal_c.js'
import type { ThankYouOrderModal_close_T, ThankYouOrderModal_open_T } from './ThankYouOrderModal_I.js'
export interface ThankYouOrderModal_T extends SvelteComponentTyped {
	readonly _:ThankYouOrderModal_c
	readonly open:Modal_I_open_T<ThankYouOrderModal_open_T, ThankYouOrderModal_close_T>
	readonly close:Modal_I_close_T<ThankYouOrderModal_close_T>
}
