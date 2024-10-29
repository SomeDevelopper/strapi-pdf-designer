import React, { useCallback, useState, useEffect, memo, useRef, StrictMode } from 'react';
import { useNotification } from "@strapi/strapi/admin";
import { Page } from "@strapi/admin/strapi-admin";
import { Box, Tabs, Button, Textarea, IconButton, DesignSystemProvider, darkTheme, Field, } from '@strapi/design-system';
import { useNavigate, useParams} from 'react-router-dom';
import { isEmpty, isFinite } from 'lodash';
import { ArrowLeft } from '@strapi/icons';
import { getUrl, standardEmailRegistrationTemplate } from "../constants";
import { PDFConfig, PDFTemplate } from "../types";
import striptags from 'striptags';
import EmailEditor, { EditorRef } from 'react-email-editor';
import styled from 'styled-components';
import { useTr } from "../hooks/useTr";
import { shallowIsEqual } from "../utils/helpers";
import {
  createTemplate,
  getFullEditorConfig,
  getTemplateById,
} from "../services";
import { pluginId } from '../pluginId';
import { getMessage } from '../utils/getMessage';
import ImportSingleDesign from '../components/ImportSingleDesign';
const __DEV__ = process.env.NODE_ENV !== 'production';

const DesignerContainer = styled.div`
  padding: 18px 30px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 60px;
  align-items: center;
  gap: 10px;
`;

const Bar = styled.div`
  flex: 1;
  color: #000;
  margin: 6px 0 10px 0;
  display: flex;
  max-height: 60px;
  justify-content: space-between;

  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }
`;


