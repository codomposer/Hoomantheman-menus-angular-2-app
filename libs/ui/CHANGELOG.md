# @menus/ui

## 1.4.3

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: timeout error

## 1.4.2

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.4.1

### Patch Changes

- removing weak_ctx for troubleshooting

## 1.4.0

### Minor Changes

- \_Ctx interfaces

## 1.3.1

### Patch Changes

- fix: ssr: ssr_goto\$\_b: + request_id_map_ctx

## 1.3.0

### Minor Changes

- feat: request with unsupported domain: redirect to menu.com or dev.menu.com

      	https://trello.com/c/4u4UeYDC/2302-is-it-right-way-for-any-subdomain-back-to-the-main-page

## 1.2.5

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.2.4

### Patch Changes

- fix: client side navigation: params should be remembered until new page is loaded

## 1.2.3

### Patch Changes

- fix: page navigation wrt query & params, restaurant page

## 1.2.2

### Patch Changes

- fix: \_ui_ctx: sets window.ui_ctx: subsequent calls to \_ui_ctx use window.ui_ctx

## 1.2.1

### Patch Changes

- fix: goto_b: called from dom

## 1.2.0

### Minor Changes

- ui_ctx: navigate between pages: singleton instance using session

## 1.1.0

### Minor Changes

- feat: \ssr*ui_ctx*

## 1.0.3

### Patch Changes

- fix: goto: waitfor in_goto

## 1.0.2

### Patch Changes

- update dependencies

## 1.0.1

### Patch Changes

- setContext_ui_ctx: window.ctx & window.APP_VERSION: instead of \_ui_ctx
