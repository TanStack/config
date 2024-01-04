import { delegateEvents, insert, template } from "solid-js/web";
import { createSignal } from "solid-js";
const _tmpl$ = /* @__PURE__ */ template(`<h1>Vite + Solid`), _tmpl$2 = /* @__PURE__ */ template(`<div class=card><button>count is </button><p>Edit <code>src/App.tsx</code> and save to test HMR`), _tmpl$3 = /* @__PURE__ */ template(`<p class=read-the-docs>Click on the Vite and Solid logos to learn more`);
function App() {
  const [count, setCount] = createSignal(0);
  return [_tmpl$(), (() => {
    const _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild;
    _el$3.firstChild;
    _el$3.$$click = () => setCount((count2) => count2 + 1);
    insert(_el$3, count, null);
    return _el$2;
  })(), _tmpl$3()];
}
delegateEvents(["click"]);
export {
  App as default
};
//# sourceMappingURL=App.js.map
