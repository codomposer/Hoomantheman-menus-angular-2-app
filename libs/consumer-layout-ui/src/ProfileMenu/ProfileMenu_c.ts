import { goto_login_b } from '@menus/consumer-http'
import { consumer_login_user$_b } from '@menus/consumer-user-common'
import { is_mobile_menu_open$_b } from '@menus/layout-ui'
import { BaseController } from '@menus/shared-ui-lib'
import type { User } from '@menus/user-common'
import { query_str_ } from '@ctx-core/uri'
import { navigating_goto_b } from '@menus/page'
import type { consumer_layout_ui_Ctx } from '../consumer_layout_ui_Ctx.js'
import { is_ProfileHandle_open$_b } from '../is_ProfileHandle_open$_b.js'
import { toggle_ProfileHandle_b } from '../toggle_ProfileHandle_b.js'
const Controller_name = 'ProfileMenu_c'
export class ProfileMenu_c extends BaseController<consumer_layout_ui_Ctx> {
	readonly consumer_login_user$ = consumer_login_user$_b(this.ctx)
	readonly is_mobile_menu_open$ = is_mobile_menu_open$_b(this.ctx)
	readonly is_ProfileHandle_open$ = is_ProfileHandle_open$_b(this.ctx)
	readonly navigating_goto = navigating_goto_b(this.ctx)
	readonly goto_login = goto_login_b(this.ctx)
	readonly toggle_ProfileHandle = toggle_ProfileHandle_b(this.ctx)
	async onMount() {
		await super.onMount()
		this.ctx[Controller_name] = this
	}
	async onDestroy() {
		if (this.ctx[Controller_name] === this) delete this.ctx[Controller_name]
		await super.onDestroy()
	}
	navigate = async (url: string)=>{
		this.toggle_ProfileHandle(true)

		const pathname = window.location.pathname;

		// Only add returnUrl if user navigates from `search` or specific `restaurant` page
		if(pathname.startsWith('/search') || pathname.startsWith('/restaurant/')) {
			await this.navigating_goto([
				url,
				query_str_({ returnUrl: `${window.location.pathname}${window.location.search}` })
			])
		} else {
			await this.navigating_goto([url])
		}
	}
	readonly logout = async ()=>{
		this.is_mobile_menu_open$.set(false)
		if (this.is_ProfileHandle_open$.$) {
			this.toggle_ProfileHandle()
		}
		if ((this.consumer_login_user$.$ as User)?.sn_id) {
			localStorage.removeItem('_login_provider')
		}
		this.consumer_login_user$.logout()
		await this.goto_login('/')
	}
}
