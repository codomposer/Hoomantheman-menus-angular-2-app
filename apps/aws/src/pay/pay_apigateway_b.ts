import { CfnOutput } from '@aws-cdk/core'
import { Cors, EndpointType, HttpIntegration, RestApi } from '@aws-cdk/aws-apigateway'
import { B, be_ } from '@ctx-core/object'
import { local_az_certificate_b } from '../common/index.js'
import type { aws_Ctx } from '../aws_Ctx.js'
import { pay_bucket_b } from './pay_bucket_b.js'
import { pay_host_b } from './pay_host_b.js'
const key = 'pay_apigateway'
export const pay_apigateway_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	if (!~['live', 'dev'].indexOf(ctx.stage)) return
	const { construct } = ctx
	const pay_host = pay_host_b(ctx)
	const local_az_certificate = local_az_certificate_b(ctx)
	const pay_apigateway = new RestApi(construct, `${pay_host}-apigateway`, {
		restApiName: `${pay_host}-apigateway`,
		deploy: true,
		defaultCorsPreflightOptions: {
			allowOrigins: ['*'],
			allowHeaders: [
				'*', 'Content-Type', 'X-Amz-Date', 'Authorization',
				'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent'
			],
			allowMethods: Cors.ALL_METHODS,
		},
		domainName: {
			domainName: pay_host,
			certificate: local_az_certificate,
			endpointType: EndpointType.REGIONAL,
		},
	})
	const pay_bucket = pay_bucket_b(ctx)
	const assets_integration = new HttpIntegration(`${pay_bucket.bucketWebsiteUrl}/{proxy}`, {
		proxy: true,
		options: {
			requestParameters: {
				'integration.request.path.proxy': 'method.request.path.proxy',
			},
		},
	})
	pay_apigateway.root.addMethod('ANY', assets_integration, {
		requestParameters: {
			'method.request.path.proxy': true,
		}
	})
	pay_apigateway.root.addResource('{proxy+}')
		.addMethod('ANY', assets_integration, {
			requestParameters: {
				'method.request.path.proxy': true,
			}
		})
	new CfnOutput(construct, 'pay_apigateway.domainName', {
		value: pay_apigateway.domainName.domainName,
	})
	new CfnOutput(construct, 'pay_apigateway.domainNameAliasDomainName', {
		value: pay_apigateway.domainName.domainNameAliasDomainName,
	})
	new CfnOutput(construct, 'pay_apigateway.domainNameAliasHostedZoneId', {
		value: pay_apigateway.domainName.domainNameAliasHostedZoneId,
	})
	return pay_apigateway
})
export type pay_apigateway_T = RestApi
