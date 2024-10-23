declare const _default: {
    config: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => import("./config").ConfigService;
    template: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => import("./template").TemplateService;
    pdf: ({ strapi }: {
        strapi: import("./pdf").StrapiInstance;
    }) => {
        generatePdf: (pdfTemplate?: import("./pdf").PdfTemplate, data?: any, myFooter?: import("./pdf").PdfFooter) => Promise<any>;
    };
};
export default _default;
