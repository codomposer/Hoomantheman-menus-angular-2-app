# @menus/shopping-cart

## 1.7.3

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.7.2

### Patch Changes

- fix: not logged in: add_menu_cartitem: timeout

## 1.7.1

### Patch Changes

- fix: build

## 1.7.0

### Minor Changes

- \_Ctx interfaces

## 1.6.14

### Patch Changes

- fix: ShoppingCart: text: Coupon instead of RoCoupon

      	https://trello.com/c/tFA15wGO/2386-customer-side-issues-2

## 1.6.13

### Patch Changes

- fix: ShoppingCart: Coupon: COUPON_TYPE_ITEM_BASED && DISCOUNT_TYPE_PERCENT && DISCOUNT_CRITERIA_FULL: discount

      	https://trello.com/c/EBZHdAvW/2390-coupon-error-on-calculation

## 1.6.12

### Patch Changes

- fix: \_shopping_cart_b: CouponDiscount does not exceed \$subTotal

## 1.6.11

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.6.10

### Patch Changes

- use shopping_cart.clear() instead of restaurant_cartitems.set([])

## 1.6.9

### Patch Changes

- fix: ScheduleDayTime: first value reselected: use timestamp as select value instead of index

## 1.6.8

### Patch Changes

- fix: \_schedule_ctx: apply restaurant_menuitem ETAMax to time slots

      	https://trello.com/c/8nuXTDO9/2338-future-order-issues

## 1.6.7

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: Restaurant Hours: multiple hour blocks

## 1.6.6

### Patch Changes

- \_shopping_cart\\\$\\\_b: only restaurant_cartitems are persisted: menu_cartitems are derived\$

## 1.6.5

### Patch Changes

- fix: ParamScheduleCtx_I: \$restaurant_hours

## 1.6.4

### Patch Changes

- fix: ShoppingCart: \availability*ctx*: in sync with \minute_tick
- fix: /checkout: ShoppingCart: reload page: schedule time

## 1.6.3

### Patch Changes

- fix: ShoppingCart,ScheduleDayTime: reload: remember selected day & time

## 1.6.2

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: when first schedule day is Tomorrow:
  shopping_cart.schedule_day_a1_idx: 0

## 1.6.1

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: ASAP schedule should be the default selection

## 1.6.0

### Minor Changes

- feat: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: scheduled orders

      	https://trello.com/c/E4Kc3DSg/2310-future-order-customer-side

## 1.5.8

### Patch Changes

- Shopping Cart: changeAddress: remove notyf_error call

      	    https://trello.com/c/mAjZD06R/2261-shopping-card-reset-not-required-message

## 1.5.7

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: not logged it,pick-up serviceType: add menuitem:
  place_order: login

      	    https://trello.com/c/UALjjZjk/2246-pick-up-issue

## 1.5.6

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: Logged out: Pick-up: Place Order: Login: goto /checkout
  with cart items

      	    https://trello.com/c/UALjjZjk/2246-pick-up-issue

## 1.5.5

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.5.4

### Patch Changes

- fix: page navigation wrt query & params, restaurant page

## 1.5.3

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: !\_\$restaurant_frame_in_sync warnings: remove false
  positives

## 1.5.2

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: add menuitem: lower case params_fireFlyID: case
  insensitive check

## 1.5.1

### Patch Changes

- fix: Shopping Cart: logout: out of sync error should not appear

## 1.5.0

### Minor Changes

- userAddress.subscribe: $userAddress present & validate_cartitems_in_sync passes: set existing
	restaurant_cartitem.userAddress with $userAddress: handles transition from $anonymous_userAddress to
	$default_userAddress
- validate_cartitems_in_sync: validation fails: clear shopping cart with error message

### Patch Changes

- fix: /checkout: login with \$anonymous_userAddress: Error: Invalid Delivery Address issue

      	    https://trello.com/c/7jFa8BhM/2222-delivery-address-issue-for-delivery-service-type

- fix: /checkout: login with $anonymous_userAddress: save $anonymous_userAddress: if no matching \$userAddress_a1 save
  to api,set address as default

## 1.4.0

### Minor Changes

- feat: validate_cartitems_in_sync

### Patch Changes

- /checkout: Shopping Cart: out of sync: notify error

## 1.3.21

### Patch Changes

- fix: ShoppingCart: onload: cartitems already present: validation issue

## 1.3.20

### Patch Changes

- is_shopping_cart_opened: remove all cart_menuitems: set to false: close ShoppingCart

      	    https://trello.com/c/GWQzchNJ/2218-close-empty-cart-on-switch-the-service-type

## 1.3.19

### Patch Changes

- shopping_cart.menu_cartitems.subscribe: validate restaurant_menuitems

## 1.3.18

### Patch Changes

- fix: ShoppingCart: Coupon with MinOrder: validation applies to current restaurant_cartitem subTotal

## 1.3.17

### Patch Changes

- fix: ShoppingCart: discount: coupon MinOrder compared with restaurant_cartitem_subTotal (no discount applied)

