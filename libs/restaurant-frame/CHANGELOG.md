# @menus/restaurant-frame

## 1.7.1

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.7.0

### Minor Changes

- \_Ctx interfaces

## 1.6.3

### Patch Changes

- fix: refresh /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: update all data from api

      	https://trello.com/c/YIcumA96/2347-mismatch-total

## 1.6.2

### Patch Changes

- fix: /checkout: reload /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]

## 1.6.1

### Patch Changes

- restaurant_frame.restaurant_frame_reload_params: any dependency param is not present: set to null
- fix: /checkout: MISMATCH_TOTAL_detected: restaurant data is refreshed due to the data not being cached

## 1.6.0

### Minor Changes

- - \_restaurant_frame_search_menus_menuitems_request_data

## 1.5.8

### Patch Changes

- restaurant_frame\$\_b: restaurant_frame_reload_params: remove extra logic

## 1.5.7

### Patch Changes

- fix: restaurant_frame.menu: ServiceType.SERVICE_TYPE_ALL: always fetch menu

## 1.5.6

### Patch Changes

- fix: restaurant_frame: deliverable: send coordinate as a query param

## 1.5.5

### Patch Changes

- restaurant_frame: reference_menuitem_ctx=>menu_ctx

## 1.5.4

### Patch Changes

- menu instead of reference_menuitem: qt=menu instead of qt=menuitem

## 1.5.3

### Patch Changes

- fix: ScheduleDayTime: change schedule_n0_a1_idx: change schedule_n1_a1_idx: preserve same time or 0 if time not
  available in schedule_n1_a

## 1.5.2

### Patch Changes

- fix: ShoppingCart: \$schedule_ctx.schedule_time_a1: end time should be same as closing time
- ShoppingCart: \$schedule_ctx.schedule_time_a1: starts 15 minutes after opening time

## 1.5.1

### Patch Changes

- fix: /checkout: place_order: scheduled order: st query param receives scheduled time in utc

## 1.5.0

### Minor Changes

- feat: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: scheduled orders

      	https://trello.com/c/E4Kc3DSg/2310-future-order-customer-side

## 1.4.19

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]:
  non-existent fireFlyID: infinite loading issue

## 1.4.18

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]:
  antidoteeats.menu.com loading issue

## 1.4.17

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: not deliverable: \restaurant*frame_in_sync*: ignores
  \$userAddress from check
- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: deliverable: logout: restaurant_frame loading issue

## 1.4.16

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: deliverable: change userAddress: menuitems loading

## 1.4.15

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: deliverable: change address: load menuitems

## 1.4.14

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: not logged in: userAddress: load

## 1.4.13

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: page load

## 1.4.12

### Patch Changes

- reference_search_menus_menuitems_payload_ctx: \$isDeliverable: include userAddress
- restaurant_frame$_b:
	search_menus_masterheading_payload_ctx,search_menus_heading_payload_ctx,search_menus_menuitems_payload_ctx: cancel if
	\$restaurant_frame_reload_params is out of sync after the await api request

## 1.4.11

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: California Pizza Kitchen: loading reference_menuitem
- restaurant_frame.reference_search_menus_menuitems_payload_ctx: use SERVICE_TYPE_ALL

## 1.4.10

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: not logged it,pick-up serviceType: add menuitem:
  place_order: login

      	    https://trello.com/c/UALjjZjk/2246-pick-up-issue

## 1.4.9

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: Logged out: Pick-up: Place Order: Login: goto /checkout
  with cart items

      	    https://trello.com/c/UALjjZjk/2246-pick-up-issue

## 1.4.8

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: restaurant_frame\$\_b: duplicate api requests

## 1.4.7

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: reference_menuitem: SERVICE_TYPE_DINEIN

## 1.4.6

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.4.5

### Patch Changes

- fix: restaurant_frame\$\_b: hydrate: falsy values are not hydrated
- fix: missing reference_menuitem when out of deliverable range
- loading reference_menuitem: use SERVICE_TYPE_PICKUP instead of SERVICE_TYPE_ALL

## 1.4.4

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: reference_search_menus_menuitems_payload_ctx should use
  ServiceType.SERVICE_TYPE_ALL

## 1.4.3

### Patch Changes

- fix: page navigation wrt query & params, restaurant page

## 1.4.2

### Patch Changes

- restaurant_frame: + reference_menuitem,headings,menuitems,reference_search_menus_menuitems_payload
- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: delivery/catering: out of range
- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: rendering & operation

## 1.4.1

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: changing $serviceType or $userAddress: \$serviceType
  navigation links visible

## 1.4.0

### Minor Changes

- - \_\$restaurant_frame_in_sync_warn

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: !\_\$restaurant_frame_in_sync warnings: remove false
  positives

## 1.3.1

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: add menuitem: lower case params_fireFlyID: case
  insensitive check

## 1.3.0

### Minor Changes

- feat: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: changing params_fireFlyID,serviceType,userAddress:
  spinner
- feat: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: params_fireFlyID updates: refresh restaurant_frame\$\_b

## 1.2.0

### Minor Changes

- - restaurant_frame:
hydrate,search_menus_masterheading_payload_ctx,search_menus_heading_payload_ctx,search_menus_menuitems_payload_ctx

- using derived\$ stores for restaurant_frame state

## 1.1.4

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: restaurant_frame_reload_params: client side rendering

## 1.1.3

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: restaurant_frame_in_sync always false issue when changing
  serviceType

## 1.1.2

### Patch Changes

- _\$restaurant_frame_in_sync: !_\$restaurant_frame_in_sync: warn with state

## 1.1.1

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: restaurant_frame requires a nullish_guard
  $userAddress,falsy_guard $fireFlyID,falsy_guard \$serviceType

## 1.1.0

### Minor Changes

- feat: restaurant_frame_in_sync\$\_b
