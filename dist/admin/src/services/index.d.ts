import { EmailConfig, EmailTemplate } from "../types";
/**
 * Date format for displaying dates in the UI
 */
export declare const DATE_FORMAT = "MMM DD, YYYY [at] h:mmA";
/**
 * Fetches all email templates
 */
export declare const getTemplatesData: () => Promise<EmailTemplate[]>;
/**
 * Get the editor configuration by the key passed in
 */
export declare const getEditorConfig: (key?: string) => Promise<any>;
/**
 * Get the full editor configuration
 */
export declare const getFullEditorConfig: () => Promise<EmailConfig>;
/**
 * Get the email template by the ID
 */
export declare const getTemplateById: (id: string) => Promise<EmailTemplate>;
/**
 * Get the core email template by the type
 */
export declare const getCoreTemplate: (coreEmailType: string) => Promise<EmailTemplate>;
/**
 * Create/Update a custom email template
 */
export declare const createTemplate: (templateId: string, data: EmailTemplate) => Promise<EmailTemplate>;
/**
 * Update a core email template
 */
export declare const updateCoreTemplate: (coreEmailType: string, data: EmailTemplate) => Promise<EmailTemplate>;
/**
 * Duplicate a custom email template
 */
export declare const duplicateTemplate: (id: string) => Promise<EmailTemplate>;
/**
 * Delete a custom email template
 */
export declare const deleteTemplate: (id: string) => Promise<{
    success: boolean;
}>;
/**
 * Download a based on the ID and the type passed in.
 *
 * This triggers a download of the file.
 */
export declare const downloadTemplate: (id: string, type: "html" | "json") => Promise<void>;
