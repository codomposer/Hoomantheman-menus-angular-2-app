import type { Modal_I } from '@menus/modal'
import type { RoMasterheading_I } from '@menus/ro-shared-models'
export interface SaveMasterheadingModal_open_T {
	fireFlyID:string
	ro_masterheading:RoMasterheading_I
}
export type SaveMasterheadingModal_close_T = RoMasterheading_I|undefined
export interface SaveMasterheadingModal_I
	extends Modal_I<SaveMasterheadingModal_open_T, SaveMasterheadingModal_close_T> {}
