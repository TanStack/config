import { Fragment, createElementBlock, createElementVNode, createTextVNode, defineComponent, openBlock, ref, toDisplayString } from "vue";
//#region src/components/HelloWorld.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "card" };
var HelloWorld_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "HelloWorld",
	props: { msg: {} },
	setup(__props) {
		const count = ref(0);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [
				createElementVNode("h1", null, toDisplayString(__props.msg), 1),
				createElementVNode("div", _hoisted_1, [createElementVNode("button", {
					type: "button",
					onClick: _cache[0] || (_cache[0] = ($event) => count.value++)
				}, "count is " + toDisplayString(count.value), 1), _cache[1] || (_cache[1] = createElementVNode("p", null, [
					createTextVNode(" Edit "),
					createElementVNode("code", null, "components/HelloWorld.vue"),
					createTextVNode(" to test HMR ")
				], -1))]),
				_cache[2] || (_cache[2] = createElementVNode("p", null, [
					createTextVNode(" Check out "),
					createElementVNode("a", {
						href: "https://vuejs.org/guide/quick-start.html#local",
						target: "_blank"
					}, "create-vue"),
					createTextVNode(", the official Vue + Vite starter ")
				], -1)),
				_cache[3] || (_cache[3] = createElementVNode("p", null, [
					createTextVNode(" Install "),
					createElementVNode("a", {
						href: "https://github.com/vuejs/language-tools",
						target: "_blank"
					}, "Volar"),
					createTextVNode(" in your IDE for a better DX ")
				], -1)),
				_cache[4] || (_cache[4] = createElementVNode("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1))
			], 64);
		};
	}
});
//#endregion
export { HelloWorld_vue_vue_type_script_setup_true_lang_default as default };

//# sourceMappingURL=HelloWorld.vue_vue_type_script_setup_true_lang.js.map