import { B, be_ } from '@ctx-core/object'
import { User } from '@aws-cdk/aws-iam'
import { id_ } from '../common/index.js'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'pay_user'
export const pay_user_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct, stage } = ctx
	const id = id_(stage)
	const pay_user = new User(construct, `${id}-pay-user`, {
		userName: `${id}-pay-user`,
	})
	return pay_user
})
export type pay_user_T = User
