import { preload_ } from '@menus/app'
/**
 * @this import('@ctx-core/sapper').PreloadContext
 * @param {import('@ctx-core/sapper').PageContext} page
 * @returns {Promise<void>}
 */
export const preload = preload_(async function ({ params }) {
	const { fireFlyID } = params
	this.redirect(302, `/backoffice/manage-restaurant/${fireFlyID}?tab=menus`)
})
