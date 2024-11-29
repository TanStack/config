"use strict";
const vue = require("vue");
const _hoisted_1 = { class: "card" };
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
          _cache[1] || (_cache[1] = vue.createElementVNode("p", null, [
            vue.createTextVNode(" Edit "),
            vue.createElementVNode("code", null, "components/HelloWorld.vue"),
            vue.createTextVNode(" to test HMR ")
          ], -1))
        ]),
        _cache[2] || (_cache[2] = vue.createElementVNode("p", null, [
          vue.createTextVNode(" Check out "),
          vue.createElementVNode("a", {
            href: "https://vuejs.org/guide/quick-start.html#local",
            target: "_blank"
          }, "create-vue"),
          vue.createTextVNode(", the official Vue + Vite starter ")
        ], -1)),
        _cache[3] || (_cache[3] = vue.createElementVNode("p", null, [
          vue.createTextVNode(" Install "),
          vue.createElementVNode("a", {
            href: "https://github.com/vuejs/language-tools",
            target: "_blank"
          }, "Volar"),
          vue.createTextVNode(" in your IDE for a better DX ")
        ], -1)),
        _cache[4] || (_cache[4] = vue.createElementVNode("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1))
      ], 64);
    };
  }
});
module.exports = _sfc_main;
//# sourceMappingURL=HelloWorld.vue2.cjs.map
