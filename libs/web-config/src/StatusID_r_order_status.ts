import { assign } from '@ctx-core/object'
import { order_status_r_StatusID } from './order_status_r_StatusID.js'
export const StatusID_r_order_status =
	Object.entries(order_status_r_StatusID)
		.reduce(
			(
				memo,
				[order_status, StatusID]
			)=>assign(memo, { [StatusID]: order_status }),
			{}
		) as Record<number, string>
