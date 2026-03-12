const require_HelloWorld = require("./components/HelloWorld.cjs");
let vue = require("vue");
//#region src/App.vue?vue&type=script&setup=true&lang.ts
var App_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "App",
	setup(__props) {
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)(require_HelloWorld.default, { msg: "Vite + Vue" });
		};
	}
});
//#endregion
exports.default = App_vue_vue_type_script_setup_true_lang_default;

//# sourceMappingURL=App.vue_vue_type_script_setup_true_lang.cjs.map