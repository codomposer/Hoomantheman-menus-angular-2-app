import * as core from '@aws-cdk/core'
import { stage_T } from './common/index.js'
import { aws_ctx_I } from './aws_ctx_I.generated.js'
export interface aws_Ctx extends aws_ctx_I {
	stage:stage_T
	construct?:core.Construct
}
