import { CfnTransitGateway, CfnTransitGatewayAttachment } from '@aws-cdk/aws-ec2'
import { B, be_ } from '@ctx-core/object'
import { id_ } from '../common/index.js'
import type { aws_Ctx } from '../aws_Ctx.js'
import { api_vpc_b } from './api_vpc_b.js'
import { stack_vpc_b } from './stack_vpc_b.js'
const key = 'transit_gateway'
export const transit_gateway_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct, stage } = ctx
	const id = id_(stage)
	const api_vpc = api_vpc_b(ctx)
	const stack_vpc = stack_vpc_b(ctx)
	const transit_gateway = new CfnTransitGateway(construct, `${id}-transit_gateway`, {})
	new CfnTransitGatewayAttachment(construct, `${id}-api_vpc_transit_gateway_attachment`, {
		vpcId: api_vpc.vpcId,
		transitGatewayId: transit_gateway.ref,
		subnetIds: api_vpc.isolatedSubnets.map(subnet=>subnet.subnetId),
	})
	new CfnTransitGatewayAttachment(construct, `${id}-stack_vpc_transit_gateway_attachment`, {
		vpcId: stack_vpc.vpcId,
		transitGatewayId: transit_gateway.ref,
		subnetIds: stack_vpc.isolatedSubnets.map(subnet=>subnet.subnetId),
	})
	return transit_gateway
})
export type transit_gateway_T = CfnTransitGateway
