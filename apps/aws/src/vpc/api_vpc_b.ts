import { B, be_ } from '@ctx-core/object'
import { IVpc, Vpc } from '@aws-cdk/aws-ec2'
import { id_ } from '../common/index.js'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'api_vpc'
export const api_vpc_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct, stage } = ctx
	const id = id_(stage)
	const { MENUSAPPBUILDER_VPC_ID } = process.env
	if (!MENUSAPPBUILDER_VPC_ID) {
		throw 'MENUSAPPBUILDER_VPC_ID env variable is not defined'
	}
	const api_vpc = Vpc.fromLookup(construct, `${id}-api_vpc`, {
		vpcId: MENUSAPPBUILDER_VPC_ID
	})
	return api_vpc
})
export type api_vpc_T = IVpc
