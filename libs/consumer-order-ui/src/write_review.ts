import type { Order } from '@menus/shared-order'
import type { WriteReviewModal_I } from './WriteReviewModal/index.js'
import type { ThankYouPointsModal_I } from './ThankYouPointsModal/index.js'
export async function write_review(
	order:Order, WriteReviewModal_i:WriteReviewModal_I, ThankYouPointsModal_i:ThankYouPointsModal_I,
) {
	const data = await WriteReviewModal_i.open({ order })
	if (data) {
		const { total_points } = data
		if (total_points) {
			await ThankYouPointsModal_i.open({
				order,
				total_points,
			})
		}
	}
}
