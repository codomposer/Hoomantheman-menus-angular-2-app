<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { Breadcrumb } from '@menus/breadcrumb-ui'
import type { manage_platform_ui_Ctx } from '@menus/manage-platform-ui'
import { manage_platform_busy$_b, manage_platform_settings$_b } from '@menus/manage-platform-ui'
import { AppConfiguration } from '@menus/manage-platform-ui-AppConfiguration'
import { PageLoader } from '@menus/shared-ui'
import { getContext_ui_ctx } from '@menus/ui'
const ctx = getContext_ui_ctx() as manage_platform_ui_Ctx, dispatch = createEventDispatcher()
const manage_platform_busy$ = manage_platform_busy$_b(ctx)
const manage_platform_settings$ = manage_platform_settings$_b(ctx)
</script>

<div class="breadcrumb-container">
  <Breadcrumb></Breadcrumb>
</div>
<div class="ManagePlatform page">
  {#if $manage_platform_busy$}
    <PageLoader center="page"></PageLoader>
  {/if}
	<AppConfiguration></AppConfiguration>
</div>
