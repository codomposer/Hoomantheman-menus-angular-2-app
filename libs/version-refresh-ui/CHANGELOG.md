# @menus/version-refresh-ui

## 1.1.7

### Patch Changes

- fix: APP_VERSION\$\_b: version checks: BackOfficeMinAppVersion,BackOfficeMinForcedAppVersion

      https://trello.com/c/sLeSjPqm/2516-spa-requirements

## 1.1.6

### Patch Changes

- APP_VERSION\$\_b: open_store_link: when BackOffice_App_Android_Store_Link or BackOffice_App_IOS_Store_Link not present: navigate to store page

      https://trello.com/c/sLeSjPqm/2516-spa-requirements

## 1.1.5

### Patch Changes

- fix: circular dependency: move validate_backoffice_APP_VERSION into APP_VERSION\$

## 1.1.4

### Patch Changes

- APP_VERSION\$\_b: init: hash routing: check BackOfficeMinForcedAppVersion & BackOfficeMinAppVersion
- extracted validate_backoffice_APP_VERSION_b from APP_VERSION\$\_b

## 1.1.3

### Patch Changes

- fix: dev: APP_VERSION\$: APP_VERSION_dirty false positive: load APP_VERSION on page load

## 1.1.2

### Patch Changes

- initial version is process.env.APP_VERSION

## 1.1.1

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.1.0

### Minor Changes

- \_Ctx interfaces

## 1.0.6

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.0.5

### Patch Changes

- fix: VersionRefresh: pops up in front of modals

## 1.0.4

### Patch Changes

- VersionRefresh: mobile compatibility: refresh link at the bottom

## 1.0.3

### Patch Changes

- update dependencies

## 1.0.2

### Patch Changes

- /client/APP_VERSION

      	    build_APP_VERSION.ts->bin/build_APP_VERSION.ts
      	    package.json: scripts postversion: ./bin/build_APP_VERSION.mjs
      	    + static/APP_VERSION
      	    poll /client/APP_VERSION
      	    @menus/web-s,velte@menus/version-refresh-ui,@menus/version-build,@menus/web-build

## 1.0.1

### Patch Changes

- @menu/version-refresh-ui: VersionRefresh: reload button: reload page
