"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sql = require("mssql");
var util_1 = require("../util");
var DB = /** @class */ (function () {
    function DB() {
        var _this = this;
        this.LOG_TAG = 'DB';
        // Find Customer By AuthCode
        this.findCustomerByAuthCode = function (authCode) {
            return new sql.Request()
                .input('AuthCode', sql.VarChar, authCode)
                .query('SELECT * FROM Lookup_Customers WHERE AuthCode = @AuthCode');
        };
        // Find Customer Order
        this.findCustomerOrder = function (orderNumber, customerID) {
            return new sql.Request()
                .input('OrderNumber', sql.VarChar, orderNumber)
                .input('CustomerID', sql.Int, customerID)
                .query('SELECT * FROM Lookup_Customers_Orders WHERE OrderNumber = @OrderNumber AND CustomerID = @CustomerID');
        };
        // Find User By AuthCode
        this.findUserByAuthCode = function (authCode) {
            // Make sure, the `User Level` is Agent or Agent-Admin // AND (UserLevel = 7 OR UserLevel = 8)
            return new sql.Request()
                .input('AuthCode', sql.VarChar, authCode)
                .query('SELECT * FROM Lookup_Users WHERE AuthCode = @AuthCode');
        };
        // Find User Restaurant Data
        this.findUserRestData = function (userID) {
            // Make sure, the `User Level` is Agent or Agent-Admin
            return new sql.Request()
                .input('UserID', sql.Int, userID)
                .query('SELECT * FROM Lookup_User_Restaurant_Data WHERE UserID = @UserID');
        };
        // // Find Thread for Customer Order
        // public findCustomerOrderThread = (orderNumber, customerID) => {
        //     return new sql.Request()
        //         .input('OrderNumber', sql.VarChar, orderNumber)
        //         .input('CustomerID', sql.Int, customerID)
        //         .query('SELECT * FROM Lookup_ChatThreads WHERE OrderNumber = @OrderNumber AND CustomerID = @CustomerID');
        // }
        // Find Thread Order
        this.findThreadsOrder = function (options) {
            util_1.Util.log(_this.LOG_TAG, 'findThreadsOrder', options);
            var request = new sql.Request();
            // let query = `
            //                 SELECT ct.ID, ct.OrderNumber, ct.Closed, ct.UserID, ct.CustomerID, CONCAT(c.FirstName, ' ', c.LastName) as CustomerName, CONCAT(u.FirstName, ' ', u.LastName) as UserName
            //                 FROM Lookup_ChatThreads ct
            //                 LEFT JOIN Lookup_Customers c
            //                 ON c.ID = ct.CustomerID
            //                 LEFT JOIN Lookup_Users u
            //                 ON u.ID = ct.UserID
            //                 WHERE ct.Closed = 0
            //             `;
            var query = "\n          SELECT ct.ID, ct.Type, ct.TypeDataID, ctsd.OrderNumber, ct.Closed, ctsd.UserID, ctsd.CustomerID, CONCAT(c.\n          FirstName, ' ', c.LastName)as CustomerName, CONCAT(u.FirstName, ' ', u.LastName)as UserName FROM\n          Lookup_ChatThreadOrderData ctsd LEFT JOIN Lookup_ChatThreads ct ON ct.TypeDataID = ctsd.ID LEFT JOIN\n          Lookup_Customers c ON c.ID = ctsd.CustomerID LEFT JOIN Lookup_Users u ON u.ID = ctsd.UserID WHERE ct.Closed =\n          0\n        ";
            // User ID
            if (typeof options.userID !== 'undefined') {
                if (options.userID) {
                    request.input('UserID', sql.Int, options.userID);
                    // query = `
                    //             ${query}
                    //             AND ct.UserID = @UserID
                    //         `;
                    query = "\n                            " + query + "\n                            AND ctsd.UserID = @UserID\n                        ";
                }
                else {
                    // query = `
                    //             ${query}
                    //             AND ct.UserID IS NULL
                    //         `;
                    query = "\n                            " + query + "\n                            AND ctsd.UserID IS NULL\n                        ";
                }
            }
            // Customer ID
            if (typeof options.customerID !== 'undefined') {
                if (options.customerID) {
                    request.input('CustomerID', sql.Int, options.customerID);
                    // query = `
                    //             ${query}
                    //             AND ct.CustomerID = @CustomerID
                    //         `;
                    query = "\n                            " + query + "\n                            AND ctsd.CustomerID = @CustomerID\n                        ";
                }
            }
            // Order ID
            if (typeof options.orderNumber !== 'undefined') {
                if (options.orderNumber) {
                    request.input('OrderNumber', sql.VarChar, options.orderNumber);
                    // query = `
                    //             ${query}
                    //             AND ct.OrderNumber = @OrderNumber
                    //         `;
                    query = "\n                            " + query + "\n                            AND ctsd.OrderNumber = @OrderNumber\n                        ";
                }
            }
            // Util.log(this.LOG_TAG,'findThread => query', query);
            return request.query(query);
        };
        // Find Thread Support
        this.findThreadsSupport = function (options) {
            util_1.Util.log(_this.LOG_TAG, 'findThreadsSupport', options);
            var request = new sql.Request();
            var query = "\n          SELECT ct.ID, ct.Closed, ct.Type, ct.TypeDataID, ctsd.GuestID, ctsd.UserID, ctsd.GuestName, ctsd.GuestEmail,\n          ctsd.RestUserID, ctsd.CustomerID, CONCAT(c.FirstName, ' ', c.LastName)as CustomerName, CONCAT(u.FirstName, ' '\n          , u.LastName)as UserName, CONCAT(ru.FirstName, ' ', ru.LastName)as RestUserName FROM\n          Lookup_ChatThreadSupportData ctsd LEFT JOIN Lookup_ChatThreads ct ON ct.TypeDataID = ctsd.ID LEFT JOIN\n          Lookup_Customers c ON c.ID = ctsd.CustomerID LEFT JOIN Lookup_Users u ON u.ID = ctsd.UserID LEFT JOIN\n          Lookup_Users ru ON ru.ID = ctsd.RestUserID WHERE ct.Closed = 0\n        ";
            // Customer ID
            if (typeof options.ID !== 'undefined') {
                if (options.ID) {
                    request.input('ID', sql.Int, options.ID);
                    query = "\n                            " + query + "\n                            AND ct.ID = @ID\n                        ";
                }
            }
            // User ID
            if (typeof options.userID !== 'undefined') {
                if (options.userID) {
                    request.input('UserID', sql.Int, options.userID);
                    query = "\n                            " + query + "\n                            AND ctsd.UserID = @UserID\n                        ";
                }
                else {
                    query = "\n                            " + query + "\n                            AND ctsd.UserID IS NULL\n                        ";
                }
            }
            // Customer ID
            if (typeof options.customerID !== 'undefined') {
                if (options.customerID) {
                    request.input('CustomerID', sql.Int, options.customerID);
                    query = "\n                            " + query + "\n                            AND ctsd.CustomerID = @CustomerID\n                        ";
                }
            }
            // Util.log(this.LOG_TAG,'findThread => query', query);
            return request.query(query);
        };
        // Close Thread
        this.closeThread = function (id) {
            return new sql.Request()
                .input('ID', sql.Int, id)
                .query('UPDATE Lookup_ChatThreads SET Closed = 1 WHERE ID = @ID');
        };
        // Creates New Thread for Customer Order
        this.createChatThread = function (type, typeDataID) {
            return new sql.Request()
                .input('Type', sql.VarChar, type)
                .input('TypeDataID', sql.Int, typeDataID)
                .query('INSERT INTO Lookup_ChatThreads (Type, TypeDataID, DateCreated) VALUES (@Type, @TypeDataID, GETUTCDATE()); SELECT @@IDENTITY AS ID');
        };
        // Creates Chat Threads Order Data
        this.createChatThreadOrderData = function (orderNumber, customerID) {
            return new sql.Request()
                .input('OrderNumber', sql.VarChar, orderNumber)
                .input('CustomerID', sql.Int, customerID)
                .query('INSERT INTO Lookup_ChatThreadOrderData (OrderNumber, CustomerID) VALUES (@OrderNumber, @CustomerID); SELECT @@IDENTITY AS ID');
        };
        // Creates Chat Threads Support Data
        this.createChatThreadsSupportData = function (options) {
            util_1.Util.log(_this.LOG_TAG, 'createChatThreadsSupportData', options);
            var query = null;
            query = new sql.Request()
                .input('CustomerID', sql.Int, options.customerID)
                .input('RestUserID', sql.Int, options.restUserID)
                .input('GuestID', sql.VarChar, options.GuestID)
                .input('GuestName', sql.VarChar, options.GuestName)
                .input('GuestEmail', sql.VarChar, options.GuestEmail)
                .input('GuestPhone', sql.VarChar, options.GuestPhone)
                .query('INSERT INTO Lookup_ChatThreadSupportData (CustomerID, RestUserID, GuestID, GuestName, GuestEmail, GuestPhone) VALUES (@CustomerID, @RestUserID, @GuestID, @GuestName, @GuestEmail, @GuestPhone); SELECT @@IDENTITY AS ID');
            return query;
        };
        // Find Chat Messages By ThreadID
        this.findChatMessagesByThreadID = function (threadID) {
            return new sql.Request()
                .input('ThreadID', sql.Int, threadID)
                .query('SELECT * FROM Lookup_ChatMessages WHERE ThreadID = @ThreadID');
        };
        // Creates New Chat Message
        this.createChatMessage = function (message) {
            new sql.Request()
                .input('ThreadID', sql.Int, message.ThreadID)
                .input('Message', sql.Text, message.Message)
                .input('SenderType', sql.VarChar, message.SenderType)
                .query('INSERT INTO Lookup_ChatMessages (ThreadID, Message, SenderType, DateCreated) VALUES (@ThreadID, @Message, @SenderType, GETUTCDATE()); SELECT @@IDENTITY AS ID')
                .then(function (result) {
                util_1.Util.log(_this.LOG_TAG, 'new inserted message', result.recordset);
            });
        };
        // Assign User to Thread Orders
        this.assignUserToThreadOrders = function (id, userID) {
            return new sql.Request()
                .input('ID', sql.Int, id)
                .input('UserID', sql.Int, userID)
                .query('UPDATE Lookup_ChatThreadOrderData SET UserID = @UserID WHERE ID = @ID');
        };
        // Assign User to Thread Support
        this.assignUserToThreadSupport = function (id, userID) {
            return new sql.Request()
                .input('ID', sql.Int, id)
                .input('UserID', sql.Int, userID)
                .query('UPDATE Lookup_ChatThreadSupportData SET UserID = @UserID WHERE ID = @ID');
        };
        // Get `MAX_CUSTOMERS_PER_USER`
        this.getMaxCustomersPerUser = function () {
            return new sql.Request()
                .query("SELECT * FROM Lookup_ChatSettings WHERE[Key] = 'MAX_CUSTOMERS_PER_USER'");
        };
        // Get Welcome Message for customer
        this.getWelcomeMessageForCustomer = function () {
            return new sql.Request()
                .query("SELECT * FROM Lookup_ChatTemplates WHERE[Key] = 'MSG_WELCOME'");
        };
        // Get Message templates
        this.getMessageTemplates = function () {
            return new sql.Request()
                .query("SELECT * FROM Lookup_ChatTemplates");
        };
        // Get Platform Company
        this.findPlatformCompany = function (columns, options) {
            util_1.Util.log(_this.LOG_TAG, 'findPlatformCompany', options);
            var request = new sql.Request();
            var query = "\n                        SELECT " + columns.join(',') + "\n                        FROM Lookup_PlatformCompanies\n                    ";
            // ID
            if (typeof options.ID !== 'undefined') {
                if (options.ID || options.ID === 0) {
                    request.input('ID', sql.Int, options.ID);
                    query = "\n                            " + query + "\n                            WHERE ID = @ID\n                        ";
                }
            }
            // Public Key
            if (typeof options.publicKey !== 'undefined') {
                if (options.publicKey) {
                    request.input('PublicKey', sql.VarChar, options.publicKey);
                    query = "\n                            " + query + "\n                            WHERE PublicKey = @PublicKey\n                        ";
                }
            }
            return request.query(query);
        };
    }
    return DB;
}());
exports.DB = DB;
