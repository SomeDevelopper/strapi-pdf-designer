import axios from "axios";
import dayjs from "dayjs";
import { pluginName } from "../pluginId";
import { createdPDF, PDFConfig, PDFTemplate } from "../types";

/**
 * Date format for displaying dates in the UI
 */
export const DATE_FORMAT = "MMM DD, YYYY [at] h:mmA";

/**
 * Fetches all pdf templates
 */
export const getTemplatesData = async () => {
  const { data } = await axios.get<PDFTemplate[]>(`/${pluginName}/templates`);
  data.forEach((template) => {
    template.createdAt = dayjs(template.createdAt).format(DATE_FORMAT);
    template.updatedAt = dayjs(template.updatedAt).format(DATE_FORMAT);
  });
  return data;
};

/**
 * Get the editor configuration by the key passed in
 */
export const getEditorConfig = async (key: string = "editor") => {
  const { data } = await axios.get(`/${pluginName}/config/${key}`);
  return data;
};

/**
 * Get the full editor configuration
 */
export const getFullEditorConfig = async () => {
  const { data } = await axios.get<PDFConfig>(`/${pluginName}/config`);
  return data;
};

/**
 * Get the pdf template by the ID
 */
export const getTemplateById = async (id: string) => {
  const { data } = await axios.get<PDFTemplate>(`/${pluginName}/templates/${id}`);
  return data;
};


/**
 * Create/Update a custom pdf template
 */
export const createTemplate = async (templateId: string, data: PDFTemplate): Promise<createdPDF> => {
  const { data: response } = await axios.post<createdPDF>(`/${pluginName}/templates/${templateId}`, data);
  return response;
};

/**
 * Duplicate a custom PDF template
 */
export const duplicateTemplate = async (id: string) => {
  const { data } = await axios.post<PDFTemplate>(`/${pluginName}/templates/duplicate/${id}`);
  return data;
};

/**
 * Delete a custom pdf template
 */
export const deleteTemplate = async (id: string): Promise<{ success: boolean }> => {
  try {
    await axios.delete(`/${pluginName}/templates/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression du modèle:", error);
    return { success: false };
  }
};

/**
 * Download a based on the ID and the type passed in.
 *
 * This triggers a download of the file.
 */
export const downloadTemplate = async (id: string, type: "html" | "json") => {
  const { data, headers } = await axios.get(`/${pluginName}/download/${id}?type=${type}`, {
    responseType: "blob",
  });

  // Create a new Blob object using the response data
  const blob = new Blob([data], { type: headers["content-type"] });

  // Create a URL for the Blob
  const downloadUrl = window.URL.createObjectURL(blob);

  // Create a temporary <a> element to trigger the download
  const link = document.createElement("a");
  link.href = downloadUrl;

  // Set the file name based on the content disposition header or fallback
  const fileName =
    headers["content-disposition"]?.split("filename=")[1]?.replace(/['"]/g, "") || `template.${type}`;
  link.setAttribute("download", fileName);

  // Append the link to the body (this is required for some browsers)
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Clean up and remove the link after the download is triggered
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
};
