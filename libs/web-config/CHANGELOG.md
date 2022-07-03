# @menus/web-config

## 1.6.14

### Patch Changes

- ro_auth_redirects: + MANAGE_PLATFORM_PAGE_LINK: restaurant owner with ShowPlatformMenu: false: show Manage Platform link but don't allow access to Manage Platform page

      https://trello.com/c/O6qHIfCC/2606-platform-access

## 1.6.13

### Patch Changes

- POINTS_FEATURE: super admin only

      https://trello.com/c/SY4CHJgp/2541-general-issue-reset-pass

## 1.6.12

### Patch Changes

- webConfig\_: process.env.DEV,process.env.LIVE: forces webConfig environment

## 1.6.11

### Patch Changes

- fix: RoMainDashboard: ios: .main-header-wrapper: padding-top

## 1.6.10

### Patch Changes

- AppConfiguration_Main: + BackOfficeMinAppVersion,BackOfficeMinForcedAppVersion

      https://trello.com/c/sLeSjPqm/2516-spa-requirements

## 1.6.9

### Patch Changes

- IFRAME*MOBILE_APP_URL*: bases url on webConfig

## 1.6.8

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.6.7

### Patch Changes

- fix: menu.com,dev.menu.com,my.dev.menu.com: speed up ssr logic: no need load gps\$\_b

      + backoffice_host_a

## 1.6.6

### Patch Changes

- /backoffice: video tag: {images*host*(webConfig)}/static_video/menucom-promo.mp4

## 1.6.5

### Patch Changes

- new menu logo on printed pages

      	    https://trello.com/c/pg65tij8/2485-change-menus-logo-on-prints

## 1.6.4

### Patch Changes

- feat: RO_USER_LEVEL_APPMAKER: Restaurant Info,Preview,Menu

      	    https://trello.com/c/QdyC3aIv/2479-appbuilder

## 1.6.3

### Patch Changes

- RestInfoTab: + Segment,Cuisine,Sell_Alcohol

      	    https://trello.com/c/gfUVdEHN/2466-modification-on-rest-info-page

## 1.6.2

### Patch Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]?tab=orders,/backoffice/manage-restaurant/[fireFlyID]
  /order-details/[OrderID]: + OrderTransitionUI

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.6.1

### Patch Changes

- - enable*beta_features\$: replaces ENABLE_BETA_FEATURES*,IsBeta\_ in @menus/web-config

## 1.6.0

### Minor Changes

- \_Ctx interfaces

## 1.5.7

### Patch Changes

- \RECAPTCHA*SITE_KEY*: uses process.env.DEV_RECAPTCHA_SITE_KEY & process.env.LIVE_RECAPTCHA_SITE_KEY

## 1.5.6

### Patch Changes

- fix: \IFRAME*MOBILE_APP_URL*: using dedicated domain for mapp

## 1.5.5

### Patch Changes

- fix: https://dev-new.api.menu.com references

## 1.5.4

### Patch Changes

- All order_status_r_StatusID present in api

## 1.5.3

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-detail/[orderID]: more detailed Delivery message on bottom line

      	    https://trello.com/c/yB7Mc9SX/2260-modification-on-order-page

## 1.5.2

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.5.1

### Patch Changes

- - menu_com_Google_Analytics_ID,dishzilla_com_Google_Analytics_ID

## 1.5.0

### Minor Changes

- feat: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: Navbar sticky headers

      	    https://trello.com/c/Ske7b1yg/2137-phone-view-responsive-customer-modifications

## 1.4.0

### Minor Changes

- feat: /backoffice/manage-platform: ENABLE_MAP_VIEW_FEATURE,GROUP_SIMILAR_DISHES_FEATURE: hidden for restaurant owners

      	    https://trello.com/c/IZuaHYtH/2116-plat-form-modifications

## 1.3.0

### Minor Changes

- feat: /backoffice/manage-platform: Chat,Support Chat,Intro Pages,Filters: requires vendor admin role

      	    https://trello.com/c/jOsUDbQM/2104-hide-subjects-in-platform-page-for-rest-owner

## 1.2.0

### Minor Changes

- feat: /backoffice/manage-platform: app prop read/edit permissions for restaurant owner

      	    https://trello.com/c/wkuxYtCI/2089-modifications-on-platform

## 1.1.1

### Patch Changes

- 101a959b3: fix: /backoffice/users: select list restricted to REST_OWNER,USER,KITCHEN

      	    https://trello.com/c/X0vK3o7C/2064-add-user-level

## 1.1.0

### Minor Changes

- feat: /backoffice: header: \$ro_login_user_UserLevel_title

      	    https://trello.com/c/X0vK3o7C/2064-add-user-level

## 1.0.3

### Patch Changes

- fix: /manage-restaurant/[fireFlyID]/order-details/[orderID]: kitchen users should not see order price in print view

      	    https://trello.com/c/fZQ0UraO/2059-order-page-print-order

## 1.0.2

### Patch Changes

- TAB: rename to follow name ctx->type name convention

## 1.0.1

### Patch Changes

- update dependencies
