import { RO_USER_LEVEL_AGENT, RO_USER_LEVEL_AGENT_ADMIN } from '@menus/web-config'
import { Ro_User } from './Ro_User.js'
export function is_agent_role_(ro_login_user:Ro_User):boolean {
	return (
		ro_login_user
		? (
			ro_login_user.UserLevel === RO_USER_LEVEL_AGENT_ADMIN
			|| ro_login_user.UserLevel === RO_USER_LEVEL_AGENT
		)
		: false
	)
}
