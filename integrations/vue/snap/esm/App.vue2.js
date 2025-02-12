import { defineComponent, createBlock, openBlock } from "vue";
import HelloWorld from "./components/HelloWorld.vue.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(HelloWorld, { msg: "Vite + Vue" });
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=App.vue2.js.map
