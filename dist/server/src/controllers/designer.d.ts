/**
 * email-designer.js controller
 *
 * @description: A set of functions called "actions" of the `email-designer` plugin.
 */
declare const _default: {
    /**
     * Get template design action.
     *
     * @return {Object}
     */
    getTemplates: (ctx: any) => Promise<void>;
    /**
     * Get template design action.
     *
     * @return {Object}
     */
    getTemplate: (ctx: any) => Promise<void>;
    /**
     * Delete template design action.
     *
     * @return {Object}
     */
    deleteTemplate: (ctx: any) => Promise<void>;
    /**
     * Save template design action.
     *
     * @return {Object}
     */
    saveTemplate: (ctx: any) => Promise<any>;
    /**
     * Duplicate a template.
     *
     * @return {Object}
     */
    duplicateTemplate: (ctx: any) => Promise<any>;
    /**
     * Strapi's core templates
     */
    /**
     * Get strapi's core message template action.
     *
     * @return {Object}
     */
    getCoreEmailType: (ctx: any) => Promise<any>;
    /**
     * Save strapi's core message template action.
     *
     * @return {Object}
     */
    saveCoreEmailType: (ctx: any) => Promise<any>;
};
export default _default;
