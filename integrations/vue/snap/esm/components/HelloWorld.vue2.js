import { defineComponent, ref, openBlock, createElementBlock, Fragment, createElementVNode, toDisplayString, pushScopeId, popScopeId, createTextVNode } from "vue";
const _withScopeId = (n) => (pushScopeId("data-v-1d5be6d4"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "card" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("p", null, [
  /* @__PURE__ */ createTextVNode(" Edit "),
  /* @__PURE__ */ createElementVNode("code", null, "components/HelloWorld.vue"),
  /* @__PURE__ */ createTextVNode(" to test HMR ")
], -1));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("p", null, [
  /* @__PURE__ */ createTextVNode(" Check out "),
  /* @__PURE__ */ createElementVNode("a", {
    href: "https://vuejs.org/guide/quick-start.html#local",
    target: "_blank"
  }, "create-vue"),
  /* @__PURE__ */ createTextVNode(", the official Vue + Vite starter ")
], -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("p", null, [
  /* @__PURE__ */ createTextVNode(" Install "),
  /* @__PURE__ */ createElementVNode("a", {
    href: "https://github.com/vuejs/language-tools",
    target: "_blank"
  }, "Volar"),
  /* @__PURE__ */ createTextVNode(" in your IDE for a better DX ")
], -1));
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HelloWorld",
  props: {
    msg: {}
  },
  setup(__props) {
    const count = ref(0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("h1", null, toDisplayString(_ctx.msg), 1),
        createElementVNode("div", _hoisted_1, [
          createElementVNode("button", {
            type: "button",
            onClick: _cache[0] || (_cache[0] = ($event) => count.value++)
          }, "count is " + toDisplayString(count.value), 1),
          _hoisted_2
        ]),
        _hoisted_3,
        _hoisted_4,
        _hoisted_5
      ], 64);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=HelloWorld.vue2.js.map
