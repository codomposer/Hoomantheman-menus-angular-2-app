<script context="module" lang="ts">
import type { preload_T } from '@ctx-core/sapper'
import { BILLING_PAGE } from '@menus/web-config'
import { ro_auth_redirects_preload_ } from '@menus/ro-route'
export const preload:preload_T = ro_auth_redirects_preload_(BILLING_PAGE)
</script>

<slot></slot>
