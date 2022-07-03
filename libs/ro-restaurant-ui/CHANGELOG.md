# @menus/ro-restaurant-ui

## 1.16.40

### Patch Changes

- CheckBox,Radio: inline styles

## 1.16.39

### Patch Changes

- fix: SubscriptionCheckoutModal: xs: button layout

## 1.16.38

### Patch Changes

- SaveCouponModal: .modal-body: padding-bottom: 96px

## 1.16.37

### Patch Changes

- fix: .modal-footer,MapCustomerRouteModal: xs: footer position: position: fixed

      https://trello.com/c/H7b98V3h/2585-sap24

## 1.16.36

### Patch Changes

- fix: MapCustomerRouteModal: .modal-footer: button position

      https://trello.com/c/XBbipz2M/2584-sap23

## 1.16.35

### Patch Changes

- fix: .modal-footer: button layout

      https://trello.com/c/Z4GEm26k/2581-web-issue4

## 1.16.34

### Patch Changes

- fix: .fa > \*: font-family: lato-black

      https://trello.com/c/7aFh5k0H/2579-sap18

## 1.16.33

### Patch Changes

- fix: FinReportTab: fin_sales_orders_chart_canvas: labels

## 1.16.32

### Patch Changes

- fix: cordova: window.open: url
- fix: ManageRestaurant: loading: full height

## 1.16.31

### Patch Changes

- fix: Signup,SubscriptionCheckoutModal: cordova: + window.open: \_system

## 1.16.30

### Patch Changes

- Menu option layout fixes,Menu header layout fixes

      https://trello.com/c/RGZ99NcZ/2529-spa-modification1

## 1.16.29

### Patch Changes

- fix: Print Report: cordova integration

## 1.16.28

### Patch Changes

- fix: FinReportTab: .fin-report-search: line up with input
- modile: cordova: download Export

## 1.16.27

### Patch Changes

- backoffice: phone button layout

## 1.16.26

### Patch Changes

- fix: ManageRestaurant: initial value: page\$: default to 1

## 1.16.25

### Patch Changes

- fix: CheckBox: display: inline-flex

      CouponsTab

## 1.16.24

### Patch Changes

- EditTab,MenusTab,FinReportTab,FinStatementTab: layout improvements

## 1.16.23

### Patch Changes

- fix: SubscriptionCheckoutModal: use @menus/ro-restaurant-ui: SavePaymentMethodModal

## 1.16.22

### Patch Changes

- fix: RestInfoTab: API_RESTAURANT_image_del: update ui

## 1.16.21

### Patch Changes

- fix: hoisting issue: use target: es2019

## 1.16.20

### Patch Changes

- 402b46c07: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: OrdersTab_load_orders_tab() without having to load
  OrdersTab
- /backoffice/manage-restaurant/[fireFlyID]/_ extracted from ?tab=_

## 1.16.19

### Patch Changes

- fix: ManageRestaurant_c: redundant load_data issue

## 1.16.18

### Patch Changes

- fix: RestInfoTab: load issue: $ro_restaurant$ is falsy

## 1.16.17

### Patch Changes

- fix: SubscriptionCheckoutModal: load error

## 1.16.16

### Patch Changes

- AccountInformationTab: Save button: only visible when editing from toggle_edit

      	    https://trello.com/c/TiRKBBzm/2483-account-page-modification

## 1.16.15

### Patch Changes

- new menu logo on printed pages

      	    https://trello.com/c/pg65tij8/2485-change-menus-logo-on-prints

## 1.16.14

### Patch Changes

- fix: FinStatementTab: .fin-statments-search .btn: .btn-xlg

## 1.16.13

### Patch Changes

- extra toggle_edit

## 1.16.12

### Patch Changes

- fix: AccountInformationTab: toggle_edit switch

## 1.16.11

### Patch Changes

- AccountInformationTab:

      	    toggle_edit: clear: AccountNumber,RoutingNumber,TIN,Braintree_Onboard_Status
      	    AccountNumber,RoutingNumber,TIN: validation: number with {9,10} digits
      	    https://trello.com/c/5aeMTyVS/2442-modifications-on-account-info-page

