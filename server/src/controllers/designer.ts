import _ from "lodash";
import { htmlToText } from "html-to-text";
import { isNil } from "lodash";
import configImport from "../config";
import type { Core } from "@strapi/strapi";

/**
 * email-designer.js controller
 *
 * @description: A set of functions called "actions" of the `email-designer` plugin.
 */

export default {
  /**
   * Get template design action.
   *
   * @return {Object}
   */
  getTemplates: async (ctx) => {
    const templates = await strapi.plugin(configImport.pluginName).service("template").findMany();
    ctx.send(templates);
  },

  /**
   * Get template design action.
   *
   * @return {Object}
   */
  getTemplate: async (ctx) => {
    if(!ctx.params.templateId){
      console.log('No template ID specified')
      throw Error
    }
    try {
      const template = await strapi
        .plugin(configImport.pluginName)
        .service("template")
        .findOne({ id: ctx.params.templateId });
      ctx.send(template);
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * Delete template design action.
   *
   * @return {Object}
   */
  deleteTemplate: async (ctx) => {
    if (!ctx.params.templateId) {
      console.log('No template ID specified')
      throw Error
    }
    try {
      await strapi
        .plugin(configImport.pluginName)
        .service("template")
        .delete({ id: ctx.params.templateId });
      ctx.send({ removed: true });
    } catch (error) {
      console.log(error)
    }
    
  },

  /**
   * Save template design action.
   *
   * @return {Object}
   */
  saveTemplate: async (ctx) => {
    let { templateId } = ctx.params;
    if(!templateId) {
      console.log('No template ID specified')
      throw Error
    }

    const { templateReferenceId, import: importTemplate } = ctx.request.body;

    if (importTemplate === true) {
      if (!isNil(templateReferenceId)) {
        const foundTemplate = await strapi
          .plugin(configImport.pluginName)
          .service("template")
          .findOne({
            templateReferenceId,
          });

        if (!_.isEmpty(foundTemplate)) {
          if (templateId === "new")
            return ctx.badRequest("Template reference ID is already taken");

          // override the existing entry with imported data
          templateId = foundTemplate.id;
        } else {
          templateId = "new";
        }
      } else {
        templateId = "new";
      }
    }

    try {
      const template =
        templateId === "new"
          ? await strapi
              .plugin(configImport.pluginName)
              .service("template")
              .create(ctx.request.body)
          : await strapi
              .plugin(configImport.pluginName)
              .service("template")
              .update({ id: templateId }, ctx.request.body);

      ctx.send(template || {});
    } catch (error) {
      ctx.badRequest(null, error);
      console.log(error)
    }
  },

  /**
   * Duplicate a template.
   *
   * @return {Object}
   */
  duplicateTemplate: async (ctx) => {
    if (_.isEmpty(ctx.params.sourceTemplateId)) {
      console.log('No souce template ID given')
      return ctx.badRequest("No source template Id given");
    }

    const { __v, _id, id, updatedAt, createdAt, ...toClone } = await strapi
      .plugin(configImport.pluginName)
      .service("template")
      .findOne({ id: ctx.params.sourceTemplateId });

    if (toClone) {
      return strapi
        .plugin(configImport.pluginName)
        .service("template")
        .create({
          ...toClone,
          name: `${toClone.name} copy`,
          templateReferenceId: null,
        });
    }
    return null;
  },

  /**
   * Strapi's core templates
   */

  /**
   * Get strapi's core message template action.
   *
   * @return {Object}
   */
  getCoreEmailType: async (ctx) => {
    const { coreEmailType } = ctx.params;
    if (
      !["user-address-confirmation", "reset-password"].includes(coreEmailType)
    ) {
      console.log('No valid core message key')
      return ctx.badRequest("No valid core message key");
    }
    const pluginStoreEmailKey =
      coreEmailType === "user-address-confirmation"
        ? "email_confirmation"
        : "reset_password";

    const pluginStore = await strapi.store({
      environment: "",
      type: "plugin",
      name: "users-permissions",
    });

    let data = await pluginStore
      .get({ key: "email" })
      .then((storeEmail) => storeEmail[pluginStoreEmailKey]);

    data = {
      ...(data && data.options
        ? {
            from: data.options.from,
            message: data.options.message,
            subject: data.options.object
              .replace(/<%|&#x3C;%/g, "{{")
              .replace(/%>|%&#x3E;/g, "}}"),
            bodyHtml: data.options.message
              .replace(/<%|&#x3C;%/g, "{{")
              .replace(/%>|%&#x3E;/g, "}}"),
            bodyText: htmlToText(
              data.options.message
                .replace(/<%|&#x3C;%/g, "{{")
                .replace(/%>|%&#x3E;/g, "}}"),
              {
                wordwrap: 130,
                trimEmptyLines: true,
                uppercaseHeadings: false,
              }
            ),
          }
        : {}),
      coreEmailType,
      design: data.design,
    };
    ctx.send(data);
  },

  /**
   * Save strapi's core message template action.
   *
   * @return {Object}
   */
  saveCoreEmailType: async (ctx) => {
    const { coreEmailType } = ctx.params;
    if (
      !["user-address-confirmation", "reset-password"].includes(coreEmailType)
    ) {
      console.log('No valide core message key')
      return ctx.badRequest("No valid core message key");
    }
    const pluginStoreEmailKey =
      coreEmailType === "user-address-confirmation"
        ? "email_confirmation"
        : "reset_password";

    const pluginStore = await strapi.store({
      environment: "",
      type: "plugin",
      name: "users-permissions",
    });

    const emailsConfig = await pluginStore.get({ key: "email" });
    if(!emailsConfig) {
      console.log('An error has occured when getting email config')
      return
    }
    const config = strapi.plugin("pdf-designer").services.config.getConfig();

    emailsConfig[pluginStoreEmailKey] = {
      ...emailsConfig[pluginStoreEmailKey],
      options: {
        ...(emailsConfig[pluginStoreEmailKey]
          ? emailsConfig[pluginStoreEmailKey].options
          : {}),
        message: ctx.request.body.message
          .replace(/{{/g, "<%")
          .replace(/}}/g, "%>"),
        object: ctx.request.body.subject
          .replace(/{{/g, "<%")
          .replace(/}}/g, "%>"),
        // TODO: from: ctx.request.from,
        // TODO: response_email: ctx.request.response_email,
      },
      design: ctx.request.body.design,
    };
    try {
      await pluginStore.set({ key: "email", value: emailsConfig });
      ctx.send({ message: "Saved" });
    }catch (error) {
      console.log(error)
    }
  },
};
