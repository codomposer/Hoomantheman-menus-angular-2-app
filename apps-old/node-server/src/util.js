"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var Util = /** @class */ (function () {
    function Util(constants) {
        this.constants = constants;
    }
    Util.replaceAll = function (str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    };
    Util.isEmail = function (email) {
        var re = constants_1.Constants.PATTERN_EMAIL;
        return re.test(email);
    };
    Util.isNumberOnly = function (text) {
        return /^\d+$/.test(text);
    };
    Util.isPhone = function (text) {
        return constants_1.Constants.PATTERN_PHONE.test(text);
    };
    Util.isEmpty = function (val) {
        return !val || !val.toString().length;
    };
    Util.isDefined = function (value) {
        return typeof value !== 'undefined' && value;
    };
    Util.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (constants_1.Constants.DEBUG_LOG) {
            args.unshift(Math.round(Math.random() * 100000000));
            console.log.apply(console, args);
        }
    };
    return Util;
}());
exports.Util = Util;
