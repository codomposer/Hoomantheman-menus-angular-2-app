import type { Modal_I } from '@menus/modal'
import type { Ro_User } from '@menus/ro-user-common'
export interface Edit_Ro_User_Modal_open_T {
	ro_user:Ro_User
}
export type Edit_Ro_User_Modal_close_T = void
export interface Edit_Ro_User_Modal_I
	extends Modal_I<Edit_Ro_User_Modal_open_T, Edit_Ro_User_Modal_close_T> {}
