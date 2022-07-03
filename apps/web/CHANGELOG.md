# @menus/web

## 2.115.7

### Patch Changes

- update AWS_CERTIFICATE_ARN,LOCAL_AZ_AWS_CERTIFICATE_ARN

## 2.115.6

### Patch Changes

- PlatformIcon: a.PlatformIcon: + href=/

## 2.115.5

### Patch Changes

- bugfix: fixed add to cart button spacing issue

## 2.115.4

### Patch Changes

- RestInfoTab_OrderSettings: (Contact) On New Order switches are no longer dependent on Auto Accept New Order

      https://trello.com/c/o5RUtbtl/2618-auto-accept-logic-is-changed

## 2.115.3

### Patch Changes

- fix: SavePaymentMethodModal: Cancel button padding

      https://trello.com/c/K8kiwwGw/2616-billing-page-issues

- fix: Billing: show Transactions tab content: Transactions tab is still hardcoded

      https://trello.com/c/K8kiwwGw/2616-billing-page-issues

- fix: SavePaymentMethodModal: .action-buttons: layout

      https://trello.com/c/K8kiwwGw/2616-billing-page-issues

## 2.115.2

### Patch Changes

- fix: Restaurant_Menuitems: .restaurant-headings-menu: .show-mobile: placement

      https://trello.com/c/rN7HsNZc/2615-customer-webmobile-issue

## 2.115.1

### Patch Changes

- Marketing: is_cordova_app: Print available in web only

## 2.115.0

### Minor Changes

- feat: /backoffine/download

### Patch Changes

- fix: print: cordova

## 2.114.11

### Patch Changes

- print: cordova: ios: base64://

      https://trello.com/c/OxDRxidW/2609-android-and-ios-app-issues

## 2.114.10

### Patch Changes

- fix: Marketing: cordova: print

## 2.114.9

### Patch Changes

- fix: print Android/IOS pdf

      https://trello.com/c/OxDRxidW/2609-android-and-ios-app-issues

- RestInfoTab_OnScheduledOrder,RestInfoTab_OrderSettings,CheckBox: + text_bold

      https://trello.com/c/tOnT19Jn/2608-menu-backoffice-modifications

- fix: MANAGE_PLATFORM_PAGE access: super admin & vendor admin should always have access

      https://trello.com/c/uExtiZr2/2612-super-admin-doesnt-have-access-to-manage-platforms

## 2.114.8

### Patch Changes

- fix: android printing: use file system to print instead of base64

## 2.114.7

### Patch Changes

- fix: mobile navigation menu: query_mobile_menu_opened\$\_b

## 2.114.6

### Patch Changes

- ro_auth_redirects: + MANAGE_PLATFORM_PAGE_LINK: restaurant owner with ShowPlatformMenu: false: show Manage Platform link but don't allow access to Manage Platform page

      https://trello.com/c/O6qHIfCC/2606-platform-access

## 2.114.5

### Patch Changes

- fix: ItemInfoTab: Show In Gallery: MenuImageExist must be true
- AppConfiguration_Features: default_Flyer_Title,default_Flyer_SubTitle: set when Flyer_Title,Flyer_SubTitle is falsy onMount

## 2.114.4

### Patch Changes

- AppConfiguration_Features: Flyer_Title,Flyer_SubTitle: default text,maxlength

      https://trello.com/c/pDkh0LDz/2607-marketing-modification

## 2.114.3

### Patch Changes

- fix: manage_platform_no_active_restaurant$_b: manage_platform_settings$ edited with same PublicKey: multiple calls to fetch_search_menus_menu
- /backoffice/marketing: To modify Flyer, visit Manage Platform
- fix: .item-marketing: .icon: background image

## 2.114.2

### Patch Changes

- fix: AppConfiguration_Features: upload,delete

      https://trello.com/c/7H0Tnosw/2605-marketing-issues

- fix: restaurant owner: /backoffice/marketing access

      https://trello.com/c/7H0Tnosw/2605-marketing-issues

- AppConfiguration_Features: + To review and print Flyer visit Marketing

      https://trello.com/c/7H0Tnosw/2605-marketing-issues

- fix: ItemInfoTab: #menuitem_sizing ValidationMessages: placement
- fix: ItemInfoTab: CheckBox: layout

## 2.114.1

### Patch Changes

- fix: /backoffice/marketing: page loading

## 2.114.0

### Minor Changes

- /backoffice/marketing

## 2.113.111

### Patch Changes

- fix: SizeTab: new ro_menuitem: infinite spinner: ro_menuoptionsizes$_b: params_MenuItemID$.\$ is a number: return []

## 2.113.110

### Patch Changes

- fix: SizeTab: flash of You can choose multiple sizes

## 2.113.109

### Patch Changes

- fix: ValidationMessages: input_tooltip

      https://trello.com/c/G4kgtxP9/2604-issues

## 2.113.108

### Patch Changes

- fix: MenusTab: width: 691px: .controls in a single row

      https://trello.com/c/6n1PrvkV/2603-spa29-responsive-issue-for-resolution-762-1258

- fix: MenusTab: 691px width: service-type placements

      https://trello.com/c/6n1PrvkV/2603-spa29-responsive-issue-for-resolution-762-1258

## 2.113.107

### Patch Changes

- SizeTab: Add/Cancel buttons over Select Size

      https://trello.com/c/HhBdwepV/2591-sap25

## 2.113.106

### Patch Changes

- fix: RestContractModal: Segment,Cuisine label,select: layout

## 2.113.105

### Patch Changes

- fix: RestInfoTab: restContractModal\$: should only open when !ro_restaurant.Terms: remove previous debugging logic

## 2.113.104

### Patch Changes

- fix: OptionTabSearch: xs: .btn width
- fix: HeadingDetails: xs,sm: CheckBox ValidationMessages: placement

      https://trello.com/c/Q4HUPT2y/2593-sap26-responsive-issue-for-resolution-762-1258

- fix: OptionTab,HeadingDetailsList: Delete: text-align: right

      https://trello.com/c/Q4HUPT2y/2593-sap26-responsive-issue-for-resolution-762-1258

- fix: MasterheadingDetails: 764x1258: layout

      https://trello.com/c/Q4HUPT2y/2593-sap26-responsive-issue-for-resolution-762-1258

## 2.113.103

### Patch Changes

- CheckBox,Radio: inline styles
- fix: RestInfoTab: Save button: in line with content
- fix: RestContractModal: CheckBox styling

      https://trello.com/c/d8i4VE4K/2594-sap27-android-device-issues

- fix: Print Terms of Service,Print Privacy Policy: android: print

      https://trello.com/c/d8i4VE4K/2594-sap27-android-device-issues

## 2.113.102

### Patch Changes

- AccountInformationTab: save: set banking_info_editing$.$ = false
- fix: is_navigating\$: + start: infinite spinner bugs: timeout for is_navigating
- fix: is_navigating_onclick_b: !is_hash_routing: infinite spinner

## 2.113.101

### Patch Changes

- ix: is_navigating_onclick_b: hbr,cordova: infinite spinner when navigating to current url

      https://trello.com/c/DGklknFS/2596-sap28

## 2.113.100

### Patch Changes

- SizeTab: .pizza-placeholder: less padding-top,padding-bottom

## 2.113.99

### Patch Changes

- fix: MenuitemDetails,SizeTab: xs: layout issues
- AccountInformationTab: save: reload data

      https://trello.com/c/zoySe2T4/2592-general-modifications

- AppConfiguration_Icons: validation errors with $App_Icon_errors$,$App_Splash_errors$: should not block form submission

      https://trello.com/c/zoySe2T4/2592-general-modifications

