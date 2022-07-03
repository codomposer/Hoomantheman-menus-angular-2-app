import { B, be_ } from '@ctx-core/object'
import { notyf_success_b } from '@menus/notyf'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
import { manage_platform_settings$_b } from './manage_platform_settings$_b.js'
const key = 'copy_PublicKey'
export const copy_PublicKey_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	const notyf_success = notyf_success_b(ctx)
	return copy_PublicKey as copy_PublicKey_T
	async function copy_PublicKey() {
		await navigator.clipboard.writeText(manage_platform_settings$.$.PublicKey)
		await notyf_success({
			message: 'Public Key copied',
			duration: 3_000,
		})
	}
})
export type copy_PublicKey_T = ()=>Promise<void>
