Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_use_client = require("./use-client.cjs");
const require_nested = require("./nested/nested.cjs");
exports.Component = require_use_client.Component;
exports.test = require_nested.test;
var _tanstack_query_core = require("@tanstack/query-core");
Object.keys(_tanstack_query_core).forEach(function(k) {
	if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function() {
			return _tanstack_query_core[k];
		}
	});
});
