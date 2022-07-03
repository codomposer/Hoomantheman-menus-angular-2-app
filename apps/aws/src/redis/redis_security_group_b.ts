import { Connections, Port, Protocol, SecurityGroup, } from '@aws-cdk/aws-ec2'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
import { stack_vpc_b } from '../vpc/index.js'
import { has_redis_b } from './has_redis_b.js'
import { redis_port } from './redis_port.js'
const key = 'redis_security_group'
export const redis_security_group_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	if (!has_redis_b(ctx)) return
	const { construct } = ctx
	const stack_vpc = stack_vpc_b(ctx)
	const redis_security_group = new SecurityGroup(
		construct, 'redis-security-group', {
			vpc: stack_vpc,
		})
	new Connections({
		securityGroups: [redis_security_group],
		defaultPort: new Port({
			protocol: Protocol.TCP,
			fromPort: redis_port,
			toPort: redis_port,
			stringRepresentation: `TCP:${redis_port}->TCP:${redis_port}`,
		})
	})
	return redis_security_group
})
export type redis_security_group_T = SecurityGroup
