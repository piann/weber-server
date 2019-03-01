"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tools_1 = require("graphql-tools");
var path = __importStar(require("path"));
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var allTypes = merge_graphql_schemas_1.fileLoader(path.join(__dirname, "./api/**/*.graphql"));
var allResolvers = merge_graphql_schemas_1.fileLoader(path.join(__dirname, "./api/**/*.resolvers.*"));
var mergedTypes = merge_graphql_schemas_1.mergeTypes(allTypes);
var mergedResolvers = merge_graphql_schemas_1.mergeResolvers(allResolvers);
var schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: mergedTypes,
    resolvers: mergedResolvers
});
exports.default = schema;
//# sourceMappingURL=schema.js.map