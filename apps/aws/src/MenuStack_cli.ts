import { resolve } from '@menus/import-meta-resolve'
import { App } from '@aws-cdk/core'
import { _cli_run } from '@ctx-core/aws-cli'
import { param_r_, param_record_T } from '@ctx-core/cli-args'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { I } from '@ctx-core/combinators'
import { create_menu_stack } from './create_menu_stack.js'
import { id_, stage_T, menusappbuilder_Instance$_b } from './common/index.js'
import { aws_env } from './aws_env.js'
import type { aws_Ctx } from './aws_Ctx.js'
export async function MenuStack_cli() {
	await _cli_run(async ()=>{
		const args = process.argv.slice(2)
		process.chdir(new URL(await resolve('..', import.meta.url)).pathname)
		const { stage } = param_r_(args, {
			stage: '-s, --stage',
		}, {
			stage: '',
		}) as cli_args_T
		const ctx:aws_Ctx = { stage }
		const { MENUSAPPBUILDER_INSTANCE_ID } = aws_env
		if (!MENUSAPPBUILDER_INSTANCE_ID) {
			throw 'Missing MENUSAPPBUILDER_INSTANCE_ID environment variable'
		}
		const menusappbuilder_Instance$ = menusappbuilder_Instance$_b(ctx)
		await subscribe_wait_timeout(menusappbuilder_Instance$, I, 10_000)
		const app = new App()
		create_menu_stack(app, id_(stage), {
			env: {
				account: aws_env.CDK_DEFAULT_ACCOUNT,
				region: aws_env.CDK_DEFAULT_REGION || 'us-west-2',
			},
			tags: {
				stage: stage as stage_T,
			}
		}, ctx)
		app.synth()
		return 0
	})
}
export interface cli_args_T extends param_record_T {
	stage:stage_T
}
