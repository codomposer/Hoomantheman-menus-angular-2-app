import { CfnSubnetGroup } from '@aws-cdk/aws-elasticache'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
import { stack_vpc_b } from '../vpc/index.js'
import { has_redis_b } from './has_redis_b.js'
const key = 'redis_subnet_group'
export const redis_subnet_group_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	if (!has_redis_b(ctx)) return
	const { construct } = ctx
	const stack_vpc = stack_vpc_b(ctx)
	const redis_subnet_group = new CfnSubnetGroup(construct, 'redis-subnet-group', {
		description: 'List of subnets used for redis cache',
		subnetIds: stack_vpc.privateSubnets.map(subnet=>subnet.subnetId),
	})
	return redis_subnet_group
})
export type redis_subnet_group_T = CfnSubnetGroup
