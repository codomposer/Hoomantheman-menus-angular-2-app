import type { Modal_I } from '@menus/modal'
import type { RoMenuoption_I } from '@menus/ro-shared-models'
export interface RoMenuOptionModal_open_T {
	ro_menuoption?:RoMenuoption_I
}
export interface RoMenuOptionModal_close_T {}
export interface RoMenuOptionModal_I
	extends Modal_I<RoMenuOptionModal_open_T, RoMenuOptionModal_close_T> {
}
