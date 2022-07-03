<script context="module" lang="ts">
import type { page_T } from '@ctx-core/sapper'
import { preload_ } from '@menus/app'
import { is_hash_routing } from '@menus/core-routing'
export const preload = preload_(async function (_page:page_T, _session) {
	if (is_hash_routing) {
		// TODO: check if the current login is valid
		return await this.redirect(302, '/backoffice/login')
	}
})
</script>

<script lang="ts">
import { RoHome } from '@menus/ro-home-ui'
</script>

<RoHome></RoHome>
