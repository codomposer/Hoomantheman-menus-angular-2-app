# @menus/web-build

## 1.1.8

### Patch Changes

- fix: config*preprocess*: source map

## 1.1.7

### Patch Changes

- APP*VERSION_rollup_plugin*: use process.env.APP_VERSION if exists: copyFile ./static/APP_VERSION otherwise

## 1.1.6

### Patch Changes

- fix: RoMainDashboard: web: $APP_VERSION$ instead of webConfig.APP_VERSION

## 1.1.5

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.1.4

### Patch Changes

- fix: build,runtime: assets: node_modules,favicon.png,https://apis.google.com/js/platform.js,https://platform.linkedin.com/in.js,https://connect.facebook.net/en_US/sdk.js

## 1.1.3

### Patch Changes

- fix: node_modules assets: build

## 1.1.2

### Patch Changes

- fix: build-watch: infinite build loop due to generate_ctx_I_file

## 1.1.1

### Patch Changes

- - pnpm run build; - generate_ctx_I_file

## 1.1.0

### Minor Changes

- \_Ctx interfaces

## 1.0.17

### Patch Changes

- serving assets from lambda

## 1.0.16

### Patch Changes

- \RECAPTCHA*SITE_KEY*: uses process.env.DEV_RECAPTCHA_SITE_KEY & process.env.LIVE_RECAPTCHA_SITE_KEY

## 1.0.15

### Patch Changes

- - get

## 1.0.14

### Patch Changes

- fix: build: font-awesome.min.css transform

## 1.0.13

### Patch Changes

- fix: \*.js files: sourceMappingURL rewrite for assets: quill.min.js->quill.min.js.map

## 1.0.12

### Patch Changes

- fix: \IFRAME*MOBILE_APP_URL*: using dedicated domain for mapp

## 1.0.11

### Patch Changes

- fix: @rollup/plugin-replace: build warning

## 1.0.10

### Patch Changes

- fix: build: loading external assets

## 1.0.9

### Patch Changes

- fix: build: warning

## 1.0.8

### Patch Changes

- bootstrap: style tag: scss: @import: should not call mhash replace

## 1.0.7

### Patch Changes

- fix: scss syntaxt issue

## 1.0.6

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.0.5

### Patch Changes

- fix: page navigation wrt query & params, restaurant page

## 1.0.4

### Patch Changes

- fix: build

## 1.0.3

### Patch Changes

- update dependencies

## 1.0.2

### Patch Changes

- \_version: 8 character version length

## 1.0.1

### Patch Changes

- /client/APP_VERSION

      	    build_APP_VERSION.ts->bin/build_APP_VERSION.ts
      	    package.json: scripts postversion: ./bin/build_APP_VERSION.mjs
      	    + static/APP_VERSION
      	    poll /client/APP_VERSION
      	    @menus/web-s,velte@menus/version-refresh-ui,@menus/version-build,@menus/web-build
