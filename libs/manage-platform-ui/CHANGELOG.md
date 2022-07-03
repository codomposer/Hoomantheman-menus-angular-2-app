# @menus/manage-platform-ui

## 1.2.22

### Patch Changes

- fix: manage_platform_no_active_restaurant$_b: manage_platform_settings$ edited with same PublicKey: multiple calls to fetch_search_menus_menu

## 1.2.21

### Patch Changes

- fix: ManagePlatform: save: apply_rules_platform_settings: should not set Enable_Cuisine_Filter,Enable_Points to false

      https://trello.com/c/zoySe2T4/2592-general-modifications

## 1.2.20

### Patch Changes

- fix: AppConfiguration_Features: $manage_platform_isPlatform$ dependent elements: Enable_Points,Enable_Cuisine_Filter,Default_View

## 1.2.19

### Patch Changes

- _\_rc_b converted to _\_b: in the future a WeakMap ctx will handle cleanup

## 1.2.18

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.2.17

### Patch Changes

- 77c1504dc: navigator.clipboard instead of @menus/clipboard

## 1.2.16

### Patch Changes

- .cr-app a: Color_Positive

## 1.2.15

### Patch Changes

- fix: AppConfiguration_PagesText: Your Points: bold

## 1.2.14

### Patch Changes

- fix: /backoffice/manage-platform: select platform company: logout: login as a different user: only authorized platform
  companies should be listed

      	    https://trello.com/c/vmm0f7qD/2487-issue-of-catch-wrong-company-platform

## 1.2.13

### Patch Changes

- fix: AppConfiguration_PagesText: $About_Text_errors$ is not iterable

## 1.2.12

### Patch Changes

- fix: error bindings between AppConfiguration & AppConfiguration\_\* components

## 1.2.11

### Patch Changes

- fix: AppConfiguration_Icons: - Enable_Intro_Pages check

## 1.2.10

### Patch Changes

- AppConfiguration: disable AppConfiguration_IntroPages

## 1.2.9

### Patch Changes

- AppConfiguration: extracted AppConfiguration\_\* components

## 1.2.8

### Patch Changes

- fix: MobilePreview: Restaurant Owner: page load: wait for iframe to send loaded message: postMessage: action: 'data'

      	    https://trello.com/c/OVbNUUFI/2476-manage-platform-issue

## 1.2.7

### Patch Changes

- ManagePlatformBody: About us

## 1.2.6

### Patch Changes

- ManagePlatformBody,manage_platform_platform_settings$_rc_b,save_manage_platform_settings_rc_b: is_super_admin_role$
  not required

      	https://trello.com/c/OVbNUUFI/2476-manage-platform-issue

## 1.2.5

### Patch Changes

- fix: /backoffice/manage-platform: platform_companies\$\_rc_b: any ro_login (not just is_super_admin_role): load

## 1.2.4

### Patch Changes

- fix: ManagePlatform: race condition disabling rendering of ManagePlatformBody

## 1.2.3

### Patch Changes

- fix: /backoffice/manage-platform: long initial load time

      	    https://trello.com/c/OVbNUUFI/2476-manage-platform-issue

## 1.2.2

### Patch Changes

- fix: /backoffice/manage-platform: Terms of Service: TermsOfUse: Generate & display text

      	    https://trello.com/c/20oOy4q2/2474-tos-text-generation

## 1.2.1

### Patch Changes

- /backoffice/manage-platform: only Super Admin has access to: Return Policy,Privacy Policy,Terms of Service

      	    https://trello.com/c/QRQovbVz/2461-manage-platform-page-modificatrions

- /backoffice/manage-platform:

      	Terms of Services
      	https://trello.com/c/QRQovbVz/2461-manage-platform-page-modificatrions

## 1.2.0

### Minor Changes

- \_Ctx interfaces

## 1.1.4

### Patch Changes

- MobilePreview: mobile_iframe.contentWindow.postMessage: console.info

## 1.1.3

### Patch Changes

- fix: /backoffice/manage-platform: Platform Companies not loading: race condition

## 1.1.2

### Patch Changes

- - get

## 1.1.1

### Patch Changes

- /backoffice/platform-settings: Name: is_vendor_admin_role: editable: otherwise: read-only

      	    https://trello.com/c/570pxZON/2425-modification-on-rest-page

## 1.1.0

### Minor Changes

- /backoffice/manage-platform: \$manage_platform_no_active_restaurant: Please fill the required fields and launch your
  web and mobile applications.

      	    https://trello.com/c/ZBPHoOcL/2398-enable-a-location-requirements-brian

## 1.0.26

### Patch Changes

