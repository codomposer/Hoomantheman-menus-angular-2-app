import { RO_USER_LEVEL_REST_OWNER } from '@menus/web-config'
import type { Ro_User } from './Ro_User.js'
export function is_rest_owner_role_(ro_login_user:Ro_User):boolean {
	return ro_login_user.UserLevel === RO_USER_LEVEL_REST_OWNER
}
