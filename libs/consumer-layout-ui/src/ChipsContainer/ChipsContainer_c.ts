import { Writable$, writable$ } from '@ctx-core/store'
import { BaseController } from '@menus/shared-ui-lib'
import type { consumer_layout_ui_Ctx } from '../consumer_layout_ui_Ctx.js'
export class ChipsContainer_c extends BaseController<consumer_layout_ui_Ctx> {
	readonly chips_container$:Writable$<HTMLDivElement> = writable$(null)
	readonly in_list$:Writable$<ChipsContainer_item_T[]> = writable$(null)
	readonly multiSelect$:Writable$<boolean> = writable$(false)
	readonly out_list$:Writable$<ChipsContainer_item_T[]> = writable$(null)
	readonly showPrev$:Writable$<boolean> = writable$(false)
	readonly showNext$:Writable$<boolean> = writable$(false)
}
export interface ChipsContainer_item_T {
	active:boolean
	url:string
	Name?:string
	ZipCode?:string
}
