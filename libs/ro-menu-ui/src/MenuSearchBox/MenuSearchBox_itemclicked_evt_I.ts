import type { RoPreviewHeading_I, RoPreviewMasterheading_I, RoPreviewMenuitem_I } from '@menus/ro-shared-models'
export interface MenuSearchBox_itemclicked_evt_I {
	type:'ro_preview_masterheading'|'ro_preview_heading'|'ro_preview_menuitem'
	ro_preview_masterheading:RoPreviewMasterheading_I
	ro_preview_heading?:RoPreviewHeading_I
	ro_preview_menuitem?:RoPreviewMenuitem_I
}
