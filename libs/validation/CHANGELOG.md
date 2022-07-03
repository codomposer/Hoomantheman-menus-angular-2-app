# @menus/validation

## 1.5.10

### Patch Changes

- fix: ValidationMessages: input_tooltip

      https://trello.com/c/G4kgtxP9/2604-issues

## 1.5.9

### Patch Changes

- fix: APP_VERSION\$\_b: version checks: BackOfficeMinAppVersion,BackOfficeMinForcedAppVersion

      https://trello.com/c/sLeSjPqm/2516-spa-requirements

## 1.5.8

### Patch Changes

- fix: RoMenuOptionModal: open with no Name then open wiht Name: Name is required showing up

      https://trello.com/c/dgjHlGeo/2518-menu-option-issues

## 1.5.7

### Patch Changes

- fix: ValidationMessages: .has_tooltip: width

## 1.5.6

### Patch Changes

- ValidationMessages: .input_tooltip: 2px lower: margin-top: -18px;

## 1.5.5

### Patch Changes

- ValidationMessages: .has_tooltip: width: 100%;padding: 0 12px;

## 1.5.4

### Patch Changes

- ValidationMessages: -tooltip,+inplace_tooltip,+input_tooltip

## 1.5.3

### Patch Changes

- ValidationMessages: + tooltip: position: absolute

## 1.5.2

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.5.1

### Patch Changes

- AccountInformationTab:

      	    toggle_edit: clear: AccountNumber,RoutingNumber,TIN,Braintree_Onboard_Status
      	    AccountNumber,RoutingNumber,TIN: validation: number with {9,10} digits
      	    https://trello.com/c/5aeMTyVS/2442-modifications-on-account-info-page

## 1.5.0

### Minor Changes

- \_Ctx interfaces

## 1.4.0

### Minor Changes

- feat: validity

## 1.3.2

### Patch Changes

- fix: /signup: email already exists,phone already exists: show validation error
- validation: validation_args_object_type: + immediate

## 1.3.1

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.3.0

### Minor Changes

- autocomplete: validation: not running on load

### Patch Changes

- fix: /login: autocomplete: validation of null issue for login/password fields

## 1.2.2

### Patch Changes

- use:validation: setTimeout: 500 to allow time for autocomplete

## 1.2.1

### Patch Changes

- fix: use:validation: setTimeout 100ms before validation to allow autocomplete action

## 1.2.0

### Minor Changes

- feat: /signup,/backoffice/signup: email validation: case-insensitive

      	    https://trello.com/c/StNuawiF/2078-customer-sign-up-page

## 1.1.1

### Patch Changes

- update dependencies

## 1.1.0

### Minor Changes

- - \date*errors*,\_\date*errors*

## 1.0.1

### Patch Changes

- 7a5a6022b: fix: @menus/validation: \required*errors*: 0 values are valid
