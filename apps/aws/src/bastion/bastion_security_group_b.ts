import { SecurityGroup } from '@aws-cdk/aws-ec2'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
import { stack_vpc_b } from '../vpc/index.js'
const key = 'bastion_security_group'
export const bastion_security_group_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct } = ctx
	const stack_vpc = stack_vpc_b(ctx)
	const bastion_security_group = new SecurityGroup(
		construct, 'bastion-security-group', {
			vpc: stack_vpc,
		})
	return bastion_security_group
})
export type bastion_security_group_T = SecurityGroup
