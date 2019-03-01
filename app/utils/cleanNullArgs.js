"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cleanNullArgs = function (args) {
    var notNullObj = {};
    Object.keys(args).forEach(function (key) {
        if (args[key] !== null) {
            notNullObj[key] = args[key];
        }
    });
    return notNullObj;
};
exports.default = cleanNullArgs;
//# sourceMappingURL=cleanNullArgs.js.map