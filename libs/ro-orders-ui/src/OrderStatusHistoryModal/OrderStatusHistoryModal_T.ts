import type { SvelteComponentTyped } from 'svelte'
import type { Modal_I_close_T, Modal_I_open_T } from '@menus/modal'
import type { OrderStatusHistoryModal_c } from './OrderStatusHistoryModal_c.js'
import type { OrderStatusHistoryModal_close_T, OrderStatusHistoryModal_open_T } from './OrderStatusHistoryModal_I.js'
export interface OrderStatusHistoryModal_T extends SvelteComponentTyped {
	readonly _:OrderStatusHistoryModal_c
	readonly open:Modal_I_open_T<OrderStatusHistoryModal_open_T, OrderStatusHistoryModal_close_T>
	readonly close:Modal_I_close_T<OrderStatusHistoryModal_close_T>
}
