# @menus/page

## 1.4.9

### Patch Changes

- fix: mobile navigation menu: query_mobile_menu_opened\$\_b

## 1.4.8

### Patch Changes

- fix: is_navigating\$: + start: infinite spinner bugs: timeout for is_navigating
- fix: is_navigating_onclick_b: !is_hash_routing: infinite spinner

## 1.4.7

### Patch Changes

- ix: is_navigating_onclick_b: hbr,cordova: infinite spinner when navigating to current url

      https://trello.com/c/DGklknFS/2596-sap28

## 1.4.6

### Patch Changes

- fix: is_navigating_onclick: hbr: same href: no navigation

      https://trello.com/c/DGklknFS/2596-sap28

## 1.4.5

### Patch Changes

- wip: multi-location platforms: convert filters to be driven by page_query\$ params

## 1.4.4

### Patch Changes

- fix: /search: + Search_ServiceTypeNav: + serviceType

## 1.4.3

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.4.2

### Patch Changes

- /login: link to /verify-email: include email field

## 1.4.1

### Patch Changes

- params_orderID: number

## 1.4.0

### Minor Changes

- \_Ctx interfaces

## 1.3.7

### Patch Changes

- - get

## 1.3.6

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.3.5

### Patch Changes

- fix: page navigation wrt query & params, restaurant page

## 1.3.4

### Patch Changes

- performance: navigating_goto: \$is_navigating: immediate return

## 1.3.3

### Patch Changes

- fix: /checkout: when emptying shopping cart: redirect to restaurant page with serviceType selected

      	    https://trello.com/c/WM5WXhAB/2145-shopping-card-issue-for-change-address

## 1.3.2

### Patch Changes

- fix: /backoffice/signup: /backoffice/pricing clicking Pro Sign Up: select Pro plan

      	    https://trello.com/c/TBIyGxN9/2081-menu-pain-pages-modifications

## 1.3.1

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: change \$serviceType: .restaurant-info: flash of
  inconsistent ETA issue

## 1.3.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]/dishes/[other_fireFlyID]

      	    https://trello.com/c/LaLao7g7/2050-menusense-link-is-not-working

## 1.2.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]/preview/[other_fireFlyID]

      	    https://trello.com/c/LaLao7g7/2050-menusense-link-is-not-working

## 1.1.1

### Patch Changes

- update dependencies

## 1.1.0

### Minor Changes

- params*\* & query*\* functions

      	    + params_fireFlyID$_b,params_HeadingID$_b,params_MasterheadingID$_b,params_MenuItemID$_b,params_MenuItemID_isNew$_b,params_orderID$_b,params_search$_b,params_serviceType$_b
      	    	moved from @menus/ro-route
      	    + query_fsPageSize$_b,query_fsPage$_b,query_pageSize$_b,query_page$_b
      	    	moved from @menus/ro-route

## 1.0.1

### Patch Changes

- fix: navigating: onclick: infinite spinner when clicking on a link pointing to the current page

      	    https://trello.com/c/hEJ7FnU4/1972-by-click-on-orders-spin-works-for-ever
