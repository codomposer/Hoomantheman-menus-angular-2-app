# @menus/consumer-shopping-cart-ui

## 2.1.5

### Patch Changes

- fix: layout: sm
- fix: /checkout: Proceed to Checkout: error

## 2.1.4

### Patch Changes

- fix: hoisting issue: use target: es2019

## 2.1.3

### Patch Changes

- fix: ShoppingCart: .item-available-status: availability*ctx*: $minute_tick$

      https://trello.com/c/yRVHpDzp/2502-issue-on-shopping-cart

## 2.1.2

### Patch Changes

- ShoppingCart: Checkout_Message->Segment_Message

## 2.1.1

### Patch Changes

- ShoppingCart: Checkout_Message

      	    https://trello.com/c/KgEdarts/2456-segment-message

## 2.1.0

### Minor Changes

- \_Ctx interfaces

## 2.0.2

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: $is_shopping_cart_opened: $screen-lg-min: mobile view

      	https://trello.com/c/tFA15wGO/2386-customer-side-issues-2

## 2.0.1

### Patch Changes

- fix: /checkout: COUPON_CODE_INVALID: refresh restaurant_cartitem.coupons: disable coupon if not in list

      	https://trello.com/c/h7ABp3jD/2360-bug-on-refresh-the-shopping-cart
      	https://trello.com/c/6eyD60md/2362-disabled-coupons-should-be-left-in-activated-coupons-with-a-strikethrough

## 2.0.0

### Major Changes

- ScheduleDayTime: select: half of the width

## 1.3.12

### Patch Changes

- /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: ShoppingCart: Proceed to Checkout

## 1.3.11

### Patch Changes

- fix: ShoppingCart: Availability: pass \minute_tick

## 1.3.10

### Patch Changes

- ScheduleDayTime: select: padding

## 1.3.9

### Patch Changes

- fix: ScheduleDayTime: change schedule_n0_a1_idx: change schedule_n1_a1_idx: preserve same time or 0 if time not
  available in schedule_n1_a

## 1.3.8

### Patch Changes

- fix: ShoppingCart: consistent borders,.available-coupons layout spacing

## 1.3.7

### Patch Changes

- /checkout: CheckoutConfirmAddressModal: update scheduled day & time

## 1.3.6

### Patch Changes

- fix: ShoppingCart: .available-coupons-link: margin-bottom: 12px

## 1.3.5

### Patch Changes

- ScheduleDayTime: extracted from ShoppingCart

## 1.3.4

### Patch Changes

- ShoppingCart: compact vertical space
- ShoppingCart: Est. Arrival Time: takes place at top instead of restaurant_cartitem.Address

## 1.3.3

### Patch Changes

- /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: schedule ui: all serviceTypes including non-deliverable

## 1.3.2

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.3.1

### Patch Changes

- fix: ShoppingCart: remove 1px exposure of scrollbar

## 1.3.0

### Minor Changes

- feat: ShoppingCart: When discount applied: Discounted SubTotal field

## 1.2.2

### Patch Changes

- fix: ShoppingCart: no coupon code: input value: '' instead of 'undefined'

## 1.2.1

### Patch Changes

- fix: ShoppingCart: Enter your coupon code: Add: apply coupon

      	    https://trello.com/c/9CJFgmVG/2202-coupon-issues

## 1.2.0

### Minor Changes

- feat: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: navbar: mobile: ShoppingCartLinkHandle

      	    https://trello.com/c/ThtYBk3D/2173-phone-view-responcive

### Patch Changes

- ShoppingCart: mobile: .restaurant-item: margin-bottom: 0

      	    https://trello.com/c/ThtYBk3D/2173-phone-view-responcive

## 1.1.13

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: logged out: MinOrder is enforced

      	https://trello.com/c/FXddEJeB/2174-min-order-for-delivery-issue

## 1.1.12

### Patch Changes

- fix: navbar: ShoppingCartLinkHandle: rendering \$menuitems_quantity,toggle Profile menu,navigation using PlatformIcon

## 1.1.11

### Patch Changes

- fix: ShoppingCart: background-image: url(restaurant_cartitem.RestImage): url issue

## 1.1.10

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID],/checkout: checkout process interstitial ui states:
  coherent

      	    https://trello.com/c/Ske7b1yg/2137-phone-view-responsive-customer-modifications

## 1.1.9

### Patch Changes

- ShoppingCart: mobile: width: 100%

## 1.1.8

### Patch Changes

- ShoppingCart: mobile: full viewport

      	    https://trello.com/c/Ske7b1yg/2137-phone-view-responsive-customer-modifications

## 1.1.7

### Patch Changes

- consumer: menu: mobile: content: align to left side

      	    https://trello.com/c/Ske7b1yg/2137-phone-view-responsive-customer-modifications

## 1.1.6

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: ShoppingCart: require_min_order: Place Order disabled

      	    https://trello.com/c/Tokjdt1L/2139-min-order-issue-for-deliverable-service-type-not-check

## 1.1.5

### Patch Changes

- Shopping Cart: Restaurant image

      	    https://trello.com/c/qh8IJmSE/2077-modifications-on-rest-page

## 1.1.4

### Patch Changes

- ShoppingCart: hide Delivery cost if serviceType \$isDeliverable is false

      	    https://trello.com/c/TvNMvuAe/2038-pick-up-service-no-need-delivery-fee

## 1.1.3

### Patch Changes

- update dependencies

## 1.1.2

### Patch Changes

- fix: menu: mobile: ShoppingCartLinkHandle: click: open issues

      	    https://trello.com/c/wM1Xz8Ua/2032-customer-side-bugs-on-small-page-size

## 1.1.1

### Patch Changes

- 46f6c17eb: consumer shopping cart: .topbar sticky on the top of the shopping cart

      	    https://trello.com/c/ibC9XSXH/2027-add-service-type-in-the-shopping-cart

## 1.1.0

### Minor Changes

- feat: Consumer ShoppingCart: Checkout (serviceType)

### Patch Changes

- fix: Consumer ShoppingCart: restaurant image
- Consumer ShoppingCart: Driver Tip label
- Consumer ShoppingCart: Enter your coupon code

## 1.0.2

### Patch Changes

- fix: Consumer ShoppingCart: display subTotal for each menuitem

## 1.0.1

### Patch Changes

- fix: /checkout: Complete Order ux flow
