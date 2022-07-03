import type { SelectItem } from '@menus/form'
import type { Menuoptionsize_I } from '@menus/consumer-menu'
import type { SortDetail } from '@menus/sort-shared'
export interface RoMenuitem_I extends SelectItem, SortDetail, RoMenuitem_ui_I {
	ID:number
	HeadingID:number
	Name:string
	Name_Display?:string
	Description:string
	Description_Display:string
	Price:number
	Is_Single_Size:boolean
	ItemTypeID?:number
	CuisineTypeID?:number
	DishCodeID:number
	SortID:number
	Enabled:boolean
	Is_Deleted:boolean
	Approval_ItemType_Status:number
	Approval_Image_Enabled:boolean
	Approval_Image_Status:number
	Brand_Image_FileID?:number
	Image_Uploader?:string
	ItemOrders?:number
	PopularLevel?:number
	Date_Created?:string
	Created_By?:string
	Date_Modified:string
	Modified_By?:string
	Date_Deleted?:string
	Deleted_By?:string
	Source_ID?:number
	Source_ItemOrders?:string
	Source_PopularLevel?:number
	Price_Display?:string
	Is_SoldOut?:boolean
	SoldOutAction:boolean
	WithCoupon:boolean
	CouponCode:string
	CouponDiscount?:number
	MenuImageExist?:boolean
	ShowImageInGallery?:boolean
	FileName?:string
}
export interface RoMenuitem_ui_I {
	_addSize?:boolean
	delete_errors?:string[]
	update_errors?:string[]
	ShowImageInGallery_errors?:string[]
	menuoptionsizes?:Menuoptionsize_I[]
	menuoptionsizes_errors?:string[]
	is_selected?:boolean
}
export const show_in_gallery_requires_image_error_msg = 'Add image to Show In Gallery.'
