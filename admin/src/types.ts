import type { EmailEditorProps } from "react-email-editor";

export type PDFTemplate = {
  templateReferenceId?: number;
  design?: any;
  name?: string;
  subject?: string;
  bodyHtml?: string | null;
  bodyText?: string | null;
  locale?: string | null;
  tags?: Array<string>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  documentId?: string;
  message?: string;
  id?: any;
  import?: boolean;
};

export type createdPDF = {
  values: any;
  templateCreate:PDFTemplate;
  success: boolean;
}

export type PDFConfig = Pick<
  NonNullable<EmailEditorProps["options"]>,
  | "projectId"
  | "locale"
  | "appearance"
  | "user"
  | "mergeTags"
  | "designTags"
  | "specialLinks"
  | "tools"
  | "blocks"
  | "fonts"
  | "safeHtml"
  | "customCSS"
  | "customJS"
  | "textDirection"
>;
