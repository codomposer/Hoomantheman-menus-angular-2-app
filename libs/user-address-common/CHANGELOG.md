# @menus/user-address-common

## 1.2.2

### Patch Changes

- remove only California restriction

## 1.2.1

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.2.0

### Minor Changes

- \_Ctx interfaces

## 1.1.3

### Patch Changes

- @types/googlemaps->@types/google.maps

## 1.1.2

### Patch Changes

- fix: \userAddress*coordinate*: falsy location_or_geolocatable: return ''

## 1.1.1

### Patch Changes

- /past-orders/[orderID]: render delivery address

      	    https://trello.com/c/CTrcvNpl/2269-customer-order-page-modification
      	    @menus/web,@menus/user-address-common

## 1.1.0

### Minor Changes

- feat: + \userAddress*text_short*
- feat: UserAddressLink: shorten redundant userAddress_text

## 1.0.5

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.0.4

### Patch Changes

- fix: logged out: select address: login: single change default_userAddress message

      	    https://trello.com/c/617wtSme/2180-consolidate-the-toast-notifications-on-top-of-the-page-red-and-green

## 1.0.3

### Patch Changes

- fix: shopping_cart: logged out with \$pending_userAddress & restaurant_cartitem: login: keep restaurant_cartitem

## 1.0.2

### Patch Changes

- /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: page load

      	    fetch menu with coordinates
      	    if deliveryZone for serviceType not in coordinate notify user
      	    https://trello.com/c/uVFx5XJg/2040-data-at-customer-page

## 1.0.1

### Patch Changes

- update dependencies