## 1.3.16

### Patch Changes

- fix: ShoppingCart: Deliverable & Discount: Driver Tip % should be based on discounted subTotal

## 1.3.15

### Patch Changes

- fix: ShoppingCart: coupon errors: items added to cart to resolve errors: refresh shopping cart with empty coupon
  errors

## 1.3.14

### Patch Changes

- 720a1d679: fix: _default_$menu_cartitems,_default_$restaurant_cartitems: []: infinite loading when shopping cart is
  empty

## 1.3.13

### Patch Changes

- fix: ShoppingCart: Calculation & display for discount, subtotal, & tax

      	    https://trello.com/c/9CJFgmVG/2202-coupon-issues

## 1.3.12

### Patch Changes

- fix: shopping cart: apply coupon: discount applied to shopping_cart total

      	    https://trello.com/c/9CJFgmVG/2202-coupon-issues

- fix: shopping cart: applied coupons: refresh page: persisted

      	    https://trello.com/c/9CJFgmVG/2202-coupon-issues

## 1.3.11

### Patch Changes

- fix: ShoppingCart: coupons,AvailableCouponsModal

      	    https://trello.com/c/aMru3C8I/2201-available-coupons

## 1.3.10

### Patch Changes

- fix: Shopping Cart: restaurant_cartitem total: add rounded values together to match api

      	    https://trello.com/c/4MTunFc2/2176-bug-on-calculation

## 1.3.9

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: ShoppingCart: empty: not logged in: infinite spinner

## 1.3.8

### Patch Changes

- performance: restaurant_cartitems: prevent multiple setting of empty arrays

## 1.3.7

### Patch Changes

- fix: /checkout: when emptying shopping cart: redirect to restaurant page with serviceType selected

      	    https://trello.com/c/WM5WXhAB/2145-shopping-card-issue-for-change-address

## 1.3.6

### Patch Changes

- ShoppingCart: using DeliveryCharge instead of search_menus_deliveryfee from menu_item for DeliveryCompany Delivery
  Types

## 1.3.5

### Patch Changes

- consumer shopping cart: Delivery Company: /search_menus.aspx?qtype=deliveryfee: + ff,coordinate query params

## 1.3.4

### Patch Changes

- fix: /checkout: items in cart: refresh: remain on /checkout page

## 1.3.3

### Patch Changes

- fix: /checkout: successful checkout: clears out all cart_menuitems even if there

      	    https://trello.com/c/1r7QF9B2/2148-shopping-card-issue-pickup

## 1.3.2

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: ShoppingCart: require_min_order: Place Order disabled

      	    https://trello.com/c/Tokjdt1L/2139-min-order-issue-for-deliverable-service-type-not-check

## 1.3.1

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: adding menu_cartitem.quantity to existing menu_cartitem

## 1.3.0

### Minor Changes

- shopping-cart: same menuitem with different selected menuoptionsize or menuoption: separate menu_cartitem

      	    https://trello.com/c/4DOTct6D/2133-issue-on-shopping-card

## 1.2.6

### Patch Changes

- fix: driverTip_percent\$\_b: default to 10%

      	    https://trello.com/c/8qxPwhfW/2086-the-driver-tip-default-is-10-how-does-it-change

## 1.2.5

### Patch Changes

- fix: shopping cart: add quantity to an existing menuitem

## 1.2.4

### Patch Changes

- fix: shopping cart issues: Menuitem_I extends MenuCartitem_I

      	    https://trello.com/c/lMnb5pjE/2034-new-issues-on-shopping-card

## 1.2.3

### Patch Changes

- update dependencies

## 1.2.2

### Patch Changes

- fix: shopping cart: migrate from older deployment state to current shopping cart state

      	    @menus/web,@menus/shopping-cart

## 1.2.1

### Patch Changes

- fix: shopping cart: migrate from older deployment state to current shopping cart state

## 1.2.0

### Minor Changes

- feat: restaurant_cartitem.menu_cartitems: MenuCartitem_I[]

## 1.1.5

### Patch Changes

- fix: shopping cart: restaurant_cartitem: rounding error on driverTip, coupon_discount, restaurant_cartitem_delivery,
  restaurant_cartitem_subTotal, restaurant_cartitem_tax, restaurant_cartitem_total

## 1.1.4

### Patch Changes

- fix: consumer ShoppingCart: Pickup Order: should not include driverTip

      	    https://trello.com/c/C1sxeITQ/1980-place-order-issues

## 1.1.3

### Patch Changes

- Consumer Shopping Cart: intermediate rounding issue

      	    https://trello.com/c/C1sxeITQ/1980-place-order-issues

## 1.1.2

### Patch Changes

- fix: /checkout,ShoppingCart: calculating menu item subtotal

## 1.1.1

### Patch Changes

- fix: calculate*menuitem_subTotal: use menuitem.Price instead of \cart_menuitem_Price* for base subTotal calculation

## 1.1.0

### Minor Changes

- - \cart*menuitem_Price*
