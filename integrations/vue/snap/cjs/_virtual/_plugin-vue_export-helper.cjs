"use strict";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
module.exports = _export_sfc;
//# sourceMappingURL=_plugin-vue_export-helper.cjs.map
