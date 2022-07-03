import type { Modal_I } from '@menus/modal'
import type { RoMenuitemHeading_I } from '@menus/ro-shared-models'
export interface MenuitemPreviewModal_open_T {
	fireFlyID:string
	ro_menuitem_heading:RoMenuitemHeading_I
}
export type MenuitemPreviewModal_close_T = boolean
export interface MenuitemPreviewModal_I
	extends Modal_I<MenuitemPreviewModal_open_T, MenuitemPreviewModal_close_T> {}
