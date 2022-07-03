"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var chat_thread_model_1 = require("./chat-thread.model");
var ChatThreadSupport = /** @class */ (function (_super) {
    __extends(ChatThreadSupport, _super);
    function ChatThreadSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChatThreadSupport;
}(chat_thread_model_1.ChatThread));
exports.ChatThreadSupport = ChatThreadSupport;
