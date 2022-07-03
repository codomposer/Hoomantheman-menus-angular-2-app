# @menus/ro-shared-models

## 1.3.4

### Patch Changes

- RoMenuitem_I: + show_in_gallery_requires_image_error_msg

## 1.3.3

### Patch Changes

- fix: SizeTab: navigation & animation glitches

## 1.3.2

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.3.1

### Patch Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]?tab=orders,/backoffice/manage-restaurant/[fireFlyID]
  /order-details/[OrderID]: + OrderTransitionUI

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.3.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]/order-details/[MasterheadingID]: Accept Order: + eta

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

## 1.2.0

### Minor Changes

- \_Ctx interfaces

## 1.1.13

### Patch Changes

- Filename->FileName

## 1.1.12

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[HeadingID]:
  \$menuitem.Filename

## 1.1.11

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[HeadingID]
  /menu-item-detailsMenuItemID]: $ro_menuoption.Description instead of $ro_menuoption.OptionDescription

      	    https://trello.com/c/zUzNFBud/2373-option-description-doesnt-save

## 1.1.10

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[HeadingID]
  /menu-item-details/[MenuItemID]: save description

      	    https://trello.com/c/zUzNFBud/2373-option-description-doesnt-save

## 1.1.9

### Patch Changes

- feat: + RoPreviewMasterheading_I,RoPreviewHeading_I,RoPreviewMenuitem_I

## 1.1.8

### Patch Changes

- total*selected_menuoptionitems->\OptionItems_is_selected_count*

## 1.1.7

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: Delivery fields

      	https://trello.com/c/CQ6lcgk4/2304-delivery-company-modifications

## 1.1.6

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.1.5

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=preview: MenuitemPreviewModal: loading

      	    https://trello.com/c/xkPxvgTO/2192-issue-on-preview-page

## 1.1.4

### Patch Changes

- DateTimeOptions: hide_clear instead of hideClear

## 1.1.3

### Patch Changes

- fix: shopping cart: add quantity to an existing menuitem

## 1.1.2

### Patch Changes

- fix: shopping cart issues: Menuitem_I extends MenuCartitem_I

      	    https://trello.com/c/lMnb5pjE/2034-new-issues-on-shopping-card

## 1.1.1

### Patch Changes

- update dependencies

## 1.1.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]: validation
  error messages under menu item

## 1.0.1

### Patch Changes

- ea6905eef: fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]
  /menu-item-details/[menuitemID]: displaying menuoption.Description
