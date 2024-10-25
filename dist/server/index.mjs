import _, { isNil } from "lodash";
import { htmlToText } from "html-to-text";
import decode from "decode-html";
import html_to_pdf from "html-pdf-node";
import Mustache from "mustache";
const config$1 = {
  default: () => ({
    mergeTagsConfig: {
      autocompleteTriggerChar: "@",
      sort: false,
      delimiter: ["{{", "}}"]
    },
    appearance: {
      theme: "modern_light"
    },
    fonts: {
      showDefaultFonts: false
    },
    tools: {
      image: {
        properties: {
          src: {
            value: {
              url: "https://picsum.photos/600/350"
            }
          }
        }
      }
    },
    mergeTags: {
      core: {
        name: "Core",
        mergeTags: {
          // Values that can be used in the Reset Password context
          resetPassword: {
            name: "Reset Password",
            mergeTags: {
              // User in the Reset Password context
              user: {
                name: "USER",
                mergeTags: {
                  username: {
                    name: "Username",
                    value: "{{= USER.username }}",
                    sample: "john_doe"
                  },
                  email: {
                    name: "Email",
                    value: "{{= USER.email }}",
                    sample: "johndoe@example.com"
                  }
                }
              },
              token: {
                name: "TOKEN",
                value: "{{= TOKEN }}",
                sample: "corresponds-to-the-token-generated-to-be-able-to-reset-the-password"
              },
              url: {
                name: "URL",
                value: "{{= URL }}",
                sample: "is-the-link-where-the-user-will-be-redirected-after-clicking-on-it-in-the-email"
              },
              serverUrl: {
                name: "SERVER_URL",
                value: "{{= SERVER_URL }}",
                sample: "is-the-absolute-server-url-(configured-in-server-configuration)"
              }
            }
          },
          // Values that can be used in the Email Addres Confirmation context
          addressConfirmation: {
            name: "Confirm Address",
            mergeTags: {
              // User in the Email Address Confirmation context
              user: {
                name: "USER",
                mergeTags: {
                  username: {
                    name: "Username",
                    value: "{{= USER.username }}",
                    sample: "john_doe"
                  },
                  email: {
                    name: "Email",
                    value: "{{= USER.email }}",
                    sample: "johndoe@example.com"
                  }
                }
              },
              code: {
                name: "CODE",
                value: "{{= CODE }}",
                sample: "corresponds-to-the-CODE-generated-to-be-able-confirm-the-user-email"
              },
              url: {
                name: "URL",
                value: "{{= URL }}",
                sample: "is-the-Strapi-backend-URL-that-confirms-the-code-(by-default-/auth/email-confirmation)"
              },
              serverUrl: {
                name: "SERVER_URL",
                value: "{{= SERVER_URL }}",
                sample: "is-the-absolute-server-url-(configured-in-server-configuration)"
              }
            }
          }
        }
      },
      mustache: {
        name: "Mustache",
        mergeTags: {
          basic: {
            name: "Basic Output",
            mergeTags: {
              raw: {
                name: "Display Raw Content",
                value: "{{{REPLACE_ME}}}"
              },
              output: {
                name: "Regular Output",
                value: "{{REPLACE_ME}}"
              },
              dottedOutput: {
                name: "Dot notation for Output",
                value: "{{REPLACE_ME.NESTED_VALUE}}"
              }
            }
          },
          loops: {
            name: "Loops",
            mergeTags: {
              raw: {
                name: "Display Raw Content in Loop",
                value: "{{#ARRAY_OR_OBJECT_TO_ITERATE}}\n{{{REPLACE_ME}}}\n{{/ARRAY_OR_OBJECT_TO_ITERATE}}"
              },
              output: {
                name: "Regular Output in Loop",
                value: "{{#ARRAY_OR_OBJECT_TO_ITERATE}}\n{{REPLACE_ME}}\n{{/ARRAY_OR_OBJECT_TO_ITERATE}}"
              },
              dottedOutput: {
                name: "Dot notation for Output in Loop",
                value: "{{#ARRAY_OR_OBJECT_TO_ITERATE}}\n{{REPLACE_ME.NESTED_VALUE}}\n{{/ARRAY_OR_OBJECT_TO_ITERATE}}"
              }
            }
          }
        }
      }
    }
  }),
  validator() {
  },
  /** The name of the strapi plugin
   *
   * @default "pdf-designer-5"
   */
  pluginName: "pdf-designer-5"
};
const bootstrap = async ({ strapi: strapi2 }) => {
  const actions = [
    {
      section: "plugins",
      displayName: "Allow access to the PDF Designer interface",
      uid: "menu-link",
      pluginName: config$1.pluginName
    }
  ];
  await strapi2.admin.services.permission.actionProvider.registerMany(actions);
};
const kind = "collectionType";
const collectionName = "pdf_templates";
const info = {
  singularName: "pdf-template",
  pluralName: "pdf-templates",
  displayName: "pdf-template",
  name: "pdf-template"
};
const pluginOptions = {
  "content-manager": {
    visible: false
  },
  "content-type-builder": {
    visible: false
  }
};
const options = {
  draftAndPublish: false,
  timestamps: true,
  increments: true,
  comment: ""
};
const attributes = {
  templateReferenceId: {
    type: "integer",
    required: false,
    unique: true
  },
  design: {
    type: "json"
  },
  name: {
    type: "string"
  },
  subject: {
    type: "string"
  },
  bodyHtml: {
    type: "text"
  },
  bodyText: {
    type: "text"
  },
  enabled: {
    type: "boolean",
    "default": true
  },
  tags: {
    type: "json"
  }
};
const schema = {
  kind,
  collectionName,
  info,
  pluginOptions,
  options,
  attributes
};
const pdfTemplate = {
  schema
};
const contentTypes = {
  "pdf-template": pdfTemplate
};
const designer = {
  /**
   * Get template design action.
   *
   * @return {Object}
   */
  getTemplates: async (ctx) => {
    const templates = await strapi.plugin(config$1.pluginName).service("template").findMany();
    ctx.send(templates);
  },
  /**
   * Get template design action.
   *
   * @return {Object}
   */
  getTemplate: async (ctx) => {
    if (!ctx.params.templateId) {
      console.log("No template ID specified");
      throw Error;
    }
    try {
      const template2 = await strapi.plugin(config$1.pluginName).service("template").findOne({ id: ctx.params.templateId });
      ctx.send(template2);
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Delete template design action.
   *
   * @return {Object}
   */
  deleteTemplate: async (ctx) => {
    if (!ctx.params.templateId) {
      console.log("No template ID specified");
      throw Error;
    }
    try {
      await strapi.plugin(config$1.pluginName).service("template").delete({ id: ctx.params.templateId });
      ctx.send({ removed: true });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Save template design action.
   *
   * @return {Object}
   */
  saveTemplate: async (ctx) => {
    let { templateId } = ctx.params;
    if (!templateId) {
      console.log("No template ID specified");
      throw Error;
    }
    const { templateReferenceId, import: importTemplate } = ctx.request.body;
    if (importTemplate === true) {
      if (!isNil(templateReferenceId)) {
        const foundTemplate = await strapi.plugin(config$1.pluginName).service("template").findOne({
          templateReferenceId
        });
        if (!_.isEmpty(foundTemplate)) {
          if (templateId === "new")
            return ctx.badRequest("Template reference ID is already taken");
          templateId = foundTemplate.id;
        } else {
          templateId = "new";
        }
      } else {
        templateId = "new";
      }
    }
    try {
      const template2 = templateId === "new" ? await strapi.plugin(config$1.pluginName).service("template").create(ctx.request.body) : await strapi.plugin(config$1.pluginName).service("template").update({ id: templateId }, ctx.request.body);
      ctx.send(template2 || {});
    } catch (error) {
      ctx.badRequest(null, error);
      console.log(error);
    }
  },
  /**
   * Duplicate a template.
   *
   * @return {Object}
   */
  duplicateTemplate: async (ctx) => {
    if (_.isEmpty(ctx.params.sourceTemplateId)) {
      console.log("No souce template ID given");
      return ctx.badRequest("No source template Id given");
    }
    const { __v, _id, id, updatedAt, createdAt, ...toClone } = await strapi.plugin(config$1.pluginName).service("template").findOne({ id: ctx.params.sourceTemplateId });
    if (toClone) {
      return strapi.plugin(config$1.pluginName).service("template").create({
        ...toClone,
        name: `${toClone.name} copy`,
        templateReferenceId: null
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
    if (!["user-address-confirmation", "reset-password"].includes(coreEmailType)) {
      console.log("No valid core message key");
      return ctx.badRequest("No valid core message key");
    }
    const pluginStoreEmailKey = coreEmailType === "user-address-confirmation" ? "email_confirmation" : "reset_password";
    const pluginStore = await strapi.store({
      environment: "",
      type: "plugin",
      name: "users-permissions"
    });
    let data = await pluginStore.get({ key: "email" }).then((storeEmail) => storeEmail[pluginStoreEmailKey]);
    data = {
      ...data && data.options ? {
        from: data.options.from,
        message: data.options.message,
        subject: data.options.object.replace(/<%|&#x3C;%/g, "{{").replace(/%>|%&#x3E;/g, "}}"),
        bodyHtml: data.options.message.replace(/<%|&#x3C;%/g, "{{").replace(/%>|%&#x3E;/g, "}}"),
        bodyText: htmlToText(
          data.options.message.replace(/<%|&#x3C;%/g, "{{").replace(/%>|%&#x3E;/g, "}}"),
          {
            wordwrap: 130,
            trimEmptyLines: true,
            uppercaseHeadings: false
          }
        )
      } : {},
      coreEmailType,
      design: data.design
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
    if (!["user-address-confirmation", "reset-password"].includes(coreEmailType)) {
      console.log("No valide core message key");
      return ctx.badRequest("No valid core message key");
    }
    const pluginStoreEmailKey = coreEmailType === "user-address-confirmation" ? "email_confirmation" : "reset_password";
    const pluginStore = await strapi.store({
      environment: "",
      type: "plugin",
      name: "users-permissions"
    });
    const emailsConfig = await pluginStore.get({ key: "email" });
    if (!emailsConfig) {
      console.log("An error has occured when getting email config");
      return;
    }
    strapi.plugin("pdf-designer").services.config.getConfig();
    emailsConfig[pluginStoreEmailKey] = {
      ...emailsConfig[pluginStoreEmailKey],
      options: {
        ...emailsConfig[pluginStoreEmailKey] ? emailsConfig[pluginStoreEmailKey].options : {},
        message: ctx.request.body.message.replace(/{{/g, "<%").replace(/}}/g, "%>"),
        object: ctx.request.body.subject.replace(/{{/g, "<%").replace(/}}/g, "%>")
        // TODO: from: ctx.request.from,
        // TODO: response_email: ctx.request.response_email,
      },
      design: ctx.request.body.design
    };
    try {
      await pluginStore.set({ key: "email", value: emailsConfig });
      ctx.send({ message: "Saved" });
    } catch (error) {
      console.log(error);
    }
  }
};
const controller = ({ strapi: strapi2 }) => ({
  getConfig: async (ctx) => {
    const { configKey } = ctx.params;
    const config2 = await strapi2.plugin(config$1.pluginName).service("config").getConfig(configKey);
    ctx.send(config2);
  },
  getFullConfig: async (ctx) => {
    const config2 = await strapi2.config.get(`plugin::${config$1.pluginName}`);
    ctx.send(config2);
  }
});
const pdf$1 = {
  /**
   * Get template design action.
   *
   * @return {Object}
   */
  getTemplates: async (ctx) => {
    const templates = await strapi.plugin(config$1.pluginName).service("template").findMany();
    ctx.send(templates);
  },
  /**
   * Get template design action.
   *
   * @return {Object}
   */
  getTemplate: async (ctx) => {
    if (!ctx.params.templateId) {
      console.log("No template ID specified");
      throw Error;
    }
    try {
      const template2 = await strapi.plugin(config$1.pluginName).service("template").findOne({ id: ctx.params.templateId });
      ctx.send(template2);
    } catch (error) {
      console.log(error);
    }
  },
  generate: async (ctx) => {
    try {
      const { templateReferenceId } = ctx.params;
      const { data, footerString } = ctx.request.body;
      if (!templateReferenceId) {
        return ctx.throw(400, "templateReferenceId is required");
      }
      const pdfTemplate2 = { templateReferenceId };
      const data1 = { data };
      const myFooter = { footerString };
      const pdfBuffer = await strapi.plugin("pdf-designer-5").service("pdf").generatePdf(pdfTemplate2, data1, myFooter);
      ctx.set("Content-Type", "application/pdf");
      ctx.send(pdfBuffer);
    } catch (error) {
      strapi.log.error(error);
    }
  }
};
const controllers = {
  config: controller,
  designer,
  pdf: pdf$1
};
const destroy = ({ strapi: strapi2 }) => {
};
const middlewares = {};
const policies = {};
const register = ({ strapi: strapi2 }) => {
};
const routes = [
  {
    method: "GET",
    path: "/templates",
    handler: "designer.getTemplates",
    config: { policies: [], auth: false }
  },
  {
    method: "GET",
    path: "/templates/:templateId",
    handler: "designer.getTemplate",
    config: { policies: [], auth: false }
  },
  {
    method: "POST",
    path: "/templates/:templateId",
    handler: "designer.saveTemplate",
    config: { policies: [], auth: false }
  },
  {
    method: "DELETE",
    path: "/templates/:templateId",
    handler: "designer.deleteTemplate",
    config: { policies: [], auth: false }
  },
  {
    method: "POST",
    path: "/templates/duplicate/:sourceTemplateId",
    handler: "designer.duplicateTemplate",
    config: { policies: [], auth: false }
  },
  {
    method: "GET",
    path: "/config/:configKey",
    handler: "config.getConfig",
    config: { policies: [], auth: false }
  },
  {
    method: "GET",
    path: "/config",
    handler: "config.getFullConfig",
    config: { policies: [], auth: false }
  },
  {
    method: "GET",
    path: "/core/:coreEmailType",
    handler: "designer.getCoreEmailType",
    config: { policies: [], auth: false }
  },
  {
    method: "POST",
    path: "/core/:coreEmailType",
    handler: "designer.saveCoreEmailType",
    config: { policies: [], auth: false }
  },
  {
    method: "GET",
    path: "/generate-pdf/:templateReferenceId",
    handler: "pdf.generate",
    config: { policies: [], auth: false }
  }
  // {
  //   method: "GET",
  //   path: "/download/:id",
  //   handler: "designer.download",
  //   config: { policies: [], auth: false },
  // },
];
const template = ({ strapi: strapi2 }) => {
  return {
    /**
     * Promise to fetch a template.
     * @return {Promise}
     */
    async findOne(params) {
      try {
        const response = await strapi2.query("plugin::pdf-designer-5.pdf-template").findOne({ where: params });
        if (!response) {
          console.log("An error has occurred");
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Promise to fetch all templates.
     * @return {Promise}
     */
    async findMany(params) {
      try {
        const response = await strapi2.query("plugin::pdf-designer-5.pdf-template").findMany({ where: params });
        if (!response) {
          throw new Error("No templates found");
        }
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    /**
     * Promise to add a template.
     * @return {Promise}
     */
    async create(values) {
      try {
        const template2 = await strapi2.query("plugin::pdf-designer-5.pdf-template").create({ data: values });
        if (!template2) {
          throw new Error("Failed to create template");
        }
        return {
          values,
          templateCreate: template2,
          success: true
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    /**
     * Promise to edit a template.
     * @return {Promise}
     */
    async update(params, values) {
      try {
        const response = await strapi2.query("plugin::pdf-designer-5.pdf-template").update({ where: params, data: values });
        if (!response) {
          throw new Error("Failed to update template");
        }
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    /**
     * Promise to remove a template.
     * @return {Promise}
     */
    async delete(params) {
      try {
        const response = await strapi2.query("plugin::pdf-designer-5.pdf-template").delete({ where: params });
        if (!response) {
          throw new Error("Failed to delete template");
        }
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };
};
const config = ({ strapi: strapi2 }) => {
  return {
    getConfig(key = "editor") {
      return strapi2.plugin(config$1.pluginName).config(key) ?? {};
    }
  };
};
const pdf = ({ strapi: strapi2 }) => {
  const isMantainLegacyTemplateActive = () => _.get(strapi2.plugins, "pdf-designer.config.mantainLegacyTemplate", true);
  const generatePdf = async (pdfTemplate2 = {}, data = {}, myFooter = {}) => {
    const { templateReferenceId } = pdfTemplate2;
    const { footerString } = myFooter;
    const attributes2 = ["text", "html", "subject"];
    if (!templateReferenceId) {
      strapi2.log.error(`No template reference specified`);
      throw new Error("No template reference specified");
    }
    try {
      const response = await strapi2.db.query("plugin::pdf-designer-5.pdf-template").findOne({ where: { templateReferenceId } });
      if (!response) {
        strapi2.log.error(`No pdf template found with referenceId "${templateReferenceId}"`);
        throw new Error(`No pdf template found with referenceId "${templateReferenceId}"`);
      }
      let { bodyHtml, bodyText } = response;
      if (isMantainLegacyTemplateActive()) {
        bodyHtml = bodyHtml.replace(/<%/g, "{{").replace(/%>/g, "}}");
        bodyText = bodyText.replace(/<%/g, "{{").replace(/%>/g, "}}");
      }
      if ((!bodyText || !bodyText.length) && bodyHtml && bodyHtml.length)
        bodyText = htmlToText(bodyHtml, { wordwrap: 130, trimEmptyLines: true, uppercaseHeadings: false });
      pdfTemplate2 = {
        ...pdfTemplate2,
        html: decode(bodyHtml),
        text: decode(bodyText)
      };
      const templatedAttributes = attributes2.reduce(
        (compiled, attribute) => pdfTemplate2[attribute] ? Object.assign(compiled, { [attribute]: Mustache.render(pdfTemplate2[attribute], data) }) : compiled,
        {}
      );
      const options2 = {
        footerTemplate: footerString
      };
      const files = { content: decode(templatedAttributes.html) };
      const bufferPDF = await html_to_pdf.generatePdf(files, options2);
      return bufferPDF;
    } catch (error) {
      strapi2.log.error(error);
      throw error;
    }
  };
  return {
    generatePdf
  };
};
const services = {
  config,
  template,
  pdf
};
const index = {
  register,
  bootstrap,
  destroy,
  config: config$1,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares
};
export {
  index as default
};
//# sourceMappingURL=index.mjs.map
