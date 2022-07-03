import type { Modal_I } from '@menus/modal'
import type { RoMasterheading_I } from '@menus/ro-shared-models'
export interface SaveScheduleModal_open_T {
	fireFlyID:string
	ro_masterheading:RoMasterheading_I
}
export interface SaveScheduleModal_close_T {}
export interface SaveScheduleModal_I
	extends Modal_I<SaveScheduleModal_open_T, SaveScheduleModal_close_T> {}
