import { prefixPluginTranslations } from "./utils/prefixPluginTranslations";
import { pluginId } from "./pluginId";
import { APP_PERMISSIONS } from "./permissions";
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';


export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: pluginId,
      },
      Component: async () => {
        const { App } = await import("./pages/App");
        return App;
      },
      permissions: APP_PERMISSIONS["menu-link"],
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: true,
      name: pluginId,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