const Designer  = ({ isCore = false }: { isCore?: boolean }) => {
  const pdfEditorRef = useRef<EditorRef>(null);
  const navigate = useNavigate();
  const translate = useTr();

  const { templateId, coreEmailType } = useParams();
  const [templateData, setTemplateData] = useState<PDFTemplate>();
  const [errorRefId, setErrorRefId] = useState("");
  const [bodyText, setBodyText] = useState('');
  const [mode, setMode] = useState<"html" | "text">("html");
  const [serverConfigLoaded, setServerConfigLoaded] = useState(false);
  const [editorOptions, setEditorOptions] = useState<PDFConfig>();
  const { toggleNotification } = useNotification();

  const saveDesign = async () => {
    if (!coreEmailType && !templateData?.templateReferenceId) {
      
      toggleNotification({
        type: "danger",
        title: translate("error.noReferenceId.title"),
        message: translate("error.noReferenceId.message"),
      });

      setErrorRefId("Required");
      return;
    }
    setErrorRefId("");

    let design, html, response;

    try {
      await new Promise<void>((resolve) => {
        pdfEditorRef.current?.editor?.exportHtml((data) => {
          ({ design, html } = data);
          resolve();
        });
      });
    } catch (error) {
      console.log(error);
      return;
    }
    try {
      if (templateId) {
        response = await createTemplate(templateId, {
          name: templateData?.name || translate("noName"),
          templateReferenceId: templateData?.templateReferenceId,
          subject: templateData?.subject || "",
          design,
          bodyText,
          bodyHtml: html,
        });
      }

      toggleNotification({
        type: 'success',
        title: translate("success"),
        message: translate("success.message"),
      });
      
      if (templateId === 'new' && response && templateId !== response.templateCreate.id){
        const newTemplateId = response.templateCreate.id;
         navigate(`/plugins/${pluginId}/design/${newTemplateId}`);
         const updatedTemplate = await getTemplateById(newTemplateId);
         setTemplateData(updatedTemplate);
      }
       

    } catch (err: any) {
      console.error(err);

      const errorMessage = err?.response?.data?.error?.message;
      if (errorMessage) {
        toggleNotification({
          type: "danger",
          title: translate("error"),
          message: errorMessage,
        });
      } else {
        toggleNotification({
          type: 'danger',
          title: 'Error',
          message: `${pluginId}.notification.error`,
        });
      }
    }
  };

  const preview = (templateReferenceId: number) => {
    const baseUrl = window.location.origin; // get the base uri
    const pdfUrl = `${baseUrl}/pdf-designer-5/generate-pdf/${templateReferenceId}`;

    window.open(pdfUrl);
  }

  const onLoadHandler = useCallback(() => {
    // ⬇︎ workaround to avoid firing onLoad api before setting the editor ref
    setTimeout(() => {
      if (templateData) pdfEditorRef.current?.editor?.loadDesign(templateData.design);
    }, 500);
  }, []);

  /* useEffects */
  useEffect(() => {

    const loadEditorConfig = async () => {
      try {
        const config = await getFullEditorConfig();
        setEditorOptions(config);
        setServerConfigLoaded(true);
      } catch (err) {
        console.error("Error loading editor config:", err);
      }
    };

    loadEditorConfig();
    return () => {
      pdfEditorRef.current?.editor?.destroy(); // release react-email-editor on unmount
    };
  }, []);

  const init = async () => {
    if (
      (!templateId && !coreEmailType) ||
      (coreEmailType && !['user-address-confirmation', 'reset-password'].includes(coreEmailType)) ||
      templateId === 'new'
    )
      return;


      let _templateData: PDFTemplate = {};

      if (templateId) _templateData = await getTemplateById(templateId);

      if (coreEmailType && isEmpty(_templateData.design)) {
        let _message = _templateData.message || "";

        // eslint-disable-next-line no-useless-escape
        if (_templateData.message && _templateData.message.match(/\<body/)) {
          const parser = new DOMParser();
          const parsedDocument = parser.parseFromString(_message, 'text/html');
          _message = parsedDocument.body.innerText;
        }

        _message = striptags(_message, ['a', 'img', 'strong', 'b', 'i', '%', '%='])
          // eslint-disable-next-line quotes
          .replace(/"/g, "'")
          .replace(/<%|&#x3C;%/g, '{{')
          .replace(/%>|%&#x3E;/g, '}}')
          .replace(/\n/g, '<br />');

        _templateData.design = JSON.parse(
          JSON.stringify(standardEmailRegistrationTemplate).replace('__PLACEHOLDER__', _message)
        );
      }

      setTemplateData(_templateData);
      setBodyText(_templateData.bodyText || "");
    }

  useEffect(() => {
    if (!templateId && !coreEmailType) {
      console.error("No templateId or coreEmailType found");
      return;
    }
    init();
  }, [templateId, coreEmailType]);

  useEffect(() => {
    setTimeout(() => {
      if (pdfEditorRef.current?.editor && templateData?.design) {
        pdfEditorRef.current.editor.loadDesign(templateData.design);
      }
    }, 600);
  }, [templateData]);

  return (
    <Page.Main>
      <Page.Title>{translate("page.design.title")}</Page.Title>
      <DesignerContainer>
      <DesignSystemProvider theme={darkTheme}>
        <Header>
          <IconButton
            style={{ marginTop: "19px", padding: "10px" }}
            label={translate("goBack")}
            onClick={() => navigate({ pathname: getUrl() })}
          >
            <ArrowLeft />
          </IconButton>
        
          <Bar>
            {!isCore && (
              <Box padding={0} style={{ width: 260, paddingRight: 10 }}>
                <Field.Root required error={errorRefId}>
                  <Field.Label>{translate("input.label.templateReferenceId")}</Field.Label>
                  <Field.Input
                    placeholder={translate("input.placeholder.templateReferenceId")}
                    name="templateReferenceId"
                    value={templateData?.templateReferenceId ?? ""}
                    type="number"
                    disabled={isCore}
                    onChange={(e: any) =>
                      setTemplateData((state) => ({
                        ...(state || ({} as any)),
                        templateReferenceId:
                          e.target.value === ""
                            ? ""
                            : isFinite(parseInt(e.target.value))
                              ? parseInt(e.target.value)
                              : (state?.templateReferenceId ?? ""),
                      }))
                    }
                  />
                  <Field.Error />
                </Field.Root>
              </Box>
            )}
            <Box padding={0} style={{ width: isCore ? 450 : '60%', paddingRight: 10 }}>
              <Field.Root required>
                <Field.Label>{translate("input.placeholder.subject")}</Field.Label>
                <Field.Input
                  onChange={(value: any) => {
                    setTemplateData((state) => ({ ...state, name: value.target.value }));
                  }}
                  value={templateData?.name || ""}
                  placeholder={translate("input.placeholder.templateName")}
                />
                <Field.Error />
              </Field.Root>
            </Box>
            <Box style={{ width: "40%", display: "flex", gap: "10px", justifyContent: "flex-end", alignItems: "center"   }}>
                <Box style={{ width: "100%", maxWidth: "100px" }}>
                  <ImportSingleDesign pdfEditorRef={pdfEditorRef} />
                </Box>
                <Box style={{ width: "100%", maxWidth: "100px" }}>
                  <Button onClick={() => saveDesign()} style={{ marginTop: "19px", height: "38px", width: "100%" }}>
                    {translate("save")}
                  </Button>
                </Box>
                {templateId !== 'new' && templateData?.templateReferenceId !== undefined ? (
                  <Box style={{ width: "100%", maxWidth: "100px" }}>
                    <Button onClick={() => preview(templateData.templateReferenceId as number)} style={{ marginTop: "19px", height: "38px", width: "100%" }}>
                      {translate("preview")}
                    </Button>
                  </Box>
                ) : null}
            </Box>
           
          
          </Bar>
        </Header>

          <Tabs.Root 
            value={mode}
            onValueChange={(selected: string) => {
              setMode(selected as "html" | "text");
              if (selected === "html") {
                init();
              }
            }}
          >

            <Tabs.List aria-label="Email designer tabs">
              <Tabs.Trigger value="html">{getMessage('designer.version.html')}</Tabs.Trigger>
              <Tabs.Trigger value="text">{getMessage('designer.version.text')}</Tabs.Trigger>
            </Tabs.List>
            
            <Box style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Tabs.Content value="html">
                <Box
                  style={{
                    flexGrow: 1,
                    minHeight: '540px',
                    backgroundColor: 'white',
                    border: '1px solid #000000',
                  }}
                >
                  {serverConfigLoaded && (
                    <StrictMode>
                       <EmailEditor
                        ref={pdfEditorRef}
                        onLoad={onLoadHandler}
                        options={editorOptions}
                        minHeight='293mm'
                        style={{background: '#000000'}}
                      />
                    </StrictMode>
                  )}
                </Box>
              </Tabs.Content>

              <Tabs.Content value="text">
                <Textarea
                  name="textarea"
                  onChange={(e: any) => setBodyText(e.target.value)}
                  value={bodyText}
                  style={{ minHeight: 450 }}
                />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
      </DesignSystemProvider>
      </DesignerContainer>  
    </Page.Main>
  );
};

export default memo(Designer , shallowIsEqual);