import { RO_USER_LEVEL_APPMAKER } from '@menus/web-config'
import { Ro_User } from './Ro_User.js'
const appmaker_roles = [
	RO_USER_LEVEL_APPMAKER,
]
export function is_appmaker_role_(ro_login_user:Ro_User):boolean {
	return ro_login_user ? !!(~appmaker_roles.indexOf(ro_login_user.UserLevel)) : false
}
