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
   * Downloads a template
   */
    download: async (ctx) => {
      try {
        const { id } = ctx.params;
        const { type = "json" } = ctx.query;
        // get the template by id
        const template = await strapi.plugin(configImport.pluginName).service("template").findOne({ id });
        if (!template) {
          return ctx.notFound("Template not found");
        }
        let fileContent, fileName;
        if (type === "json") {
          // Serve JSON design
          fileContent = JSON.stringify(template.design, null, 2);
          fileName = `template-${id}.json`;
          ctx.set("Content-Type", "application/json");
        } else if (type === "html") {
          // Serve HTML design
          fileContent = template.bodyHtml;
          fileName = `template-${id}.html`;
          ctx.set("Content-Type", "text/html");
        } else {
          return ctx.badRequest('Invalid type, must be either "json" or "html".');
        }
        // Set the content disposition to prompt a file download
        ctx.set("Content-Disposition", `attachment; filename="${fileName}"`);
        ctx.send(fileContent);
      } catch (err) {
        strapi.log.error("Error downloading template:", err);
        ctx.internalServerError("Failed to download the template");
      }
    },
};
