import { CfnOutput, Duration } from '@aws-cdk/core'
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda'
import { Port } from '@aws-cdk/aws-ec2'
import { be_, assign, B } from '@ctx-core/object'
import { NODE_ENV_b } from '../common/index.js'
import { has_redis_b, redis_cluster_b, redis_port, redis_security_group_b } from '../redis/index.js'
import { stack_vpc_b } from '../vpc/index.js'
import type { aws_Ctx } from '../aws_Ctx.js'
import { web_host_b } from './web_host_b.js'
const key = 'web_lambda_function'
export const web_lambda_function_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct } = ctx
	const host = web_host_b(ctx)
	const NODE_ENV = NODE_ENV_b(ctx)
	const has_redis = has_redis_b(ctx)
	const environment = assign({
		NODE_ENV
	}, has_redis ? {
		REDIS_HOST: redis_cluster_b(ctx).attrRedisEndpointAddress,
		REDIS_PORT: redis_cluster_b(ctx).attrRedisEndpointPort,
	} : {})
	const securityGroups = has_redis ? [redis_security_group_b(ctx)] : []
	const stack_vpc = stack_vpc_b(ctx)
	const lambdaFunction =
		new Function(construct, `${host}-lambda-function`, {
			runtime: Runtime.NODEJS_14_X,
			code: Code.fromAsset('app'),
			handler: 'lambda/index.handler',
			timeout: Duration.seconds(10),
			memorySize: 256,
			vpc: stack_vpc,
			securityGroups,
			environment,
		})
	if (has_redis) {
		lambdaFunction.connections.allowTo(redis_security_group_b(ctx), Port.tcp(redis_port))
	}
	new CfnOutput(construct, `${host}-lambda-function.functionArn`, {
		value: lambdaFunction.functionArn,
	})
	return lambdaFunction
})
export type web_lambda_function_T = Function
