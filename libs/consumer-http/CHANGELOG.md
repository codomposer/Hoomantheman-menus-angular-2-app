# @menus/consumer-http

## 1.8.3

### Patch Changes

- fix: /checkout: Proceed to Checkout: error

## 1.8.2

### Patch Changes

- fix: OrdersTab,fetch*get_restaurant_hours_request*: mobile app: load restaurant hours

      https://trello.com/c/2NskxP52/2542-sap6

## 1.8.1

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.8.0

### Minor Changes

- \_Ctx interfaces

## 1.7.3

### Patch Changes

- fix: redirect from / to restaurant page: \_fetch_search_menus_menu_request_b: qt=menu

## 1.7.2

### Patch Changes

- fetch_search_menus_menu: extracted from consumer_http_client

## 1.7.1

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.7.0

### Minor Changes

- - fetch_get_visible_coupons_b

## 1.6.0

### Minor Changes

- fetch_search_menus_menuitems_b,fetch_search_menus_menuoptions_b,fetch_search_menus_menuoptionsize

## 1.5.0

### Minor Changes

- feat: place_order: MISMATCH_TOTAL: retry order

## 1.4.0

### Minor Changes

- extract src files for types
- underscore case names

## 1.3.1

### Patch Changes

- fix: /checkout: timeout issue

## 1.3.0

### Minor Changes

- feat: /settings: Close Account

## 1.2.7

### Patch Changes

- /verify: deprecated /verify-email: handle phone verification

## 1.2.6

### Patch Changes

- fix: /?fireFlyID= navigation: if \$PublicKey is falsy, do not include the pcpk param

      	    https://trello.com/c/R6KmBJsc/2090-issue-on-menu-sense

## 1.2.5

### Patch Changes

- address: /: ssr timeout issue on lambda

## 1.2.4

### Patch Changes

- fix: /past-orders/[orderID]: reload error

## 1.2.3

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.2.2

### Patch Changes

- fix: save_userAddress_payload_type: NewID: string

## 1.2.1

### Patch Changes

- /checkout: ThankYouOrderModal: \$place_order_errors: render API_error_type payload Message

## 1.2.0

### Minor Changes

- feat: ConsumerHttpClient: await this.login*user: \neq*(null): return undefined if user is not logged in

## 1.1.3

### Patch Changes

- update dependencies

## 1.1.2

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: \$isPlatform: false: loading issue

## 1.1.1

### Patch Changes

- fix: /settings,/checkout: close Save Payment Dialog
- fix: /settings,/checkout: saveUserPayment & save_userAddress

## 1.1.0

### Minor Changes

- feat: goto_login

## 1.0.1

### Patch Changes

- fix: /past-orders: displaying orders
