# @menus/ro-user-common

## 2.7.14

### Patch Changes

- fix: MANAGE_PLATFORM_PAGE access: super admin & vendor admin should always have access

      https://trello.com/c/uExtiZr2/2612-super-admin-doesnt-have-access-to-manage-platforms

## 2.7.13

### Patch Changes

- ro_auth_redirects: + MANAGE_PLATFORM_PAGE_LINK: restaurant owner with ShowPlatformMenu: false: show Manage Platform link but don't allow access to Manage Platform page

      https://trello.com/c/O6qHIfCC/2606-platform-access

## 2.7.12

### Patch Changes

- fix: restaurant owner: /backoffice/marketing access

      https://trello.com/c/7H0Tnosw/2605-marketing-issues

## 2.7.11

### Patch Changes

- POINTS_FEATURE: super admin only

      https://trello.com/c/SY4CHJgp/2541-general-issue-reset-pass

## 2.7.10

### Patch Changes

- fix: server & appmaker login: /manage-restaurant: redirect to OrdersTab

## 2.7.9

### Patch Changes

- fix: /backoffice/manage-restaurant: login user has access

## 2.7.8

### Patch Changes

- /backoffice/manage-platform: MinAppVersion,MinForcedAppVersion,BackOfficeMinAppVersion,BackOfficeMinForcedAppVersion: only super admin can edit

## 2.7.7

### Patch Changes

- AppConfiguration_Main: + BackOfficeMinAppVersion,BackOfficeMinForcedAppVersion

      https://trello.com/c/sLeSjPqm/2516-spa-requirements

## 2.7.6

### Patch Changes

- BILLING_PAGE: is_hash_routing: no access

## 2.7.5

### Patch Changes

- fix: hoisting issue: use target: es2019

## 2.7.4

### Patch Changes

- fix: '' instead of '.js'

## 2.7.3

### Patch Changes

- appmaker role: + MANAGE_PLATFORM_PAGE: - SUPPORT_PAGE,TERMS_CONDITIONS_PAGE

## 2.7.2

### Patch Changes

- feat: RO_USER_LEVEL_APPMAKER: Restaurant Info,Preview,Menu

      	    https://trello.com/c/QdyC3aIv/2479-appbuilder

## 2.7.1

### Patch Changes

- RestContractModal: Print: Terms of Service,Privacy Policy

      	    https://trello.com/c/oJLyCvWG/2354-required-items-on-rest-contract-page

## 2.7.0

### Minor Changes

- \_Ctx interfaces

## 2.6.6

### Patch Changes

- fix: /backoffice/manage-platform: Platform Companies not loading: race condition

## 2.6.5

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 2.6.4

### Patch Changes

- fix: /backoffice/pricing: Subscription: YouOwnSubdomain

## 2.6.3

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 2.6.2

### Patch Changes

- /backoffice/users: Edit User: $ro_login_user cannot change role on self $ro_user

      	    https://trello.com/c/LUTcje7k/2149-modification-on-rest-user-page

## 2.6.1

### Patch Changes

- fix: /backoffice/manage-restaurant/\*: load ro_login_user without flash of false value

## 2.6.0

### Minor Changes

- feat: RestInfoTab: Delivery Type: + DeliveryCompany

      	    https://trello.com/c/I0nUts8W/2109-delivery-by-the-third-party

## 2.5.0

### Minor Changes

- feat: /backoffice/manage-platform: ENABLE_MAP_VIEW_FEATURE,GROUP_SIMILAR_DISHES_FEATURE: hidden for restaurant owners

      	    https://trello.com/c/IZuaHYtH/2116-plat-form-modifications

## 2.4.0

### Minor Changes

- feat: /backoffice/manage-platform: Chat,Support Chat,Intro Pages,Filters: requires vendor admin role

      	    https://trello.com/c/jOsUDbQM/2104-hide-subjects-in-platform-page-for-rest-owner

## 2.3.0

### Minor Changes

- /backoffice/pricing: + Your menu.com Subdomain

      	    https://trello.com/c/cLj1jzQw/2111-pricing-page-modifications

## 2.2.1

### Patch Changes

- /backoffice/manage-platform: Enable App, App ID,Custom Domain: Restaurant Owner does not have permission to view

      	    https://trello.com/c/wkuxYtCI/2089-modifications-on-platform

## 2.2.0

### Minor Changes

- feat: /backoffice/manage-platform: app prop read/edit permissions for restaurant owner

      	    https://trello.com/c/wkuxYtCI/2089-modifications-on-platform

## 2.1.0

### Minor Changes

- feat: /backoffice: header: \$ro_login_user_UserLevel_title

      	    https://trello.com/c/X0vK3o7C/2064-add-user-level

## 2.0.3

### Patch Changes

- fix: /manage-restaurant/[fireFlyID]/order-details/[orderID]: kitchen users should not see order price in print view

      	    https://trello.com/c/fZQ0UraO/2059-order-page-print-order

## 2.0.2

### Patch Changes

- - \$canon_ro_login_user_type

## 2.0.1

### Patch Changes

- update dependencies

## 2.0.0

### Major Changes

- BREAKING CHANGE: is*admin_b->is_admin_role\\\\\\\\\\$\\\\\\\\\\_b,is_agent_b->is_agent_role\\\\\\\\\\$\\\\\\\\\\\_b,is_super_admin_b->is_super_admin_role\$*
  b,is_vendor_admin->is_vendor_admin_role\$\_b
