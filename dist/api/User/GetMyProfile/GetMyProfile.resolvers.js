"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var privateResolver_1 = __importDefault(require("../../../utils/privateResolver"));
var resolvers = {
    Query: {
        GetMyProfile: privateResolver_1.default(function (_, __, _a) {
            var req = _a.req;
            try {
                var user = req.user;
                return {
                    ok: true,
                    error: null,
                    user: user
                };
            }
            catch (error) {
                return {
                    ok: false,
                    error: "Can't get user information",
                    user: null
                };
            }
        })
    }
};
exports.default = resolvers;
//# sourceMappingURL=GetMyProfile.resolvers.js.map