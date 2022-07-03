import { CfnOutput } from '@aws-cdk/core'
import { CfnCacheCluster } from '@aws-cdk/aws-elasticache'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
import { redis_subnet_group_b } from './redis_subnet_group_b.js'
import { redis_security_group_b } from './redis_security_group_b.js'
import { has_redis_b } from './has_redis_b.js'
const key = 'redis_cluster'
export const redis_cluster_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	if (!has_redis_b(ctx)) return
	const { construct } = ctx
	const redis_subnet_group = redis_subnet_group_b(ctx)
	const redis_security_group = redis_security_group_b(ctx)
	const redis_cluster = new CfnCacheCluster(construct, 'redis-cluster', {
		cacheNodeType: 'cache.m5.large',
		engine: 'redis',
		numCacheNodes: 1,
		autoMinorVersionUpgrade: true,
		cacheSubnetGroupName: redis_subnet_group.ref,
		vpcSecurityGroupIds: [
			redis_security_group.securityGroupId,
		],
	})
	new CfnOutput(construct, 'redis_cluster.attrRedisEndpointAddress', {
		value: redis_cluster.attrRedisEndpointAddress,
	})
	new CfnOutput(construct, 'redis_cluster.attrRedisEndpointPort', {
		value: redis_cluster.attrRedisEndpointPort,
	})
	return redis_cluster
})
export type redis_cluster_T = CfnCacheCluster
