import { RO_USER_LEVEL_SUPER_ADMIN } from '@menus/web-config'
import { Ro_User } from './Ro_User.js'
const super_admin_roles = [RO_USER_LEVEL_SUPER_ADMIN]
export function is_super_admin_role_(ro_login_user:Ro_User):boolean {
	return (
		ro_login_user
		? !!(~super_admin_roles.indexOf(ro_login_user.UserLevel))
		: false
	)
}
