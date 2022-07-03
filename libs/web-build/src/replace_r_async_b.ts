import { readFile } from 'fs/promises'
import { B, be_ } from '@ctx-core/object'
import { resolve } from '@menus/import-meta-resolve'
import { mode_b } from './mode_b.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { env_APP_VERSION$_b } from './env_APP_VERSION$_b.js'
const key = 'replace_r_async'
export const replace_r_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const web_pkg = JSON.parse(
		(await readFile(
			new URL(await resolve('../../../apps/web/package.json', import.meta.url)).pathname
		)).toString()
	)
	const braintree_web_pkg = JSON.parse(
		(await readFile(
			new URL(await resolve('braintree-web/package.json', import.meta.url)).pathname
		)).toString()
	)
	const mode = mode_b(ctx)
	return {
		preventAssignment: true,
		delimiters: ['', ''],
		'process.browser': 'true',
		'process.env.NODE_ENV': JSON.stringify(mode),
		'process.env.DEV': JSON.stringify(process.env.DEV || ''),
		'process.env.LIVE': JSON.stringify(process.env.LIVE || ''),
		'process.env.APP_VERSION': env_APP_VERSION$_b(ctx).$ || JSON.stringify(web_pkg.version),
		'process.env.BRAINTREE_VERSION': JSON.stringify(braintree_web_pkg.version),
		'process.env.MAPP_URL': JSON.stringify(
			process.env.MAPP_URL
			? process.env.MAPP_URL
			: '/mapp'
		),
		'process.env.LIVE_RECAPTCHA_SITE_KEY': JSON.stringify(process.env.LIVE_RECAPTCHA_SITE_KEY),
		'process.env.DEV_RECAPTCHA_SITE_KEY': JSON.stringify(process.env.DEV_RECAPTCHA_SITE_KEY),
	} as replace_r_T
})
export type replace_r_T = Record<string, any>
export type replace_r_async_T = Promise<replace_r_T>
