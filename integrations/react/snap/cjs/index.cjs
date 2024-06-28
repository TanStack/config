"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const queryCore = require("@tanstack/query-core");
const useClient = require("./use-client.cjs");
const nested = require("./nested/nested.cjs");
exports.Component = useClient.Component;
exports.test = nested.test;
Object.keys(queryCore).forEach((k) => {
  if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: () => queryCore[k]
  });
});
//# sourceMappingURL=index.cjs.map
