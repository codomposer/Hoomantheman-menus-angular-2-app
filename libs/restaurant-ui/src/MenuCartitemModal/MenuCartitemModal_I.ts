import type { Modal_I } from '@menus/modal'
import type { SearchMenuitem_I } from '@menus/search-menu-common'
export type MenuCartitemModal_open_T = SearchMenuitem_I
export type MenuCartitemModal_close_T = MouseEvent
export interface MenuCartitemModal_I extends Modal_I<MenuCartitemModal_open_T, MenuCartitemModal_close_T> {
}
