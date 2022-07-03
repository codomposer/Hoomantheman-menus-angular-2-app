import { Stack, App, StackProps } from '@aws-cdk/core'
import type { stage_T } from './common/index.js'
import type { aws_Ctx } from './aws_Ctx.js'
import { create_menu_construct } from './create_menu_construct.js'
export function create_menu_stack(parent:App, id:string, props:StackProps, ctx:aws_Ctx) {
	const stack = new Stack(parent, `${id}-stack`, props)
	const tags = props.tags
	const stage = tags.stage as stage_T
	create_menu_construct(stack, id, { stage }, ctx)
}
