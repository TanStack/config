"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const optionalChaining = (data) => {
  return data?.maybe?.property;
};
console.log(Promise.resolve().then(() => require("./dynamic.cjs")));
exports.optionalChaining = optionalChaining;
//# sourceMappingURL=utils.cjs.map
