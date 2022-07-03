import {
	IVpc, Vpc
	// SubnetType,
} from '@aws-cdk/aws-ec2'
// import { CfnIPSet } from '@aws-cdk/aws-wafv2'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'stack_vpc'
export const stack_vpc_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct } = ctx
	const vpc = new Vpc(construct, 'vpc', {
		maxAzs: 2,
		natGateways: 1,
	})
	// new CfnIPSet()
	// process.env.DEV_WAF_WHITELIST_IP_SET_ARN
	// vpc.selectSubnets({
	//   subnetType: SubnetType.PUBLIC,
	// })[0].ipAddress
	return vpc
})
export type stack_vpc_T = IVpc
