# @menus/ro-orders

## 1.2.15

### Patch Changes

- fix: OrdersTab_OrderList,OrderDetails: Declined order: no ribbon,CC Declined status

      https://trello.com/c/TF8GeKUd/2548-general-issue-decline-cc

## 1.2.14

### Patch Changes

- fix: ro_orders_API_ORDERS_list_payload\$.refresh: ro_login_user_NotificationTone_audio.play(): no user interaction: console.error instead of throw

## 1.2.13

### Patch Changes

- fix: ro_orders_API_ORDERS_list_payload$: refresh: !params_fireFlyID$.\$: should unlock refresh
- OrdersTab: onMount: reset ro_orders_OrderList_a$,ro_orders_orders_tab_page$

## 1.2.12

### Patch Changes

- fix: OrderTransitionUI: All($ro_orders_TotalRow$): ro_orders_TotalRow$ derived from ro_orders_Pagination$

## 1.2.11

### Patch Changes

- ro_orders_API_ORDERS_list_payload\$\_b: - load_data_if_first_page_without_filters conditional

## 1.2.10

### Patch Changes

- fix: ro_orders_API_ORDERS_list_payload\$\_b: no_dom: do not load data
- fix: multiple concurrent refreshes: multiple concurrent sound notifications

## 1.2.9

### Patch Changes

- fix: ro_orders_OrderList_a$: do not clear when params_fireFlyID$ changes

## 1.2.8

### Patch Changes

- fix: rendering orders: ro_orders_API_ORDERS_list_payload,ro_orders_OrderList_a

      https://trello.com/c/3DJMtokA/2522-on-both-web-spa-the-new-order-doesnt-update-automatically

## 1.2.7

### Patch Changes

- fix: EditRestaurant: ro_orders_API_ORDERS_list_payload\$.refresh()

      https://trello.com/c/3DJMtokA/2522-on-both-web-spa-the-new-order-doesnt-update-automatically

- extract \*\_b into @menus/ro-orders from @menus/ro-orders-ui-OrdersTab

      https://trello.com/c/3DJMtokA/2522-on-both-web-spa-the-new-order-doesnt-update-automatically

## 1.2.6

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.2.5

### Patch Changes

- feat: OrderDetails: cannot cancel: Cancel Button: disabled instead of hidden
- feat: OrderDetails: Third party deliveries cannot be cancelled after accept

## 1.2.4

### Patch Changes

- fix: OrdersTab: cancelled orders: should not be Pending: + order*is_pending*,order*is_new*

## 1.2.3

### Patch Changes

- OrderTransitionUI,can*transition_ORDER_CANCELLED_BY_REST*: Delivery Company: !order.Is_Accepted: else: !
  order.Is_Completed

## 1.2.2

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=orders,/backoffice/manage-restaurant/[fireFlyID]
  /order-details/[OrderID]: use Is\_\* fields in Order for button display logic

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.2.1

### Patch Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]?tab=orders,/backoffice/manage-restaurant/[fireFlyID]
  /order-details/[OrderID]: + OrderTransitionUI

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

- cedef0072: /backoffice/manage-restaurant/[fireFlyID]?tab=orders

      	    + .fa-hourglass: OrderETA_minutes_(order, $minute_tick$)
      	    + .fa-calendar: show OrdersETA: replaces ETA column
      	    Status History->History
      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.2.0

### Minor Changes

- \_Ctx interfaces

## 1.1.1

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.1.0

### Minor Changes

- feat: goto_order_details_b
