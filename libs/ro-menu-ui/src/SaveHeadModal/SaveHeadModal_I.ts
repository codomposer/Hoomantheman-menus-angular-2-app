import type { Modal_I } from '@menus/modal'
import type { RoHeading_I } from '@menus/ro-shared-models'
export interface SaveHeadModal_open_T {
	fireFlyID:string,
	MasterheadingID:number
	head:RoHeading_I
}
export type SaveHeadModal_close_T = boolean
export interface SaveHeadModal_I
	extends Modal_I<SaveHeadModal_open_T, SaveHeadModal_close_T> {}
