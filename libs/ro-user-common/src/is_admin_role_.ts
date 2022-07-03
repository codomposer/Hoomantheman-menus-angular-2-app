import { RO_USER_LEVEL_ADMIN, RO_USER_LEVEL_REST_OWNER, RO_USER_LEVEL_SUPER_ADMIN } from '@menus/web-config'
import { Ro_User } from './Ro_User.js'
const admin_roles = [RO_USER_LEVEL_SUPER_ADMIN, RO_USER_LEVEL_ADMIN, RO_USER_LEVEL_REST_OWNER]
export function is_admin_role_(ro_login_user:Ro_User):boolean {
	return ro_login_user ? !!(~admin_roles.indexOf(ro_login_user.UserLevel)) : false
}
