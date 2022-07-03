<script context="module" lang="ts">
import type { preload_T } from '@ctx-core/sapper'
import { ro_auth_redirects_preload_ } from '@menus/ro-route'
import { CHAT_PAGE } from '@menus/web-config'
export const preload:preload_T = ro_auth_redirects_preload_(CHAT_PAGE)
</script>

<slot></slot>
