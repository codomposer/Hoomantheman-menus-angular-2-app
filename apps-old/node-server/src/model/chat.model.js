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
var crypto = require("crypto");
var util_1 = require("../util");
var chat_message_model_1 = require("./chat-message.model");
var guest_model_1 = require("./guest.model");
var Chat = /** @class */ (function () {
    /**
     * constructor
     */
    function Chat(nps, constants, db, guestSocketList, customerSocketList, restUserSocketList, userSocketList) {
        var _this = this;
        this.nps = nps;
        this.constants = constants;
        this.db = db;
        this.guestSocketList = guestSocketList;
        this.customerSocketList = customerSocketList;
        this.restUserSocketList = restUserSocketList;
        this.userSocketList = userSocketList;
        this.LOG_TAG = 'SupportChat';
        this.isAssigningToUser = false;
        // Authenticate Guest
        this.authenticateGuest = function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var query, isAuthenticated, findPlatformCompanyOptions, platformCompanyResult, platformCompany, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.Util.log(this.LOG_TAG, 'authenticateCustomer');
                        query = socket.handshake.query;
                        isAuthenticated = false;
                        if (!(util_1.Util.isDefined(query.name) && !util_1.Util.isEmpty(query.name) && util_1.Util.isDefined(query.email) && util_1.Util.isEmail(query.email))) return [3 /*break*/, 2];
                        findPlatformCompanyOptions = {};
                        // Platform
                        if (util_1.Util.isDefined(query.publicKey) && !util_1.Util.isEmpty(query.publicKey)) {
                            findPlatformCompanyOptions.publicKey = query.publicKey;
                        }
                        // MarketPlace
                        else {
                            findPlatformCompanyOptions.ID = 0;
                        }
                        util_1.Util.log('findPlatformCompanyOptions', findPlatformCompanyOptions);
                        return [4 /*yield*/, this.db.findPlatformCompany(['ID', 'EnableGuestSupportChat', 'EnableLoggedInSupportChat'], findPlatformCompanyOptions)];
                    case 1:
                        platformCompanyResult = _a.sent();
                        if (platformCompanyResult.recordset.length > 0) {
                            platformCompany = platformCompanyResult.recordset[0];
                            if (platformCompany.EnableGuestSupportChat) {
                                util_1.Util.log('platfromCompanyResult', platformCompany);
                                user = new guest_model_1.Guest();
                                user.GuestID = crypto.randomBytes(16).toString('hex');
                                user.FirstName = query.name;
                                user.Email = query.email;
                                user.Phone = query.phone || null;
                                user.PlatformCompanyID = platformCompany.ID;
                                socket.userType = query.userType;
                                socket.user = user;
                                isAuthenticated = true;
                            }
                            util_1.Util.log(this.LOG_TAG, 'platformCompany', platformCompany);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, isAuthenticated];
                }
            });
        }); };
        // Authenticate Customer
        this.authenticateCustomer = function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var query, userType, authCode, isAuthenticated, customerResult, platformCompanyResult, platformCompany;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.Util.log(this.LOG_TAG, 'authenticateCustomer');
                        query = socket.handshake.query;
                        userType = query.userType;
                        authCode = query.authCode;
                        isAuthenticated = false;
                        return [4 /*yield*/, this.db.findCustomerByAuthCode(authCode)];
                    case 1:
                        customerResult = _a.sent();
                        util_1.Util.log(this.LOG_TAG, 'middlewareThreadTypeOrders', 'customerResult', customerResult);
                        if (!(customerResult.recordset.length > 0)) return [3 /*break*/, 3];
                        socket.userType = userType;
                        socket.user = customerResult.recordset[0];
                        util_1.Util.log(this.LOG_TAG, 'PlatformCompanyID', socket.user.PlatformCompanyID);
                        return [4 /*yield*/, this.db.findPlatformCompany(['EnableGuestSupportChat', 'EnableLoggedInSupportChat'], {
                                ID: socket.user.PlatformCompanyID
                            })];
                    case 2:
                        platformCompanyResult = _a.sent();
                        util_1.Util.log(this.LOG_TAG, 'platformCompanyResult', platformCompanyResult);
                        if (platformCompanyResult.recordset.length > 0) {
                            platformCompany = platformCompanyResult.recordset[0];
                            if (platformCompany.EnableLoggedInSupportChat) {
                                isAuthenticated = true;
                            }
                            util_1.Util.log(this.LOG_TAG, 'platformCompany', platformCompany);
                        }
                        util_1.Util.log(this.LOG_TAG, 'findCustomerByAuthCode');
                        _a.label = 3;
                    case 3: return [2 /*return*/, isAuthenticated];
                }
            });
        }); };
        // Authenticate User
        this.authenticateUser = function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var query, userType, authCode, isAuthenticated, userResult, userRestDataResult, userRestaurantData, platformCompanyResult, platformCompany;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.Util.log(this.LOG_TAG, 'authenticateUser');
                        query = socket.handshake.query;
                        userType = query.userType;
                        authCode = query.authCode;
                        isAuthenticated = false;
                        return [4 /*yield*/, this.db.findUserByAuthCode(authCode)];
                    case 1:
                        userResult = _a.sent();
                        if (!(userResult.recordset.length > 0)) return [3 /*break*/, 6];
                        socket.userType = userType;
                        socket.user = userResult.recordset[0];
                        return [4 /*yield*/, this.db.findUserRestData(socket.user.ID)];
                    case 2:
                        userRestDataResult = _a.sent();
                        if (!(userRestDataResult.recordset.length > 0)) return [3 /*break*/, 4];
                        userRestaurantData = userRestDataResult.recordset[0];
                        if (userType == 'user') {
                            socket.user.PlatformCompanyID = userRestaurantData.PlatformCompanyID;
                        }
                        else if (userType == 'rest-user') {
                            socket.user.PlatformCompanyID = 0;
                        }
                        util_1.Util.log(this.LOG_TAG, 'PlatformCompanyID', socket.user.PlatformCompanyID);
                        return [4 /*yield*/, this.db.findPlatformCompany(['EnableGuestSupportChat', 'EnableLoggedInSupportChat'], {
                                ID: socket.user.PlatformCompanyID
                            })];
                    case 3:
                        platformCompanyResult = _a.sent();
                        util_1.Util.log(this.LOG_TAG, 'platformCompanyResult', platformCompanyResult);
                        if (platformCompanyResult.recordset.length > 0) {
                            platformCompany = platformCompanyResult.recordset[0];
                            if (userType == 'user') {
                                if (platformCompany.EnableGuestSupportChat || platformCompany.EnableLoggedInSupportChat) {
                                    isAuthenticated = true;
                                }
                            }
                            else if (userType == 'rest-user') {
                                if (platformCompany.EnableLoggedInSupportChat) {
                                    isAuthenticated = true;
                                }
                            }
                            util_1.Util.log(this.LOG_TAG, 'platformCompany', platformCompany);
                        }
                        return [3 /*break*/, 5];
                    case 4: throw new Error('USER_COMPANY_NOT_FOUND');
                    case 5:
                        util_1.Util.log(this.LOG_TAG, 'findUserByAuthCode');
                        return [3 /*break*/, 7];
                    case 6: throw new Error('USER_NOT_FOUND');
                    case 7:
                        util_1.Util.log(this.LOG_TAG, 'isAuthenticated', isAuthenticated);
                        return [2 /*return*/, isAuthenticated];
                }
            });
        }); };
        // On Send Message
        this.onSendMessage = function (socket, data) {
            util_1.Util.log(_this.LOG_TAG, 'onSendMessage');
            if (socket.userType == 'customer' || socket.userType == 'guest' || socket.userType == 'rest-user') {
                if (_this.hasJoinedRoom(socket, socket.thread.ID)) {
                    var message = new chat_message_model_1.ChatMessage();
                    message.Message = data.message;
                    message.ThreadID = socket.thread.ID;
                    message.SenderType = socket.userType;
                    _this.sendMessageToThread(socket, socket.thread, message);
                }
            }
            else if (socket.userType == 'user') {
                var threadID_1 = data.threadID;
                var items = socket.threads.filter(function (t) { return t.ID == threadID_1; });
                if (_this.hasJoinedRoom(socket, threadID_1) && items.length > 0) {
                    var thread = items[0];
                    var message = new chat_message_model_1.ChatMessage();
                    message.ID = 0;
                    message.Message = data.message;
                    message.ThreadID = thread.ID;
                    message.SenderType = socket.userType;
                    _this.sendMessageToThread(socket, thread, message);
                }
            }
        };
        // On Get thread messages
        this.onGetThreadMessages = function (socket, data) {
            util_1.Util.log(_this.LOG_TAG, 'onGetThreadMessages');
            var threadID = data.threadID;
            if (_this.hasJoinedRoom(socket, threadID)) {
                _this.db.findChatMessagesByThreadID(threadID).then(function (result) {
                    socket.emit('send-thread-messages', { messages: result.recordset });
                });
            }
        };
        // On Close thread
        this.onCloseThread = function (socket, data) { return __awaiter(_this, void 0, void 0, function () {
            var threadID, threads, list, thread_1, index, customerSocketList, customerSocket, customerSocketIndex, guestSocketList, guestSocket, guestSocketIndex, restUserSocketList, restUserSocket, restUserSocketIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.Util.log(this.LOG_TAG, 'onCloseThread');
                        threadID = data.threadID;
                        if (!(socket.userType == 'user' && this.hasJoinedRoom(socket, threadID))) return [3 /*break*/, 2];
                        threads = socket.threads || [];
                        list = threads.filter(function (t) { return t.ID == threadID; });
                        if (!(list.length > 0)) return [3 /*break*/, 2];
                        thread_1 = list[0];
                        index = threads.indexOf(thread_1);
                        if (!(index > -1)) return [3 /*break*/, 2];
                        threads.splice(index, 1);
                        return [4 /*yield*/, this.db.closeThread(threadID)];
                    case 1:
                        _a.sent();
                        this.nps.to("thread-" + threadID).emit('thread-closed', { threadID: threadID });
                        // Customer
                        if (thread_1.CustomerID) {
                            customerSocketList = this.customerSocketList.filter(function (c) { return c.user.ID == thread_1.CustomerID; });
                            if (customerSocketList.length > 0) {
                                customerSocket = customerSocketList[0];
                                customerSocketIndex = this.customerSocketList.indexOf(customerSocket);
                                this.customerSocketList.splice(customerSocketIndex, 1);
                                customerSocket.leave("thread-" + threadID);
                                customerSocket.disconnect();
                            }
                        }
                        // Guest
                        else if (thread_1.GuestID) {
                            guestSocketList = this.guestSocketList.filter(function (c) { return c.user.GuestID == thread_1.GuestID; });
                            if (guestSocketList.length > 0) {
                                guestSocket = guestSocketList[0];
                                guestSocketIndex = this.guestSocketList.indexOf(guestSocket);
                                this.guestSocketList.splice(guestSocketIndex, 1);
                                guestSocket.leave("thread-" + threadID);
                                guestSocket.disconnect();
                            }
                        }
                        // Rest User
                        else if (thread_1.RestUserID) {
                            restUserSocketList = this.restUserSocketList.filter(function (c) { return c.user.ID == thread_1.RestUserID; });
                            if (restUserSocketList.length > 0) {
                                restUserSocket = restUserSocketList[0];
                                restUserSocketIndex = this.restUserSocketList.indexOf(restUserSocket);
                                this.restUserSocketList.splice(restUserSocketIndex, 1);
                                restUserSocket.leave("thread-" + threadID);
                                restUserSocket.disconnect();
                            }
                        }
                        socket.leave("thread-" + threadID);
                        this.assignChatsToUser();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        // On Disconnect
        this.onDisconnect = function (socket) {
            util_1.Util.log(_this.LOG_TAG, 'onDisconnect', socket.userType);
            if (socket.userType == 'guest') {
                var index = _this.guestSocketList.indexOf(socket);
                if (index > -1) {
                    _this.guestSocketList.splice(index, 1);
                    _this.emitThreadOnlineUsers(socket.thread);
                }
            }
            // When `customer` of `user` disconnects then remove them from `list` and from `rooms`
            else if (socket.userType == 'customer') {
                var index = _this.customerSocketList.indexOf(socket);
                if (index > -1) {
                    _this.customerSocketList.splice(index, 1);
                    _this.emitThreadOnlineUsers(socket.thread);
                }
            }
            // When `rest-user` of `user` disconnects then remove them from `list` and from `rooms`
            else if (socket.userType == 'rest-user') {
                var index = _this.restUserSocketList.indexOf(socket);
                if (index > -1) {
                    _this.restUserSocketList.splice(index, 1);
                    _this.emitThreadOnlineUsers(socket.thread);
                }
            }
            else if (socket.userType == 'user') {
                var index = _this.userSocketList.indexOf(socket);
                if (index > -1) {
                    _this.userSocketList.splice(index, 1);
                    var threads = socket.threads || [];
                    for (var _i = 0, threads_1 = threads; _i < threads_1.length; _i++) {
                        var thread = threads_1[_i];
                        _this.emitThreadOnlineUsers(thread);
                    }
                }
            }
            _this.assignChatsToUser();
            util_1.Util.log(_this.LOG_TAG, 'disconnect', socket.rooms);
        };
        // Connect Guest
        this.connectGuest = function (socket) {
            util_1.Util.log(_this.LOG_TAG, 'connectGuest', socket.thread);
            socket.join("thread-" + socket.thread.ID);
            _this.guestSocketList.push(socket);
            socket.emit('connected', { thread: socket.thread });
            _this.assignChatsToUser();
            _this.emitThreadOnlineUsers(socket.thread);
        };
        // Connect Customer
        this.connectCustomer = function (socket) {
            util_1.Util.log(_this.LOG_TAG, 'connectCustomer', socket.thread);
            socket.join("thread-" + socket.thread.ID);
            _this.customerSocketList.push(socket);
            socket.emit('connected', { thread: socket.thread });
            _this.assignChatsToUser();
            _this.emitThreadOnlineUsers(socket.thread);
        };
        // Connect Rest User
        this.connectRestUser = function (socket) {
            util_1.Util.log(_this.LOG_TAG, 'connectRestUser', socket.thread);
            socket.join("thread-" + socket.thread.ID);
            _this.restUserSocketList.push(socket);
            socket.emit('connected', { thread: socket.thread });
            _this.assignChatsToUser();
            _this.emitThreadOnlineUsers(socket.thread);
        };
        // Connect User
        this.connectUser = function (socket) {
            util_1.Util.log(_this.LOG_TAG, '_connectUser');
            // @ts-ignore
            socket.lastMessageSent = moment().utc().format();
            for (var _i = 0, _a = socket.threads; _i < _a.length; _i++) {
                var thread = _a[_i];
                socket.join("thread-" + thread.ID);
            }
            _this.userSocketList.push(socket);
            socket.emit('connected', { threads: socket.threads });
            _this.assignChatsToUser();
            for (var _b = 0, _c = socket.threads; _b < _c.length; _b++) {
                var thread = _c[_b];
                _this.emitThreadOnlineUsers(thread);
            }
            _this.emitMessageTemplates(socket);
        };
        // TODO: Verify security that whether some one can send message to a thread without joining it, that means user can have a `active socket connection, but can try to send message to another thread.
        // Send Message to All users of Thread
        this.sendMessageToThread = function (senderSocket, thread, message) {
            // @ts-ignore
            var sentTime = moment().utc().format();
            senderSocket.lastMessageSent = sentTime;
            message.DateCreated = sentTime;
            if (senderSocket.userType == 'user') {
                var messageText = message.Message;
                if (thread.Type == _this.constants.CHAT_THREAD_TYPE_ORDERS) {
                    var chatThreadOrders = thread;
                    // Check if message has `CustomerName` placeholder
                    if (messageText.indexOf('${CustomerName}') > -1) {
                        messageText = messageText.replace('${CustomerName}', chatThreadOrders.CustomerName);
                    }
                    // Check if message has `UserName` placeholder
                    if (messageText.indexOf('${UserName}') > -1) {
                        messageText = messageText.replace('${UserName}', chatThreadOrders.UserName);
                    }
                }
                else if (thread.Type == _this.constants.CHAT_THREAD_TYPE_SUPPORT) {
                    var chatThreadSupport = thread;
                    // Check if message has `CustomerName` placeholder
                    if (messageText.indexOf('${CustomerName}') > -1) {
                        messageText = messageText.replace('${CustomerName}', chatThreadSupport.RestUserID ? chatThreadSupport.RestUserName : chatThreadSupport.CustomerID ? chatThreadSupport.CustomerName : chatThreadSupport.GuestName);
                    }
                    // Check if message has `UserName` placeholder
                    if (messageText.indexOf('${UserName}') > -1) {
                        messageText = messageText.replace('${UserName}', chatThreadSupport.UserName);
                    }
                }
                message.Message = messageText;
            }
            _this.nps.to("thread-" + message.ThreadID).emit('receive-message', { message: message });
            _this.db.createChatMessage(message);
        };
        this.assignChatsToUserHelper = function (maxCustomersPerUser) { return __awaiter(_this, void 0, void 0, function () {
            var assigning, socketList, selectedSocket_1, userSocket_1, userSocketList, _i, userSocketList_1, socket;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.Util.log(this.LOG_TAG, this.userSocketList.length + " User(s) are online");
                        assigning = false;
                        socketList = this.guestSocketList.concat(this.customerSocketList).concat(this.restUserSocketList);
                        socketList.sort(function (s1, s2) { return s1.joinedTimestamp - s2.joinedTimestamp; });
                        socketList = socketList.filter(function (c) { return c.thread.UserID == null; });
                        if (!(socketList.length > 0)) return [3 /*break*/, 7];
                        selectedSocket_1 = socketList[0];
                        // Util.log(this.LOG_TAG, 'selectedSocket', selectedSocket);
                        util_1.Util.log(this.LOG_TAG, 'Person not assigned', socketList);
                        userSocket_1 = null;
                        userSocketList = this.userSocketList.filter(function (u) { return u.user.PlatformCompanyID == selectedSocket_1.user.PlatformCompanyID; });
                        util_1.Util.log(this.LOG_TAG, 'Users to assigned', userSocketList);
                        // selectedSocket.userType
                        for (_i = 0, userSocketList_1 = userSocketList; _i < userSocketList_1.length; _i++) {
                            socket = userSocketList_1[_i];
                            if (!userSocket_1) {
                                userSocket_1 = socket;
                            }
                            else {
                                if (socket.threads.length < userSocket_1.threads.length) {
                                    userSocket_1 = socket;
                                }
                                else if (socket.threads.length == userSocket_1.threads.length && socket.lastMessageSent < userSocket_1.lastMessageSent) {
                                    userSocket_1 = socket;
                                }
                            }
                        }
                        if (userSocket_1) {
                            util_1.Util.log(this.LOG_TAG, "User socket limit " + userSocket_1.threads.length + " / " + maxCustomersPerUser);
                        }
                        if (!(userSocket_1 && userSocket_1.threads.length < maxCustomersPerUser)) return [3 /*break*/, 6];
                        assigning = true;
                        // Assign the customer
                        selectedSocket_1.thread.UserID = userSocket_1.user.ID;
                        selectedSocket_1.thread.UserName = (userSocket_1.user.FirstName || '') + ' ' + (userSocket_1.user.LastName || '');
                        // Push the thread in user threads
                        userSocket_1.threads.push(selectedSocket_1.thread);
                        userSocket_1.join("thread-" + selectedSocket_1.thread.ID);
                        // Emit to customer that user is assigned
                        selectedSocket_1.emit('user-assigned', { thread: selectedSocket_1.thread });
                        // Emit to user that customer is assigned
                        userSocket_1.emit('new-thread', { thread: selectedSocket_1.thread });
                        this.emitThreadOnlineUsers(selectedSocket_1.thread);
                        // Send Welcome message to customer
                        this.db.getWelcomeMessageForCustomer()
                            .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var item, messageText, message;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (result.recordset.length > 0) {
                                            item = result.recordset[0];
                                            messageText = item.Value;
                                            message = new chat_message_model_1.ChatMessage();
                                            message.Message = messageText;
                                            message.ThreadID = selectedSocket_1.thread.ID;
                                            message.SenderType = userSocket_1.userType;
                                            this.sendMessageToThread(userSocket_1, selectedSocket_1.thread, message);
                                        }
                                        return [4 /*yield*/, this.assignChatsToUserHelper(maxCustomersPerUser)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        if (!(selectedSocket_1.thread.Type == this.constants.CHAT_THREAD_TYPE_ORDERS)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.db.assignUserToThreadOrders(selectedSocket_1.thread.TypeDataID, selectedSocket_1.thread.UserID)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(selectedSocket_1.thread.Type == this.constants.CHAT_THREAD_TYPE_SUPPORT)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.db.assignUserToThreadSupport(selectedSocket_1.thread.TypeDataID, selectedSocket_1.thread.UserID)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.assignChatsToUserHelper(maxCustomersPerUser)];
                    case 5:
                        _a.sent();
                        util_1.Util.log(this.LOG_TAG, 'User with least people', userSocket_1.user.FirstName, userSocket_1.threads.length);
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        util_1.Util.log(this.LOG_TAG, 'All people are assigned');
                        _a.label = 8;
                    case 8:
                        if (!assigning) {
                            this.isAssigningToUser = false;
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        // Assign Chat to User, If there is any
        this.assignChatsToUser = function () { return __awaiter(_this, void 0, void 0, function () {
            var result, maxCustomersPerUser, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        util_1.Util.log(this.LOG_TAG, '_assignChatToUser');
                        if (!(!this.isAssigningToUser && this.userSocketList.length > 0 && (this.guestSocketList.length > 0 || this.customerSocketList.length > 0 || this.restUserSocketList.length > 0))) return [3 /*break*/, 2];
                        this.isAssigningToUser = true;
                        return [4 /*yield*/, this.db.getMaxCustomersPerUser()];
                    case 1:
                        result = _a.sent();
                        maxCustomersPerUser = this.constants.DEFAULT_MAX_CUSTOMERS_PER_USER;
                        if (result.recordset.length > 0) {
                            item = result.recordset[0];
                            maxCustomersPerUser = item.Value;
                        }
                        this.assignChatsToUserHelper(maxCustomersPerUser);
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.isAssigningToUser) {
                            util_1.Util.log(this.LOG_TAG, "Already Assigning users");
                        }
                        else if (this.userSocketList.length == 0) {
                            util_1.Util.log(this.LOG_TAG, "No Users is online");
                        }
                        else if (this.customerSocketList.length == 0) {
                            util_1.Util.log(this.LOG_TAG, "No Customer is online");
                        }
                        else if (this.guestSocketList.length == 0) {
                            util_1.Util.log(this.LOG_TAG, "No Guest is online");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.hasJoinedRoom = function (socket, threadID) {
            return typeof socket.rooms["thread-" + threadID] !== 'undefined';
        };
        this.emitThreadOnlineUsers = function (thread) {
            _this.nps.to("thread-" + thread.ID).emit('thread-online-users', {
                threadID: thread.ID,
                guest: {
                    ID: thread.GuestID,
                    online: _this.isOnline('guest', thread.GuestID, thread.ID),
                },
                customer: {
                    ID: thread.CustomerID,
                    online: _this.isOnline('customer', thread.CustomerID, thread.ID),
                },
                user: {
                    ID: thread.UserID,
                    online: _this.isOnline('user', thread.UserID, thread.ID),
                },
                restUser: {
                    ID: thread.RestUserID,
                    online: _this.isOnline('rest-user', thread.RestUserID, thread.ID),
                },
            });
        };
        this.isOnline = function (type, id, threadID) {
            util_1.Util.log(_this.LOG_TAG, 'isOnline', type, id, threadID);
            var isOnline = false;
            if (!id)
                return isOnline;
            if (type == 'guest') {
                var items = _this.guestSocketList.filter(function (s) { return s.user.GuestID == id; });
                if (items.length > 0) {
                    var guest = items[0];
                    if (guest.thread.ID == threadID) {
                        isOnline = true;
                    }
                }
            }
            else if (type == 'customer') {
                var items = _this.customerSocketList.filter(function (s) { return s.user.ID == id; });
                if (items.length > 0) {
                    var customer = items[0];
                    if (customer.thread.ID == threadID) {
                        isOnline = true;
                    }
                }
            }
            else if (type == 'user') {
                var items = _this.userSocketList.filter(function (s) { return s.user.ID == id; });
                if (items.length > 0) {
                    var user = items[0];
                    var tItems = user.threads.filter(function (t) { return t.ID == threadID; });
                    if (tItems.length > 0) {
                        isOnline = true;
                    }
                }
            }
            else if (type == 'rest-user') {
                var items = _this.restUserSocketList.filter(function (s) { return s.user.ID == id; });
                if (items.length > 0) {
                    var restUser = items[0];
                    if (restUser.thread.ID == threadID) {
                        isOnline = true;
                    }
                }
            }
            return isOnline;
        };
        this.emitMessageTemplates = function (socket) {
            _this.db.getMessageTemplates()
                .then(function (result) {
                socket.emit('send-message-templates', { messageTemplates: result.recordset });
            });
        };
        util_1.Util.log(this.LOG_TAG, 'constructor');
    }
    return Chat;
}());
exports.Chat = Chat;
