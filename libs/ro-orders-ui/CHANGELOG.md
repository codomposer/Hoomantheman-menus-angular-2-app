# @menus/ro-orders-ui

## 2.0.12

### Patch Changes

- fix: .modal-footer: button layout

      https://trello.com/c/Z4GEm26k/2581-web-issue4

## 2.0.11

### Patch Changes

- fix: OrderDetails: .totals: xs: layout

      https://trello.com/c/95JCS2gw/2578-web-issue3

## 2.0.10

### Patch Changes

- fix: AppConfiguration,SaveCouponModal,ItemInfoTab,MenuitemDetails,RoMenuOptionModal,SizeTab,OrderDetails,RestInfoTab_Delivery: layout improvement

      https://trello.com/c/VVk1Za1E/2576-sap16

## 2.0.9

### Patch Changes

- fix: OrderDetails: > xs: extra 'Total (Customer Paid)' label

      https://trello.com/c/euBYIutX/2553-web-issues1

## 2.0.8

### Patch Changes

- fix: OrdersTab_OrderList,OrderDetails: Declined order: no ribbon,CC Declined status

      https://trello.com/c/TF8GeKUd/2548-general-issue-decline-cc

## 2.0.7

### Patch Changes

- fix: OrderDetails: Map Route button should be on the right side

## 2.0.6

### Patch Changes

- fix: OrdersTab: layout: buttons,OrderTransitionUI

      https://trello.com/c/v8AA3O8h/2536-spa-modification4

- fix: OrderTransitionUI: .auxiliary-text under .action-buttons

      https://trello.com/c/v8AA3O8h/2536-spa-modification4

## 2.0.5

### Patch Changes

- OrderDetails: OrderTransitionUI .btn: phone: 4 buttons in a row: layout

      https://trello.com/c/U5B3QsFv/2534-spa-modification3

## 2.0.4

### Patch Changes

- fix: OrderTransitionUI: phone: layout in different states

## 2.0.3

### Patch Changes

- fix: OrderTransitionUI: phone: button layout: + <slot>

## 2.0.2

### Patch Changes

- fix: OrderDetails: phone: OrderTransitionUI, print, map button layout
- fix: Print Report: cordova integration

## 2.0.1

### Patch Changes

- modile: cordova: download Export

## 2.0.0

### Major Changes

- fix: OrderDetails: phone: .order-details-list table: layout

### Patch Changes

- OrderDetails: phone: .offset,.action-buttons: layout
- OrderDetails: .info-title: remove border-bottom;.info-details: - margin-top;.order-details-list: .label: padding-left
- OrderDetails,EditOrder,PastOrder: .order-details-title: less vertical margin: 24px 0 0

## 1.5.39

### Patch Changes

- fix: webConfig\_: live_webConfig when is_hash_routing & no dev searchParam

## 1.5.38

### Patch Changes

- OrdersTab: reset filters: + ro_orders_API_ORDERS_list_payload\$.reset()

## 1.5.37

### Patch Changes

- fix: Status History after order transition: many entries: OrderTransitionUI: transition_order: payload: JSON.parse StatusHistory if it's a string

## 1.5.36

### Patch Changes

- fix: OrderTransitionUI: All($ro_orders_TotalRow$): ro_orders_TotalRow$ derived from ro_orders_Pagination$

## 1.5.35

### Patch Changes

- fix: OrdersTab: ipad: .order-list thead tr th: gap

## 1.5.34

### Patch Changes

- fix: EditRestaurant: ro_orders_API_ORDERS_list_payload\$.refresh()

      https://trello.com/c/3DJMtokA/2522-on-both-web-spa-the-new-order-doesnt-update-automatically

## 1.5.33

### Patch Changes

- OrdersTab_c: refreshInterval\$: refresh every 60 seconds by default

## 1.5.32

### Patch Changes

- OrdersTab_Filters: Reset button: resets filters without closing filter dialog

## 1.5.31

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.5.30

### Patch Changes

