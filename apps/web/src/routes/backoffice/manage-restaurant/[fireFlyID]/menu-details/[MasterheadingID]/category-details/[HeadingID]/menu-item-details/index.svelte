<script context="module" lang="ts">
import { preload_ } from '@menus/app'
export const preload = preload_(async function ({ params }) {
	const { fireFlyID, MasterheadingID, HeadingID } = params
	this.redirect(
		302,
		`/backoffice/manage-restaurant/${fireFlyID}/menu-details/${MasterheadingID}/category-details/${HeadingID}`
	)
})
</script>
