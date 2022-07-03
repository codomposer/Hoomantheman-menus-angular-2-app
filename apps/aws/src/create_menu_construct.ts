import { certificate_b, ConstructProps } from './common/index.js'
// import { bastion_b, bastion_security_group_b } from './bastion/index.js';
import { redis_cluster_b, redis_subnet_group_b, redis_security_group_b } from './redis/index.js'
import {
	web_host_b, web_lambda_function_b, web_apigateway_b, web_root_distribution_b,
	web_star_distribution_b,
} from './web/index.js'
import { api_user_b, api_ec2_security_group_b, api_apigateway_b, images_distribution_b } from './api/index.js'
import { pay_distribution_b } from './pay/index.js'
import type { aws_Ctx } from './aws_Ctx.js'
import { Construct } from '@aws-cdk/core'
/**
 * @param {import('@aws-cdk/core').Construct} parent
 * @param {string} id
 * @param {import('./common/index.ts').ConstructProps} props
 * @param {import('./aws_Ctx.ts').aws_Ctx} ctx
 */
export function create_menu_construct(
	parent:Construct, id:string, props:ConstructProps, ctx:aws_Ctx
) {
	const construct = new Construct(parent, id)
	ctx.construct = construct
	// bastion_b(ctx);
	// bastion_security_group_b(ctx);
	if (~['dev', 'live'].indexOf(props.stage)) {
		redis_cluster_b(ctx)
		redis_subnet_group_b(ctx)
		redis_security_group_b(ctx)
	}
	web_host_b(ctx)
	certificate_b(ctx)
	web_apigateway_b(ctx)
	web_root_distribution_b(ctx)
	web_star_distribution_b(ctx)
	web_lambda_function_b(ctx)
	if (~['live'].indexOf(props.stage)) {
		api_user_b(ctx)
		api_ec2_security_group_b(ctx)
		api_apigateway_b(ctx)
	}
	images_distribution_b(ctx)
	if (~['live', 'dev'].indexOf(ctx.stage)) {
		pay_distribution_b(ctx)
	}
}
