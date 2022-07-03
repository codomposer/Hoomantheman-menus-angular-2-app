import { CfnOutput } from '@aws-cdk/core'
import { B, be_ } from '@ctx-core/object'
import {
	BastionHostLinux, Peer, SubnetType,
	// InstanceClass, InstanceSize, InstanceType,
} from '@aws-cdk/aws-ec2'
import type { aws_Ctx } from '../aws_Ctx.js'
import { stack_vpc_b } from '../vpc/index.js'
import { bastion_security_group_b } from './bastion_security_group_b.js'
const key = 'bastion'
export const bastion_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct } = ctx
	const stack_vpc = stack_vpc_b(ctx)
	const bastion_security_group = bastion_security_group_b(ctx)
	const bastion = new BastionHostLinux(construct, 'bastion', {
		vpc: stack_vpc,
		securityGroup: bastion_security_group,
		subnetSelection: {
			subnetType: SubnetType.PUBLIC,
		},
		// instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
	})
	bastion.allowSshAccessFrom(Peer.anyIpv4())
	new CfnOutput(construct, 'bastion.instancePublicDnsName', {
		description: 'Bastion Public Dns Name',
		value: bastion.instancePublicDnsName,
	})
	return bastion
})
export type bastion_T = BastionHostLinux