- ItemInfoTab: .menu-item-details .btn: xs: min-width: fits on screen
- fix: HeadingDetailsList: .action-buttons: xs: layout
- fix: ManagePlatform: save: apply_rules_platform_settings: should not set Enable_Cuisine_Filter,Enable_Points to false

      https://trello.com/c/zoySe2T4/2592-general-modifications

- fix: AppConfiguration: .action-buttons: padding lines up with rest of content

## 2.113.98

### Patch Changes

- remove only California restriction

## 2.113.97

### Patch Changes

- fix: is_navigating_onclick: hbr: same href: no navigation

      https://trello.com/c/DGklknFS/2596-sap28

## 2.113.96

### Patch Changes

- wip: multi-location platforms: convert filters to be driven by page_query\$ params

## 2.113.95

### Patch Changes

- fix: SizeTab: on:itemclick

## 2.113.94

### Patch Changes

- fix: /: multi-restaurant: navigation to /search
- fix: SizeTab: navigation & animation glitches

## 2.113.93

### Patch Changes

- fix: Breadcrumb: remove extra / prefix

## 2.113.92

### Patch Changes

- fix: MenuitemDetails,HeadingDetails,ItemInfoTab: use Is_Single_Size to determine if the ro_menuitem is multi-size

## 2.113.91

### Patch Changes

- fix: RestaurantCard: render RestImage
- fix: /search: sync MenuGrid,RestGrid with MapView center location: use search_menuitem_a\$

## 2.113.90

### Patch Changes

- fix: /search: SearchDishTypes: .active

## 2.113.89

### Patch Changes

- fix: MapView_c: menuType
- MapView: fitBounds: + padding

## 2.113.88

### Patch Changes

- fix: platform with multiple restaurants: /: redirect to /search: + query params
- fix: server: too many /gps api requests: gps\$ should only be loaded for svelte page routes

## 2.113.87

### Patch Changes

- fix: /search: + Search_ServiceTypeNav: + serviceType

## 2.113.86

### Patch Changes

- fix: RoMainDashboard: .page-title-text: should not take entire line for goBack links: display: inline-block

      https://trello.com/c/DbOdXmBh/2589-menuitem-issue

## 2.113.85

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[HeadingID]/menu-item-details/[MenuItemID]: redirect

## 2.113.84

### Patch Changes

- fix: RestInfoTab: Photo upload: image validation: width >= height

      https://trello.com/c/XHovKv1e/2590-upload-rest-logo-issue

## 2.113.83

### Patch Changes

- wip: multi-restaurant consumer search

## 2.113.82

### Patch Changes

- ItemInfoTab: address navigation issues: .ItemInfoTab always present
- OptionTab: address navigation issues: !$is_navigating$ required to render content

## 2.113.81

### Patch Changes

- fix: RestInfoTab: API_RESTAURANT_image_upload: validation: width & height should be equal
- SizeTab: address infinite scroller when navigating goBack()

      https://trello.com/c/7POFcL55/2588-issues

## 2.113.80

### Patch Changes

- fix: SubscriptionCheckoutModal: xs: button layout

## 2.113.79

### Patch Changes

- fix: MapView: build

## 2.113.78

### Patch Changes

- ItemInfoTab: #menuitem_sizing: Singlesize,Multisize: ValidationMessages: positioning
- fix: SizeTab: back button: flash of content: You can choose multiple sizes
- Bootstrap: xs: explicit &.xs-shrinkt to set min-width: 100px
- fix: EditRestaurant: .sticky-header: .sidebar-opened: xs: full width
- SaveCouponModal: .modal-body: padding-bottom: 96px

## 2.113.77

### Patch Changes

- fix: Select: placeholder prop
- fix: AppConfiguration_Icons: download: dir.getFile
- RestInfoTab_RestaurantDetails: + validation: 1020x1024

      https://trello.com/c/UBh5AfAl/2587-web-issue

## 2.113.76

### Patch Changes

- fix: RestInfoTab: .photo-viewer: tall photos overflow

      https://trello.com/c/UBh5AfAl/2587-web-issue

## 2.113.75

### Patch Changes

- OrdersTab_OrderList: .no_orders_in_process: iphone 5: text obscured by background image: + .background: opacity: 0.2

## 2.113.74

### Patch Changes

- Signup_STEP_REST_LIST_restaurant_name_modal: populate restaurant list when .restaurant-name-input is blank

## 2.113.73

### Patch Changes

- ro_request\_\_b: no require login when requestData.authcode & requestData.uid are present
- fix: Signup_STEP_SET_PASSWORD: Continue: spinner timeout: API_USER_pass: ignoreLogin

## 2.113.72

### Patch Changes

- Signup: Signup*STEP_SET_PASSWORD: Confirm Password: remove password_errors*
- fix: Signup: API_REGISTRATION_register: send token

## 2.113.71

### Patch Changes

- fix: Signup: verification code step
- Signup_STEP_REST_LIST: .signup-section: less left/right padding
- fix: Signup_STEP_REST_LIST: .restaurant-name-input: xs: width
- fix: Grecaptcha: xs: too large: overflow: hidden

## 2.113.70

### Patch Changes

- OrdersTab_OrderList: no orders: background: french-bistro icon

      https://trello.com/c/nvMDLVJI/2586-order-page-modification

- /backoffice/manage-restaurant/[fireFlyID]/menu-details/[MasterheadingID]/category-details/[HeadingID]/menu-item-details/[MenuItemID]: ./info,./size,./option routes
- OrdersTab_OrderList: always show Today,Scheduled Orders tabs;when 0 orders, show "No orders in process"

      https://trello.com/c/nvMDLVJI/2586-order-page-modification

- fix: RoMenuOptionModal: xs: size price layout

## 2.113.69

### Patch Changes

- fix: MenusTab: xs: prevent overflow: Add Menu
- OrdersTab_OrderList: .OrderTransitionUI .action-buttons: not full width: display: block

      per Hooman

- fix: ios: offline error handling
- fix: Signup: xs: Please enter your restaurant name: use modal: + Signup_STEP_REST_LIST_restaurant_name_modal

## 2.113.68

### Patch Changes

- OrdersTab: no sort by Is_Ready

      https://trello.com/c/H7b98V3h/2585-sap24

- fix: .modal-footer,MapCustomerRouteModal: xs: footer position: position: fixed

      https://trello.com/c/H7b98V3h/2585-sap24

## 2.113.67

### Patch Changes

- fix: ResetPassword: confirm*password: error message overflow: remove password_errors*

      https://trello.com/c/SY4CHJgp/2541-general-issue2

- fix: layout: sm
- fix: AppConfiguration_Features: #Points_Name,#DefaultView: auth

      https://trello.com/c/SY4CHJgp/2541-general-issue2

- fix: /checkout: Proceed to Checkout: error

## 2.113.66

### Patch Changes

- fix: /search: search_menus_menu_payload\$: no query params: show all
- fix: AppConfiguration_Main: Public Key field: fa-copy: size
- fix: /restaurant/[serviceType]/[cuisine]/[name]/[fireFlyID]: timeout error

## 2.113.65

### Patch Changes

- connection error: persistent notification while there is a connection issue

      https://trello.com/c/d5D0JdvM/2532-backoffice-spa-web-internet-discounted-notification

## 2.113.64

### Patch Changes

- fix: backoffice-spa: navigation: scroll to the top
- fix: EditRestaurant: .page: unwanted scolling

## 2.113.63

### Patch Changes

- fix: aws lambda: server

## 2.113.62

### Patch Changes

