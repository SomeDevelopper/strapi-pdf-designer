export default {
  "pdf-designer-template-version": {
    schema: {
      kind: "collectionType",
      collectionName: "pdf-designer-template-versions",
      info: {
        singularName: "pdf-designer-template-version",
        pluralName: "pdf-designer-template-versions",
        displayName: "PDF Designer Template Versions",
        description:
          "This collection keeps track of the changes made to the different templates.",
      },
      pluginOptions: {
        "content-manager": { visible: true },
        "content-type-builder": { visible: false },
      },
      options: { draftAndPublish: false, timestamps: true },
      attributes: {
        templateId: {
          type: "relation",
          relation: "manyToOne",
          target: "plugin::strapi-pdf-designer.pdf-designer-template",
          inversedBy: "versions",
        },
        design: { type: "json", configurable: false },
        name: { type: "string", configurable: false },
        bodyHtml: { type: "text", configurable: false },
        bodyText: { type: "text", configurable: false },
        tags: { type: "json" },
      },
    },
  },
  "pdf-designer-template": {
    schema: {
      kind: "collectionType",
      collectionName: "pdf-designer-templates",
      info: {
        singularName: "pdf-designer-template",
        pluralName: "pdf-designer-templates",
        displayName: "PDF Designer Templates",
        description:
          "This collection stores pdf templates created with the pdf designer.",
      },
      pluginOptions: {
        "content-manager": { visible: false },
        "content-type-builder": { visible: false },
      },
      options: { draftAndPublish: false, timestamps: true },
      attributes: {
        templateReferenceId: {
          type: "integer",
          required: false,
          unique: true,
          configurable: false,
        },
        design: { type: "json", configurable: false },
        name: { type: "string", configurable: false },
        bodyHtml: { type: "text", configurable: false },
        bodyText: { type: "text", configurable: false },
        tags: { type: "json" },
        versions: {
          type: "relation",
          relation: "oneToMany",
          target: "plugin::pdf-designer.pdf-designer-template-version",
          mappedBy: "templateId",
        },
      },
    },
  },
};
