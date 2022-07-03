<script lang="ts">
import { SingletonComponent } from '@menus/component-registry'
import { getContext_ui_ctx } from '@menus/ui'
import type { color_ui_Ctx } from '../color_ui_Ctx.js'
import LoadVanillaPicker from './LoadVanillaPicker.svelte'
const ctx = getContext_ui_ctx() as color_ui_Ctx
</script>
<SingletonComponent {ctx} Load={LoadVanillaPicker}></SingletonComponent>
