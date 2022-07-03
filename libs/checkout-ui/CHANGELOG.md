# @menus/checkout-ui

## 1.4.3

### Patch Changes

- fix: layout: sm

## 1.4.2

### Patch Changes

- fix: .modal-footer: button layout

      https://trello.com/c/Z4GEm26k/2581-web-issue4

## 1.4.1

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.4.0

### Minor Changes

- \_Ctx interfaces

## 1.3.21

### Patch Changes

- fix: /checkout: place_order: back button: ShoppingCart should be cleared

      	https://trello.com/c/AaBWHLLS/2399-important-modification-on-shopping-cart

## 1.3.20

### Patch Changes

- fix: /checkout: COUPON_CODE_INVALID: refresh restaurant_cartitem.coupons: disable coupon if not in list

      	https://trello.com/c/h7ABp3jD/2360-bug-on-refresh-the-shopping-cart
      	https://trello.com/c/6eyD60md/2362-disabled-coupons-should-be-left-in-activated-coupons-with-a-strikethrough

## 1.3.19

### Patch Changes

- /checkout: MISMATCH_TOTAL: \$total does not change: remove restaurant_cartitem

## 1.3.18

### Patch Changes

- /checkout: MISMATCH_TOTAL: \$total remains the same after refresh: show error

      	https://trello.com/c/YIcumA96/2347-mismatch-total

## 1.3.17

### Patch Changes

- fix: /checkout: MISMATCH_TOTAL: refresh restaurant_cartitem.MinOrder

      	https://trello.com/c/YIcumA96/2347-mismatch-total

## 1.3.16

### Patch Changes

- fix: /checkout: MISMATCH_TOTAL: OptionItems: optionitem.ID === c_optionitem.ID

      	https://trello.com/c/YIcumA96/2347-mismatch-total

## 1.3.15

### Patch Changes

- fix: /checkout: MISMATCH_TOTAL: OptionItem price change: is_selected should keep value

      	https://trello.com/c/YIcumA96/2347-mismatch-total

## 1.3.14

### Patch Changes

- fix: /checkout: MISMATCH_TOTAL_detected: all menuitems removed from restaurant_cartitem

      	https://trello.com/c/YIcumA96/2347-mismatch-total

## 1.3.13

### Patch Changes

- fix: /checkout: MISMATCH_TOTAL_detected: remove restaurant_cartitems when menu_cartitems is empty

      	https://trello.com/c/YIcumA96/2347-mismatch-total

## 1.3.12

### Patch Changes

- /checkout: MISMATCH_TOTAL_detected: remove entire menu_cartitem when Quantity changes

      	https://trello.com/c/YIcumA96/2347-mismatch-total

- /checkout: MISMATCH_TOTAL_detected: 'Based on availability' is the standard error message, with 'venue' error message
  when the shopping cart is empty

      	https://trello.com/c/YIcumA96/2347-mismatch-total

## 1.3.11

### Patch Changes

- /checkout: MISMATCH_TOTAL_detected: \${RestaurantName} just updated their venue, sorry for inconvenience please
  restart your order.

      	https://trello.com/c/YIcumA96/2347-mismatch-total

## 1.3.10

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.3.9

### Patch Changes

- /checkout: Is_Single_Select,Minimum_Select,Maximum_Select,Minimum_Quantity,Maximum_Quantity changed: remove menuoption
  from ShoppingCart

      	https://trello.com/c/YIcumA96/2347-mismatch-total

## 1.3.8

### Patch Changes

- fix: /checkout: OptionItem price changed: MISMATCH_TOTAL_detected: refresh cart price

      	https://trello.com/c/YIcumA96/2347-mismatch-total

- fix: /checkout: compact instead of flatten MenuOptions & Menuoptionsizes

      	https://trello.com/c/YIcumA96/2347-mismatch-total

## 1.3.7

### Patch Changes

- fix: /checkout: MISMATCH_TOTAL_detected: selected Menuoption removed issue

## 1.3.6

