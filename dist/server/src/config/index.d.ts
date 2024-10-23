import type { EmailEditorProps } from "react-email-editor";
export type EmailConfig = Pick<NonNullable<EmailEditorProps["options"]>, "projectId" | "locale" | "appearance" | "user" | "mergeTags" | "designTags" | "specialLinks" | "tools" | "blocks" | "fonts" | "safeHtml" | "customCSS" | "customJS" | "textDirection">;
declare const _default: {
    default: () => EmailConfig;
    validator(): void;
    /** The name of the strapi plugin
     *
     * @default "pdf-designer-5"
     */
    pluginName: string;
};
export default _default;
