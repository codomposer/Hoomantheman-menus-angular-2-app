# @menus/ro-orders-ui-OrdersTab

## 1.0.31

### Patch Changes

- OrdersTab_OrderList: .no_orders_in_process: iphone 5: text obscured by background image: + .background: opacity: 0.2

## 1.0.30

### Patch Changes

- OrdersTab_OrderList: no orders: background: french-bistro icon

      https://trello.com/c/nvMDLVJI/2586-order-page-modification

- OrdersTab_OrderList: always show Today,Scheduled Orders tabs;when 0 orders, show "No orders in process"

      https://trello.com/c/nvMDLVJI/2586-order-page-modification

## 1.0.29

### Patch Changes

- OrdersTab_OrderList: .OrderTransitionUI .action-buttons: not full width: display: block

      per Hooman

## 1.0.28

### Patch Changes

- OrdersTab: no sort by Is_Ready

      https://trello.com/c/H7b98V3h/2585-sap24

## 1.0.27

### Patch Changes

- fix: OrdersTab: md: scrolling issue

      https://trello.com/c/hf4aYGXn/2545-sap9

## 1.0.26

### Patch Changes

- fix: OptionTab: md: .table: layout

## 1.0.25

### Patch Changes

- OrdersTab_OrderList: xs: card view

## 1.0.24

### Patch Changes

- fix: OrdersTab_OrderList: svelte runtime warning when busy prop not set: busy = false default

## 1.0.23

### Patch Changes

- fix: RoMainDashboard,EditRestaurant,OrdersTab: < 900px height layout
- fix: OrdersTab: PageLoader placement

      https://trello.com/c/tHibVSpn/2550-sap11

## 1.0.22

### Patch Changes

- fix: OrdersTab: short window (> 900px): + .OrdersTab .scroll-to-top

## 1.0.21

### Patch Changes

- fix: OrdersTab_OrderList: .scroll-to-top: should be on top of .ribbon: z-index: 10
- fix: OrdersTab,OrdersTab_OrderList: responsive: height of .OrdersTab_OrderList,position of .scroll-to-top

## 1.0.20

### Patch Changes

- OrdersTab_OrderList: .scroll-to-top

      https://trello.com/c/v8AA3O8h/2536-spa-modification4

- fix: OrdersTab: layout: buttons,OrderTransitionUI

      https://trello.com/c/v8AA3O8h/2536-spa-modification4

## 1.0.19

### Patch Changes

- fix: OrdersTab: phone: filter text layout

      https://trello.com/c/U5B3QsFv/2534-spa-modification3

## 1.0.18

### Patch Changes

- EditRestaurant,RestInfoTab,OrdersTab: vertical spacing

## 1.0.17

### Patch Changes

- fix: OrderTransitionUI: phone: button layout: + <slot>

## 1.0.16

### Patch Changes

- fix: OrdersTab: phone: .btn layout

## 1.0.15

### Patch Changes

- fix: OrdersTab: iphone: layout

## 1.0.14

### Patch Changes

- OrdersTab: reset filters: + ro_orders_API_ORDERS_list_payload\$.reset()

## 1.0.13

### Patch Changes

- OrdersTab: onMount: reset ro_orders_OrderList_a$,ro_orders_orders_tab_page$

## 1.0.12

### Patch Changes

- OrdersTab: table: overflow-x: auto

## 1.0.11

### Patch Changes

- fix: OrdersTab_OrderList: OrderTransitionUI: refresh OrderList: ro_orders_OrderList_a\$.refresh()

## 1.0.10

### Patch Changes

- OrdersTab_Filters: Apply,Cancel: close_filters instead of toggle_filters

## 1.0.9

### Patch Changes

- fix: multiple concurrent refreshes: multiple concurrent sound notifications

## 1.0.8

### Patch Changes

- fix: EditRestaurant: ro_orders_API_ORDERS_list_payload\$.refresh()

      https://trello.com/c/3DJMtokA/2522-on-both-web-spa-the-new-order-doesnt-update-automatically

- extract \*\_b into @menus/ro-orders from @menus/ro-orders-ui-OrdersTab

      https://trello.com/c/3DJMtokA/2522-on-both-web-spa-the-new-order-doesnt-update-automatically

## 1.0.7

### Patch Changes

- OrdersTab_Search: .filter-value: below Filters button

      https://trello.com/c/kcy1HsEz/2512-spa-issue1

- OrdersTab_Search: clear: clear search box
- fix: /backoffice/manage-restaurant/[fireFlyID]/orders: Search for Order: filter list

## 1.0.6

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.0.5

### Patch Changes

- fix: OrdersTab_Search: Export

## 1.0.4

### Patch Changes

- fix: OrdersTab_OrderList: OrderTransitionUI: on:transition: OrdersTab_load_orders_tab()

## 1.0.3

### Patch Changes

- fix: OrdersTab: cancelled orders: should not be Pending: + order*is_pending*,order*is_new*

## 1.0.2

### Patch Changes

- 402b46c07: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: OrdersTab_load_orders_tab() without having to load
  OrdersTab

## 1.0.1

### Patch Changes

- fix: /backoffice/manage-restaurant/DIZ010: tab navigation
