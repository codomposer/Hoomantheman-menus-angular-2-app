import type { SelectItem } from '@menus/form'
export interface StateCtx extends SelectItem {
	State:string
	is_selected?:boolean
}