## 1.16.10

### Patch Changes

- RestContractModal: Type of Business: Segment/Cuisine

      	    https://trello.com/c/oJLyCvWG/2354-required-items-on-rest-contract-page

## 1.16.9

### Patch Changes

- RoRestaurant_I: Checkout_Message,Show_Checkout_Message instead of Segment_Message,Show_Segment_Message

## 1.16.8

### Patch Changes

- RestInfoTab: + Show_Checkout_Message,Checkout_Message

## 1.16.7

### Patch Changes

- fix: /backoffice/manage-restaurant/DIZ010?tab=finstatement: Print button

## 1.16.6

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=finreport: remove text artifact

      	    https://trello.com/c/JNDudrmc/2458-issues-on-page

## 1.16.5

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]: !$ro_restaurant$.NotificationOnScheduledOrder: disable On Scheduled Order
  checkboxes

## 1.16.4

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: FaxOnScheduledOrder: width

## 1.16.3

### Patch Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]?tab=orders,/backoffice/manage-restaurant/[fireFlyID]
  /order-details/[OrderID]: + OrderTransitionUI

      	    https://trello.com/c/agmnr4NJ/2457-modification-on-order-page

## 1.16.2

### Patch Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]: \*OnScheduledOrder: + OnScheduledOrderMinutes input

## 1.16.1

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]: Delivery Settings below Order Settings
- /backoffice/manage-restaurant/[fireFlyID]: merge ASAP_Order_Settings_label & Scheduled_Order_Settings_label into
  Order_Settings_label

## 1.16.0

### Minor Changes

- feat: Banking Information section: editable with a single toggle: values are cleared when edit mode toggled

      	    @menus/web,@menus/ro-restaurant-ui

### Patch Changes

- fix: Save: Status: error: notyf_error

      	    @menus/web,@menus/ro-restaurant-ui

## 1.15.0

### Minor Changes

- \_Ctx interfaces

## 1.14.53

### Patch Changes

- fix: ChartMenuCompetition_c,ChartMissingMenu_c,ItemCompareChart_c: double call to load_data onMount issue

## 1.14.52

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=rest-info: Delivery/Catering Charge (\$): DeliveryCharge_errors: not
  required

## 1.14.51

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=charts: ChartsTag_c: expect marker.RestLogo to be an absolute url

      	    https://trello.com/c/LF35fPCa/2426-rest-logo-doesnt-show-up

## 1.14.50

### Patch Changes

- - get

## 1.14.49

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=rest-info: rest_Name: \$is_vendor_admin_role can edit

      	    https://trello.com/c/570pxZON/2425-modification-on-rest-info-page

## 1.14.48

### Patch Changes

- /backoffice/manage-restaurants/[fireFlyID]?tab=rest-info: remove disabled when !\$restaurant.Enabled

      	    rollback fbe252fe60f285a99e3cc6caf9a750aad42c3c6e

## 1.14.47

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=rest-info: Name (can not be changed)

      	    https://trello.com/c/XCGiGjJB/2417-modification

- /backoffice/manage-platform?tab=rest-info: Date of Birth: maxDate: 13 years ago

      	    https://trello.com/c/XCGiGjJB/2417-modification

## 1.14.46

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[HeadingID]
  /menu-item-details/[MenuItemID]: loading
- readable$_C,writable$\_C: store is defined in class

## 1.14.45

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=rest-info: !\$restaurant.Enabled: disable editing fields

      	    https://trello.com/c/Ao6Jds07/2418-message-to-show-up

## 1.14.44

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: Upload Restaurant Image: success: refresh image

## 1.14.43

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=account-information: explanation

      	https://trello.com/c/iMW83q4q/2396-account-information-page

## 1.14.42

### Patch Changes

- fix: /backoffice/manage-restaurant: $page,$pageSize values set from $query_page,$query_pageSize

## 1.14.41

### Patch Changes

- SaveCouponModal: Select Dates: - (optional)

      	https://trello.com/c/Z8RM8t1T/2400-backend-issue-modification2

