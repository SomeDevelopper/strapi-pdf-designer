"use strict";
const React = require("react");
const jsxRuntime = require("react/jsx-runtime");
const icons = require("@strapi/icons");
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const prefixPluginTranslations = (trad, pluginId2) => {
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId2}.${current}`] = trad[current];
    return acc;
  }, {});
};
const pluginId = "pdf-designer-5";
const pluginName = "pdf-designer-5";
const APP_PERMISSIONS = {
  "menu-link": [{ action: `plugin::${pluginName}.menu-link`, subject: null }]
};
const Initializer = ({ setPlugin }) => {
  const ref = React.useRef(setPlugin);
  React.useEffect(() => {
    ref.current(pluginId);
    console.log("Initializer");
  }, []);
  return null;
};
const PluginIcon = () => /* @__PURE__ */ jsxRuntime.jsx(icons.PuzzlePiece, {});
const index = {
  register(app) {
    app.addMenuLink({
      to: `plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: pluginId
      },
      Component: async () => {
        const { App } = await Promise.resolve().then(() => require("./App-08q1iONa.js"));
        return App;
      },
      permissions: APP_PERMISSIONS["menu-link"]
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: true,
      name: pluginId
    });
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => Promise.resolve().then(() => require("./ar-C_tQu1XS.js")), "./translations/cs.json": () => Promise.resolve().then(() => require("./cs-CPKIUWLp.js")), "./translations/de.json": () => Promise.resolve().then(() => require("./de-D1Zo_Hnq.js")), "./translations/en.json": () => Promise.resolve().then(() => require("./en-CcPlp1WQ.js")), "./translations/es.json": () => Promise.resolve().then(() => require("./es-Cb6O-nM6.js")), "./translations/fr.json": () => Promise.resolve().then(() => require("./fr-C8Qw4iPZ.js")), "./translations/id.json": () => Promise.resolve().then(() => require("./id-CvE5f0zz.js")), "./translations/it.json": () => Promise.resolve().then(() => require("./it-BvwpH2dU.js")), "./translations/ko.json": () => Promise.resolve().then(() => require("./ko-Bgn4ZG2R.js")), "./translations/ms.json": () => Promise.resolve().then(() => require("./ms-BGlHkuJz.js")), "./translations/nl.json": () => Promise.resolve().then(() => require("./nl-BuofSsmb.js")), "./translations/pl.json": () => Promise.resolve().then(() => require("./pl-waX2XGLw.js")), "./translations/pt-BR.json": () => Promise.resolve().then(() => require("./pt-BR-B_ii8U63.js")), "./translations/pt.json": () => Promise.resolve().then(() => require("./pt-Cuc1TzHc.js")), "./translations/ru.json": () => Promise.resolve().then(() => require("./ru-Dc-rSPqb.js")), "./translations/sk.json": () => Promise.resolve().then(() => require("./sk-Cnpb4YOK.js")), "./translations/th.json": () => Promise.resolve().then(() => require("./th-BXTLF08M.js")), "./translations/tr.json": () => Promise.resolve().then(() => require("./tr-CD23MFJ6.js")), "./translations/uk.json": () => Promise.resolve().then(() => require("./uk-CxIePjBD.js")), "./translations/vi.json": () => Promise.resolve().then(() => require("./vi-B4uqmjm6.js")), "./translations/zh-Hans.json": () => Promise.resolve().then(() => require("./zh-Hans-JcohXWfl.js")), "./translations/zh.json": () => Promise.resolve().then(() => require("./zh-BjcJQUQC.js")) }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return Promise.resolve(importedTrads);
  }
};
exports.index = index;
exports.pluginId = pluginId;
exports.pluginName = pluginName;
//# sourceMappingURL=index-CIk-YzZH.js.map
