import { BaseModalController } from '@menus/modal'
import { RoMenuoption } from '@menus/ro-shared-models'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { ro_menuoptionitems$_b } from '../ro_menuoptionitems$_b.js'
import { selected_ro_menuoption$_b } from '../selected_ro_menuoption$_b.js'
import type { RoMenuOptionModal_close_T, RoMenuOptionModal_open_T } from './RoMenuOptionModal_I.js'
const Controller_name = 'RoMenuOptionModal_c'
export class RoMenuOptionModal_c
	extends BaseModalController<RoMenuOptionModal_open_T, RoMenuOptionModal_close_T, ro_menu_ui_Ctx> {
	readonly ro_menuoptionitems$ = ro_menuoptionitems$_b(this.ctx)
	readonly selected_ro_menuoption$ = selected_ro_menuoption$_b(this.ctx)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	readonly before_open_modal = async ({ ro_menuoption }:RoMenuOptionModal_open_T)=>{
		this.selected_ro_menuoption$.$ = ro_menuoption || new RoMenuoption()
		await this.ro_menuoptionitems$.reload()
	}
}