### Patch Changes

- ThankYouOrderModalt; default \$place_order_errors message: 'Remove or use another coupon.'

## 1.3.5

### Patch Changes

- fix: /checkout: MISMATCH_TOTAL_detected: refresh applied_coupons

## 1.3.4

### Patch Changes

- /checkout: MISMATCH_TOTAL_detected: reload restaurant_cartitem.coupons,restaurant_cartitem.DeliveryCharge

## 1.3.3

### Patch Changes

- fix: /checkout: MISMATCH_TOTAL: sync selected values in menuoptions,menuoptionsizes,selected_menuoptionsize

## 1.3.2

### Patch Changes

- fix: /checkout: userPayments.busy is true: click Place Order button

## 1.3.1

### Patch Changes

- /checkout: MISMATCH_TOTAL: Message dialog: user tries again
- fix: CheckoutConfirmAddressModal: title

## 1.3.0

### Minor Changes

- feat: place_order: MISMATCH_TOTAL: retry order

## 1.2.6

### Patch Changes

- ShoppingCart: Proceed to Checkout button: remove price to shorten length

## 1.2.5

### Patch Changes

- fix: CheckoutConfirmAddressModal: long .modal-title wraps,layout ScheduleDayTime

      	https://trello.com/c/qaA8OFk2/2319-future-order-modification-2

## 1.2.4

### Patch Changes

- /checkout: CheckoutConfirmAddressModal: update scheduled day & time

## 1.2.3

### Patch Changes

- fix: /checkout: timeout issue

## 1.2.2

### Patch Changes

- /checkout: place_order: deliverable: not logged in then login: subscribe_wait_timeout !!\$userAddress.ID: "Address not
  yet saved" should not appear

## 1.2.1

### Patch Changes

- /checkout: api call error: show notyf_error

## 1.2.0

### Minor Changes

- feat: /checkout: ThankYouOrderModal: show error Message from api with a default

## 1.1.7

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID],/checkout,/: transition & ssr issues

## 1.1.6

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.1.5

### Patch Changes

- fix: page navigation wrt query & params, restaurant page

## 1.1.4

### Patch Changes

- /checkout: add check for \$userAddress.ID for debugging purposes

## 1.1.3

### Patch Changes

- /checkout: Shopping Cart: out of sync: notify error

## 1.1.2

### Patch Changes

- fix: /checkout: passing userAddress & serviceType saved to the restaurant_cartitem to the api

## 1.1.1

### Patch Changes

- /checkout: ThankYouOrderModal: \$place_order_errors: render API_error_type payload Message

## 1.1.0

### Minor Changes

- feat: /settings: UserAddressList,UserPaymentList: +/-: expand/collapse:

      	    https://trello.com/c/o4CEqGtz/2200-saved-address-and-payment-method-consolidation

## 1.0.6

### Patch Changes

- fix: /checkout: place_order: non deliverable: Pickup,Dine In: runtime issue

      	    https://trello.com/c/KsCyAqKf/2184-pickup-place-order-is-not-working

## 1.0.5

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID],/checkout: checkout process interstitial ui states:
  coherent

      	    https://trello.com/c/Ske7b1yg/2137-phone-view-responsive-customer-modifications

## 1.0.4

### Patch Changes

- /checkout: mobile: + CheckoutSettings: Delivery Address,Delivery instructions,Payment method

      	    https://trello.com/c/Ske7b1yg/2137-phone-view-responsive-customer-modifications

## 1.0.3

### Patch Changes

- /checkout: ThankYouOrderModal: mobile: centering

      	    https://trello.com/c/Ske7b1yg/2137-phone-view-responsive-customer-modifications

- /checkout: CheckoutConfirmAddressModal: mobile: small buttons

      	    https://trello.com/c/Ske7b1yg/2137-phone-view-responsive-customer-modifications

## 1.0.2

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: change \$serviceType: .restaurant-info: flash of
  inconsistent ETA issue

## 1.0.1

### Patch Changes

- update dependencies
