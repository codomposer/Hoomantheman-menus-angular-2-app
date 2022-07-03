import { B, be_ } from '@ctx-core/object'
import { User } from '@aws-cdk/aws-iam'
import { id_ } from '../common/index.js'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'api_user'
export const api_user_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct, stage } = ctx
	const id = id_(stage)
	const api_user = new User(construct, `${id}-api-user`, {
		userName: `${id}-api-user`,
	})
	return api_user
})
export type api_user_T = User
