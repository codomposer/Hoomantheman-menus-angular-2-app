# @menus/consumer-user-address

## 1.2.3

### Patch Changes

- remove only California restriction

## 1.2.2

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.2.1

### Patch Changes

- fix: Restaurant: userAddress == null: + open_ChangeAddressModal_i

## 1.2.0

### Minor Changes

- \_Ctx interfaces

## 1.1.9

### Patch Changes

- - get

## 1.1.8

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.1.7

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: not logged it,pick-up serviceType: add menuitem:
  place_order: login

      	    https://trello.com/c/UALjjZjk/2246-pick-up-issue

## 1.1.6

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: page loading: broke checkout when not logged in

      	    https://trello.com/c/9chcZedN/2259-error-500

## 1.1.5

### Patch Changes

- fix: consumer restaurant page: load error

## 1.1.4

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.1.3

### Patch Changes

- UserAddress: \$default_userAddress ?? null
- e86c7a71d: fix: Shopping Cart: refresh page: keeps items

## 1.1.2

### Patch Changes

- fix: anonymous_userAddress.save(): setting default_userAddress with userAddress from userAddress_a1.reload() matching
  NewID

## 1.1.1

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: deliverable: logged in with address: should not pop up
  ChangeAddressModal

## 1.1.0

### Minor Changes

- default_userAddress: set=>save
- userAddress$_b: if logged in, use $default_userAddress else \$anonymous_userAddress||false

### Patch Changes

- fix: /checkout: login with \$anonymous_userAddress: Error: Invalid Delivery Address issue

      	    https://trello.com/c/7jFa8BhM/2222-delivery-address-issue-for-delivery-service-type

- fix: /checkout: login with $anonymous_userAddress: save $anonymous_userAddress: if no matching \$userAddress_a1 save
  to api,set address as default

## 1.0.7

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: login: userAddress_a1 should populate

      	    https://trello.com/c/KsCyAqKf/2184-pickup-place-order-is-not-working

## 1.0.6

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: change \$serviceType: .restaurant-info: flash of
  inconsistent ETA issue

## 1.0.5

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: \$userAddress selected: no prompt to Choose Address on
  page load

## 1.0.4

### Patch Changes

- fix: shopping_cart: logged out with \$pending_userAddress & restaurant_cartitem: login: keep restaurant_cartitem

## 1.0.3

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: login then logout: set $pending_userAddress: $userAddress
  not populated

## 1.0.2

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: Choose your address

## 1.0.1

### Patch Changes

- update dependencies
