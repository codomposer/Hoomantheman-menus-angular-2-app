import { BaseController } from '@menus/shared-ui-lib'
import { ro_edit_restaurant_ui_Ctx } from '../ro_edit_restaurant_ui_Ctx.js'
export const Controller_name = 'EditRestaurant_c'
export class EditRestaurant_c extends BaseController<ro_edit_restaurant_ui_Ctx> {
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
}