- /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: \$MenuItems_is_open: .action-buttons: visibility: hidden

      	https://trello.com/c/Z8RM8t1T/2400-backend-issue-modification2

## 1.14.40

### Patch Changes

- range_date->date_range
- /backoffice/manage-restaurant/DIZ010?tab=coupons: SaveCouponModal: Select Dates: + \required*errors*

      	https://trello.com/c/iIlZrWb2/2374-issues-on-backoffice1

## 1.14.39

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: New Coupon instead of New RoCoupon

## 1.14.38

### Patch Changes

- /backoffice/manage-restaurant/DIZ010?tab=coupons: Select: dropdown goes over buttons
- /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: SaveCouponModal: !\$can_update_coupon: hide clear

      	https://trello.com/c/v5YpCkP0/2397-ddd

- /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: Daily Start Time,Daily End Time

      	https://trello.com/c/v5YpCkP0/2397-ddd

## 1.14.37

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: Select: \$MenuItems: open in readonly mode

      	https://trello.com/c/v5YpCkP0/2397-ddd

## 1.14.36

### Patch Changes

- fix: ChartMissingMenu,ItemCompareChart: Horizontal Chart
- ChartType_values: - ChartType_bubble

## 1.14.35

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=charts: tooltip popup

## 1.14.34

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: compare numeric field validations

      	https://trello.com/c/iIlZrWb2/2374-issues-on-backoffice1

## 1.14.33

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=coupons

      	https://trello.com/c/iIlZrWb2/2374-issues-on-backoffice1

- /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: .CouponCode.header: + title attribute (popup)

## 1.14.32

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: tile layout
- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: Save Coupon: refresh coupon data

      	    https://trello.com/c/iIlZrWb2/2374-issues-on-backoffice

## 1.14.31

### Patch Changes

- fix: /backoffice/manage-restaurant/{fireFlyID}: Add Delivery Zone button visibility

      	    https://trello.com/c/jzK1ucUr/2372-on-the-rest-info-page-i-can-not-find-add-delivery-zone-button

## 1.14.30

### Patch Changes

- reduce spacing to allow more information density

## 1.14.29

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: DISCOUNT_TYPE_AMOUNT: Min. Order must be > Discount

      	https://trello.com/c/F7EG8JBH/2359-surprised-case

## 1.14.28

### Patch Changes

- timeout is 30 seconds instead of 10 seconds

## 1.14.27

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: pressing quickly Enable tab multiple times: coupon spinner
  should disappear

## 1.14.26

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: cell height

## 1.14.25

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=coupons

## 1.14.24

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=RestInfo: Restaurant schedule dates: remove minutes field

      	https://trello.com/c/aCs1za7a/2340-modification-on-info-page

## 1.14.23

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=RestInfo: (Minutes) label

## 1.14.22

### Patch Changes

- fix: ios: .modal-footer: padding-bottom for ios

## 1.14.21

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=charts

## 1.14.20

### Patch Changes

- disable Fax On New Order

      	    https://trello.com/c/i3UBicoi/2280-hide-the-fax-for-now

## 1.14.19

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]: disable WaivedDeliveryCharge

      	    https://trello.com/c/vuAIAJ4q/2279-hide-wave-delivery-fee-for-now

## 1.14.18

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=coupons: short window: scrolling

      	    https://trello.com/c/peDqIkZz/2270-coupon-page-error

## 1.14.17

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]/order-detail/[orderID]: more detailed Delivery message on bottom line

      	    https://trello.com/c/yB7Mc9SX/2260-modification-on-order-page

## 1.14.16

### Patch Changes

- /checkout: SubscriptionCheckoutModal: \$0.3

## 1.14.15

### Patch Changes

- fix: /backoffice/manage-restaurant/DIZ001?tab=restinfo: error

## 1.14.14

### Patch Changes

- fix: dangling promises: subscribe_wait_timeout instead of subscribe_wait_for

## 1.14.13

### Patch Changes

- fix: page navigation wrt query & params, restaurant page

