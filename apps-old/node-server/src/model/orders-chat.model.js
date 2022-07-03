"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var util_1 = require("../util");
var constants_1 = require("../constants");
var OrdersChat = /** @class */ (function () {
    /**
     * constructor
     */
    function OrdersChat(chat, constants, db) {
        var _this = this;
        this.chat = chat;
        this.constants = constants;
        this.db = db;
        this.LOG_TAG = 'OrdersChat';
        /**
         * Middleware Thread Type Orders
         */
        this.useMiddleware = function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var query, userType, authCode, isAuthenticated, isCustomerAuthenticated, customerOrderResult, orderDB, url, ordersResponse, orderAPI;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.Util.log(this.LOG_TAG, 'middlewareThreadTypeOrders');
                        query = socket.handshake.query;
                        userType = query.userType;
                        authCode = query.authCode;
                        isAuthenticated = false;
                        if (!(userType === 'customer')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.chat.authenticateCustomer(socket)];
                    case 1:
                        isCustomerAuthenticated = _a.sent();
                        if (!isCustomerAuthenticated) return [3 /*break*/, 4];
                        socket.orderNumber = query.orderNumber;
                        return [4 /*yield*/, this.db.findCustomerOrder(socket.orderNumber, socket.user.ID)];
                    case 2:
                        customerOrderResult = _a.sent();
                        if (!(customerOrderResult.recordset.length > 0)) return [3 /*break*/, 4];
                        orderDB = customerOrderResult.recordset[0];
                        url = constants_1.Constants.API_URL + "/api/b/w.aspx?key=API_TEST_KEY&o=" + orderDB.ID + "&x=" + authCode + "&i=" + socket.user.ID;
                        util_1.Util.log(this.LOG_TAG, 'ordersURL', url);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 3:
                        ordersResponse = _a.sent();
                        if (ordersResponse.data instanceof Array && ordersResponse.data.length > 0) {
                            orderAPI = ordersResponse.data[0];
                            isAuthenticated = orderAPI.AllowChat;
                        }
                        util_1.Util.log(this.LOG_TAG, 'ordersResponse', ordersResponse.data);
                        _a.label = 4;
                    case 4:
                        util_1.Util.log(this.LOG_TAG, 'middlewareThreadTypeOrders', 'isAuthenticated', isAuthenticated);
                        _a.label = 5;
                    case 5: return [2 /*return*/, isAuthenticated];
                }
            });
        }); };
        /**
         * On Connection
         */
        this.onConnection = function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var threadsResult, orderDataResult, typeDataID, threadsResult_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(socket.userType == 'customer')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.db.findThreadsOrder({
                                orderNumber: socket.orderNumber,
                                customerID: socket.user.ID
                            })];
                    case 1:
                        threadsResult = _a.sent();
                        if (!(threadsResult.recordset.length > 0)) return [3 /*break*/, 2];
                        socket.thread = threadsResult.recordset[0];
                        this.chat.connectCustomer(socket);
                        util_1.Util.log('Thread Already Exist', threadsResult.recordset);
                        return [3 /*break*/, 7];
                    case 2:
                        // If thread DONT exists
                        util_1.Util.log('Thread NOT Exist', threadsResult.recordset);
                        return [4 /*yield*/, this.db.createChatThreadOrderData(socket.orderNumber, socket.user.ID)];
                    case 3:
                        orderDataResult = _a.sent();
                        if (!(orderDataResult.recordset.length > 0)) return [3 /*break*/, 6];
                        typeDataID = orderDataResult.recordset[0].ID;
                        return [4 /*yield*/, this.db.createChatThread(this.constants.CHAT_THREAD_TYPE_ORDERS, typeDataID)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.db.findThreadsOrder({
                                orderNumber: socket.orderNumber,
                                customerID: socket.user.ID
                            })];
                    case 5:
                        threadsResult_1 = _a.sent();
                        socket.thread = threadsResult_1.recordset[0];
                        this.chat.connectCustomer(socket);
                        util_1.Util.log('New Thread Created', threadsResult_1.recordset);
                        _a.label = 6;
                    case 6:
                        util_1.Util.log(this.LOG_TAG, 'orderDataResult', orderDataResult.recordset[0]);
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    return OrdersChat;
}());
exports.OrdersChat = OrdersChat;
