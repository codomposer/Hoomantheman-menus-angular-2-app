# @menus/date

## 1.6.7

### Patch Changes

- fix: RestInfoTab: Holiday: no time,initial validation,onchange validation

      https://trello.com/c/UjhWUw86/2513-general-issues

## 1.6.6

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.6.5

### Patch Changes

- fix: '' instead of '.js'

## 1.6.4

### Patch Changes

- millis*minutes*: + Math.round

## 1.6.3

### Patch Changes

- YYYY*MM_DD*,mm*dd_YY*: + join_str argument
- /backoffice/manage-restaurant/[fireFlyID]/order-details/[OrderID]:

      	    deliver_text_value: join_str: '/'
      	    Delivery Address: remove margin-top override

## 1.6.2

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[OrderID]: + Delivery ETA

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

## 1.6.1

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-details/[OrderID]: + Delivery ETA

      	    https://trello.com/c/KhFjOLCM/2443-updated-eta

## 1.6.0

### Minor Changes

- \_Ctx interfaces

## 1.5.2

### Patch Changes

- - get

## 1.5.1

### Patch Changes

- \_shortDateTime: falsy argument: return ''

## 1.5.0

### Minor Changes

- - performance_now

### Patch Changes

- fix: api_fetch: nodejs

## 1.4.1

### Patch Changes

- fix: \_minutes_human_text: remove fractional minutes

## 1.4.0

### Minor Changes

- feat: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: scheduled orders

      	https://trello.com/c/E4Kc3DSg/2310-future-order-customer-side

## 1.3.4

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.3.3

### Patch Changes

- fix: \_mediumDate: month name

## 1.3.2

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: \_minutes_text: lower case 'min'

      	    https://trello.com/c/NL27annF/2087-pick-up-timer-issue

## 1.3.1

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: .restaurant-info: ETA: 0 minutes/hours/days issue

      	    https://trello.com/c/NL27annF/2087-pick-up-timer-issue

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: .restaurant-info: ETA: > 1 day issues

      	    https://trello.com/c/NL27annF/2087-pick-up-timer-issue

## 1.3.0

### Minor Changes

- feat: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: ETA range: ETAMin === ETAMax: show single value instead
  of duration range

      	    https://trello.com/c/NL27annF/2087-pick-up-timer-issue

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: plural minutes: MIN instead of MINs

      	    https://trello.com/c/NL27annF/2087-pick-up-timer-issue

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: hours + minutes: minutes calculation

      	    https://trello.com/c/NL27annF/2087-pick-up-timer-issue

## 1.2.1

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: Pickup: .restaurant-info: always render duration

      	    https://trello.com/c/nvwIlNek/2057-deliverable-service-type-asking-for-the-address

## 1.2.0

### Minor Changes

- feat: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: human readable ETA

## 1.1.1

### Patch Changes

- update dependencies

## 1.1.0

### Minor Changes

- - YYYY_MM_DD_inclusive_regex
