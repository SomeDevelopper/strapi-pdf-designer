declare const _default: {
    config: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => import("./config").ConfigController;
    designer: {
        getTemplates: (ctx: any) => Promise<void>;
        getTemplate: (ctx: any) => Promise<void>;
        deleteTemplate: (ctx: any) => Promise<void>;
        saveTemplate: (ctx: any) => Promise<any>;
        duplicateTemplate: (ctx: any) => Promise<any>;
        getCoreEmailType: (ctx: any) => Promise<any>;
        saveCoreEmailType: (ctx: any) => Promise<any>;
    };
};
export default _default;
