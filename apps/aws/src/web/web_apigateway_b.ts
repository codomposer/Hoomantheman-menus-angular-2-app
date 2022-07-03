import { B, be_ } from '@ctx-core/object'
import { CfnOutput } from '@aws-cdk/core'
import {
	EndpointType, HttpIntegration, LambdaIntegration, LambdaRestApi, MethodLoggingLevel,
} from '@aws-cdk/aws-apigateway'
import { local_az_certificate_b } from '../common/index.js'
import type { aws_Ctx } from '../aws_Ctx.js'
import { web_host_b } from './web_host_b.js'
import { web_lambda_version_b } from './web_lambda_version_b.js'
import { web_lambda_function_b } from './web_lambda_function_b.js'
const key = 'web_apigateway'
export const web_apigateway_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	const { construct, stage } = ctx
	const web_host = web_host_b(ctx)
	const local_az_certificate = local_az_certificate_b(ctx)
	const web_lambda_function = web_lambda_function_b(ctx)
	const web_lambda_version = web_lambda_version_b(ctx)
	const web_apigateway = new LambdaRestApi(construct, `${web_host}-api`, {
		restApiName: `${web_host}-apigateway`,
		handler: web_lambda_version.latestVersion,
		proxy: false,
		deploy: true,
		deployOptions: {
			loggingLevel: MethodLoggingLevel.INFO,
			dataTraceEnabled: true,
		},
		// The first value is ignored & the ~1 is an escaped /
		binaryMediaTypes: [
			'*/*', '*~1*',
		],
		endpointTypes: [EndpointType.REGIONAL],
		domainName: {
			domainName: web_host,
			certificate: local_az_certificate,
			endpointType: EndpointType.REGIONAL,
		},
	})
	new CfnOutput(construct, 'web-apigateway.domainName', {
		value: web_apigateway.domainName.domainName,
	})
	new CfnOutput(construct, 'web-apigateway.domainNameAliasDomainName', {
		value: web_apigateway.domainName.domainNameAliasDomainName,
	})
	new CfnOutput(construct, 'web-apigateway.domainNameAliasHostedZoneId', {
		value: web_apigateway.domainName.domainNameAliasHostedZoneId,
	})
	web_apigateway.addDomainName(`${web_host}-api-star-domainName`, {
		domainName: `*.${web_host}`,
		certificate: local_az_certificate,
		endpointType: EndpointType.REGIONAL,
	})
	const lambda_integration = new LambdaIntegration(web_lambda_function, {
		proxy: true,
	})
	web_apigateway.root.addMethod('ANY', lambda_integration)
	web_apigateway.root.addResource('{proxy+}')
		.addMethod('ANY', lambda_integration)
	new CfnOutput(construct, 'web_apigateway.url', {
		value: web_apigateway.url
	})
	const mapp_url =
		stage === 'live'
		? process.env.LIVE_MAPP_URL
		: process.env.DEV_MAPP_URL
	if (!mapp_url) throw `No MAPP_URL for stage ${stage}`
	const mapp_integration = new HttpIntegration(`${mapp_url}/{proxy}`, {
		proxy: true,
		options: {
			requestParameters: {
				'integration.request.path.proxy': 'method.request.path.proxy',
			},
		},
	})
	web_apigateway.root.addResource('mapp').addResource('{proxy+}')
		.addMethod('GET', mapp_integration, {
			requestParameters: {
				'method.request.path.proxy': true,
			},
		})
	return web_apigateway
})
export type web_apigateway_T = LambdaRestApi
