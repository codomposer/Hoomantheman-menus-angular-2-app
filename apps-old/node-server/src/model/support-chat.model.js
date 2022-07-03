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
var util_1 = require("../util");
var SupportChat = /** @class */ (function () {
    /**
     * constructor
     */
    function SupportChat(chat, constants, db) {
        var _this = this;
        this.chat = chat;
        this.constants = constants;
        this.db = db;
        this.LOG_TAG = 'SupportChat';
        /**
         * Middleware Thread Type Orders
         */
        this.useMiddleware = function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var query, userType, isAuthenticated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = socket.handshake.query;
                        userType = query.userType;
                        util_1.Util.log(this.LOG_TAG, 'useMiddleware', userType);
                        isAuthenticated = false;
                        if (!(userType == 'guest')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.chat.authenticateGuest(socket)];
                    case 1:
                        isAuthenticated = _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(userType == 'customer')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.chat.authenticateCustomer(socket)];
                    case 3:
                        isAuthenticated = _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(userType == 'rest-user')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.chat.authenticateUser(socket)];
                    case 5:
                        isAuthenticated = _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, isAuthenticated];
                }
            });
        }); };
        /**
         * On Connection
         */
        this.onConnection = function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var user, supportDataResult, typeDataID, chatThreadResult, threadID, threadsResult, supportDataResult, typeDataID, chatThreadResult, threadID, threadsResult, supportDataResult, typeDataID, chatThreadResult, threadID, threadsResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.Util.log(this.LOG_TAG, 'onConnection', socket.userType);
                        if (!(socket.userType == 'guest')) return [3 /*break*/, 5];
                        user = socket.user;
                        return [4 /*yield*/, this.db.createChatThreadsSupportData({
                                GuestID: user.GuestID,
                                GuestName: user.FirstName,
                                GuestEmail: user.Email,
                                GuestPhone: user.Phone,
                            })];
                    case 1:
                        supportDataResult = _a.sent();
                        if (!(supportDataResult.recordset.length > 0)) return [3 /*break*/, 4];
                        typeDataID = supportDataResult.recordset[0].ID;
                        return [4 /*yield*/, this.db.createChatThread(this.constants.CHAT_THREAD_TYPE_SUPPORT, typeDataID)];
                    case 2:
                        chatThreadResult = _a.sent();
                        if (!(chatThreadResult.recordset.length > 0)) return [3 /*break*/, 4];
                        threadID = chatThreadResult.recordset[0].ID;
                        return [4 /*yield*/, this.db.findThreadsSupport({
                                ID: threadID
                            })];
                    case 3:
                        threadsResult = _a.sent();
                        socket.thread = threadsResult.recordset[0];
                        this.chat.connectGuest(socket);
                        util_1.Util.log('New Thread Created', threadsResult.recordset);
                        _a.label = 4;
                    case 4:
                        util_1.Util.log(this.LOG_TAG, 'orderDataResult');
                        return [3 /*break*/, 15];
                    case 5:
                        if (!(socket.userType == 'customer')) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.db.createChatThreadsSupportData({
                                customerID: socket.user.ID
                            })];
                    case 6:
                        supportDataResult = _a.sent();
                        if (!(supportDataResult.recordset.length > 0)) return [3 /*break*/, 9];
                        typeDataID = supportDataResult.recordset[0].ID;
                        return [4 /*yield*/, this.db.createChatThread(this.constants.CHAT_THREAD_TYPE_SUPPORT, typeDataID)];
                    case 7:
                        chatThreadResult = _a.sent();
                        if (!(chatThreadResult.recordset.length > 0)) return [3 /*break*/, 9];
                        threadID = chatThreadResult.recordset[0].ID;
                        return [4 /*yield*/, this.db.findThreadsSupport({
                                ID: threadID
                            })];
                    case 8:
                        threadsResult = _a.sent();
                        socket.thread = threadsResult.recordset[0];
                        this.chat.connectCustomer(socket);
                        util_1.Util.log('New Thread Created', threadsResult.recordset);
                        _a.label = 9;
                    case 9:
                        // }
                        util_1.Util.log(this.LOG_TAG, 'orderDataResult');
                        return [3 /*break*/, 15];
                    case 10:
                        if (!(socket.userType == 'rest-user')) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.db.createChatThreadsSupportData({
                                restUserID: socket.user.ID
                            })];
                    case 11:
                        supportDataResult = _a.sent();
                        if (!(supportDataResult.recordset.length > 0)) return [3 /*break*/, 14];
                        typeDataID = supportDataResult.recordset[0].ID;
                        return [4 /*yield*/, this.db.createChatThread(this.constants.CHAT_THREAD_TYPE_SUPPORT, typeDataID)];
                    case 12:
                        chatThreadResult = _a.sent();
                        if (!(chatThreadResult.recordset.length > 0)) return [3 /*break*/, 14];
                        threadID = chatThreadResult.recordset[0].ID;
                        return [4 /*yield*/, this.db.findThreadsSupport({
                                ID: threadID
                            })];
                    case 13:
                        threadsResult = _a.sent();
                        socket.thread = threadsResult.recordset[0];
                        this.chat.connectRestUser(socket);
                        util_1.Util.log('New Thread Created', threadsResult.recordset);
                        _a.label = 14;
                    case 14:
                        util_1.Util.log(this.LOG_TAG, 'orderDataResult');
                        _a.label = 15;
                    case 15: return [2 /*return*/];
                }
            });
        }); };
    }
    return SupportChat;
}());
exports.SupportChat = SupportChat;
