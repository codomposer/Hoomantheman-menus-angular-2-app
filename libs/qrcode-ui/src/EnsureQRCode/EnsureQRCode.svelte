<script lang="ts">
import { SingletonComponent } from '@menus/component-registry'
import { getContext_ui_ctx } from '@menus/ui'
import type { qrcode_ui_Ctx } from '../qrcode_ui_Ctx.js'
import LoadQRCode from './LoadQRCode.svelte'
const ctx = getContext_ui_ctx() as qrcode_ui_Ctx
</script>
<SingletonComponent {ctx} Load={LoadQRCode}></SingletonComponent>
