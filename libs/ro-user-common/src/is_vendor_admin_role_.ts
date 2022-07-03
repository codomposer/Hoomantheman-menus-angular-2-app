import { RO_USER_LEVEL_ADMIN, RO_USER_LEVEL_SUPER_ADMIN } from '@menus/web-config'
import { Ro_User } from './Ro_User.js'
const menu_admin_roles = [RO_USER_LEVEL_SUPER_ADMIN, RO_USER_LEVEL_ADMIN]
export function is_vendor_admin_role_(ro_login_user:Ro_User) {
	return (
		ro_login_user
		? !!(~menu_admin_roles.indexOf(ro_login_user.UserLevel))
		: false
	)
}
