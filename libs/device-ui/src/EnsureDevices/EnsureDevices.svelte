<script lang="ts">
import { SingletonComponent } from '@menus/component-registry'
import { getContext_ui_ctx } from '@menus/ui'
import type { device_ui_Ctx } from '../device_ui_Ctx.js'
import LoadDevices from './LoadDevices.svelte'
const ctx = getContext_ui_ctx() as device_ui_Ctx
</script>
<SingletonComponent {ctx} Load={LoadDevices}></SingletonComponent>
