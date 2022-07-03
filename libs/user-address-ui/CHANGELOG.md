# @menus/user-address-ui

## 1.7.2

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.7.1

### Patch Changes

- fix: ChangeAddressModal: $map$

## 1.7.0

### Minor Changes

- \_Ctx interfaces

## 1.6.6

### Patch Changes

- - get

## 1.6.5

### Patch Changes

- fix: google.places.Autocomplete: list visibility

      	    https://trello.com/c/KNFRG8DD/2371-customer-side-choose-address

## 1.6.4

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.6.3

### Patch Changes

- fix: ChangeAddressModal: font-size: 16px: ios zoom issue when selecting input

      	@menus/web,@menus/user-address-ui

## 1.6.2

### Patch Changes

- fix: change address: Save button: ios: above navbar

      	https://stackoverflow.com/questions/28162364/javascript-detect-when-ios-browser-addres-navigation-show-up
      	https://trello.com/c/aMQMfi7n/2297-web-mobile-map

## 1.6.1

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: logged in: reload: cart out of sync due to \$userAddress
  === false

## 1.6.0

### Minor Changes

- feat: UserAddressLink: shorten redundant userAddress_text

## 1.5.7

### Patch Changes

- fix: UserAddressLink: ChangeAddressModal: open: wait for userAddress to be loaded

      	    https://trello.com/c/waPO96r4/2248-asking-for-address

## 1.5.6

### Patch Changes

- fix: ChangeAddressModal: Google places dropdown placement issue

      	    https://trello.com/c/E7Vgu9AE/2250-issue-on-address

## 1.5.5

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.5.4

### Patch Changes

- fix: Enter Your Address link: multiple clicks: should open after browser geolocation prompt

## 1.5.3

### Patch Changes

- fix: ChangeAddressModal: first time map is moved: should update \$userAddress

## 1.5.2

### Patch Changes

- fix: /restaurant/delivery/[cuisine]/[name]/[fireFlyID]: map loading issue on initial presentation of
  ChangeAddressModal

## 1.5.1

### Patch Changes

- fix: ChangeAddressModal: browser geolation allowed: center map on geolocation

      	    https://trello.com/c/nVoqLRiI/2207-customer-address-logic

## 1.5.0

### Minor Changes

- ChangeAddressModal: icons match mobile app

      	    https://trello.com/c/nVoqLRiI/2207-customer-address-logic

### Patch Changes

- fix: ChangeAddressModal: clear Address: set \$userAddress = null

## 1.4.0

### Minor Changes

- feat: ChangeAddressModal: no userAddress passed in or geolocation allowed: center map on default_location but not
  select \$userAddress

      	    https://trello.com/c/nVoqLRiI/2207-customer-address-logic

## 1.3.5

### Patch Changes

- ChangeAddressModal: navigator.geolocation.getCurrentPosition: timeout: 1000

## 1.3.4

### Patch Changes

- ChangeAddressModal: + timeout: 500, maximumAge: Infinity

## 1.3.3

### Patch Changes

- fix: ChangeAddressModal: \_geocode_userAddress: wait for google to be loaded

## 1.3.2

### Patch Changes

- fix: ChangeAddressModal: navigator.geolocation.getCurrentPosition: browser geolocation

      	    https://trello.com/c/nVoqLRiI/2207-customer-address-logic

## 1.3.1

### Patch Changes

- /settings: .user-info: mobile: smaller text

      	    https://trello.com/c/XGcTR51B/2183-responsive-view-modifications

## 1.3.0

### Minor Changes

- feat: /settings: UserAddressList,UserPaymentList: +/-: expand/collapse:

      	    https://trello.com/c/o4CEqGtz/2200-saved-address-and-payment-method-consolidation

## 1.2.4

### Patch Changes

- ChangeAddressModal: default \$userAddress to restaurant location or default_system_location

      	    https://trello.com/c/oIMLSvvh/2186-map-is-not-show-up

## 1.2.3

### Patch Changes

- fix: ChangeAddressModal: \$userAddress set while map is not idle: map center "sticks" when moving map

## 1.2.2

### Patch Changes

- ChangeAddressModal: remove \$busy autocomplete

      	    https://trello.com/c/oIMLSvvh/2186-map-is-not-show-up

## 1.2.1

### Patch Changes

- fix: Choose Address: autocomplete: manually edit \$userAddress_text issues

      	    https://trello.com/c/drV2KXsv/2193-address-issue

## 1.2.0

### Minor Changes

- feat: /settings: no userAddress: map not displayed

### Patch Changes

- fix: /settings: Change Address: map rendering

      	    https://trello.com/c/oIMLSvvh/2186-map-is-not-show-up

## 1.1.0

### Minor Changes

- modals: mobile: full height & width

## 1.0.9

### Patch Changes

- fix: consumer: ProfileHandle links: mobile: navigation

      	    https://trello.com/c/Ske7b1yg/2137-phone-view-responsive-customer-modifications

## 1.0.8

### Patch Changes

- ChangeAddressModal: click outside modal: does not close modal: fixes map drag & mouseout outside of the modal

## 1.0.7

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: change \$serviceType: .restaurant-info: flash of
  inconsistent ETA issue

## 1.0.6

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: Choose your address

## 1.0.5

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: change address: empty cart: no confirmation dialog

      	    https://trello.com/c/olpIkFYW/2051-customer-side-modifications-1

## 1.0.4

### Patch Changes

- UserAddressList_c: + ctx.UserAddressList_c

## 1.0.3

### Patch Changes

- update dependencies

## 1.0.2

### Patch Changes

- Consumer Web: Profile: My Orders instead of Order History

      	    https://trello.com/c/H6IOJOyV/1989-order-history-modification

## 1.0.1

### Patch Changes

- fix: /past-orders: intermittent ERROR_INVALID_AUTHCODE error

## 1.0.1

### Patch Changes

- fix: /past-orders: rendering
