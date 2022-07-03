<script lang="ts">
import { run } from '@ctx-core/function'
import { has_dom } from '@ctx-core/dom'
import { getContext_ui_ctx } from '@menus/ui'
import { EnsureQRCode } from '../EnsureQRCode'
import { QRCode_ } from '../QRCode_'
import { qrcode_loaded$_b } from '../qrcode_loaded$_b.js'
import type { qrcode_ui_Ctx } from '../qrcode_ui_Ctx.js'
const ctx = getContext_ui_ctx() as qrcode_ui_Ctx
export let text, dynamic = false
const qrcode_loaded = qrcode_loaded$_b(ctx)
let QRImage
$: {
	if (has_dom && $qrcode_loaded) {
		run(async ()=>{
			QRImage = await QRCode_().toDataURL(text)
		}).then()
	}
}
</script>

<EnsureQRCode></EnsureQRCode>
{#if dynamic}
	<slot QRImage={QRImage}></slot>
{:else}
	<img src={QRImage} alt="QR Code"/> 
{/if}
