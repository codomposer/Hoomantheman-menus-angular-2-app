# add_order, add_order_item, & pay_order

From the ShoppingCart, /checkout places an order, places order items, & initiates payment for the order items.

## add_order

/checkout creates shopping cart items into orders via the `POST /b/r.aspx` http api endpoint for
each `restaurant_cartitem` in `restaurant_cartitems`. In the client code, `/b/r.aspx` is called `add_order`.

## add_order_item

After a successful call to add_order (`POST /b/r.aspx`), a `POST /b/n.aspx` http call is sent to the api for
each `menuitem` in `restaurant_cartitem.menuitems`. In the client code, `/b/n.aspx` is called `add_order_item`.

Currently, the response for the `add_order_item` calls is not checked.

## pay_order

After a successful call to add_order (`POST /b/r.aspx`) & add_order_item (`POST /b/n.aspx`), a `POST /b/pn.aspx` http
call is sent to the api. In the client code, `/b/pn.aspx` is called `pay_order`.

## /checkout Algorithm

### add_order

A call to `add_order` (`POST /b/r.aspx`) is initiated. The api response body json include a `Code` property.

#### Code: "ADD_ORDER_ERROR"

If the `Code` property in the api `add_order` (`POST /b/r.aspx`) response is not `ADD_ORDER`,
the `restaurant_cartitem.RestaurantName` with an error message is displayed to the user.

#### Code: "ADD_ORDER"

If `Code: "ADD_ORDER"`, the order is successfully placed & the algorithm can move to
`add_order_item` for each `menuitem` in `restaurant_cartitem.menuitems` & `pay_order`.

### add_order_item

For each `menuitem` within the `restaurant_cartitems.menuitems`, a call to `add_order_item` (`POST /b/n.aspx`) is
initiated.

Currently, the response for the `add_order_item` calls is not checked.

### pay_order

After a `add_order` with a `Code: "ADD_ORDER"`, a call to `pay_order` (`POST /b/pn.aspx`) is initiated. The api response
body json include a `Code` property.

#### Code: "PAY_ORDER_ERROR"

If `Code: "PAY_ORDER_ERROR"`, there is an error paying for the order. The `Message` property has a description of the
error.

#### Code: "PAY_ORDER_SUCCESS"

Upon a successful payment for the `restaurant_cartitem`, the `restaurant_cartitem` is displayed as being successful in
the
`ThankYouOrderModal`.

## Debugging

https://dev.dishzilla.com/data/order.txt

https://dev.dishzilla.com/tests/Test_Send_Order_Notification.aspx
