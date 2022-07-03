<script context="module" lang="ts">
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ params }) {
	const { fireFlyID } = params
	this.redirect(302, `/backoffice/manage-restaurant/${fireFlyID}?tab=charts`)
})
</script>
