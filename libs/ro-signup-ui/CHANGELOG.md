# @menus/ro-signup-ui

## 1.2.15

### Patch Changes

- Signup_STEP_REST_LIST_restaurant_name_modal: populate restaurant list when .restaurant-name-input is blank

## 1.2.14

### Patch Changes

- fix: Signup_STEP_SET_PASSWORD: Continue: spinner timeout: API_USER_pass: ignoreLogin

## 1.2.13

### Patch Changes

- Signup: Signup*STEP_SET_PASSWORD: Confirm Password: remove password_errors*
- fix: Signup: API_REGISTRATION_register: send token

## 1.2.12

### Patch Changes

- fix: Signup: verification code step
- Signup_STEP_REST_LIST: .signup-section: less left/right padding
- fix: Signup_STEP_REST_LIST: .restaurant-name-input: xs: width

## 1.2.11

### Patch Changes

- fix: Signup: xs: Please enter your restaurant name: use modal: + Signup_STEP_REST_LIST_restaurant_name_modal

## 1.2.10

### Patch Changes

- fix: Signup: .SupportContactDialog: md: bottom full width
- fix: Signup_STEP_ZIPCODE: zip code: short: focus: move to top

      https://trello.com/c/X0vlZTM5/2555-sap14

- fix: Signup_STEP_REST_LIST: short clients: bump input & dropdown to top

      https://trello.com/c/sNhuQDo5/2574-sap15

## 1.2.9

### Patch Changes

- fix: Login,Signup: phone,short windows: SupportContactDialog: should not obscure form: position: static

      https://trello.com/c/agv9h7jg/2543-sap7

## 1.2.8

### Patch Changes

- Signup_STEP_EMAIL,Signup_STEP_NEW_REST,Signup_STEP_REST_LIST,Signup_STEP_SET_PASSWORD,Signup_STEP_VERIFY_CODE,Signup_STEP_ZIPCODE: input_tooltip
- fix: Signup: .SupportContactDialog: phone: width

      https://trello.com/c/agv9h7jg/2543-sap7

## 1.2.7

### Patch Changes

- Signup: is_cordova_app: hide pricing info

## 1.2.6

### Patch Changes

- Pricing,Signup: + support email address

      https://trello.com/c/12oRho2U/2531-web-modification

- Pricing,Signup: + support email address

      https://trello.com/c/12oRho2U/2531-web-modification

## 1.2.5

### Patch Changes

- fix: Signup,SubscriptionCheckoutModal: cordova: + window.open: \_system

## 1.2.4

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.2.3

### Patch Changes

- /backoffice/signup: API_REGISTRATION_new: error in calling newRest_Address_unsubscriber

## 1.2.2

### Patch Changes

- fix: /backoffice/signup:

      	    init_address_autocomplete: timeout issue
      	    extract Signup_*.svelte components
      	    https://trello.com/c/ZA2ID3Wi/2482-address-error

## 1.2.1

### Patch Changes

- fix: /backoffice/signup: CustomerService_Phone

## 1.2.0

### Minor Changes

- \_Ctx interfaces

## 1.1.4

### Patch Changes

- @types/googlemaps->@types/google.maps

## 1.1.3

### Patch Changes

- /backoffice/signup: onMount: show loading spinner until complete: fix: fireFlyID.\$ present: search_restByFireFlyID:
  flash of signup page before redirect to /backoffice/login

## 1.1.2

### Patch Changes

- /backoffice/signup: /APIOwner/a/reg.aspx: {"Status":"error","Message":"validate parameters"}: Business Address
  validation error

## 1.1.1

### Patch Changes

- fix: /backoffice/signup: empty suggestion list: handling
- fix: /backoffice/signup: newRest_Address: API_REGISTRATION_new: a,z params

## 1.1.0

### Minor Changes

- /backoffice/signup?plan=2: Business Address: use Google Maps Autocomplete

      	https://trello.com/c/hR7A5ruj/2349-modification-on-registration-page

## 1.0.2

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.0.1

### Patch Changes

- /backoffice/signup?plan=2: Business instead of Restaurant label

      	https://trello.com/c/hR7A5ruj/2349-modification-on-registration-page
