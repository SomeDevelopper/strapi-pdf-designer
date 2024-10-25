import { useRef, useEffect } from "react";
import { jsx } from "react/jsx-runtime";
import { PuzzlePiece } from "@strapi/icons";
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
  const ref = useRef(setPlugin);
  useEffect(() => {
    ref.current(pluginId);
    console.log("Initializer");
  }, []);
  return null;
};
const PluginIcon = () => /* @__PURE__ */ jsx(PuzzlePiece, {});
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
        const { App } = await import("./App-BAW-IAT3.mjs");
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
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => import("./ar-Bf9XlLLo.mjs"), "./translations/cs.json": () => import("./cs-B0QZJTah.mjs"), "./translations/de.json": () => import("./de-BpcWdzbh.mjs"), "./translations/en.json": () => import("./en-ECzfoI5X.mjs"), "./translations/es.json": () => import("./es-DlGQb34u.mjs"), "./translations/fr.json": () => import("./fr-hkSxFuzl.mjs"), "./translations/id.json": () => import("./id-CHtAzAUz.mjs"), "./translations/it.json": () => import("./it-DXIW0jL3.mjs"), "./translations/ko.json": () => import("./ko-DVvHHUIT.mjs"), "./translations/ms.json": () => import("./ms-C1wNkEQw.mjs"), "./translations/nl.json": () => import("./nl-C79CwB4e.mjs"), "./translations/pl.json": () => import("./pl-_4ZTFbpK.mjs"), "./translations/pt-BR.json": () => import("./pt-BR-DjINUWGk.mjs"), "./translations/pt.json": () => import("./pt-BLr8DxNP.mjs"), "./translations/ru.json": () => import("./ru-C_7wBr9e.mjs"), "./translations/sk.json": () => import("./sk-i1gQKUBN.mjs"), "./translations/th.json": () => import("./th-D-MxpWKr.mjs"), "./translations/tr.json": () => import("./tr-BWNc97X3.mjs"), "./translations/uk.json": () => import("./uk-C_1qrLRM.mjs"), "./translations/vi.json": () => import("./vi-BfZkgFxI.mjs"), "./translations/zh-Hans.json": () => import("./zh-Hans-CXCr6QLu.mjs"), "./translations/zh.json": () => import("./zh-DucIAhMc.mjs") }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
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
export {
  pluginName as a,
  index as i,
  pluginId as p
};
//# sourceMappingURL=index-BloKQPPb.mjs.map
