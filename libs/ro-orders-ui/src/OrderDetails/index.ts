import type { OrderDetails_T } from './OrderDetails_T.js'
import in_OrderDetails from './OrderDetails.svelte'
export * from './OrderDetails_T.js'
export const OrderDetails:OrderDetails_T = in_OrderDetails as unknown as OrderDetails_T
