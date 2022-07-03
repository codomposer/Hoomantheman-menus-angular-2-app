import type { nullish } from '@ctx-core/function';
import type { SortDetail } from '@menus/sort-shared';
import type { CustomerReview, DeliveryZoneItem, FinancialStatement_Detail, FinancialStatement_Summary, GraphDatum, Holiday, MapInfo, MenuCounts, OptionGroupSuggestion, OrderDetail_I, RoOrder, PaymentMethod_I, RestaurantAccountInformation, RestHours, RoCoupon, RoHeading_I, RoMasterheading_I, RoMenuitem, RoMenuitem_I, RoMenuoption_I, RoMenuoptionitem_I, RoMenuoptionsize_I, RoPreviewMasterheading_I, Schedule } from '@menus/ro-shared-models';
import type { API_error_T, PaginationPayload } from '@menus/api';
import type { Order } from '@menus/shared-order';
import type { Menuoption_I, Menuoptionsize_I } from '@menus/consumer-menu';
import type { DeliveryMode, GlobalSettings, Ro_User } from '@menus/ro-user-common';
import type { StateCtx } from '@menus/address';
import type { SearchMenuitem_I } from '@menus/search-menu-common';
import type { RoRestaurant, RoRestaurant_I } from '@menus/ro-restaurant';
import type { PlatformSettings } from '@menus/platform-settings';
export interface updateDeliveryZoneSortOrder_body_T {
    SortDetails: SortDetail[];
}
export interface API_MENUS_dzone_sort_payload_T {
    Status: string;
}
export declare type fetch_API_MENUS_sched_list_payload_T = Schedule;
export declare type API_MENUS_sched_add_payload_T = Schedule;
export interface success_API_MENUS_masterheading_list_payload_T {
    Status: string;
    Data: RoMasterheading_I[];
}
export declare type error_API_MENUS_masterheading_list_payload_T = API_error_T;
export declare type API_MENUS_masterheading_list_payload_T = success_API_MENUS_masterheading_list_payload_T | error_API_MENUS_masterheading_list_payload_T;
export interface saveMasterheading_data_T {
    fireFlyID: string;
    ro_masterheading: RoMasterheading_I;
}
export interface API_MENUS_masterheading_add_payload_T {
    Status: string;
    Data: RoMasterheading_I;
}
export interface API_MENUS_masterheading_update_payload_T {
    Status: string;
    Data: RoMasterheading_I;
}
export declare type save_API_MENUS_masterheading_payload_T = API_MENUS_masterheading_add_payload_T | API_MENUS_masterheading_update_payload_T;
export interface API_MENUS_masterheading_del_payload_T {
    Status: string;
}
export interface updateMasterheadingSortOrder_body_T {
    SortDetails: SortDetail[];
}
export interface API_MENUS_masterheading_sort_payload_T {
    Status: string;
    Code: string;
}
export interface success_API_MENUS_masterheading_info_payload_T {
    Data: RoMasterheading_I;
}
export declare type error_API_MENUS_masterheading_info_payload_T = API_error_T;
export declare type API_MENUS_masterheading_info_payload_T = success_API_MENUS_masterheading_info_payload_T | error_API_MENUS_masterheading_info_payload_T;
export interface success_API_MENUS_heading_list_payload_T {
    Data: RoHeading_I[];
}
export declare type API_MENUS_heading_list_payload_T = success_API_MENUS_heading_list_payload_T & API_error_T;
export interface success_API_MENUS_heading_info_payload_T {
    Data: RoHeading_I;
}
export declare type API_MENUS_heading_info_payload_T = success_API_MENUS_heading_info_payload_T & API_error_T;
export interface save_API_MENUS_heading_params_T {
    fireFlyID: string;
    MasterheadingID: number;
    head: RoHeading_I;
}
export interface API_MENUS_heading_add_payload_T {
    Status: string;
    Data: RoHeading_I;
}
export interface API_MENUS_heading_update_payload_T {
    Status: string;
    Data: RoHeading_I;
}
export declare type save_API_MENUS_heading_payload_T = API_MENUS_heading_add_payload_T | API_MENUS_heading_update_payload_T;
export interface API_MENUS_heading_del_payload_T {
    Status: string;
}
export interface API_MENUS_heading_sort_body_T {
    SortDetails: SortDetail[];
}
export interface API_MENUS_heading_sort_payload_T {
    Status: string;
    Data: RoMenuitem_I[];
}
export interface success_API_MENUS_menu_list_payload_T {
    Status: string;
    Data: RoMenuitem_I[];
}
export declare type error_API_MENUS_menu_list_payload_T = API_error_T;
export declare type API_MENUS_menu_list_payload_T = success_API_MENUS_menu_list_payload_T | error_API_MENUS_menu_list_payload_T;
export interface success_API_MENUS_menu_info_payload_T {
    Status: string;
    Data: RoMenuitem_I;
}
export declare type error_API_MENUS_menu_info_payload_T = API_error_T;
export declare type API_MENUS_menu_info_payload_T = success_API_MENUS_menu_info_payload_T | error_API_MENUS_menu_info_payload_T;
export interface API_MENUS_menu_add_payload_T {
    Status: string;
    Data: RoMenuitem_I;
}
export interface API_MENUS_menu_update_payload_T {
    Status: string;
    Code: string;
    Data: RoMenuitem_I;
}
export interface API_MENUS_menu_del_payload_T {
    Status: string;
}
export interface API_MENUS_image_upload_payload_T {
    Status: string;
    FileName: string;
}
export interface API_MENUS_image_del_payload_T {
    Status: string;
}
export interface API_MENUS_menu_sort_payload_T {
    Status: string;
}
export interface success_API_MENUS_sizelookup_payload_T {
    Data: RoMenuoptionsize_I[];
}
export declare type API_MENUS_sizelookup_payload_T = success_API_MENUS_sizelookup_payload_T & API_error_T;
export interface successAPI_MENUS_menusize_list_payload__T {
    Data: RoMenuoptionsize_I[];
}
export declare type errorAPI_MENUS_menusize_list_payload__T = API_error_T;
export declare type API_MENUS_menusize_list_payload_T = successAPI_MENUS_menusize_list_payload__T | errorAPI_MENUS_menusize_list_payload__T;
export interface API_MENUS_menusize_add_payload_T {
    Status: string;
    Code: string;
    Data: RoMenuoptionsize_I;
}
export interface API_MENUS_menusize_update_payload_T {
    Status: string;
    Code: string;
    Data: RoMenuoptionsize_I;
}
export declare type API_MENUS_menusize_save_payload_T = API_MENUS_menusize_add_payload_T | API_MENUS_menusize_update_payload_T;
export interface API_MENUS_menusize_del_payload_T {
    Status: string;
}
export interface API_ORDERS_list_payload_T {
    OrderList: Order[];
    UnRead: number;
    Pagination: PaginationPayload;
}
export interface API_MENUS_menusize_sort_payload_T {
    Status: string;
}
export interface success_API_MENUS_menuoption_list_payload_T {
    Data: RoMenuoption_I[];
}
export declare type error_API_MENUS_menuoption_list_payload_T = API_error_T;
export declare type API_MENUS_menuoption_list_payload_T = success_API_MENUS_menuoption_list_payload_T | error_API_MENUS_menuoption_list_payload_T;
export interface API_MENUS_menuoption_add_payload_T {
    Status: string;
    Code: string;
    Data: RoMenuoption_I;
}
export interface API_MENUS_menuoption_update_payload_T {
    Status: string;
    Code: string;
    Data: RoMenuoption_I;
}
export interface API_MENUS_menuoption_del_payload_T {
    Status: string;
}
export interface API_MENUS_menuoption_sort_payload_T {
    Status: string;
    Data: RoMenuoption_I[];
}
export declare type API_MENUS_menuoptionitem_list_payload_T = RoMenuoptionitem_I[];
export interface API_MENUS_menuoptionitem_add_payload_T {
    Status: string;
    Data: RoMenuoptionitem_I;
}
export interface API_MENUS_menuoptionitem_update_payload_T {
    Status: string;
    Data: RoMenuoptionitem_I;
}
export declare type save_API_MENUS_menuoptionitem_payload_T = API_MENUS_menuoptionitem_add_payload_T | API_MENUS_menuoptionitem_update_payload_T;
export interface API_MENUS_menuoptionitem_del_payload_T {
    Status: string;
}
export interface API_MENUS_menuoptionitem_sort_payload_T {
    Status: string;
}
export interface success_API_MENUS_optiongroup_list_payload_T {
    Data: OptionGroupSuggestion[];
}
export declare type error_API_MENUS_optiongroup_list_payload_T = API_error_T;
export declare type API_MENUS_optiongroup_list_payload_T = success_API_MENUS_optiongroup_list_payload_T | error_API_MENUS_optiongroup_list_payload_T;
export declare type success_API_ORDERS_detail_payload_T = RoOrder;
export declare type error_API_ORDERS_detail_payload_T = API_error_T;
export declare type API_ORDERS_detail_payload_T = success_API_ORDERS_detail_payload_T | error_API_ORDERS_detail_payload_T;
export interface API_ORDERS_accept_payload_T {
    Status: string;
    Data: OrderDetail_I;
}
export interface API_ORDERS_start_payload_T {
    Status: string;
    Data: OrderDetail_I;
}
export interface API_ORDERS_ready_payload_T {
    Status: string;
    Data: OrderDetail_I;
}
export interface API_ORDERS_complete_payload_T {
    Status: string;
    Data: OrderDetail_I;
}
export interface API_ORDERS_cancel_payload_T {
    Status: string;
    Data: OrderDetail_I;
}
export interface API_ORDERS_details_update_payload_T {
    Status: string;
    Data: OrderDetail_I;
}
export interface API_ORDERS_route_payload_T {
    Customer_Latitude: string;
    Customer_Longitude: string;
    Restaurant_Latitude: string;
    Restaurant_Longitude: string;
}
export interface success_API_COUPONS_list_payload_T {
    Status: string;
    Data: RoCoupon[];
}
export declare type error_API_COUPONS_list_payload_T = API_error_T;
export declare type API_COUPONS_list_payload_T = success_API_COUPONS_list_payload_T | error_API_COUPONS_list_payload_T;
export interface API_COUPONS_add_payload_T {
    Status: string;
    Code: string;
    Data: RoCoupon;
}
export interface API_COUPONS_update_payload_T {
    Status: string;
    Code: string;
    Data: RoCoupon;
}
export interface save_API_COUPONS_data_T {
    fireFlyID: string;
    ro_coupon: RoCoupon;
}
export declare type save_API_COUPONS_payload_T = API_COUPONS_add_payload_T | API_COUPONS_update_payload_T;
export interface API_COUPONS_del_payload_T {
    Status: string;
}
export interface API_COUPONS_menuitem_payload_T {
    Data: RoMenuitem[];
}
export interface API_PREVIEW_preview_payload_T {
    MasterHeading: RoPreviewMasterheading_I[];
    RestName: string;
}
export interface API_PREVIEW_menuitem_payload_T {
}
export interface API_PREVIEW_menuoptionsize_payload_T {
    Data: Menuoptionsize_I[];
}
export interface API_PREVIEW_menuoptions_payload_T {
    Is_Single_Size: boolean;
    MenuOptions: Menuoption_I[];
}
export declare type API_CHARTS_map_payload_T = MapInfo;
export interface API_CHARTS_compare_payload_T {
    Status: string;
    Data: {}[];
    Pagination: PaginationPayload;
}
export declare type API_CHARTS_menucount_payload_T = MenuCounts;
export interface API_CHARTS_resttype_payload_item_T {
    Status: string;
    Count: number;
    RestaurantType: string;
}
export declare type success_API_CHARTS_resttype_payload_T = API_CHARTS_resttype_payload_item_T[];
export interface error_API_CHARTS_resttype_payload_T {
    Status: string;
    Message: string;
}
export declare type API_CHARTS_resttype_payload_T = success_API_CHARTS_resttype_payload_T | error_API_CHARTS_resttype_payload_T;
export interface API_CHARTS_segment_payload_item_T {
    Status: string;
    SegmentID: number;
    SegmentName: string;
    Inc_Percent: number;
}
export declare type success_API_CHARTS_segment_payload_T = API_CHARTS_segment_payload_item_T[];
export interface error_API_CHARTS_segment_payload_T {
    Status: string;
    Message: string;
}
export declare type API_CHARTS_segment_payload_T = success_API_CHARTS_segment_payload_T | error_API_CHARTS_segment_payload_T;
export interface API_CHARTS_cuisine_payload_T {
    Status: string;
}
export interface API_CHARTS_menucompetition_payload_T {
    Status: string;
    Data: {}[];
    Pagination: PaginationPayload;
}
export interface API_CHARTS_missingmenu_payload_T {
    Status: string;
    Data?: {}[];
    Pagination: PaginationPayload;
}
export interface API_FINANCIAL_statement_payload_T {
    Status: string;
    Summary: FinancialStatement_Summary;
    Data: {
        Details: FinancialStatement_Detail[];
        Pagination: PaginationPayload;
    };
}
export interface API_FINANCIAL_report_payload_T {
    Status: string;
    GraphData: GraphDatum[];
    Data: {
        Details: FinancialStatement_Detail[];
    };
}
export interface itunes_lookup_bundle_payload_result_T {
    bundleId: string;
    trackViewUrl: string;
}
export interface itunes_lookup_bundle_payload_T {
    results: itunes_lookup_bundle_payload_result_T[];
}
export declare type API_GLOBAL_get_payload_T = GlobalSettings;
export declare type API_GLOBAL_lookupstate_payload_T = StateCtx[];
export interface API_CUSTOMER_review_payload_T {
    Data: CustomerReview[];
    Pagination: PaginationPayload;
}
export interface API_RESET_verify_email_payload_T {
    Status: string;
    Code: string;
}
export interface requestDemo_requestData_T {
    f: string;
    l: string;
    rn: string;
    e: string;
    p: string;
}
export interface requestDemo_payload_T {
    Status: string;
}
export interface API_PAYMENT_METHODS_list_payload_T {
    Code: string;
    Data: PaymentMethod_I[];
    Pagination: PaginationPayload;
}
export interface API_PAYMENT_METHODS_del_payload_T {
    Code: string;
}
export interface API_PAYMENT_METHODS_add_payload_T {
    Status: string;
    Code: string;
    Data: PaymentMethod_I;
}
export interface API_PAYMENT_METHODS_update_payload_T {
    Status: string;
    Code: string;
    Data: PaymentMethod_I;
}
export interface save_API_PAYMENT_METHODS_data_T {
    paymentMethod: PaymentMethod_I;
}
export declare type save_API_PAYMENT_METHODS_payload_T = API_PAYMENT_METHODS_add_payload_T | API_PAYMENT_METHODS_update_payload_T;
export interface API_REGISTRATION_search_payload_T {
    Status: string;
    Code: string;
    Data: SearchMenuitem_I[];
}
export interface API_REGISTRATION_register_payload_T {
    Status: string;
}
export interface API_REGISTRATION_new_payload_T {
    Status: string;
    Message: string;
}
export interface API_REGISTRATION_verify_payload_T {
    Status: string;
    Message: string;
    Code: string;
    AuthCode: string;
    UserID: number;
}
export interface API_REGISTRATION_verify_email_payload_T {
}
export interface API_REGISTRATION_resend_payload_T {
    Status: string;
    Message: string;
}
export interface API_RESTAURANT_accept_terms_body_T {
    FireFlyID: string;
    SegmentID: number;
    CuisineID: number;
    Sell_Alcohol: boolean;
}
export interface API_RESTAURANT_accept_terms_payload_T {
    Status: string;
    Code?: string;
    Data?: RoRestaurant_I;
}
export interface API_RESTAURANT_list_payload_T {
    Status: string;
    Data: RoRestaurant_I[];
    Pagination: PaginationPayload;
}
export interface success_API_RESTAURANT_info_payload_T {
    Data?: RoRestaurant_I;
    WorkingHours: RestHours[];
    DeliveryHours: RestHours[];
    DeliveryModes: DeliveryMode[];
    Holidays: Holiday[];
    DeliveryZone: DeliveryZoneItem[];
}
export declare type error_API_RESTAURANT_info_payload_T = API_error_T;
export declare type API_RESTAURANT_info_payload$_T = success_API_RESTAURANT_info_payload_T | error_API_RESTAURANT_info_payload_T;
export interface API_USER_pass_payload_T {
    Status: string;
}
export interface API_USER_login_payload_T {
    Status: string;
    Data: Ro_User | nullish;
    Code: string;
}
export interface API_USER_auth_login_payload_T {
    Status: string;
    Data: Ro_User | nullish;
    Code: string;
}
export interface API_USER_usersettings_payload_T {
    Status: string;
}
export interface API_RESET_forgot_payload_T {
    Status: string;
    Message: string;
}
export interface API_RESET_reset_payload_T {
    Status: string;
}
export interface API_USER_list_payload_T {
    Data: Ro_User[];
    Pagination: PaginationPayload;
}
export interface API_USER_addbyowner_payload_T {
    Status: string;
    Code: string;
    Data: Ro_User;
}
export interface API_USER_update_payload_T {
    Status: string;
    Code: string;
    Data: Ro_User;
}
export interface save_API_USER_data_T {
    user: Ro_User;
}
export declare type save_API_USER_payload_T = API_USER_addbyowner_payload_T | API_USER_update_payload_T;
export interface API_USER_update_terms_payload_T {
    Status: string;
}
export interface API_USER_del_payload_T {
    Status: string;
}
export interface API_USER_resendemail_payload_T {
    Status: string;
    Message: string;
}
export interface API_USER_restlist_payload_T {
    Status: string;
    Data: RoRestaurant[];
    UserData: RoRestaurant[];
}
export interface API_USER_restlist_update_payload_T {
    Status: string;
}
export interface PlatformCompany {
    Name: string;
    App_Name: string;
    App_ID: string;
    PublicKey: string;
}
export declare type API_PLATFORM_companies_payload_T = PlatformCompany[];
export interface API_PLATFORM_info_info_payload_T {
    Status: string;
    Data: PlatformSettings;
}
export interface API_PLATFORM_info_update_payload_T {
    Status: string;
}
export interface API_PAGES_TEXT_about_payload_T {
    Data: string;
}
export interface API_PAGES_TEXT_privacy_payload_T {
    Data: string;
}
export interface API_PAGES_TEXT_return_payload_T {
    Data: string;
}
export interface API_PAGES_TEXT_terms_payload_T {
    Data: string;
}
export interface API_PLATFORM_IMAGE_icon_upload_payload_T {
    Status: string;
}
export interface API_PLATFORM_IMAGE_icon_del_payload_T {
    Status: string;
}
export interface API_PLATFORM_IMAGE_splash_upload_payload_T {
    Status: string;
}
export interface API_PLATFORM_IMAGE_splash_del_payload_T {
    Status: string;
}
export interface API_PLATFORM_IMAGE_flyer_focus_upload_payload_T {
    Status: string;
}
export interface API_PLATFORM_IMAGE_flyer_focus_del_payload_T {
    Status: string;
}
export interface API_PLATFORM_IMAGE_flyer_mobile_upload_payload_T {
    Status: string;
}
export interface API_PLATFORM_IMAGE_flyer_mobile_del_payload_T {
    Status: string;
}
export interface API_BILLING_upgrade_payload_T {
    Status: string;
}
export interface API_BILLING_cancel_next_subscription_payload_T {
    Status: string;
}
export interface API_RESTAURANT_image_upload_payload_T {
    Status: string;
    FileName: string;
}
export interface API_RESTAURANT_image_del_payload_T {
    Status: string;
}
export interface API_RESTAURANT_terms_payload_T {
    Status: string;
}
export interface API_RESTAURANT_update_payload_T {
    Status: string;
}
export declare type API_RESTAURANT_update_body_T = RoRestaurant_I;
export declare type API_RESTAURANT_schedule_payload_T = API_RESTAURANT_info_payload$_T;
export interface API_RESTAURANT_schedule_body_T {
    Data?: RoRestaurant_I;
    WorkingHours: RestHours[];
    DeliveryHours: RestHours[];
    Holidays: Holiday[];
    DeliveryZone: DeliveryZoneItem[];
}
export interface API_RESTAURANT_status_payload_T {
    Status: string;
    Data: RoRestaurant_I;
}
export interface API_RESTAURANT_enableordering_payload_T {
    Status: string;
}
export interface API_RESTAURANT_enable_payload_T {
    Status: string;
    Message: string;
}
export interface API_RESTAURANT_account_info_payload_T {
    Data: RestaurantAccountInformation;
}
export interface API_RESTAURANT_account_update_payload_T {
    Status: Status_T;
    Message: string;
}
export interface API_RESTAURANT_dzone_list_payload_T {
}
export interface API_RESTAURANT_dzone_add_payload_T {
}
export interface API_RESTAURANT_dzone_update_payload_T {
}
export interface save_API_RESTAURANT_dzone_data_T {
    fireFlyID: string;
    deliveryZoneItem: DeliveryZoneItem;
}
export declare type save_API_RESTAURANT_dzone_payload_T = API_RESTAURANT_dzone_add_payload_T | API_RESTAURANT_dzone_update_payload_T;
export interface API_LIST_cuisine_payload_item_T {
    ID: number;
    Name: string;
}
export declare type API_LIST_cuisine_payload_T = API_LIST_cuisine_payload_item_T[];
export interface API_LIST_segment_payload_item_T {
    ID: number;
    Name: string;
}
export declare type API_LIST_segment_payload_T = API_LIST_segment_payload_item_T[];
export declare type Status_T = 'success' | 'error';
