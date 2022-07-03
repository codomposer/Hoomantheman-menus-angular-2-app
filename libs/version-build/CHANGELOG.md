# @menus/version-build

## 1.1.1

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.1.0

### Minor Changes

- \_Ctx interfaces

## 1.0.3

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.0.2

### Patch Changes

- update dependencies

## 1.0.1

### Patch Changes

- /client/APP_VERSION

      	    build_APP_VERSION.ts->bin/build_APP_VERSION.ts
      	    package.json: scripts postversion: ./bin/build_APP_VERSION.mjs
      	    + static/APP_VERSION
      	    poll /client/APP_VERSION
      	    @menus/web-s,velte@menus/version-refresh-ui,@menus/version-build,@menus/web-build
