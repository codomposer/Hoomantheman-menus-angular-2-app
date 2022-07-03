<script lang="ts">
import { SingletonComponent } from '@menus/component-registry'
import { getContext_ui_ctx } from '@menus/ui'
import type { grecaptcha_Ctx } from '../grecaptcha_Ctx.js'
import LoadGrecaptcha from './LoadGrecaptcha.svelte'
const ctx = getContext_ui_ctx() as grecaptcha_Ctx
</script>
<SingletonComponent {ctx} Load={LoadGrecaptcha}></SingletonComponent>
