# @menus/restaurant-hours

## 1.2.1

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.2.0

### Minor Changes

- \_Ctx interfaces

## 1.1.16

### Patch Changes

- \_schedule_n1_a: \minute_tick should not be sanitized: possible off by 15 minute minutes issue

## 1.1.15

### Patch Changes

- fix: \_schedule_n1_a: restaurant is_open with long ETAMax

## 1.1.14

### Patch Changes

- fix: \_schedule_n0_a: ASAP not available if restaurant is open for less than \minute_tick + ETAMax

## 1.1.13

### Patch Changes

- fix: ScheduleDayTime: multiple instances: update schedule_ctx: infinite loop issue

## 1.1.12

### Patch Changes

- fix: /checkout: keep selected schedule_n1_value

## 1.1.11

### Patch Changes

- fix: ScheduleDayTime: first value reselected: use timestamp as select value instead of index

## 1.1.10

### Patch Changes

- fix: \_schedule_n1_a: Today: same_day_prep: first shift open time & subsequent shift open time

## 1.1.9

### Patch Changes

- fix: \_schedule_ctx: apply restaurant_menuitem ETAMax to time slots

      	https://trello.com/c/8nuXTDO9/2338-future-order-issues

## 1.1.8

### Patch Changes

- _schedule_n1_a1: schedule_ctx argument instead of in_\minute_tick,ETAMax

## 1.1.7

### Patch Changes

- fix: \_schedule_n1_a: same_day preparation has ETAMax added to Start_ISO

## 1.1.6

### Patch Changes

- fix: \_schedule_n1_a: including close time as an availble schedule time

## 1.1.5

### Patch Changes

- fix: \_schedule_n1_a: multiple shifts: handle distinct blocks

## 1.1.4

### Patch Changes

- fix: \availability*ctx*: label: next available time

## 1.1.3

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: Restaurant Hours: multiple hour blocks

## 1.1.2

### Patch Changes

- fix: ShoppingCart: Availability: pass \minute_tick

## 1.1.1

### Patch Changes

- fix: ShoppingCart: add menu_cartitem: ETAMax_open_time > close_time: schedule time calculation

## 1.1.0

### Minor Changes

- ShoppingCart: \_schedule_n1_a: if start_time + ETAMax > end_time then start_time is the first available time

## 1.0.9

### Patch Changes

- restaurant_hours_cache: poll once every hour

## 1.0.8

### Patch Changes

- fix: ParamScheduleCtx_I: \$restaurant_hours

## 1.0.7

### Patch Changes

- ScheduleDayTime: display start time instead of time range

      	https://trello.com/c/7H8qjcar/2328-future-order-issues-modification

## 1.0.6

### Patch Changes

- ShoppingCart: \_schedule_n1_a: add ETAMax_milliseconds to the start date

      	https://trello.com/c/LxUTUcXm/2318-future-order-modification-1

## 1.0.5

### Patch Changes

- fix: minute_tick + ETAMax \* minute_milliseconds: instead of minute_tick + hour_milliseconds
- fix: \availability*ctx*: takes restaurant_hours: wip: ETAMax buffer froms opening time

## 1.0.4

### Patch Changes

- fix: ScheduleDayTime: change schedule_n0_a1_idx: change schedule_n1_a1_idx: preserve same time or 0 if time not
  available in schedule_n1_a

## 1.0.3

### Patch Changes

- \_schedule_ctx: schedule_n1_a1_idx: defaults to 0,remove -1 default index

## 1.0.2

### Patch Changes

- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: .restaurant-status: update with \minute_tick

## 1.0.1

### Patch Changes

- fix: /checkout: ShoppingCart: reload page: schedule time
