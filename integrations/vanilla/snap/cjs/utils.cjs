"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const optionalChaining = (data) => {
  var _a;
  return (_a = data == null ? void 0 : data.maybe) == null ? void 0 : _a.property;
};
console.log(Promise.resolve().then(() => require("./dynamic.cjs")));
exports.optionalChaining = optionalChaining;
//# sourceMappingURL=utils.cjs.map