- .action-buttons: xs instead of sm: display: flex
- fix: HeadingDetails: save Enabled: invalidate & refresh API_MENUS_masterheading_list_payload\$

      https://trello.com/c/JNwItfin/2549-general-issue-active-de-active-menu-menuitem-option

## 2.113.61

### Patch Changes

- fix: Login,consumer*request_url*: pcpk query attribute

## 2.113.60

### Patch Changes

- POINTS_FEATURE: super admin only

      https://trello.com/c/SY4CHJgp/2541-general-issue-reset-pass

## 2.113.59

### Patch Changes

- fix: Password,ResetPassword,Signup_step_3,Edit_Ro_User_Modal

      https://trello.com/c/YFcVKimQ/2538-general-issue-add-user

## 2.113.58

### Patch Changes

- fix: Edit_Ro_User_Modal: Add User Button,profile count,.users-list: layout

## 2.113.57

### Patch Changes

- fix: MapCustomerRouteModal: .modal-footer: button position

      https://trello.com/c/XBbipz2M/2584-sap23

## 2.113.56

### Patch Changes

- fix: RestInfoTab_DeliveryHours,Settings,UserAddresses

      https://trello.com/c/OOu1XNyb/2583-sap22

- RestInfoTab_RestaurantDetails: Upload/Remove buttons: layout

      https://trello.com/c/OOu1XNyb/2583-sap22

- fix: OrderDetails: .order-details-list .table: layout

      https://trello.com/c/OOu1XNyb/2583-sap22

## 2.113.55

### Patch Changes

- fix: navigation due to preload issue

## 2.113.54

### Patch Changes

- fix: ConfirmModal: .footer .btn: layout

      https://trello.com/c/OOu1XNyb/2583-sap22

- fix: RoHome: .login-link: .profile-icon: position

      https://trello.com/c/OOu1XNyb/2583-sap22

## 2.113.53

### Patch Changes

- fix: /backoffice/manage-restaurant/[fireFlyID]: redirect: no orders: redirect to RestInfoTab

      https://trello.com/c/cUXw9Ayd/2547-generalmodification

## 2.113.52

### Patch Changes

- fix: ItemInfoTab: md: layout

      https://trello.com/c/qF6AUscI/2582-sap21

- fix: HeadingDetailsList: md: layout

      https://trello.com/c/qF6AUscI/2582-sap21

## 2.113.51

### Patch Changes

- fix: OptionTab: table: md: layout
- fix: .modal-footer: button layout

      https://trello.com/c/Z4GEm26k/2581-web-issue4

- fix: Signup: .SupportContactDialog: md: bottom full width
- fix: Signup_STEP_ZIPCODE: zip code: short: focus: move to top

      https://trello.com/c/X0vlZTM5/2555-sap14

- RoMenuOptionModal: select: border: \$gray

      https://trello.com/c/7aFh5k0H/2579-sap18

- fix: HeadingDetailsList: table: sm: layout
- fix: OrdersTab: md: scrolling issue

      https://trello.com/c/hf4aYGXn/2545-sap9

- fix: Signup_STEP_REST_LIST: short clients: bump input & dropdown to top

      https://trello.com/c/sNhuQDo5/2574-sap15

## 2.113.50

### Patch Changes

- fix: MenusTab: .row width
- fix: .fa > \*: font-family: lato-black

      https://trello.com/c/7aFh5k0H/2579-sap18

- MasterheadingDetails: .menu-info-table: xs: + .table-responsive
- OptionTab: xs: - padding-top
- .table-responsive-xs,.table-responsive-sm,.table-responsive-md: extracted from .table-responsive
- fix: SaveMasterheadingModal: md +: layout

      https://trello.com/c/7aFh5k0H/2579-sap18

- fix: HeadingDetailsList: md: layout

      https://trello.com/c/7aFh5k0H/2579-sap18

- RoMenuOptionModal: select: border: 1px solid black

      https://trello.com/c/7aFh5k0H/2579-sap18

- fix: OptionTab: md: .table: layout
- fix: MenuitemDetails: .OptionTabSearch: xs: + margin-top

## 2.113.49

### Patch Changes

- ItemInfoTab,MenuitemDetails: reduce padding
- fix: ItemInfoTab: md: Singlesize,Multisize: layout

      https://trello.com/c/F3lsqgua/2580-sap19

- fix: SizeTab: Add/Cancel button layout

      https://trello.com/c/F3lsqgua/2580-sap19

- fix: MenuitemDetails: .SizeTabSearch: xs: margin-top: 12px
- fix: ItemInfoTab: Upload/Remove buttons: same width

      https://trello.com/c/F3lsqgua/2580-sap19

## 2.113.48

### Patch Changes

- fix: navbar padding
- fix: OrderDetails: .totals: xs: layout

      https://trello.com/c/95JCS2gw/2578-web-issue3

## 2.113.47

### Patch Changes

- OrdersTab_OrderList: xs: card view

## 2.113.46

### Patch Changes

- HeadingDetailsList: .no-result-placeholder: center content

      https://trello.com/c/VVk1Za1E/2576-sap16

- fix: SaveCouponModal: .nav.nav-pills: toggle off: should not have active coloring
- fix: ConfirmModal: .action-buttons .btn: + .btn-lg
- fix: AppConfiguration: .action-buttons: sm: button layout
- fix: .modal-body, .modal-footer: xs: reduce padding
- fix: AppConfiguration,SaveCouponModal,ItemInfoTab,MenuitemDetails,RoMenuOptionModal,SizeTab,OrderDetails,RestInfoTab_Delivery: layout improvement

      https://trello.com/c/VVk1Za1E/2576-sap16

- fix: ItemCompareChart: mobile app: item_compare_chart_canvas click: window.open \_system

      https://trello.com/c/wdmKbNeo/2577-spa17

- HeadingDetailsList: xs: layout

      https://trello.com/c/wdmKbNeo/2577-spa17

- fix: MenusTab,MasterheadingDetails: xs: layout

      https://trello.com/c/wdmKbNeo/2577-spa17

- fix: OrdersTab_OrderList: svelte runtime warning when busy prop not set: busy = false default
- .btn-lg

## 2.113.45

### Patch Changes

- fix: RequestDemo: build issue

## 2.113.44

### Patch Changes

- fix: OrderDetails: > xs: extra 'Total (Customer Paid)' label

      https://trello.com/c/euBYIutX/2553-web-issues1

- fix: AppConfiguration_Features: $manage_platform_isPlatform$ dependent elements: Enable_Points,Enable_Cuisine_Filter,Default_View
- fix: EditRestaurant: unwanted y scrolling: min-height

      https://trello.com/c/SZYP83C0/2554-web-issues2

## 2.113.43

### Patch Changes

- fix: innerWidth\$: mobile app: listen to orientationchange event
- fix: EditRestaurant: responsive layout: filter
- fix: OrdersTab_OrderList,OrderDetails: Declined order: no ribbon,CC Declined status

      https://trello.com/c/TF8GeKUd/2548-general-issue-decline-cc

- fix: RoMenuOptionModal: mobile app: layout

## 2.113.42

### Patch Changes

- fix: RoMenuOptionModal: Active CheckBox: initial value is checked

      https://trello.com/c/MdnvLsqP/2552-sap11

## 2.113.41

### Patch Changes

- fix: OptionTab: xs width: .action-buttons,+ .table-responsive
- fix: OrdersTab,fetch*get_restaurant_hours_request*: mobile app: load restaurant hours

      https://trello.com/c/2NskxP52/2542-sap6

- fix: ItemInfoTab,OptionTab,RoMenuOptionModal,SelectOptionCategoryModal,RestInfoTab_RestaurantDetails: xs: button layout
- .btn: xs: min-width

## 2.113.40

### Patch Changes

