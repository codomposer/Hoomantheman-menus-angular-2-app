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
var moment = require("moment");
var database_model_1 = require("../model/database.model");
var util_1 = require("../util");
var orders_chat_model_1 = require("../model/orders-chat.model");
var support_chat_model_1 = require("../model/support-chat.model");
var chat_model_1 = require("../model/chat.model");
var ChatController = /** @class */ (function () {
    function ChatController(io, constants) {
        var _this = this;
        this.LOG_TAG = 'ChatController';
        this.db = new database_model_1.DB();
        this.userSocketList = new Array();
        this.customerSocketList = new Array();
        this.restUserSocketList = new Array();
        this.guestSocketList = new Array();
        /**
         * Middleware
         */
        this.useMiddleware = function (socket, next) { return __awaiter(_this, void 0, void 0, function () {
            var query, userType, isAuthenticated, errorCode, e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = socket.handshake.query;
                        util_1.Util.log(this.LOG_TAG, 'Socket middleware');
                        userType = query.userType;
                        isAuthenticated = false;
                        errorCode = null;
                        if (!(userType === 'user')) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.chat.authenticateUser(socket)];
                    case 2:
                        isAuthenticated = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        util_1.Util.log(this.LOG_TAG, 'authenticateUser Exception', e_1.message);
                        isAuthenticated = false;
                        errorCode = e_1.message;
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        if (!(query.threadType === this.constants.CHAT_THREAD_TYPE_ORDERS)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.ordersChat.useMiddleware(socket)];
                    case 6:
                        isAuthenticated = _a.sent();
                        return [3 /*break*/, 11];
                    case 7:
                        if (!(query.threadType === this.constants.CHAT_THREAD_TYPE_SUPPORT)) return [3 /*break*/, 11];
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, this.supportChat.useMiddleware(socket)];
                    case 9:
                        isAuthenticated = _a.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        e_2 = _a.sent();
                        util_1.Util.log(this.LOG_TAG, 'supportChat.useMiddleware Exception', e_2.message);
                        isAuthenticated = false;
                        errorCode = e_2.message;
                        return [3 /*break*/, 11];
                    case 11:
                        if (!isAuthenticated) {
                            next(new Error(JSON.stringify({
                                status: isAuthenticated,
                                code: errorCode
                            })));
                        }
                        else {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * On Connection
         */
        this.onConnection = function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var threadType, threadsOrderResult, threadsSupportResult;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // @ts-ignore
                        socket.joinedTimestamp = moment().unix();
                        threadType = socket.handshake.query.threadType;
                        util_1.Util.log('Connected client.', socket.userType);
                        if (!(socket.userType == 'user')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.db.findThreadsOrder({
                                userID: socket.user.ID
                            })];
                    case 1:
                        threadsOrderResult = _a.sent();
                        return [4 /*yield*/, this.db.findThreadsSupport({
                                userID: socket.user.ID
                            })];
                    case 2:
                        threadsSupportResult = _a.sent();
                        socket.threads = threadsOrderResult.recordset.concat(threadsSupportResult.recordset);
                        this.chat.connectUser(socket);
                        util_1.Util.log(this.LOG_TAG, 'User Threads', socket.threads.length);
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(threadType == this.constants.CHAT_THREAD_TYPE_ORDERS)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.ordersChat.onConnection(socket)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(threadType == this.constants.CHAT_THREAD_TYPE_SUPPORT)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.supportChat.onConnection(socket)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        // TODO: Verify security, Also check if a user has `active` socket connection, can he call the `on` event, and send messages to some other threads
                        socket
                            .on('send-message', function (data) {
                            _this.chat.onSendMessage(socket, data);
                        })
                            .on('get-thread-messages', function (data) {
                            _this.chat.onGetThreadMessages(socket, data);
                        })
                            .on('close-thread', function (data) {
                            _this.chat.onCloseThread(socket, data);
                        })
                            .on('disconnect', function () {
                            _this.chat.onDisconnect(socket);
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.constants = constants;
        this.nps = io.of('/chat');
        this.chat = new chat_model_1.Chat(this.nps, this.constants, this.db, this.guestSocketList, this.customerSocketList, this.restUserSocketList, this.userSocketList);
        this.ordersChat = new orders_chat_model_1.OrdersChat(this.chat, this.constants, this.db);
        this.supportChat = new support_chat_model_1.SupportChat(this.chat, this.constants, this.db);
        this.nps.use(this.useMiddleware)
            .on('connection', this.onConnection);
    }
    return ChatController;
}());
exports.ChatController = ChatController;
