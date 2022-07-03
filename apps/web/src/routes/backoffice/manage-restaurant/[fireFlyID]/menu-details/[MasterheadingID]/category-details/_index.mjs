import { preload_ } from '@menus/app'
/**
 * @this import('@ctx-core/sapper').PreloadContext
 * @param {import('@ctx-core/sapper').PageContext} page
 * @returns {Promise<void>}
 */
export const preload = preload_(async function ({ params }) {
	const { fireFlyID, MasterheadingID } = params
	this.redirect(
		301,
		`/backoffice/manage-restaurant/${fireFlyID}/menu-details/${MasterheadingID}`
	)
})
