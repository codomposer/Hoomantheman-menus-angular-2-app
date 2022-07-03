# @menus/ro-http

## 1.6.12

### Patch Changes

- ro_request\_\_b: no require login when requestData.authcode & requestData.uid are present

## 1.6.11

### Patch Changes

- - watch_API_SAVE_INFO_b: when loggedIn: API_SAVE_INFO request

        	https://trello.com/c/sLeSjPqm/2516-spa-requirements

## 1.6.10

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.6.9

### Patch Changes

- fix: RestContractModal: a/r.aspx?qt=accept_terms body

## 1.6.8

### Patch Changes

- fix: fill_login_user_b: ssr

## 1.6.7

### Patch Changes

- fix: API_RESTAURANT_accept_terms_b,API_RESTAURANT_list_b: url

## 1.6.6

### Patch Changes

- RestContractModal: accept_terms: + API_RESTAURANT_accept_terms

      	    https://trello.com/c/oJLyCvWG/2354-required-items-on-rest-contract-page

## 1.6.5

### Patch Changes

- RestContractModal: Type of Business: Segment/Cuisine

      	    https://trello.com/c/oJLyCvWG/2354-required-items-on-rest-contract-page

## 1.6.4

### Patch Changes

- /backoffice/users: /a/u.aspx?qt=resendemail

      	    https://trello.com/c/ojx4EnBw/2375-resend-registration-email

## 1.6.3

### Patch Changes

- fix: restaurant_address_a\$\_rc_b: ssr: load not called

## 1.6.2

### Patch Changes

- RoRequestQuery: oid: number

## 1.6.1

### Patch Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]?tab=orders,/backoffice/manage-restaurant/[fireFlyID]
  /order-details/[OrderID]: + OrderTransitionUI

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.6.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]/order-details/[MasterheadingID]: Accept Order: + eta

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

## 1.5.0

### Minor Changes

- \_Ctx interfaces

## 1.4.5

### Patch Changes

- fix: API_CHARTS_map: qt=map

## 1.4.4

### Patch Changes

- - get

## 1.4.3

### Patch Changes

- Filename->FileName

## 1.4.2

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[HeadingID]:
  \$menuitem.Filename

## 1.4.1

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[HeadingID]
  /menu-item-detailsMenuItemID]: $ro_menuoption.Description instead of $ro_menuoption.OptionDescription

      	    https://trello.com/c/zUzNFBud/2373-option-description-doesnt-save

## 1.4.0

### Minor Changes

- ro_fetch_API_REGISTRATION_new_b->fetch_API_REGISTRATION_new_b,+fetch_API_REGISTRATION_search_b

## 1.3.0

### Minor Changes

- - ro_fetch_API_REGISTRATION_new_b

## 1.2.4

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.2.3

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.2.2

### Patch Changes

- /checkout: ThankYouOrderModal: \$place_order_errors: render API_error_type payload Message

## 1.2.1

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=menus: Edit RoMasterheading: use existing
  \$selected_ro_masterheading

      	    https://trello.com/c/RdRSUwsE/2152-menu-page-issue

## 1.2.0

### Minor Changes

- feat: RestInfoTab: Delivery Type: + DeliveryCompany

      	    https://trello.com/c/I0nUts8W/2109-delivery-by-the-third-party

## 1.1.1

### Patch Changes

- update dependencies

## 1.1.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]: MULTISIZE
  tab: all sizes are not Active: menuitem is saved as not Active

      	    https://trello.com/c/7zElfPuN/2003-bug-on-menuitem-creation

## 1.0.1

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]: Change Subscription: Complete Order