- fix: Login,Signup: phone,short windows: SupportContactDialog: should not obscure form: position: static

      https://trello.com/c/agv9h7jg/2543-sap7

## 2.113.39

### Patch Changes

- _*lt* & **gte** instead of \_\_lte_ & _*gt*_
- fix: ItemInfoTab: app: phone: Size buttons: validation message: + padding-bottom: 20px

      https://trello.com/c/MdnvLsqP/2552-sap11

- MenusTab .menu-search-box-wrapper,HeadingDetailsList: xs: cards
- EditRestaurant: .sticky-header: top: + safe-area-inset-top

## 2.113.38

### Patch Changes

- fix: .section-heading,.section-subheading: consistent layout
- fix: Ro_Users: layout issues: scroll,btn-success + .btn-lg,phone label size
- fix: .navbar: padding-bottom: 12px
- fix: RoMainDashboard: .page: padding-top: 12px

## 2.113.37

### Patch Changes

- fix: SavePaymentMethodModal: .action-buttons: layout

      https://trello.com/c/2NskxP52/2542-sap6

- fix: Edit_Ro_User_Modal: .action-buttons .btn: layout

      https://trello.com/c/2NskxP52/2542-sap6

## 2.113.36

### Patch Changes

- Signup_STEP_EMAIL,Signup_STEP_NEW_REST,Signup_STEP_REST_LIST,Signup_STEP_SET_PASSWORD,Signup_STEP_VERIFY_CODE,Signup_STEP_ZIPCODE: input_tooltip
- fix: Signup: .SupportContactDialog: phone: width

      https://trello.com/c/agv9h7jg/2543-sap7

- fix: .header-logo-section: iOS: height: safe-area-inset-top + \$navbar-height

      https://trello.com/c/agv9h7jg/2543-sap7

## 2.113.35

### Patch Changes

- fix: EditRestaurant: .sticky-header: top: position
- RoMainDashboard: .app-info: shift to the right

      https://trello.com/c/3CoYom3P/2544-sap8

## 2.113.34

### Patch Changes

- fix: RoMainDashboard: tablet,phone: padding-top

## 2.113.33

### Patch Changes

- fix: AppConfiguration: Visit Link: custom domain/subdmomain

      https://trello.com/c/2NskxP52/2542-sap6

- fix: RoMainDashboard,EditRestaurant,OrdersTab: < 900px height layout
- fix: OrdersTab: PageLoader placement

      https://trello.com/c/tHibVSpn/2550-sap11

## 2.113.32

### Patch Changes

- fix: FinReportTab: fin_sales_orders_chart_canvas: labels

## 2.113.31

### Patch Changes

- Signup: is_cordova_app: hide pricing info

## 2.113.30

### Patch Changes

- fix: RoHome: SupportContactDialog: full width
- fix: OrdersTab: short window (> 900px): + .OrdersTab .scroll-to-top

## 2.113.29

### Patch Changes

- fix: OrdersTab_OrderList: .scroll-to-top: should be on top of .ribbon: z-index: 10
- fix: OrdersTab,OrdersTab_OrderList: responsive: height of .OrdersTab_OrderList,position of .scroll-to-top
- fix: ios: PlatformIcon,.page-contents: padding
- fix: OrderDetails: Map Route button should be on the right side
- fix: server & appmaker login: /manage-restaurant: redirect to OrdersTab

## 2.113.28

### Patch Changes

- Pricing: SupportContactDialog: full width

      https://trello.com/c/12oRho2U/2531-web-modification

## 2.113.27

### Patch Changes

- Pricing,Signup: + support email address

      https://trello.com/c/12oRho2U/2531-web-modification

- Pricing,Signup: + support email address

      https://trello.com/c/12oRho2U/2531-web-modification

## 2.113.26

### Patch Changes

- fix: ro_orders_API_ORDERS_list_payload\$.refresh: ro_login_user_NotificationTone_audio.play(): no user interaction: console.error instead of throw
- fix: /backoffice/manage-restaurant: login user has access

## 2.113.25

### Patch Changes

- OrdersTab_OrderList: .scroll-to-top

      https://trello.com/c/v8AA3O8h/2536-spa-modification4

- Signup text with link to /terms-of-service & /privacy-policy

      https://trello.com/c/v8AA3O8h/2536-spa-modification4

- fix: OrdersTab: layout: buttons,OrderTransitionUI

      https://trello.com/c/v8AA3O8h/2536-spa-modification4

- fix: OrderTransitionUI: .auxiliary-text under .action-buttons

      https://trello.com/c/v8AA3O8h/2536-spa-modification4

- fix: cordova: window.open: url
- TextEditor: .toolbar: phone: wrap

      https://trello.com/c/v8AA3O8h/2536-spa-modification4

- fix: ManageRestaurant: loading: full height
- fix: AccountInformationTab: responsive: layout

      https://trello.com/c/v8AA3O8h/2536-spa-modification4

## 2.113.24

### Patch Changes

- fix: Signup,SubscriptionCheckoutModal: cordova: + window.open: \_system
- fix: ChartsTab*marker_content: cordova: window.open: + WEB_APP_URL*(webConfig)

## 2.113.23

### Patch Changes

- fix: - open_with_inappbrowser

## 2.113.22

### Patch Changes

- fix: window.open = cordova.InAppBrowser

      https://trello.com/c/U5B3QsFv/2534-spa-modification3

## 2.113.21

### Patch Changes

- OrderDetails: OrderTransitionUI .btn: phone: 4 buttons in a row: layout

      https://trello.com/c/U5B3QsFv/2534-spa-modification3

- fix: RoMainDashboard: iphone: Powered by Menu safe area layout

      https://trello.com/c/VcdtS0rJ/2533-spa-modification2

- ChartsTab: cordova: View Menu link: open with inappbrowser plugin

      https://trello.com/c/U5B3QsFv/2534-spa-modification3

- fix: OrdersTab: phone: filter text layout

      https://trello.com/c/U5B3QsFv/2534-spa-modification3

- fix: ChartsTab: .chart-proximity-select: select: initial value

      https://trello.com/c/U5B3QsFv/2534-spa-modification3

- fix: EditRestaurant: .sticky-header blocking .new-orders-container when scroll bar in RoRestaurantNavUl

      https://trello.com/c/U5B3QsFv/2534-spa-modification3

## 2.113.20

### Patch Changes

- fix: AppSwiper: .swiper-button-prev,.swiper-button-next: color

## 2.113.19

### Patch Changes