## 1.14.12

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=charts: View Menu link

      	    https://trello.com/c/R6KmBJsc/2090-issue-on-menu-sense

## 1.14.11

### Patch Changes

- /checkout: ThankYouOrderModal: \$place_order_errors: render API_error_type payload Message

## 1.14.10

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: .restaurant-right-nav.fixed-nav: top: 185px

## 1.14.9

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=finstatement: link to order details

## 1.14.8

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=finstatement: Print: narrower table

      	    https://trello.com/c/leqD3Noq/2158-financial-statement-print-issue

## 1.14.7

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: Save: omit FileName to satisfy WAF
  AWS#AWSManagedRulesCommonRuleSet#GenericR

      	    see https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-list.html

## 1.14.6

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: Save: omit FileName to satisfy WAF
  AWS#AWSManagedRulesCommonRuleSet#GenericRFI_BODY rule

      	    see https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-list.html

## 1.14.5

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: DeliveryCompany: Delivery/Catering Time (Min)
  /Delivery/Catering Time (Max): enabled

      	    https://trello.com/c/I0nUts8W/2109-delivery-by-the-third-party

## 1.14.4

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: edit existing RestHour

      	    https://trello.com/c/rCHM1Q2M/2156-rest-info-page-bug-on-time-tables

## 1.14.3

### Patch Changes

- fix: /backoffice/manage-restaurant/[FFID]?tab=restinfo: Delivery/Catering Hours: disable when no_delivery

      	    https://trello.com/c/QxG7HEZo/2155-switch-to-no-delivery-all-fields-in-rest-info-page-will-be-disable

## 1.14.2

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: No Delivery,DeliveryCompany: hours should be enabled

      	    https://trello.com/c/QxG7HEZo/2155-switch-to-no-delivery-all-fields-in-rest-info-page-will-be-disable

## 1.14.1

### Patch Changes

- fix: loading menu item images: ∋ \_api_src

## 1.14.0

### Minor Changes

- feat: RestInfoTab: Delivery Type: + DeliveryCompany

      	    https://trello.com/c/I0nUts8W/2109-delivery-by-the-third-party

## 1.13.2

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: Delivery/Catering Charge (\$): always disabled

      	    https://trello.com/c/8Suynl2l/2106-modification-on-delivery-charge

## 1.13.1

### Patch Changes

- fix: /backoffice/manage-platform: Delivery/Catering Minimum Order (\$),Waived Delivery Charge (%): disable with No
  Delivery Delivery Mode

      	    https://trello.com/c/ufHM3CoZ/2107-no-delivery-modifications

## 1.13.0

### Minor Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=restowner: Delivery/Catering Minimum Order (\$),Waived Delivery Charge (
  %): disabled if DeliveryModeID === DELIVERY_MODE_RESTOWNER

      	    https://trello.com/c/fFxGOHUx/2108-delivery-by-rest-owner-modifications

## 1.12.6

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: Waived Delivery Charge (%)

      	    https://trello.com/c/8Suynl2l/2106-modification-on-delivery-charge

- 9ee4f2db3: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: Delivery/Catering Charge (\$): enabled even if
  Delivery Type is No Delivery

      	    https://trello.com/c/8Suynl2l/2106-modification-on-delivery-charge

- /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: Delivery by delivery company

      	    https://trello.com/c/8Suynl2l/2106-modification-on-delivery-charge

- /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: Delivery/Catering Minimum Order (\$)

      	    https://trello.com/c/8Suynl2l/2106-modification-on-delivery-charge

## 1.12.5

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: remove navigation headers: Working Hours,Delivery

      	    https://trello.com/c/rjxyVl7O/2110-right-side-navigation-modifications

## 1.12.4

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: disabled Delivery Zone table

      	    https://trello.com/c/ufHM3CoZ/2107-no-delivery-modifications

## 1.12.3

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: remove duplicate Delivery Zone

      	    @menus/web,@menus/ro-restaurant-ui

## 1.12.2

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: Delivery Settings moved to the bottom

      	    https://trello.com/c/R9WHEwJS/2105-delivery-settings-modifications

