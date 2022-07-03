# @menus/route

## 1.2.5

### Patch Changes

- fix: platform with multiple restaurants: /: redirect to /search: + query params

## 1.2.4

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.2.3

### Patch Changes

- fix: /: redirect to Restaurant

## 1.2.2

### Patch Changes

- fix: /: server side redirect: - ssr_goto\$\_b

## 1.2.1

### Patch Changes

- fix: goto_consumer_home_b: /restaurant/\*: strip '" from url

## 1.2.0

### Minor Changes

- \_Ctx interfaces

## 1.1.6

### Patch Changes

- - get

## 1.1.5

### Patch Changes

- fix: goto_home_b: type

## 1.1.4

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]:
  non-existent fireFlyID: infinite loading issue

## 1.1.3

### Patch Changes

- merge /no-restaurants into /

      	    https://trello.com/c/UYpRcOCM/2273-no-rest-available

## 1.1.2

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.1.1

### Patch Changes

- fix: page navigation wrt query & params, restaurant page

## 1.1.0

### Minor Changes

- feat: /?fireFlyID=[fireFlyID]: redirect to restaurant url

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=charts: View Menu link

      	    https://trello.com/c/R6KmBJsc/2090-issue-on-menu-sense

## 1.0.4

### Patch Changes

- fix: /checkout: items in cart: refresh: remain on /checkout page

## 1.0.3

### Patch Changes

- /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: page load

      	    fetch menu with coordinates
      	    if deliveryZone for serviceType not in coordinate notify user
      	    https://trello.com/c/uVFx5XJg/2040-data-at-customer-page

## 1.0.2

### Patch Changes

- update dependencies

## 1.0.1

### Patch Changes

- fix: platform site: /: redirects to \$platform_settings.Default_ServiceType

      	    https://trello.com/c/ljV3N32v/2014-service-type-default
