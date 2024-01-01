"use strict";
const vue = require("vue");
const HelloWorld = require("./components/HelloWorld.vue.cjs");
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "App",
  setup(__props) {
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(HelloWorld, { msg: "Vite + Vue" });
    };
  }
});
module.exports = _sfc_main;
//# sourceMappingURL=App.vue2.cjs.map
