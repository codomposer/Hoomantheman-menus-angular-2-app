# @menus/shared-ui

## 1.5.9

### Patch Changes

- fix: ConfirmModal: .footer .btn: layout

      https://trello.com/c/OOu1XNyb/2583-sap22

## 1.5.8

### Patch Changes

- fix: .modal-footer: button layout

      https://trello.com/c/Z4GEm26k/2581-web-issue4

## 1.5.7

### Patch Changes

- fix: .fa > \*: font-family: lato-black

      https://trello.com/c/7aFh5k0H/2579-sap18

## 1.5.6

### Patch Changes

- fix: ConfirmModal: .action-buttons .btn: + .btn-lg

## 1.5.5

### Patch Changes

- fix: ConfirmModal: phone: layout;ConfirmModal_open_data_C: .btn-danger class

## 1.5.4

### Patch Changes

- PageLoader: center type: 'page'|'parent'

## 1.5.3

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.5.2

### Patch Changes

- SiteFooter

      	    "Terms and Conditions"->"Terms of Service"
      	    + Do not sell my personal information
      	    - Patent
      	    https://trello.com/c/qNhh0dul/2448-footer-page-modification

## 1.5.1

### Patch Changes

- SiteFooter: Refund Policy links to /terms-of-service#RefundPolicy

      	    https://trello.com/c/QRQovbVz/2461-manage-platform-page-modificatrions

## 1.5.0

### Minor Changes

- \_Ctx interfaces

## 1.4.13

### Patch Changes

- fix: SiteFooter: login,signup links: only show if \$isLoggedOut_b

      	    https://trello.com/c/ePJTIevX/2413-modification-on-customer-side

## 1.4.12

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.4.11

### Patch Changes

- fix: .modal-footer: >= \$screen-sm-min: remove padding-bottom for ios

## 1.4.10

### Patch Changes

- /settings: Close Account: success response: Thank You message

## 1.4.9

### Patch Changes

- fix: ConfirmModal: ios: footer buttons are visible with navigation

## 1.4.8

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.4.7

### Patch Changes

- fix: SiteFooter: mobile: SocialLinks: layout

## 1.4.6

### Patch Changes

- SiteFooter: social media icons: mobile: single row

## 1.4.5

### Patch Changes

- consumer Navbar: smaller toggle icons

      	    https://trello.com/c/zzKtXIyq/1999-1

## 1.4.4

### Patch Changes

- fix: SiteFooter: \$platform_settings.Enable_About_Text is false: do not render About Us

      	    https://trello.com/c/RmWPsWUp/2120-footer-description-issue

## 1.4.3

### Patch Changes

- SiteFooter: switch Terms and Conditions & Patent links

      	    https://trello.com/c/fupmrA5M/2119-modifications-on-customer-page

- SiteFooter: remove Account header

      	    https://trello.com/c/fupmrA5M/2119-modifications-on-customer-page

## 1.4.2

### Patch Changes

- fix: sendRequest_b: non json response: throw err
- fix: SiteFooter: \$platform_settings.Footer_Description placement

      	    https://trello.com/c/JbYOlC00/2118-footer-description-does-not-show-up-on-web-customer-page

## 1.4.1

### Patch Changes

- fix: SiteFooter: \$platform_settings.Footer_Description

      	    https://trello.com/c/JbYOlC00/2118-footer-description-does-not-show-up-on-web-customer-page

## 1.4.0

### Minor Changes

- feat: PageLoader: + \$\$props.class

## 1.3.4

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: change \$serviceType: .restaurant-info: flash of
  inconsistent ETA issue

## 1.3.3

### Patch Changes

- SiteFooter: - About title

      	    https://trello.com/c/qh8IJmSE/2077-modifications-on-rest-page

- SiteFooter: positions: social media icons,columns

      	    https://trello.com/c/qh8IJmSE/2077-modifications-on-rest-page

- SiteFooter: Register->Sign up

      	    https://trello.com/c/qh8IJmSE/2077-modifications-on-rest-page

## 1.3.2

### Patch Changes

- fix: consumer: footer: social network links: href,center icon

      	    https://trello.com/c/p9hsA6v2/2048-rest-social-links-bug-error-400

## 1.3.1

### Patch Changes

- PoweredBy: remove logo,center text

      	    https://trello.com/c/LCkUVAsm/2044-reset-pass-correction

## 1.3.0

### Minor Changes

- feat: /reset-password: branded success page

      	    https://trello.com/c/eilVScgG/2024-pass-rest-code-page-issues

- feat: PoweredBy

## 1.2.0

### Minor Changes

- feat: ConfirmModal: ok & cancel button css class override

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: change service type with restaurant_cartitems

      	    clear restaurant_cartitems
      	    only show dialog when there are cart items

## 1.1.1

### Patch Changes

- update dependencies

## 1.1.0

### Minor Changes

- feat: SiteFooter: hide link to /return-policy when \$platform_settings.ReturnPolicy is blank
- feat: SiteFooter: hide link to /privacy-policy when \$platform_settings.PrivacyPolicy is blank

## 1.0.1

### Patch Changes

- page footer: hide About Us link if there is not \$platform_settings.About_Text is blank
