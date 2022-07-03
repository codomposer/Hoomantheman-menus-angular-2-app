<script context="module" lang="ts">
import { join_url } from '@ctx-core/uri'
import { preload_ } from '@menus/app'
import { Path } from '@menus/route'
export const preload = preload_(async function ({ params }) {
	const { fireFlyID, MasterheadingID, HeadingID, MenuItemID } = params
	this.redirect(
		302,
		join_url([
			'backoffice', Path.RO.MANAGE_RESTAURANT, fireFlyID, Path.RO.MENU_DETAILS, MasterheadingID,
			Path.RO.CATEGORY_DETAILS, HeadingID, Path.RO.MENU_ITEM_DETAILS, MenuItemID, 'info'
		])
	)
})
</script>