- feat: disconnected network: notyf_error
- fix: Swiper: + slot[name=button-prev],slot[name=button-nextw

## 2.113.18

### Patch Changes

- EditRestaurant: phone: padding-top: 0
- RoMainDashboard: logout: icon: + .fa.fa-signout

      https://trello.com/c/RGZ99NcZ/2529-spa-modification1

- RoAccountHandle: logged in: goto /backoffice/manage-restaurant

      https://trello.com/c/RGZ99NcZ/2529-spa-modification1

## 2.113.17

### Patch Changes

- fix: Login: layout: mobile,desktop

## 2.113.16

### Patch Changes

- fix: PlatformIcon: ios phone: padding: Add 16px to padding from safe area

      https://trello.com/c/RGZ99NcZ/2529-spa-modification1

- fix: download: cordova: fileOpener2.open: file does not exist
- SupportContactDialog: phone: full width
- fix: missing prop warning

## 2.113.15

### Patch Changes

- fix: MobilePreview: shorter heights: zoom out

      https://trello.com/c/IuoZOV7l/2530-iframe-web-view-in-tablet-87

## 2.113.14

### Patch Changes

- Menu option layout fixes,Menu header layout fixes

      https://trello.com/c/RGZ99NcZ/2529-spa-modification1

## 2.113.13

### Patch Changes

- fix: MobilePreview: phone: iframe full width
- Login: vaidation: noinit

      https://trello.com/c/RGZ99NcZ/2529-spa-modification1

## 2.113.12

### Patch Changes

- fix: ChartsTab: map marker: mobile: layout: + ChartsTab_marker_content

## 2.113.11

### Patch Changes

- EditRestaurant,RestInfoTab,OrdersTab: vertical spacing

## 2.113.10

### Patch Changes

- phone: reduce vertical spacing

## 2.113.9

### Patch Changes

- webConfig\_: process.env.DEV,process.env.LIVE: forces webConfig environment

## 2.113.8

### Patch Changes

- fix: PlatformIcon: ios: + padding: safe-area

## 2.113.7

### Patch Changes

- Export File: cordova: use cordova-plugins-file-opener2
- .login-section-label: always show
- fix: validation not staying put after rotate & scroll: .form-group: + position: relative

## 2.113.6

### Patch Changes

- fix: OrderTransitionUI: phone: layout in different states
- fix: phone: layout to allow wider tables

## 2.113.5

### Patch Changes

- fix: OrderTransitionUI: phone: button layout: + <slot>

## 2.113.4

### Patch Changes

- fix: download: cordova callback issue: no async function

## 2.113.3

### Patch Changes

- fix: print: base64://\${base64}

## 2.113.2

### Patch Changes

- fix: OrderDetails: phone: OrderTransitionUI, print, map button layout
- fix: download,resolveLocalFileSystemURL,window: dir is an Entry
- fix: OrdersTab: phone: .btn layout
- fix: Print Report: cordova integration

## 2.113.1

### Patch Changes

- fix: FinReportTab: .fin-report-search: line up with input
- modile: cordova: download Export

## 2.113.0

### Patch Changes

- fix: OrderDetails: phone: .order-details-list table: layout
- SaveMasterheadingModal: CheckBox: phone: align to left
- fix: ConfirmModal: phone: layout;ConfirmModal_open_data_C: .btn-danger class
- SizeTab: tabs: Multi Size,Option: button layout,table layout
- fix: Breadcrumb: warning: prefix defaults to ''
- OrderDetails: phone: .offset,.action-buttons: layout
- RoMenuOptionModal: .multi-select-section: radio button & label aligned to top
- backoffice: phone button layout
- OrderDetails: .info-title: remove border-bottom;.info-details: - margin-top;.order-details-list: .label: padding-left
- fix: PreviewTab: .toggle-ro_preview_masterheading: click action
- MenuSearchBox: .menu-search-section: phone: full width
- fix: OrderDetails: balloon: left: position: .page-contents: position: relative
- fix: OrdersTab: iphone: layout
- fix: \_layout.svelte: warning when no gps passed: gps = null
- OrderDetails,EditOrder,PastOrder: .order-details-title: less vertical margin: 24px 0 0
- RoMainDashboard: .RoAccountHandle: vertical centering

## 2.112.0

### Minor Changes

- fix: PreviewTab: .toggle-ro_preview_masterheading: click action
- backoffice: phone button layout

## 2.111.0

### Minor Changes

- fix: webConfig\_: live_webConfig when is_hash_routing & no dev searchParam

## 2.110.130

### Patch Changes

- fix: RoMainDashboard: ios: .main-header-wrapper: padding-top

## 2.110.129

### Patch Changes

- fix: is_hash_routing: check window.location.origin

## 2.110.128

### Patch Changes

- fix: is*hash_routing*: cordova on android

## 2.110.127

### Patch Changes

- fix: ManageRestaurant: initial value: page\$: default to 1

## 2.110.126

### Patch Changes

- fix: RoMainDashboard: menu-logo-white-icon link: close mobile sidebar

## 2.110.125

### Patch Changes

- OrdersTab: reset filters: + ro_orders_API_ORDERS_list_payload\$.reset()

## 2.110.124

### Patch Changes

- fix: Status History after order transition: many entries: OrderTransitionUI: transition_order: payload: JSON.parse StatusHistory if it's a string

## 2.110.123

### Patch Changes

- fix: ro_orders_API_ORDERS_list_payload$: refresh: !params_fireFlyID$.\$: should unlock refresh
- OrdersTab: onMount: reset ro_orders_OrderList_a$,ro_orders_orders_tab_page$

## 2.110.122

### Patch Changes

- OrdersTab: table: overflow-x: auto

## 2.110.121

### Patch Changes

- fix: OrdersTab_OrderList: OrderTransitionUI: refresh OrderList: ro_orders_OrderList_a\$.refresh()
- fix: OrderTransitionUI: All($ro_orders_TotalRow$): ro_orders_TotalRow$ derived from ro_orders_Pagination$

## 2.110.120

### Patch Changes

- ro_orders_API_ORDERS_list_payload\$\_b: - load_data_if_first_page_without_filters conditional

## 2.110.119

### Patch Changes

- fix: OrdersTab: ipad: .order-list thead tr th: gap
- fix: .hamburger-menu-icon: toggle_ro_sideMenuOpened_b
- OrdersTab_Filters: Apply,Cancel: close_filters instead of toggle_filters

## 2.110.118

### Patch Changes

- BackOffice: Sidebar Navigation links: onclick: close instead of toggle: toggle_ro_sideMenuOpened_b->close_ro_sideMenuOpened_b
- ManagePayments: Add Payment Method: .btn.btn-lg

## 2.110.117

### Patch Changes

- fix: ro_orders_API_ORDERS_list_payload\$\_b: no_dom: do not load data
- fix: multiple concurrent refreshes: multiple concurrent sound notifications

## 2.110.116

### Patch Changes

- fix: ro_orders_OrderList_a$: do not clear when params_fireFlyID$ changes
- fix: use window.cordova instead of window.ionic

## 2.110.115

### Patch Changes

- fix: RoMainDashboard: .page-content: padding-top

## 2.110.114

### Patch Changes

- fix: rendering orders: ro_orders_API_ORDERS_list_payload,ro_orders_OrderList_a

      https://trello.com/c/3DJMtokA/2522-on-both-web-spa-the-new-order-doesnt-update-automatically

## 2.110.113

### Patch Changes

- .main-header-pt: padding-top: safe-area-inset-top
- .page-contents: padding: safe-area-inset-top,safe-area-inset-right,safe-area-inset-bottom,safe-area-inset-left

## 2.110.112

### Patch Changes

- fix: scrolling & touch events on ios app

      https://trello.com/c/4lvdUML0/2525-bug-on-spa-actual-device-doesnt-scroll-up-and-down

## 2.110.111

### Patch Changes

- /backoffice/manage-platform: + BackOffice_App_IOS_Store_Link_errors,BackOffice_App_Android_Store_Link_errors: when blank value
- - watch_API_SAVE_INFO_b: when loggedIn: API_SAVE_INFO request

        	https://trello.com/c/sLeSjPqm/2516-spa-requirements

- /backoffice/manage-platform: MinAppVersion,MinForcedAppVersion,BackOfficeMinAppVersion,BackOfficeMinForcedAppVersion: only super admin can edit

## 2.110.110

### Patch Changes

- Login: Login to Back Office

      https://trello.com/c/FY2JOnV1/2524-spa-modificaiton

- feat: ro: Login: + SupportContactDialog: lower right corner

      https://trello.com/c/FY2JOnV1/2524-spa-modificaiton

- Login: ValidationMessages: input_tooltip

## 2.110.109

### Patch Changes

- fix: APP_VERSION\$\_b: version checks: BackOfficeMinAppVersion,BackOfficeMinForcedAppVersion

      https://trello.com/c/sLeSjPqm/2516-spa-requirements

## 2.110.108

### Patch Changes

- fix: EditRestaurant: ro_orders_API_ORDERS_list_payload\$.refresh()

      https://trello.com/c/3DJMtokA/2522-on-both-web-spa-the-new-order-doesnt-update-automatically

## 2.110.107

### Patch Changes

- APP_VERSION\$\_b: open_store_link: when BackOffice_App_Android_Store_Link or BackOffice_App_IOS_Store_Link not present: navigate to store page

      https://trello.com/c/sLeSjPqm/2516-spa-requirements

## 2.110.106

### Patch Changes

- fix: circular dependency: move validate_backoffice_APP_VERSION into APP_VERSION\$

## 2.110.105

### Patch Changes

- APP_VERSION\$\_b: init: hash routing: check BackOfficeMinForcedAppVersion & BackOfficeMinAppVersion
- extracted validate_backoffice_APP_VERSION_b from APP_VERSION\$\_b

## 2.110.104

### Patch Changes

- feat: + BackOffice_App_IOS_Store_Link,BackOffice_App_Android_Store_Link

      https://trello.com/c/sLeSjPqm/2516-spa-requirements

## 2.110.103

### Patch Changes

- AppConfiguration_Main: + BackOfficeMinAppVersion,BackOfficeMinForcedAppVersion

      https://trello.com/c/sLeSjPqm/2516-spa-requirements

## 2.110.102

### Patch Changes

- fix: backoffice-spa: click link to same page

## 2.110.101

### Patch Changes

- fix: AppConfiguration_Icons: error messages behind Remove buttons

## 2.110.100

### Patch Changes

- RestInfoTab: .fixed-nav: higher to accomodate smaller heights
- Holidays: readded time

      https://trello.com/c/UjhWUw86/2513-general-issues

## 2.110.99

### Patch Changes

- RoMenuOptionModal: wider

      https://trello.com/c/dgjHlGeo/2518-menu-option-issues

- fix: SelectOptionCategoryModal: multi-select optionGroupSuggestion_detail

      https://trello.com/c/dgjHlGeo/2518-menu-option-issues

- fix: RoMenuOptionModal: open with no Name then open wiht Name: Name is required showing up

      https://trello.com/c/dgjHlGeo/2518-menu-option-issues

## 2.110.98

### Patch Changes

- _\_rc_b converted to _\_b: in the future a WeakMap ctx will handle cleanup

## 2.110.97

### Patch Changes

- hbr: file:// & window.cordova: from vendor/sapper

## 2.110.96

### Patch Changes

- fix: cordova build: ionic://: considered hash-based routing

## 2.110.95

### Patch Changes

- fix: cordova build: ionic://: considered hash-based routing

## 2.110.94

### Patch Changes

- OrdersTab_Search: .filter-value: below Filters button

      https://trello.com/c/kcy1HsEz/2512-spa-issue1

- OrdersTab_Search: clear: clear search box
- fix: /backoffice/manage-restaurant/[fireFlyID]/orders: Search for Order: filter list

## 2.110.93

### Patch Changes

- feat: Modal: stackable modals
- 34488957f: EditRestaurant: .nav-pills: rendering includes sm width: max-width: \$screen-xs-max: display: none
- SelectOptionCategoryModal: extracted from OptionTab
- EditRestaurant: .nav-pills: rendering includes sm width: max-width: \$screen-xs-max: display: none
- RoMenuOptionModal: extracted from OptionTab
- 34488957f: RoMenuOptionModal: extracted from OptionTab

## 2.110.92

### Patch Changes

- AddOptionCategoryModal: select_optionGroupSuggestion->toggle_optionGroupSuggestion,select_optionGroupSuggestion_detail->toggle_optionGroupSuggestion_detail

      https://trello.com/c/kcy1HsEz/2512-spa-issue1

## 2.110.91

### Patch Changes

- fix: AddOptionCategoryModal_c: compile error

## 2.110.90

### Patch Changes

- 98e7be767: MasterheadingDetails: .details-item .fa-history,.details-item .CheckBox: sizing
- AddOptionCategoryModal: extracted from OptionTab
- 98e7be767: fix: MenuitemDetails: dropdown menu cut off: .MenuitemDetails: padding: 0 0 600px

## 2.110.89

### Patch Changes

- DateTime: .clear: position;cursor: pointer;+title
- compaction: - margin-bottom: 40px

## 2.110.88

### Patch Changes

- HeadingDetails: compact: .page-title-section
- tables: thead: flush against the tbody
- SavePaymentMethodModal: ValidationMessages: input_tooltip
- fix: ValidationMessages: .has_tooltip: width

## 2.110.87

### Patch Changes

- RestInfoTab: compact: .section-heading,.RestInfoTab_Delivery .form-group,.time-section tr.edit-mode td > div
- .menu-logo-icon, .menu-logo-white-icon: smaller: width:154px;height:21px
- fix: CheckBox: display: inline-flex

      CouponsTab

- ItemInfoTab: .Menuitem_Is_singlesize: align-items: flex-end

## 2.110.86

### Patch Changes

- OptionTab: Active switch label: above switch
- ValidationMessages: .input_tooltip: 2px lower: margin-top: -18px;
- ValidationMessages: inplace_tooltip,input_tooltip

## 2.110.85

### Patch Changes

- 9545caacc: layout compaction: less header padding,.page-title-section: full row
- 9545caacc: ChartsTab: mobile (no mouseover): onclick or ontouchdown: onmouseover_marker if mapInfoWindow is not over marker

      https://trello.com/c/kcy1HsEz/2512-spa-issue1

- 9545caacc: RoMainDashboard: .page-title-section: less padding
- 9545caacc: MenuitemDetails: Single Size: top row: column layout
- 9545caacc: fix: EditRestaurant: reference to a missing function: - \_.select_ro_restaurant_tab

## 2.110.84

### Patch Changes

- fix: .modal-dialog .modal-content: background color: max-height: calc(100vh - 60px)

      https://trello.com/c/kcy1HsEz/2512-spa-issue1

## 2.110.83

### Patch Changes

- fix: RestInfoTab: .delivery-zone-section: .CheckBox: position

## 2.110.82

### Patch Changes

- fix: dev: APP_VERSION\$: APP_VERSION_dirty false positive: load APP_VERSION on page load
- fix: RestInfoTab: Holiday: no time,initial validation,onchange validation

      https://trello.com/c/UjhWUw86/2513-general-issues

## 2.110.81

### Patch Changes

- fix: MobilePreview: .MobilePreview: placement: bottom: 0

## 2.110.80

### Patch Changes

- fix: RoMainDashboard: web: $APP_VERSION$ instead of webConfig.APP_VERSION

## 2.110.79

### Patch Changes

- DateTime: .clear: &times; on upper right corner instead of clear text

      https://trello.com/c/UjhWUw86/2513-general-issues

- ValidationMessages: .has_tooltip: width: 100%;padding: 0 12px;
- DateTime: ValidationMessages: + input_tooltip

      https://trello.com/c/UjhWUw86/2513-general-issues

## 2.110.78

### Patch Changes

- RoMainDashboard: web: render .APP_VERSION
- RoMainDashboard: Powered by Menu: link to https://menu.com

      https://trello.com/c/kcy1HsEz/2512-spa-issue1

## 2.110.77

### Patch Changes

- RoMainDashboard: .side-menu: display: flex: + .side-menu-navigation: sibling to .app-info

  https://trello.com/c/kcy1HsEz/2512-spa-issue1

## 2.110.76

### Patch Changes

- ChartsTab: reset\__\_chart: when _\_canvas$.$ is not present: cancel instead of wait

## 2.110.75

### Patch Changes

- fix: AppConfiguration_Colors: ValidationMessages: input_tooltip instead of inplace_tooltip

## 2.110.74

### Patch Changes

- /backoffice/manage-platform: App Icon color palette: + label

## 2.110.73

### Patch Changes

- ChartsTab: .chart-marker-actions a:focus: outline:none,text-decoration: none

## 2.110.72

### Patch Changes

- fix: ChartsTab: Compare other restaurant
- b617b1882: fix: ChartsTab: page load: charts rendering multiple times,charts disappearing: charts should load once

## 2.110.71

### Patch Changes

- ValidationMessages: -tooltip,+inplace_tooltip,+input_tooltip

## 2.110.70

### Patch Changes

- .app-info: in line with menu items
- Settings: !consumer_login_user?.SoldOutAction: use SoldOutAction with IsDefault === true
- AppConfiguration_ViewSettings: Iphone X & up
- AppConfiguration_PlatformCompanies: only render when there are more than 1 $platform_companies$
- Restaurant_Menuitems: .restaurant-headings-menuitem: Selected Category offset needs to be bumped a bit higher
- fix: AppConfiguration_Main: .view-store-link: SPA routing: + https://

## 2.110.69

### Patch Changes

- RoMainDashboard: Powered by Menu: render for web app

## 2.110.68

### Patch Changes

- MobilePreview: max-height: 830px: fits on screen
- ChartsTab: + .available-in-certain-areas
- fix: ro_auth_code_expired\$ redirect: hash routing: handle routing when url has query params & hash params

## 2.110.67

### Patch Changes

- initial version is process.env.APP_VERSION
- RoMainDashboard: + .app-info: + APP_VERSION,Powered by Menu

## 2.110.66

### Patch Changes

- EditRestaurant: move restaurant-name to right of Breadcrumb
- EditTab,MenusTab,FinReportTab,FinStatementTab: layout improvements
- CustomerReviewsTab: remove 'null' text

## 2.110.65

### Patch Changes

- OrdersTab_c: refreshInterval\$: refresh every 60 seconds by default
- fix: hbr: goto relative path without leading '/',page url with hash: load correct route
- /backoffice/manage-restaurant/[fireFlyID]/order-details: redirect to /backoffice/manage-restaurant/\${fireFlyID}/orders

## 2.110.64

### Patch Changes

- RoHome: .section-menusense AppSwiper: autoplay: delay: 10_000

## 2.110.63

### Patch Changes

- ValidationMessages: tooltip={true}
- fix: /backoffice/manage-platform: Row: clear: both

## 2.110.62

### Patch Changes

- .help-block: revert position: absolute change
- ValidationMessages: + tooltip: position: absolute
- feat: ResetPassword: show_new_password,show_confirm_password

## 2.110.61

### Patch Changes

- .help-block: position: absolute: does not affect flow of document

## 2.110.60

### Patch Changes

- fix: SizeTab: on:input={evt => ro_menuoptionsizes\$.refresh()}

## 2.110.59

### Patch Changes

- fix: SubscriptionCheckoutModal: use @menus/ro-restaurant-ui: SavePaymentMethodModal

## 2.110.58

### Patch Changes

- version bump

## 2.110.57

### Patch Changes

- OrdersTab_Filters: Reset button: resets filters without closing filter dialog

## 2.110.56

### Patch Changes

- IFRAME*MOBILE_APP_URL*: bases url on webConfig

## 2.110.55

### Patch Changes

- BILLING_PAGE: is_hash_routing: no access

## 2.110.54

### Patch Changes

- AppConfiguration_Icons: .photo-upload-container: position
- fix: RestInfoTab: API_RESTAURANT_image_del: update ui

## 2.110.53

### Patch Changes

- fix: goto: hbr: when href is a relative path without a leading /: redirect hash route

## 2.110.52

### Patch Changes

- fix: hoisting issue: use target: es2019

## 2.110.51

### Patch Changes

- fix: RoHome: tablet size: height

      https://trello.com/c/boyChyVf/2505-responsive-new-icons-in-landing-page

## 2.110.50

### Patch Changes

- RoHome: mobile size: .icon elements: single row

      https://trello.com/c/boyChyVf/2505-responsive-new-icons-in-landing-page

## 2.110.49

### Patch Changes

- OrderDetails: Delivery message updates

      https://trello.com/c/nQwCu8yl/2508-modification-on-orders

## 2.110.48

### Patch Changes

- RestInfoTab_Subscription: hash routing: Please go to Menu on the web to manage your account settings.

## 2.110.47

### Patch Changes

- fix: RoMainDashboard: manage-platform.png display: background-size: contain

## 2.110.46

### Patch Changes

- fix: build,runtime: assets: node_modules,favicon.png,https://apis.google.com/js/platform.js,https://platform.linkedin.com/in.js,https://connect.facebook.net/en_US/sdk.js

## 2.110.45

### Patch Changes

- fix: /: redirect to Restaurant
- /backoffice,/backoffice/login: + redirect ro*redirect_home_url*

## 2.110.44

### Patch Changes

- fix: node_modules assets: build

## 2.110.43

### Patch Changes

- 1131e0fdd: restaurant-operations-slide,analytics-slide: correct background

## 2.110.142

### Patch Changes

- fix: AppConfiguration_Main: .copy: icon position

## 2.110.41

### Patch Changes

- page title: platform_settings.App_Name

## 2.110.40

### Patch Changes

- fix: OrderTransitionUI: Cancel button: revert

      https://trello.com/c/zlvkt7LZ/2504-issues-on-order-page

## 2.110.39

### Patch Changes

- - .manage-platform icon

## 2.110.38

### Patch Changes

- feat: OrderDetails: cannot cancel: Cancel Button: disabled instead of hidden
- feat: OrderDetails: Third party deliveries cannot be cancelled after accept

## 2.110.37

### Patch Changes

- /backoffice: mobile view: .section-icons: .icon: centered

## 2.110.36

### Patch Changes

- OrderDetails: .order-actions-section .btn: margin-right: 12px
- fix: /backoffice: .main-slides: Swiper: autoplay: 10 seconds

## 2.110.35

### Patch Changes

- fix: /backoffice: .profile-icon: position

## 2.110.34

### Patch Changes

- /backoffice

  Sign up: smaller
  .icon: bigger
  .nav links: smaller

- /backoffice: .main-slides: autoplay={{ delay: 10_000 }}

## 2.110.33

### Patch Changes

- /backoffice: .icon: background-position-y: bottom

      https://trello.com/c/vWjJhuMe/2498-update-web-landing-page

- fix: /backoffice: bigger: logo,.navbar text,.tag-heading,cta,icons

      https://trello.com/c/vWjJhuMe/2498-update-web-landing-page

## 2.110.32

### Patch Changes

- fix: menu.com,dev.menu.com,my.dev.menu.com: speed up ssr logic: no need load gps\$\_b

      + backoffice_host_a

## 2.110.31

### Patch Changes

- fix: Restaurant: userAddress == null: + open_ChangeAddressModal_i

## 2.110.30

### Patch Changes

- fix: ShoppingCart: .item-available-status: availability*ctx*: $minute_tick$

      https://trello.com/c/yRVHpDzp/2502-issue-on-shopping-cart

## 2.110.29

### Patch Changes

- fix: OrdersTab_Search: Export

## 2.110.28

### Patch Changes

- /backoffice: MenuSense slides: update

## 2.110.27

### Patch Changes

- fix: /backoffice: video: current asset version

## 2.110.26

### Patch Changes

- /backoffice: + icons

## 2.110.25

### Patch Changes

- /backoffice: video: + poster

## 2.110.24

### Patch Changes

- /backoffice: Navbar: bg_white: $ro_scrollTop$ >= 600

## 2.110.23

### Patch Changes

- fix: /background: slide text legibility: .image-overlay: opacity: 0.6

## 2.110.22

### Patch Changes

- fix: /backoffice/pricing: scrolled_past_hero: bg_white
- fix: /backoffice,/backoffice/pricing: duplicate RoMain

## 2.110.21

### Patch Changes

- /backoffice,/backoffice/pricing: Navbar: semi-transparent: position: fixed: top
- fix: /background/pricing: backround-size: cover

## 2.110.20

### Patch Changes

- Settings: - extra %

## 2.110.19

### Patch Changes

- fix: build issue

## 2.110.18

### Patch Changes

- fix: OrdersTab_OrderList: OrderTransitionUI: on:transition: OrdersTab_load_orders_tab()

## 2.110.17

### Patch Changes

- fix: OrdersTab: cancelled orders: should not be Pending: + order*is_pending*,order*is_new*

## 2.110.16

### Patch Changes

- fix: /backoffice/users: edit user

## 2.110.15

### Patch Changes

- feat: /backoffice:

      .main-slides: +slider
      AppSwiper: loop={true}
      https://trello.com/c/vWjJhuMe/2498-update-web-landing-page

## 2.110.14

### Patch Changes

- /backoffice: video tag: {images*host*(webConfig)}/static_video/menucom-promo.mp4

## 2.110.13

### Patch Changes

- fix: '' instead of '.js'

## 2.110.12

### Patch Changes

- fix: notyf_error_b,notyf_success_b: background color

## 2.110.11

### Patch Changes

- update dependencies

## 2.110.10

### Patch Changes

- fix: remove debug issues

## 2.110.9

### Patch Changes

- AppSwiper: - resize-observer: use platform ResizeObserver

## 2.110.8

### Patch Changes

- fix: Restaurant_Menuitems: render ETAMin

## 2.110.7

### Patch Changes

- fix: /: server side redirect: - ssr_goto\$\_b

## 2.110.6

### Patch Changes

- fix: DateTime: Flatpickr integration

## 2.110.5

### Patch Changes

- fix: DateTime: Flatpickr integration

## 2.110.4

### Patch Changes

- 402b46c07: /backoffice/manage-restaurant/[fireFlyID]?tab=restinfo: OrdersTab_load_orders_tab() without having to load
  OrdersTab
- fix: Sidebar: manage-restaurant: .active subtab: color
- /backoffice/manage-restaurant/[fireFlyID]/_ extracted from ?tab=_

## 2.110.3

### Patch Changes

- fix: /backoffice/manage-restaurant/DIZ010: tab navigation

## 2.110.2

### Patch Changes

- fix: flatpickr loading issue

## 2.110.1

### Patch Changes

- fix: ManageRestaurant_c: redundant load_data issue

## 2.110.0

### Minor Changes

- esm

## 2.109.2

### Patch Changes

- OrdersTab: Is_Read & !Is_Accepted: + PENDING ribbon

      	    https://trello.com/c/PrASm28E/2490-pending-order-banner

## 2.109.1

### Patch Changes

- fix: RestInfoTab: load issue: $ro_restaurant$ is falsy

## 2.109.0

### Minor Changes

- feat: /backoffice/manage-platform: Public Key: copy button

      	    https://trello.com/c/YHeZTsna/2497-public-key-copy-save

### Patch Changes

- 77c1504dc: navigator.clipboard instead of @menus/clipboard

## 2.108.112

### Patch Changes

- fix: /backoffice/settings:

      	    save NotificationTone
      	    populate saved NotificationTone
      	    play NotificationTone sounds
      	    https://trello.com/c/c5q1Bk9T/2494-notification-sound-on-settings-doesnt-change

## 2.108.111

### Patch Changes

- RestInfoTab: extracted RestInfoTab\_\* components

## 2.108.110

### Patch Changes

- - @menus/api-proxy

## 2.108.109

### Patch Changes

- OrderTransitionUI: Start: eta*minutes_text*

      	    https://trello.com/c/1CAETJ8B/2496-error-on-time

## 2.108.108

### Patch Changes

- fix: OptionTab: navigating away: error

## 2.108.107

### Patch Changes

- fix: OptionTab: sub menus

## 2.108.106

### Patch Changes

- fix: goto_consumer_home_b: /restaurant/\*: strip '" from url

## 2.108.105

### Patch Changes

/backoffice: .section-take-control: menu.com video

## 2.108.104

### Patch Changes

- TextEditor: overflow: auto

## 2.108.103

### Patch Changes

- .cr-app a: Color_Positive

## 2.108.102

### Patch Changes

- .cr-app a: Color_Text2

## 2.108.101

### Patch Changes

- fix: SubscriptionCheckoutModal: load error
- fix: OrdersTab: flash all orders while navigating to an order

      	    https://trello.com/c/3hpQYbAx/2489-flashing-on-click-to-new-order

## 2.108.100

### Patch Changes

- formatting

## 2.108.99

### Patch Changes

- AccountInformationTab: Save button: only visible when editing from toggle_edit

      	    https://trello.com/c/TiRKBBzm/2483-account-page-modification

## 2.108.98

### Patch Changes

- fix: login_user\$\_\_b: load from idb: ?? null: not logged in: add cart item

      	    https://trello.com/c/jQnmWJgw/2488-add-to-cart-issue-before-login

## 2.108.97

### Patch Changes

- fix: AppConfiguration_PagesText: Your Points: bold

## 2.108.96

### Patch Changes

- fix: TextEditor: preserve exact html

      	    https://trello.com/c/GenAlJVF/2486-tos-pp

- fix: SingletonComponent: has_dom: single instance

## 2.108.95

### Patch Changes

- OrderDetails: print:

      	    - Subscription
      	    Order number moved to header
      	    + Pre paid by
      	    - If you need to reach...
      	    https://trello.com/c/gnAs9wFc/2493-modification-on-print-pdf-order-page

## 2.108.94

### Patch Changes

- AccountInformationTab: LegalName,AccountName: controlled by toggle_edit

      	    https://trello.com/c/TiRKBBzm/2483-account-page-modification

## 2.108.93

### Patch Changes

- login_user\$: load value

## 2.108.92

### Patch Changes

- fix: /backoffice/manage-platform: select platform company: logout: login as a different user: only authorized platform
  companies should be listed

      	    https://trello.com/c/vmm0f7qD/2487-issue-of-catch-wrong-company-platform

## 2.108.91

### Patch Changes

- fix: ChangeAddressModal: $map$

## 2.108.90

### Patch Changes

- neql*(undefined) instead of neq*(null)

## 2.108.89

### Patch Changes

- fix: not logged in: add_menu_cartitem: timeout

## 2.108.88

### Patch Changes

- /backoffice/signup: API_REGISTRATION_new: error in calling newRest_Address_unsubscriber

## 2.108.87

### Patch Changes

- fix: ChartsTab: render bottom two charts

      	    https://trello.com/c/UcTUCkhd/2484-missed-items

## 2.108.86

### Patch Changes

- new menu logo on printed pages

      	    https://trello.com/c/pg65tij8/2485-change-menus-logo-on-prints

## 2.108.85

### Patch Changes

- fix: FinStatementTab: .fin-statments-search .btn: .btn-xlg

## 2.108.84

### Patch Changes

- appmaker role: + MANAGE_PLATFORM_PAGE: - SUPPORT_PAGE,TERMS_CONDITIONS_PAGE