- OrderDetails: Delivery message updates

      https://trello.com/c/nQwCu8yl/2508-modification-on-orders

## 1.5.29

### Patch Changes

- fix: OrderTransitionUI: Cancel button: revert

      https://trello.com/c/zlvkt7LZ/2504-issues-on-order-page

## 1.5.28

### Patch Changes

- OrderDetails: .order-actions-section .btn: margin-right: 12px

## 1.5.27

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/_ extracted from ?tab=_

## 1.5.26

### Patch Changes

- OrdersTab: Is_Read & !Is_Accepted: + PENDING ribbon

      	    https://trello.com/c/PrASm28E/2490-pending-order-banner

## 1.5.25

### Patch Changes

- OrderTransitionUI: Start: eta*minutes_text*

      	    https://trello.com/c/1CAETJ8B/2496-error-on-time

## 1.5.24

### Patch Changes

- fix: OrdersTab: flash all orders while navigating to an order

      	    https://trello.com/c/3hpQYbAx/2489-flashing-on-click-to-new-order

## 1.5.23

### Patch Changes

- OrderDetails: print:

      	    - Subscription
      	    Order number moved to header
      	    + Pre paid by
      	    - If you need to reach...
      	    https://trello.com/c/gnAs9wFc/2493-modification-on-print-pdf-order-page

## 1.5.22

### Patch Changes

- new menu logo on printed pages

      	    https://trello.com/c/pg65tij8/2485-change-menus-logo-on-prints

## 1.5.21

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=orders: TODAY/LATER: sort by !Is_Ready,-OrderDate

## 1.5.20

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=orders: sort by !Is_Ready then ORDER_READY_ETA

## 1.5.19

### Patch Changes

- fix: /backoffice/manage-restaurant/DIZ010?tab=orders: issue: LATER orders appearing under TODAY tab

## 1.5.18

### Patch Changes

- OrderTransitionUI: single ladda at a time: transition_order_busy->transition_order_busy_name

## 1.5.17

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=orders: TODAY,LATER: an order will not be present under both tabs

## 1.5.16

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]

      	    ORDER_COMPLETED_ETA_date: + offset_minutes
      	    deliver_text_label: value is ORDER_READY_ETA_date

## 1.5.15

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: Print button: pdfMake

## 1.5.14

### Patch Changes

- /backoffice/manage-restaurant/DIZ010?tab=orders: Scheduled tab instead of tabs for each day after today

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.5.13

### Patch Changes

- OrderTransitionUI: ETA->Preparation
- OrderTransitionUI: transition_order: offset_minutes = 0

## 1.5.12

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: Update Ready ETA: reactive

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: - Pickup ETA

## 1.5.11

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: Order by Restaurant,Pickup orders: + Ready By

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

## 1.5.10

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: .offset to the left of the Accept button

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.5.9

### Patch Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]?tab=orders: order*is_cancelled*(order),order.Is_Completed: not
  included in Today or future tabs

      	https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.5.8

### Patch Changes

- /backoffice/manage-restaurant/DIZ010?tab=orders: Filters displayed

## 1.5.7

### Patch Changes

- feat: OrderTransitionUI

      	    can_transition_ORDER_ACCEPTED: display ORDER_STARTED_ETA timer
      	    can_transition_ORDER_COMPLETED && is_DeliveryMode_restaurant:
      	    	No render Completed button
      	    	Out for delivery text
      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.5.6

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]

      	    Accept: change status
      	    Start/Complete button: position
      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.5.5

### Patch Changes

- OrderTransitionUI: + TzOffsetMilliSeconds

## 1.5.4

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: .OrderTransitionUI: display: block

## 1.5.3

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]:

      	    Pickup/Delivery ETA: single time
      	    Offset Order: force minimum of 0

## 1.5.2

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: Pickup/Delivery ETA
- fix: OrderTransitionUI: display: inline-block

## 1.5.1

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: OrderETA_date: load error: when OrderDetail is
  falsy

