import { RO_USER_LEVEL_KITCHEN } from '@menus/web-config'
import { Ro_User } from './Ro_User.js'
const kitchen_roles = [RO_USER_LEVEL_KITCHEN]
export function is_kitchen_role_(ro_login_user:Ro_User):boolean {
	return (
		ro_login_user
		? !!(~kitchen_roles.indexOf(ro_login_user.UserLevel))
		: false
	)
}
