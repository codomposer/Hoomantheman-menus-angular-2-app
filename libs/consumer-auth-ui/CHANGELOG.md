# @menus/consumer-signup-ui

## 1.8.13

### Patch Changes

- fix: Password,ResetPassword,Signup_step_3,Edit_Ro_User_Modal

      https://trello.com/c/YFcVKimQ/2538-general-issue-add-user

## 1.8.12

### Patch Changes

- fix: Login: layout: mobile,desktop

## 1.8.11

### Patch Changes

- Login: spacing

## 1.8.10

### Patch Changes

- Login: vaidation: noinit

      https://trello.com/c/RGZ99NcZ/2529-spa-modification1

## 1.8.9

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.8.8

### Patch Changes

- fix: '' instead of '.js'

## 1.8.7

### Patch Changes

- Signup: extracted Signup*step*\*.svelte

## 1.8.6

### Patch Changes

- /login: /terms-of-service,/privacy-policy: .c-text2 instead of .btn-text2

      	    https://trello.com/c/0UtdHrF0/2473-modification-required-on-the-signup-page

## 1.8.5

### Patch Changes

- /login: Terms of Service,Privacy Policy: .btn-text2

      	    https://trello.com/c/MG1MO1D5/2462-login-page-text

## 1.8.4

### Patch Changes

- /signup: Agree to...: checkboxes instead of toggle switches

      	    https://trello.com/c/wAQsAW3G/2446-aucc

## 1.8.3

### Patch Changes

- /login: + Terms of Service,Privacy Policy

      	    https://trello.com/c/MG1MO1D5/2462-login-page-text

## 1.8.2

### Patch Changes

- /verify-email: + email query param: resend code

## 1.8.1

### Patch Changes

- /signup: require Agree to Terms & Privacy Policy to complete signup,- return policy link

      	    https://trello.com/c/wAQsAW3G/2446-aucc

## 1.8.0

### Minor Changes

- \_Ctx interfaces

## 1.7.4

### Patch Changes

- /signup: show password

      	https://trello.com/c/bTHeIoyj/2378-customer-sign-up

## 1.7.3

### Patch Changes

- /login,/backoffice/login: - Remember me

      	https://trello.com/c/iIlZrWb2/2374-issues-on-backoffice1

## 1.7.2

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.7.1

### Patch Changes

- fix: /login: .custom-icon: layout

## 1.7.0

### Minor Changes

- feat: /settings: only show Close Account when logged in using Facebook

      	https://trello.com/c/op2Sx5I5/2294-account-deletion-should-add-to-settings

## 1.6.7

### Patch Changes

- /signup: links are bold

      	https://trello.com/c/cNCSOz5p/2283-modification-on-sign-up

## 1.6.6

### Patch Changes

- /verify: deprecated /verify-email: handle phone verification

## 1.6.5

### Patch Changes

- /signup: + links to /terms-of-service,/privacy-policy,/return-policy

      	    https://trello.com/c/63t7gYHf/2212-customer-sign-up-modifications

## 1.6.4

### Patch Changes

- /verify-email: Resend Code: /b/svc.aspx api,update message,Always show Login button

      	    https://trello.com/c/63t7gYHf/2212-customer-sign-up-modifications

## 1.6.3

### Patch Changes

- fix: /signup: email already exists,phone already exists: show validation error

## 1.6.2

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.6.1

### Patch Changes

- fix: page navigation wrt query & params, restaurant page

## 1.6.0

### Minor Changes

- feat: Login: from @menus/web
- /login: clicking on PlatformIcon: logout user

      	    https://trello.com/c/1bMueVaS/2219-login-expire-and-then-can-not-back-to-the-main-page-without-login

## 1.5.0

### Minor Changes

- feat: /reset-password: Resend Code

      	    https://trello.com/c/Xr37kfxU/2221-re-send-forgot-pass-code

## 1.4.0

### Minor Changes

- feat: /verify-email: Resend Code: if just completed signup process, send_forgotPassword with in memory $signup_phone
	or $signup_email
- feat: @menus/consumer-signup-ui: ForgotPassword,Signup,VerifySignup: from @menus/web
- feat: signup_email\$\_b,signup_phone_b
