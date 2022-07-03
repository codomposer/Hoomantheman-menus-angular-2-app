import { flatten } from '@ctx-core/array'
import type { User } from './User.js'
export function user_full_name_(user:User):string {
	if (!user) return ''
	return flatten([user.FirstName, user.LastName]).join(' ')
}
