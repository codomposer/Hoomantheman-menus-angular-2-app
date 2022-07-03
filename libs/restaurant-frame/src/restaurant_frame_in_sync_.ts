import { case_insensitive_eql } from '@ctx-core/string'
import { userAddress_eq_ } from '@menus/consumer-user-address'
import { isDeliverable_ } from '@menus/service-type'
import type { restaurant_frame_sync_T } from './restaurant_frame_sync_T'
export function restaurant_frame_in_sync_(
	compare_syncable:restaurant_frame_sync_T, source_syncable:restaurant_frame_sync_T,
) {
	return !!(
		compare_syncable
		&& source_syncable
		&& case_insensitive_eql([
			compare_syncable.fireFlyID,
			source_syncable.fireFlyID
		])
		&& compare_syncable.serviceType === source_syncable.serviceType
		&& (
			!isDeliverable_(compare_syncable.serviceType)
			|| (!compare_syncable.userAddress && !source_syncable.userAddress)
			|| userAddress_eq_(compare_syncable.userAddress, source_syncable.userAddress)
		)
	)
}
export function restaurant_frame_in_sync_warn_(
	compare_syncable:restaurant_frame_sync_T,
	source_syncable:restaurant_frame_sync_T,
) {
	console.warn('!$restaurant_frame_in_sync', {
		compare_syncable,
		source_syncable,
		'compare_syncable?.fireFlyID?.toLowerCase()': compare_syncable?.fireFlyID?.toLowerCase(),
		'source_syncable?.fireFlyID?.toLowerCase()': source_syncable?.fireFlyID?.toLowerCase(),
		'compare_syncable?.serviceType': compare_syncable?.serviceType,
		'source_syncable?.serviceType': source_syncable?.serviceType,
		'isDeliverable_(compare_syncable.serviceType)': isDeliverable_(compare_syncable.serviceType),
		'compare_syncable?.userAddress': compare_syncable?.userAddress,
		'source_syncable?.userAddress': source_syncable?.userAddress,
	})
}
