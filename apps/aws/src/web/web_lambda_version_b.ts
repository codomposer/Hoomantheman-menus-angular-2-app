import { Version } from '@aws-cdk/aws-lambda'
import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
import { web_host_b } from './web_host_b.js'
import { web_lambda_function_b } from './web_lambda_function_b.js'
const key = 'web_lambda_version'
export const web_lambda_version_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{ //region
	const { construct } = ctx
	const host = web_host_b(ctx)
	const web_lambda_function = web_lambda_function_b(ctx)
	return new Version(construct, `${host}-LambdaVersion`, {
		lambda: web_lambda_function
	})
})
export type web_lambda_version_T = Version
