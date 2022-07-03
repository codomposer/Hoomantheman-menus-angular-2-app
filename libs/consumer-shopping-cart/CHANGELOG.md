# @menus/consumer-shopping-cart

## 1.3.1

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.3.0

### Minor Changes

- \_Ctx interfaces

## 1.2.3

### Patch Changes

- - get

## 1.2.2

### Patch Changes

- use shopping_cart.clear() instead of restaurant_cartitems.set([])

## 1.2.1

### Patch Changes

- fix: /checkout: ShoppingCart: reload page: schedule time

## 1.2.0

### Minor Changes

- feat: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: scheduled orders

      	https://trello.com/c/E4Kc3DSg/2310-future-order-customer-side

## 1.1.6

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.1.5

### Patch Changes

- fix: ShoppingCart: close icon moved left away from right border

## 1.1.4

### Patch Changes

- fix: ShoppingCart: increment/decrement cart_menuitem.quantity: first click should take effect

## 1.1.3

### Patch Changes

- fix: /checkout: successful checkout: clears out all cart_menuitems even if there

      	    https://trello.com/c/1r7QF9B2/2148-shopping-card-issue-pickup

## 1.1.2

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: change \$serviceType: .restaurant-info: flash of
  inconsistent ETA issue

## 1.1.1

### Patch Changes

- fix: shopping_cart: logged out with \$pending_userAddress & restaurant_cartitem: login: keep restaurant_cartitem

## 1.1.0

### Minor Changes

- feat: update address: clear \$restaurant_cartitems

      	    https://trello.com/c/uVFx5XJg/2040-data-at-customer-page

## 1.0.2

### Patch Changes

- update dependencies

## 1.0.1

### Patch Changes

- fix: /checkout: Order MISMATCH_TOTAL error when size is selected