## 1.12.1

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: Working Hours (Dine-in/Pickup),Delivery/Catering Hours

      	    https://trello.com/c/rjxyVl7O/2110-right-side-navigation-modifications

## 1.12.0

### Minor Changes

- feat: /backoffice/manage-restaurant?tab=restinfo: Delivery Type: No Delivery: disable delivery-related fields

      	    https://trello.com/c/ufHM3CoZ/2107-no-delivery-modifications

## 1.11.4

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: DeliveryTime_Max,PickupTime_Max: must be greater than Min
  value

      	    https://trello.com/c/Pa44hCTg/2102-pick-up-delivery-time-validation

## 1.11.3

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: \$restaurant.Enabled label: display correct text

## 1.11.2

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=finstatement: Generate Statement

      	    https://trello.com/c/ncNOstCa/2074-generate-statement-is-not-working-for-selected-dates

## 1.11.1

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo

      	    https://trello.com/c/bY8teXPb/2075-info-page-modification

## 1.11.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]?tab=charts: chart links: open url in new tab

      	    https://trello.com/c/ExgZorER/2061-open-i

## 1.10.9

### Patch Changes

- fix: /backoffice/manage-restaurant/DIZ001?tab=charts: limit api calls to API_CHARTS_menucompetition_payload

## 1.10.8

### Patch Changes

- fix: /backoffice/manage-restaurant/DIZ003?tab=orders: cancel filter

      	    https://trello.com/c/xPzrN1kp/2058-orerr

## 1.10.7

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/dishes/[other_fireFlyID]: use $query_fireFlyID instead of
	$params_fireFlyID

      	    https://trello.com/c/LaLao7g7/2050-menusense-link-is-not-working

## 1.10.6

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=charts: ItemCompareChart: /backoffice/manage-restaurant/[fireFlyID]
  /menu-items

## 1.10.5

### Patch Changes

- 64bd7fc09: RestInfoTab: Delivery Charge ($),Waived Delivery Charge (%) = $num: separate lines

## 1.10.4

### Patch Changes

- /backoffice: kitchen user: restaurant tabs: only show links to pages that the kitchen user has access to

      	    https://trello.com/c/zGmdhsUo/2036-back-office-user-level

## 1.10.3

### Patch Changes

- fix: shopping cart: add quantity to an existing menuitem

## 1.10.2

### Patch Changes

- update dependencies

## 1.10.1

### Patch Changes

- Delivery zone text modification: + /Catering

      	    https://trello.com/c/vaZj5GCM/2029-delivery-zone-text-modification

## 1.10.0

### Minor Changes

- feat: /backoffice/manage-platform: Service Types: Default Service Type

      	    https://trello.com/c/ljV3N32v/2014-service-type-default

## 1.9.1

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]: App Store/Google Play Description

      	    https://trello.com/c/7PObl4In/2006-modification-on-rest-side

## 1.9.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]: Delivery Zone: Service Type column

      	    https://trello.com/c/66QTqzap/2009-modification-on-rest-backend

## 1.8.2

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]: upload image: uploaded image should be rendered

      	    https://trello.com/c/3Plyyzl9/2008-rest-information-issue

## 1.8.1

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=charts: show menus

## 1.8.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]: MULTISIZE
  tab: all sizes are not Active: menuitem is saved as not Active

      	    https://trello.com/c/7zElfPuN/2003-bug-on-menuitem-creation

## 1.7.4

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]: multisize
  menuitem: Activation: must have at least one size which is enabled

      	    https://trello.com/c/7zElfPuN/2003-bug-on-menuitem-creation

## 1.7.3

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]: singlesize
  menuitem not showing upin list after save fix: /backoffice/manage-restaurant/[fireFlyID]
  /menu-details/[MasterheadingID]/category-details/[headID]: add new multisize menuitem: add size: navigate back to ITEM
  INFO: MULTI SIZE content still there

      	    https://trello.com/c/7zElfPuN/2003-bug-on-menuitem-creation