- fix: /backoffice/manage-platform: onDestroy undefined callback issue

## 1.0.25

### Patch Changes

- fix: /backoffice/manage-platform: switching platforms

## 1.0.24

### Patch Changes

- fix: /backoffice/manage-platform: Choose a Company: loading

## 1.0.23

### Patch Changes

- fix: /backoffice/manage-platform: Platform Companies select list: list items

## 1.0.22

### Patch Changes

- fix: /backoffice/manage-platform: populating Addresses

## 1.0.21

### Patch Changes

- fix: /backoffice/manage-platform: Refresh Mobile App

## 1.0.20

### Patch Changes

- fix: /backoffice/manage-platform: App Icon png: Upload: error exists: success: clear error
- fix: /backoffice/manage-platform: App Icon png: Upload: error exists: success: clear error

      	https://trello.com/c/nC0vzZq5/2412-issue-on-platform-page
      	@menus/web,@menus/manage-platform-ui

## 1.0.19

### Patch Changes

- /backoffice/manage-platform: .ServiceType: Default button layout

## 1.0.18

### Patch Changes

- fix: /backoffice/manage-platform: MobilePreview: vertical scrolling with short windows
- fix: /backoffice/manage-platform: MobilePreview: mobile width: layout

## 1.0.17

### Patch Changes

- fix: /backoffice/manage-platform: added missing Row & section-subheading

      	    https://trello.com/c/i8lPPBXx/2411-manage-platform

## 1.0.16

### Patch Changes

- fix: swapped (can not be changed) & (can not be changed, only use lower-case alphanumeric characters)

      	https://trello.com/c/uYmz1H0a/2404-manage-platform-modification

## 1.0.15

### Patch Changes

- fix: /backoffice/manage-platform: populate TextEditor: includes Generate Text

      	https://trello.com/c/nNxpkKEO/2395-generate-text-issue

## 1.0.14

### Patch Changes

- /backoffice/manage-platform: Website Subdomain: (can not change, only use lower-case alphanumeric characters)

      	https://trello.com/c/uYmz1H0a/2404-manage-platform-modification

## 1.0.13

### Patch Changes

- 7c034f6a5: fix: /background/platform-settings: .main-header-pt: padding-bottom: 130px
- /backoffice/manage-platform: Choose a company: send data to iframe

## 1.0.12

### Patch Changes

- fix: /backoffice/manage-platform: mobile: Save/Refresh Mobile App buttons: formatting
- fix: /backoffice/manage-platform: .platform-controls-section: mobile: width: auto
- /backoffice/manage-platform: -.row: consistent columnar positioning

## 1.0.11

### Patch Changes

- fix: /backoffice/manage-platform: Generate Text buttons: click

      	https://trello.com/c/nNxpkKEO/2395-generate-text-issue

## 1.0.10

### Patch Changes

- fix: /backoffice/manage-platform: TextEditor: save

      	https://trello.com/c/iIlZrWb2/2374-issues-on-backoffice1

## 1.0.9

### Patch Changes

- ManagePlatformBody: Color copied! message: duration: 3_000

      	    https://trello.com/c/iIlZrWb2/2374-issues-on-backoffice

## 1.0.8

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.0.7

### Patch Changes

- fix: /backoffice/manage-platform: Intro Pages: upload then remove then upload same image

      	https://trello.com/c/dJUzzkQR/2288-intro-modifications

- /backoffice/manage-platform: Intro Pages: remove Color form

      	https://trello.com/c/dJUzzkQR/2288-intro-modifications

- fix: /backoffice/manage-platform: Intro Pages: IntroPage index >= 1: upload image

      	https://trello.com/c/dJUzzkQR/2288-intro-modifications

## 1.0.6

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.0.5

### Patch Changes

- fix: /backoffice/manage-platform: \$selected_restaurant_address should have a value on page load
- fix: /backoffice/manage-platform: save: APP_ID: strip out com.dishzilla.

## 1.0.4

### Patch Changes

- /backoffice/manage-platform: Intro Pages: table: layout

      	    https://trello.com/c/NwPRFEpp/2115-intro-page-issues

## 1.0.3

### Patch Changes

- View Settings: Mobile Type: wider

      	    https://trello.com/c/yMK7yZKE/2150-platform-page-modification

- View Settings: Addresses: render if \$is_ro_vendor_admin_role

      	    https://trello.com/c/yMK7yZKE/2150-platform-page-modification

## 1.0.2

### Patch Changes

- fix: /backoffice/manage-platform: save

## 1.0.1

### Patch Changes

- fix: /backoffice/platform-settings: set intro page: change platform: load selected platform
