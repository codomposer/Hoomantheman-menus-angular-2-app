<script context="module" lang="ts">
import { ro_auth_redirects_preload_ } from '@menus/ro-route'
import { SETTINGS_PAGE } from '@menus/web-config'
export const preload = ro_auth_redirects_preload_(SETTINGS_PAGE)
</script>

<slot></slot>
