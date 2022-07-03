<script lang="ts">
import { SingletonComponent } from '@menus/component-registry'
import { getContext_ui_ctx } from '@menus/ui'
import type { socket_io_Ctx } from '../socket_io_Ctx'
import LoadSocketIO from './LoadSocketIO.svelte'
const ctx = getContext_ui_ctx() as socket_io_Ctx
</script>
<SingletonComponent {ctx} Load={LoadSocketIO}></SingletonComponent>
