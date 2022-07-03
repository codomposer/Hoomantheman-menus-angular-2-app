import { CfnOutput } from '@aws-cdk/core'
import {
	ConnectionType, Cors, EndpointType, Integration, IntegrationType, MethodLoggingLevel, RateLimitedApiKey, RestApi,
	VpcLink, // DomainName,
} from '@aws-cdk/aws-apigateway'
import { Subnet } from '@aws-cdk/aws-ec2'
import {
	NetworkListener, NetworkLoadBalancer, NetworkTargetGroup, Protocol
} from '@aws-cdk/aws-elasticloadbalancingv2'
import { InstanceIdTarget } from '@aws-cdk/aws-elasticloadbalancingv2-targets'
import { B, be_ } from '@ctx-core/object'
import { id_, local_az_api_certificate_b, menusappbuilder_Instance$_b } from '../common/index.js'
import { api_vpc_b } from '../vpc/index.js'
import type { aws_Ctx } from '../aws_Ctx.js'
import { api_ec2_security_group_b } from './api_ec2_security_group_b.js'
import { api_host_b } from './api_host_b.js'
// import { dishzilla_host_b } from './dishzilla_host_b.js'
const usage_plan_enabled = false
const key = 'api_apigateway'
export const api_apigateway_b:B<aws_Ctx, typeof key> = be_(key, ctx=>{
	if (!~['live'].indexOf(ctx.stage)) return
	const { construct, stage } = ctx
	const id = id_(stage)
	api_ec2_security_group_b(ctx) // Ensure security group permissions are loaded
	const menusappbuilder_Instance$ = menusappbuilder_Instance$_b(ctx)
	const menusappbuilder_Instance = menusappbuilder_Instance$.$
	if (!menusappbuilder_Instance) {
		throw 'menusappbuilder_Instance$ is required'
	}
	const { AWS_AZ, MENUSAPPBUILDER_SUBNET_ID } = process.env
	if (!AWS_AZ) {
		throw 'AWS_AZ is required'
	}
	if (!MENUSAPPBUILDER_SUBNET_ID) {
		throw 'MENUSAPPBUILDER_SUBNET_ID is required'
	}
	const api_host = api_host_b(ctx)
	// const dishzilla_host = dishzilla_host_b(ctx)
	const local_az_api_certificate = local_az_api_certificate_b(ctx)
	const api_vpc = api_vpc_b(ctx)
	const api_subnet = Subnet.fromSubnetId(construct, `${id}-api_subnet`, MENUSAPPBUILDER_SUBNET_ID)
	const api_apigateway = new RestApi(construct, `${api_host}-apigateway`, {
		restApiName: `${api_host}-apigateway`,
		deploy: true,
		deployOptions: {
			loggingLevel: MethodLoggingLevel.INFO,
			dataTraceEnabled: true,
			throttlingBurstLimit: 500,
		},
		defaultCorsPreflightOptions: {
			allowOrigins: ['*'],
			allowHeaders: ['*', 'Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent'],
			allowMethods: Cors.ALL_METHODS,
		},
		domainName: {
			domainName: api_host,
			certificate: local_az_api_certificate,
			endpointType: EndpointType.REGIONAL,
		},
		binaryMediaTypes: [
			'multipart/form-data',
		],
	})
	// new DomainName(construct, `${id}-dishzilla`, {
	//   domainName: dishzilla_host,
	//   certificate: local_az_api_certificate,
	//   endpointType: EndpointType.REGIONAL,
	// })
	new CfnOutput(construct, 'api_apigateway.domainName', {
		value: api_apigateway.domainName.domainName,
	})
	new CfnOutput(construct, 'api_apigateway.domainNameAliasDomainName', {
		value: api_apigateway.domainName.domainNameAliasDomainName,
	})
	new CfnOutput(construct, 'api_apigateway.domainNameAliasHostedZoneId', {
		value: api_apigateway.domainName.domainNameAliasHostedZoneId,
	})
	const nlb = new NetworkLoadBalancer(construct, `${id}-nlb`, {
		vpc: api_vpc,
		vpcSubnets: {
			subnets: [api_subnet]
		},
	})
	// const network_target_group__443 = new NetworkTargetGroup(construct, `${id}-api-NetworkTargetGroup--443`, {
	//   port: 443,
	//   protocol: Protocol.TCP,
	//   vpc: api_vpc,
	//   targets: [new InstanceIdTarget(menusappbuilder_Instance$.InstanceId, 443)],
	// })
	const network_target_group__80 = new NetworkTargetGroup(construct, `${id}-api-NetworkTargetGroup--443`, {
		port: 80,
		protocol: Protocol.TCP,
		vpc: api_vpc,
		targets: [new InstanceIdTarget(menusappbuilder_Instance.InstanceId, 80)],
	})
	new NetworkListener(construct, `${id}-api-NetworkListener`, {
		loadBalancer: nlb,
		protocol: Protocol.TLS,
		port: 443,
		certificates: [{
			certificateArn: process.env.LOCAL_AZ_API_AWS_CERTIFICATE_ARN
		}],
		defaultTargetGroups: [
			// network_target_group__443,
			network_target_group__80,
		]
	})
	const vpcLink = new VpcLink(construct, `${id}-vpcLink`, { targets: [nlb] })
	const api_proxy_integration = new Integration({
		type: IntegrationType.HTTP_PROXY,
		integrationHttpMethod: 'ANY',
		uri: `https://${api_host}/{proxy}`,
		options: {
			connectionType: ConnectionType.VPC_LINK,
			vpcLink,
			requestParameters: {
				'integration.request.path.proxy': 'method.request.path.proxy',
			},
		}
	})
	api_apigateway.root.addResource('{proxy+}')
		.addMethod('ANY', api_proxy_integration, {
			requestParameters: {
				'method.request.path.proxy': true,
			},
		})
	new CfnOutput(construct, 'api_apigateway.url', {
		value: api_apigateway.url
	})
	if (usage_plan_enabled) {
		new RateLimitedApiKey(construct, `${id}-rate_limited_api_key`, {
			resources: [api_apigateway],
			throttle: {
				// TODO: When restaurant images are moved to S3, reduce this to ~20
				rateLimit: 40,
				burstLimit: 40,
			}
		})
	}
	return api_apigateway
})
export type api_apigateway_T = RestApi
