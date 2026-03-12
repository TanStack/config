let vue = require("vue");
//#region src/components/HelloWorld.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "card" };
var HelloWorld_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "HelloWorld",
	props: { msg: {} },
	setup(__props) {
		const count = (0, vue.ref)(0);
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [
				(0, vue.createElementVNode)("h1", null, (0, vue.toDisplayString)(__props.msg), 1),
				(0, vue.createElementVNode)("div", _hoisted_1, [(0, vue.createElementVNode)("button", {
					type: "button",
					onClick: _cache[0] || (_cache[0] = ($event) => count.value++)
				}, "count is " + (0, vue.toDisplayString)(count.value), 1), _cache[1] || (_cache[1] = (0, vue.createElementVNode)("p", null, [
					(0, vue.createTextVNode)(" Edit "),
					(0, vue.createElementVNode)("code", null, "components/HelloWorld.vue"),
					(0, vue.createTextVNode)(" to test HMR ")
				], -1))]),
				_cache[2] || (_cache[2] = (0, vue.createElementVNode)("p", null, [
					(0, vue.createTextVNode)(" Check out "),
					(0, vue.createElementVNode)("a", {
						href: "https://vuejs.org/guide/quick-start.html#local",
						target: "_blank"
					}, "create-vue"),
					(0, vue.createTextVNode)(", the official Vue + Vite starter ")
				], -1)),
				_cache[3] || (_cache[3] = (0, vue.createElementVNode)("p", null, [
					(0, vue.createTextVNode)(" Install "),
					(0, vue.createElementVNode)("a", {
						href: "https://github.com/vuejs/language-tools",
						target: "_blank"
					}, "Volar"),
					(0, vue.createTextVNode)(" in your IDE for a better DX ")
				], -1)),
				_cache[4] || (_cache[4] = (0, vue.createElementVNode)("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1))
			], 64);
		};
	}
});
//#endregion
exports.default = HelloWorld_vue_vue_type_script_setup_true_lang_default;

//# sourceMappingURL=HelloWorld.vue_vue_type_script_setup_true_lang.cjs.map