import { be_, B, Be } from '@ctx-core/object'
import { CfnOutput, Duration } from '@aws-cdk/core'
import type { RestApi } from '@aws-cdk/aws-apigateway'
import {
	CloudFrontWebDistribution, OriginProtocolPolicy, SecurityPolicyProtocol, SSLMethod,
} from '@aws-cdk/aws-cloudfront'
import type { aws_Ctx } from '../aws_Ctx.js'
export function distribution__b<Key extends keyof aws_Ctx>(
	key:Key, params:distribution__b_params_T
):Be<aws_Ctx, Key, CloudFrontWebDistribution> {
	return be_<aws_Ctx, Key, CloudFrontWebDistribution>(key, ctx=>{
		const { construct } = ctx
		const { host_, distribution_name_, acmCertRef_, apigateway_b } = params
		const host = host_(ctx)
		const distribution_name = distribution_name_(ctx)
		const apigateway = apigateway_b(ctx)
		const acmCertRef = acmCertRef_(ctx)
		apigateway.domainName
		const distribution = new CloudFrontWebDistribution(construct, distribution_name, {
			defaultRootObject: '',
			aliasConfiguration: {
				acmCertRef,
				names: [host],
				sslMethod: SSLMethod.SNI,
				securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2019,
			},
			originConfigs: [{
				customOriginSource: {
					domainName: apigateway.domainName.domainNameAliasDomainName,
					originProtocolPolicy: OriginProtocolPolicy.HTTPS_ONLY,
				},
				behaviors: [{
					isDefaultBehavior: true,
					defaultTtl: Duration.millis(0),
					maxTtl: Duration.millis(0),
					forwardedValues: {
						queryString: true,
						headers: ['Host', 'X-Forwarded-Host'],
					},
				}],
			}],
		})
		new CfnOutput(construct, `${key}.distributionDomainName`, {
			value: distribution.distributionDomainName,
		})
		new CfnOutput(construct, `${key}.distributionId`, {
			value: distribution.distributionId,
		})
		return distribution
	})
}
export interface distribution__b_params_T {
	acmCertRef_(ctx:aws_Ctx):string
	distribution_name_(ctx:aws_Ctx):string
	host_(ctx:aws_Ctx):string
	apigateway_b:B<aws_Ctx, keyof aws_Ctx, RestApi>
}
export type distribution__T = CloudFrontWebDistribution
