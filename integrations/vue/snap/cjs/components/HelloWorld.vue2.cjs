"use strict";
const vue = require("vue");
const _withScopeId = (n) => (vue.pushScopeId("data-v-1d5be6d4"), n = n(), vue.popScopeId(), n);
const _hoisted_1 = { class: "card" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", null, [
  /* @__PURE__ */ vue.createTextVNode(" Edit "),
  /* @__PURE__ */ vue.createElementVNode("code", null, "components/HelloWorld.vue"),
  /* @__PURE__ */ vue.createTextVNode(" to test HMR ")
], -1));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", null, [
  /* @__PURE__ */ vue.createTextVNode(" Check out "),
  /* @__PURE__ */ vue.createElementVNode("a", {
    href: "https://vuejs.org/guide/quick-start.html#local",
    target: "_blank"
  }, "create-vue"),
  /* @__PURE__ */ vue.createTextVNode(", the official Vue + Vite starter ")
], -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", null, [
  /* @__PURE__ */ vue.createTextVNode(" Install "),
  /* @__PURE__ */ vue.createElementVNode("a", {
    href: "https://github.com/vuejs/language-tools",
    target: "_blank"
  }, "Volar"),
  /* @__PURE__ */ vue.createTextVNode(" in your IDE for a better DX ")
], -1));
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1));
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "HelloWorld",
  props: {
    msg: {}
  },
  setup(__props) {
    const count = vue.ref(0);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.createElementVNode("h1", null, vue.toDisplayString(_ctx.msg), 1),
        vue.createElementVNode("div", _hoisted_1, [
          vue.createElementVNode("button", {
            type: "button",
            onClick: _cache[0] || (_cache[0] = ($event) => count.value++)
          }, "count is " + vue.toDisplayString(count.value), 1),
          _hoisted_2
        ]),
        _hoisted_3,
        _hoisted_4,
        _hoisted_5
      ], 64);
    };
  }
});
module.exports = _sfc_main;
//# sourceMappingURL=HelloWorld.vue2.cjs.map
