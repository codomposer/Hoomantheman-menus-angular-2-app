import { APIRequestQuery } from '@menus/api'
import type { User } from '@menus/user-common'
export class RefreshAuthTokenRequestQuery extends APIRequestQuery {
	action:string = 'code'
	x:string // AuthCode
	i:number // ID
	constructor(user:User|false|null) {
		super()
		if (user) {
			this.x = user.AuthCode
			this.i = user.ID
		}
	}
}
