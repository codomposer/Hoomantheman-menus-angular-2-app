import { B, be_ } from '@ctx-core/object'
import { SecurityGroup, Peer, Port } from '@aws-cdk/aws-ec2'
import { id_ } from '../common/index.js'
import { api_vpc_b } from '../vpc/index.js'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'api_ec2_security_group'
export const api_ec2_security_group_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct, stage } = ctx
	const id = id_(stage)
	const api_vpc = api_vpc_b(ctx)
	const api_ec2_security_group = new SecurityGroup(construct, `${id}-api_ec2_security_group`, {
		securityGroupName: `${id}-api_ec2_security_group`,
		vpc: api_vpc,
	})
	// 22	TCP	173.196.2.0/24	5122018-securitygrp
	// 80	TCP	0.0.0.0/0	5122018-securitygrp
	// 284	TCP	0.0.0.0/0	5122018-securitygrp
	// 443	TCP	0.0.0.0/0	5122018-securitygrp
	// 33892	TCP	72.37.210.0/24	5122018-securitygrp
	// 33892	TCP	122.53.133.64/27	5122018-securitygrp
	// 33892	TCP	222.127.1.16/28	5122018-securitygrp
	// 33892	TCP	175.176.18.163/32	5122018-securitygrp
	// 2626	TCP	0.0.0.0/0	5122018-securitygrp
	// All	ICMP	0.0.0.0/0	5122018-securitygrp
	// 8 - -1	ICMP	0.0.0.0/0	5122018-securitygrp
	api_ec2_security_group.addIngressRule(
		Peer.ipv4('173.196.2.0/24'),
		Port.tcp(22),
		'ssh access 173.196.2.0/24'
	)
	api_ec2_security_group.addIngressRule(
		Peer.ipv4(api_vpc.vpcCidrBlock),
		Port.tcp(80),
		'private vpc http access'
	)
	api_ec2_security_group.addIngressRule( // TODO: What is this port used for?
		Peer.anyIpv4(),
		Port.tcp(284),
	)
	api_ec2_security_group.addIngressRule(
		Peer.ipv4(api_vpc.vpcCidrBlock),
		Port.tcp(443),
		'private vpc https access'
	)
	api_ec2_security_group.addIngressRule( // TODO: What is this port used for?
		Peer.anyIpv4(),
		Port.tcp(2626),
	)
	api_ec2_security_group.addIngressRule(
		Peer.ipv4('72.37.210.0/24'),
		Port.tcp(33892),
	)
	api_ec2_security_group.addIngressRule(
		Peer.ipv4('122.53.133.64/27'),
		Port.tcp(33892),
	)
	api_ec2_security_group.addIngressRule(
		Peer.ipv4('222.127.1.16/28'),
		Port.tcp(33892),
	)
	api_ec2_security_group.addIngressRule(
		Peer.ipv4('175.176.18.163/32'),
		Port.tcp(33892),
	)
	api_ec2_security_group.addIngressRule(
		Peer.anyIpv4(),
		Port.allIcmp(),
	)
	return api_ec2_security_group
})
export type api_ec2_security_group_T = SecurityGroup
