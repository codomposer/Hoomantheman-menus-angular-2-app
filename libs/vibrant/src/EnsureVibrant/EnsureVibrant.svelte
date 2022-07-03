<script lang="ts">
import { SingletonComponent } from '@menus/component-registry'
import { getContext_ui_ctx } from '@menus/ui'
import type { vibrant_Ctx } from '../vibrant_Ctx.js'
import LoadVibrant from './LoadVibrant.svelte'
const ctx = getContext_ui_ctx() as vibrant_Ctx
</script>
<SingletonComponent {ctx} Load={LoadVibrant}></SingletonComponent>
