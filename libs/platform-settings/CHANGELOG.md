# @menus/platform-settings

## 1.4.3

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.4.2

### Patch Changes

- .cr-app a: Color_Text2

## 1.4.1

### Patch Changes

- SiteFooter: Refund Policy links to /terms-of-service#RefundPolicy

      	    https://trello.com/c/QRQovbVz/2461-manage-platform-page-modificatrions

## 1.4.0

### Minor Changes

- \_Ctx interfaces

## 1.3.1

### Patch Changes

- gps\$\_b: use api_fetch to log request time

## 1.3.0

### Minor Changes

- feat: request with unsupported domain: redirect to menu.com or dev.menu.com

      	https://trello.com/c/4u4UeYDC/2302-is-it-right-way-for-any-subdomain-back-to-the-main-page

## 1.2.10

### Patch Changes

- fix: /backoffice/manage-platform: Intro Pages: upload then remove then upload same image

      	https://trello.com/c/dJUzzkQR/2288-intro-modifications

- fix: /backoffice/manage-platform: Intro Pages: IntroPage index >= 1: upload image

      	https://trello.com/c/dJUzzkQR/2288-intro-modifications

## 1.2.9

### Patch Changes

- fix: .nav.nav-pills: li.disabled: theme color

## 1.2.8

### Patch Changes

- gps: add retrying gps reload... warn message for logging

## 1.2.7

### Patch Changes

- fix: gps$_b: set gps store to a \$gps_error_type if the api responds with an non ECONNRESET error response

## 1.2.6

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.2.5

### Patch Changes

- fix: page navigation wrt query & params, restaurant page

## 1.2.4

### Patch Changes

- fix: SiteFooter: \$platform_settings.Enable_About_Text is false: do not render About Us

      	    https://trello.com/c/RmWPsWUp/2120-footer-description-issue

## 1.2.3

### Patch Changes

- fix: consumer chat: only show if \$platform_settings.Enable_HiWaiter is true

      	    https://trello.com/c/Ov8900ST/2117-hi-waiter-bug

## 1.2.2

### Patch Changes

- fix: consumer: footer: social network links: href,center icon

      	    https://trello.com/c/p9hsA6v2/2048-rest-social-links-bug-error-400

## 1.2.1

### Patch Changes

- update dependencies

## 1.2.0

### Minor Changes

- feat: /backoffice/manage-platform: Service Types: Default Service Type

      	    https://trello.com/c/ljV3N32v/2014-service-type-default

## 1.1.0

### Minor Changes

- feat: Enable_Facebook_Login$_b,Enable_Google_Login$\_b

## 1.0.3

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: \$isPlatform: true: flash of "Manage This Platform" issue

## 1.0.2

### Patch Changes

- cad67a18d: fix: /past-orders: remove flash of 'No Orders' on page load

## 1.0.1

### Patch Changes

- fix: platformStyles\$\_b: undefined theme settings should not be rendered
