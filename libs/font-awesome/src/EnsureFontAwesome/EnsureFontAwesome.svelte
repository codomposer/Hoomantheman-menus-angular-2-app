<script lang="ts">
import { SingletonComponent } from '@menus/component-registry'
import { getContext_ui_ctx } from '@menus/ui'
import type { font_awesome_Ctx } from '../font_awesome_Ctx.js'
import LoadFontAwesome from './LoadFontAwesome.svelte'
const ctx = getContext_ui_ctx() as font_awesome_Ctx
</script>
<SingletonComponent {ctx} Load={LoadFontAwesome}></SingletonComponent>