## 1.5.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]?tab=orders,/backoffice/manage-restaurant/[fireFlyID]
  /order-details/[orderID]: Status ETA timers

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.4.9

### Patch Changes

- https://my.dev.menu.com/backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: OrderDetails_c:
  accept_order,cancel_order: assign(order, payload.Data)

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.4.8

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=orders,/backoffice/manage-restaurant/[fireFlyID]
  /order-details/[OrderID]: use Is\_\* fields in Order for button display logic

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.4.7

### Patch Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]?tab=orders,/backoffice/manage-restaurant/[fireFlyID]
  /order-details/[OrderID]: + OrderTransitionUI

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.4.6

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[OrderID]:

      	    deliver_text_value: join_str: '/'
      	    Delivery Address: remove margin-top override

## 1.4.5

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/order-details/[OrderID]: deliver_text formatting
- /backoffice/manage-restaurant/[fireFlyID]/order-details/[OrderID]: + Delivery ETA,Pickup ETA

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

## 1.4.4

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[OrderID]: + Delivery ETA

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

## 1.4.3

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[OrderID]: + Delivery ETA

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

## 1.4.2

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: .diff_time_minutes_ctl: width: 22px

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

## 1.4.1

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=orders: .view_order_a_nav: margin-top
- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: Offset order $diff_time_minutes$ minutes

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

## 1.4.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]/order-details/[MasterheadingID]: Accept Order: + eta

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

## 1.3.0

### Minor Changes

- \_Ctx interfaces

## 1.2.2

### Patch Changes

- - get

## 1.2.1

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=orders: TODAY orders view

      	    https://trello.com/c/tYJtGDf3/2305-future-order-modification-on-order-page

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=orders: error when \$WorkingHour_ctx_a\$ is empty

## 1.2.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]?tab=orders: tabbed orders

      	    https://trello.com/c/tYJtGDf3/2305-future-order-modification-on-order-page

## 1.1.19

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=orders: + All tab

      	https://trello.com/c/tYJtGDf3/2305-future-order-modification-on-order-page

## 1.1.18

### Patch Changes

- OrdersTab: replace Pagination with infinite scrolling

      	https://trello.com/c/tYJtGDf3/2305-future-order-modification-on-order-page

## 1.1.17

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=orders: Export/Filters buttons: height

## 1.1.16

### Patch Changes

- reduce spacing to allow more information density

## 1.1.15

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.1.14

### Patch Changes

- b4927d1bc: fix: /backoffice/manage-restaurant/[fireFlyID]?tab=orders: pagination

## 1.1.13

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: Accept Order: title tooltip

## 1.1.12

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: accept_order,cancel_order: this.order.refresh

## 1.1.11

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: Cancel Order: Orders that are Accepted & sent to
  Delivery Company cannot be cancelled

      	https://trello.com/c/tqD3Z5Bu/2334-order-voided-by-delivery-co

## 1.1.10

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: Delivery Company orders cannot be cancelled

      	https://trello.com/c/tqD3Z5Bu/2334-order-voided-by-delivery-co

## 1.1.9

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=orders: Is_Cancelled_By_DeliveryCompany: Delivery Rejected ribbon

      	https://trello.com/c/CQ6lcgk4/2304-delivery-company-modifications

## 1.1.8

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: Delivery fields

      	https://trello.com/c/CQ6lcgk4/2304-delivery-company-modifications

## 1.1.7

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: deliverable: always show Delivery Fee in Total (
  Customer Paid) lineite

      	    @menus/web,@menus/ro-orders-ui

## 1.1.6

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[orderID]: Pickup by Delivery Company,Driver Tip

      	    https://trello.com/c/yB7Mc9SX/2260-modification-on-order-page

## 1.1.5

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-detail/[orderID]: SoldOutAction: default to 'None'

      	    https://trello.com/c/yB7Mc9SX/2260-modification-on-order-page

## 1.1.4

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.1.3

### Patch Changes

- fix: page navigation wrt query & params, restaurant page