## 1.7.2

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=charts: hide charts if there are no \$other_rests

      	    https://trello.com/c/iv4uTbC9/1945-menusense

## 1.7.1

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]
  /menu-item-details/[menuitemID]: multisize: empty \$Menuoptionsizes: Name input should take full width

## 1.7.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]: creating
  singlesize menuitem redirects to /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]
  /category-details/[headID]

## 1.6.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]: New
  MultiSize order: goto saved order & open MULTISIZE tab

      	    https://trello.com/c/pYfkgOiK/1994-menuitem-page-issues

## 1.5.0

### Minor Changes

- 83047c837: feat: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]
  /menu-item-details/[menuitemID]: new menuitem: hide Multi Size & Options tabs
- feat: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]: Multi-Size
  Menu Item: error when no sizes defined

## 1.4.3

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]: refresh orders bar updating order list

## 1.4.2

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]: Change Subscription: Complete Order

## 1.4.1

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: Save: load RestContractModal

## 1.4.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]: ValidationMessages including CC auth error

### Patch Changes

- 5ec7c73eb: fix:
  /home/brian/work/menus/menus-angular-2-app-sapper/apps/web/src/routes/backoffice/manage-restaurant/[fireFlyID]
  /menu-details/[MasterheadingID]/category-details/[headID]/menu-item-details/[menuitemID]: Add Option: only a single
  Menuoptionitem can be the Default

## 1.3.6

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]
  /menu-item-details/[menuitemID]: intermittent page load issue

## 1.3.5

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]
  /menu-item-details/[menuitemID]: sort Menuoptionitems: rollback issue

## 1.3.4

### Patch Changes

- fix: /backoffice/manage-restaurant\*: overeager ERR_INVALID_ACCESS error notification

## 1.3.3

### Patch Changes

- fix: /backoffice/manage-restaurant?tab=menus: /a/m?qt=masterheading&act=list: ERR_INVALID_ACCESS: bounce to
  /backoffice/login or /backoffice/manage-restaurant

## 1.3.2

### Patch Changes

- /backoffice/manage-restaurant/[fireFlyID]: Delivery Change: issue: value populated on refresh

## 1.3.1

### Patch Changes

- fix: ERR_INVALID_ACCESS: logged in: redirect to /backoffice/manage-restaurant

## 1.3.0

### Minor Changes

- feat: /backoffice/manage-restaurant/[fireFlyID]: navigation links are red when section has a validation error

## 1.2.3

### Patch Changes

- a777e33f8: fix: /backoffice/manage-restaurant/[fireFlyID]: Address 2 field is optional: remove required validation

## 1.2.2

### Patch Changes

- ea6905eef: fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]
  /menu-item-details/[menuitemID]: displaying menuoption.Description
- 1793276fd: fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]
  /menu-item-details/[menuitemID]: Editing Menu Option: deep_clone issue
- 8ff84a488: /backoffice/manage-restaurant\*: ERR_INVALID_ACCESS: show error message

## 1.2.1

### Patch Changes

- 7af3907ef: fix: /backoffice/manage-restaurant/[fireFlyID]\*: when auth fails, redirect to /backoffice/login or
  /backoffice/manage-restaurant

## 1.2.0

### Minor Changes

- 1944fd3dd: optimistic concurrentcy sort

      	    /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]
      	    /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[headID]

### Patch Changes

- 0044bb161: fix: /backoffice/manage-restaurant/[fireFlyID]?tab=menus: Save button text when Masterheading already
  exists
- 0044bb161: fix: /backoffice/manage-restaurant/[fireFlyID]?tab=menus: Save dialog updates the listings when saved

## 1.1.1

### Patch Changes

- SubscriptionCheckoutModal: Complete Order validation error message: Unable to process your subscription request.
  Please add or validate your payment method.
- SubscriptionCheckoutModal: Button text "Add Payment Method" instead of "Add"

## 1.1.0

### Minor Changes

- hide compare chart when no \$other_restaurants are loaded

### Patch Changes

- fix: reloading ui when pushing to \$other_restaurants
