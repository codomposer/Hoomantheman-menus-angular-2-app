import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { platform_settings$_b } from './platform_settings$_b.js'
import type { http_Ctx } from './http_Ctx.js'
const key = 'PublicKey$'
export const PublicKey$_b:B<http_Ctx, typeof key> = be_(key, ctx=>{
	return derived$(platform_settings$_b(ctx), platform_settings=>
		platform_settings ? platform_settings.PublicKey : undefined
	)
})
export type PublicKey$_T = Readable$<string>
