import React, { useCallback, useState, useEffect, memo, useRef, StrictMode } from 'react';
import { useNotification } from "@strapi/strapi/admin";
import { Page } from "@strapi/admin/strapi-admin";
import { Box, Typography, Flex, Tabs, TextInput, Button, Textarea, IconButton, DesignSystemProvider, TooltipProvider, Field, } from '@strapi/design-system';
// import { auth, LoadingIndicatorPage } from '@strapi/helper-plugin';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty, isFinite, merge } from 'lodash';
import { ArrowLeft } from '@strapi/icons';
import { getUrl, standardEmailRegistrationTemplate } from "../constants";
import { EmailConfig, EmailTemplate } from "../types";
import PropTypes from 'prop-types';
import striptags from 'striptags';
import EmailEditor, { EditorRef } from 'react-email-editor';
import styled from 'styled-components';
import { useTr } from "../hooks/useTr";
import { shallowIsEqual } from "../helpers/helpers";
import {
  createTemplate,
  getCoreTemplate,
  getFullEditorConfig,
  getTemplateById,
  updateCoreTemplate,
} from "../services";
import { pluginId } from '../pluginId';
import { getMessage } from '../utils/getMessage';
// import MediaLibrary from '../../components/MediaLibrary';
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

// const userInfo = auth.get("userInfo");
// const currentLanguage = strapi.config.server.locale;
// const currentLanguage = strapi.config.get('plugin.i18n.defaultLocale');


const defaultEditorTools = {
  image: {
    properties: {
      src: {
        value: {
          url: 'https://picsum.photos/600/350',
        },
      },
    },
  },
};

const defaultEditorAppearance = { minWidth: '100%', theme: 'dark' };
const defaultEditorOptions = {
  appearance: defaultEditorAppearance,
  locale: "en",
  tools: defaultEditorTools,
  projectId: null,
  fonts: {
    showDefaultFonts: false,
    customFonts: [
      {
        label: 'Andale Mono',
        value: 'andale mono,times',
      },
      {
        label: 'Arial',
        value: 'arial,helvetica,sans-serif',
      },
      {
        label: 'Arial Black',
        value: 'arial black,avant garde,arial',
      },
      {
        label: 'Book Antiqua',
        value: 'book antiqua,palatino',
      },
      {
        label: 'Comic Sans MS',
        value: 'comic sans ms,sans-serif',
      },
      {
        label: 'Courier New',
        value: 'courier new,courier',
      },
      { label: 'Georgia', value: 'georgia,palatino' },
      {
        label: 'Helvetica',
        value: 'helvetica,sans-serif',
      },
      { label: 'Impact', value: 'impact,chicago' },
      { label: 'Symbol', value: 'symbol' },
      {
        label: 'Tahoma',
        value: 'tahoma,arial,helvetica,sans-serif',
      },
      { label: 'Terminal', value: 'terminal,monaco' },
      {
        label: 'Times New Roman',
        value: 'times new roman,times',
      },
      {
        label: 'Trebuchet MS',
        value: 'trebuchet ms,geneva',
      },
      { label: 'Verdana', value: 'verdana,geneva' },
      {
        label: 'Lobster Two',
        value: "'Lobster Two',cursive",
        url: 'https://fonts.googleapis.com/css?family=Lobster+Two:400,700&display=swap',
      },
      {
        label: 'Playfair Display',
        value: "'Playfair Display',serif",
        url: 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap',
      },
      {
        label: 'Rubik',
        value: "'Rubik',sans-serif",
        url: 'https://fonts.googleapis.com/css?family=Rubik:400,700&display=swap',
      },
      {
        label: 'Source Sans Pro',
        value: "'Source Sans Pro',sans-serif",
        url: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap',
      },
      {
        label: 'Open Sans',
        value: "'Open Sans',sans-serif",
        url: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap',
      },
      {
        label: 'Crimson Text',
        value: "'Crimson Text',serif",
        url: 'https://fonts.googleapis.com/css?family=Crimson+Text:400,700&display=swap',
      },
      {
        label: 'Montserrat',
        value: "'Montserrat',sans-serif",
        url: 'https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap',
      },
      {
        label: 'Old Standard TT',
        value: "'Old Standard TT',serif",
        url: 'https://fonts.googleapis.com/css?family=Old+Standard+TT:400,700&display=swap',
      },
      {
        label: 'Lato',
        value: "'Lato',sans-serif",
        url: 'https://fonts.googleapis.com/css?family=Lato:400,700&display=swap',
      },
      {
        label: 'Raleway',
        value: "'Raleway',sans-serif",
        url: 'https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap',
      },
      {
        label: 'Cabin',
        value: "'Cabin',sans-serif",
        url: 'https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap',
      },
      {
        label: 'Pacifico',
        value: "'Pacifico',cursive",
        url: 'https://fonts.googleapis.com/css?family=Pacifico&display=swap',
      },
    ],
  },
};
// const currentTemplateTags = {
//   mergeTags: [
//     {
//       name: 'User',
//       mergeTags: [
//         {
//           name: 'First Name',
//           value: '{{= USER.firstname }}',
//           sample: (userInfo && userInfo.firstname) || 'John',
//         },
//         {
//           name: 'Last Name',
//           value: '{{= USER.lastname }}',
//           sample: (userInfo && userInfo.lastname) || 'Doe',
//         },
//         {
//           name: 'Email',
//           value: '{{= USER.username }}',
//           sample: (userInfo && userInfo.username) || 'john@doe.com',
//         },
//       ],
//     },
//   ],
//   mergeTagsConfig: {
//     autocompleteTriggerChar: '@',
//     delimiter: ['{{=', '}}'],
//   },
// };

const Designer  = ({ isCore = false }: { isCore?: boolean }) => {
  const emailEditorRef = useRef<EditorRef>(null);
  const navigate = useNavigate();
  const translate = useTr();

  const { templateId, coreEmailType } = useParams();
  const [templateData, setTemplateData] = useState<EmailTemplate>();
  const [errorRefId, setErrorRefId] = useState("");
  const [enablePrompt, togglePrompt] = useState(false);
  const [bodyText, setBodyText] = useState('');
  const [mode, setMode] = useState<"html" | "text">("html");
  const [serverConfigLoaded, setServerConfigLoaded] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [editorAppearance, setEditorAppearance] = useState({ ...defaultEditorAppearance });
  const [editorTools, setEditorTools] = useState({ ...defaultEditorTools });
  // const [editorOptions, setEditorOptions] = useState<EmailConfig>({ ...defaultEditorOptions, ...currentTemplateTags });
  const [editorOptions, setEditorOptions] = useState<EmailConfig>();
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [filesToUpload /* , setFilesToUpload */] = useState({});
  const { toggleNotification } = useNotification();

  // const { open: openMediaLibrary } = useLibrary();

  const saveDesign = async () => {
    if (!coreEmailType && !templateData?.templateReferenceId) {
      
      // FIXME: useNotification cause re-rendering so I temporarly commented all toggleNotification blocks
      toggleNotification({
        type: "danger",
        title: translate("error.noReferenceId.title"),
        message: translate("error.noReferenceId.message"),
      });

      setErrorRefId("Required"); // trigger error on TextInput field
      return;
    }
    setErrorRefId("");

    let design, html, response;

    try {
      await new Promise<void>((resolve) => {
        emailEditorRef.current?.editor?.exportHtml((data) => {
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
      } else if (coreEmailType) {
        response = await updateCoreTemplate(coreEmailType, {
          subject: templateData?.subject || "",
          design,
          message: html,
          bodyText,
        });
      }

      
      // FIXME: useNotification cause re-rendering so I temporarly commented all toggleNotification blocks
      toggleNotification({
        type: 'success',
        title: translate("success"),
        message: translate("success.message"),
      });
      

      // togglePrompt(false);

      
      // TODO: restore this once useNotification is fixed
      if (templateId === 'new' && response && templateId !== response.id){
         navigate(`/plugins/${pluginId}/design/${response.id}`);

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

  const onDesignLoad = () => {
    // eslint-disable-next-line no-unused-vars
    emailEditorRef.current?.editor?.addEventListener('design:updated', (data: any) => {
      /*
      let { type, item, changes } = data;
      console.log("design:updated", type, item, changes);
      */
      togglePrompt(true);
    });
  };

  const onLoadHandler = useCallback(() => {
    // ⬇︎ workaround to avoid firing onLoad api before setting the editor ref
    setTimeout(() => {
      // emailEditorRef.current?.editor?.addEventListener('onDesignLoad', onDesignLoad);
      // emailEditorRef.current?.editor?.registerCallback('selectImage', onSelectImageHandler);

      if (templateData) emailEditorRef.current?.editor?.loadDesign(templateData.design);
    }, 500);
  }, []);

  // Custom media uploads
  type ImageUploadCallback = ((data: { url: string }) => void) | undefined;
  const [imageUploadDoneCallback, setImageUploadDoneCallback] = useState<ImageUploadCallback>(undefined);

  const onSelectImageHandler = (data: any, done: any) => {
    setImageUploadDoneCallback(() => done);
    setIsMediaLibraryOpen(true);
  };

  const handleMediaLibraryChange = (data: any) => {
    if (imageUploadDoneCallback) {
      imageUploadDoneCallback({ url: data.url });
      setImageUploadDoneCallback(undefined);
    } else console.log(imageUploadDoneCallback);
  };

  const handleToggleMediaLibrary = () => {
    setIsMediaLibraryOpen((prev) => !prev);
  };

  /* useEffects */
  useEffect(() => {
    console.log("EmailDesignerPage mounted with templateId:", templateId, "and coreEmailType:", coreEmailType);
    // load the editor config
    getFullEditorConfig()
      .then((config) => {
        setEditorOptions(config);
        setServerConfigLoaded(true);
        console.error("Error loading editor config:");
      })
      .catch((err) => {
        console.error("Error loading editor config:", err);
        // Optionnel : définir un état d'erreur pour afficher un message d'erreur à l'utilisateur
      });
    return () => {
      emailEditorRef.current?.editor?.destroy(); // release react-email-editor on unmount
    };
  }, []);

  const init = async () => {
    if (
      (!templateId && !coreEmailType) ||
      (coreEmailType && !['user-address-confirmation', 'reset-password'].includes(coreEmailType)) ||
      templateId === 'new'
    )
      return;


      let _templateData: EmailTemplate = {};

      if (templateId) _templateData = await getTemplateById(templateId);
      else if (coreEmailType) _templateData = await getCoreTemplate(coreEmailType);

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
      if (emailEditorRef.current?.editor && templateData?.design) {
        emailEditorRef.current.editor.loadDesign(templateData.design);
      }
    }, 600);
  }, [templateData]);

  return (
    <Page.Main>
      <Page.Title>{translate("page.design.title")}</Page.Title>
      <DesignerContainer>
      <DesignSystemProvider>
        <Header>
          <IconButton
            style={{ marginTop: "19px", padding: "10px" }}
            label={translate("goBack")}
            onClick={() => navigate({ pathname: getUrl() })}
          >
            <ArrowLeft />
          </IconButton>
          {/* <Prompt message={getMessage('prompt.unsaved')} when={enablePrompt} /> */}
        
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
            <Box padding={0} style={{ width: isCore ? 450 : '100%', paddingRight: 10 }}>
              <Field.Root required>
                <Field.Label>{translate("input.placeholder.subject")}</Field.Label>
                <Field.Input
                  disabled={isCore}
                  onChange={(value: any) => {
                    setTemplateData((state) => ({ ...state, subject: value.target.value }));
                  }}
                  // value={templateData?.subject || ""}
                  value={isCore ? getMessage(coreEmailType) : templateData?.name || ''}
                  placeholder={translate("input.placeholder.subject")}
                />
                <Field.Error />
              </Field.Root>
              <TextInput
                style={{
                  width: '100%',
                }}
                name="name"
                disabled={isCore}
                onChange={(e: any) => {
                  setTemplateData((state) => ({ ...state, name: e.target.value }));
                }}
                placeholder={
                  isCore ? getMessage('coreEmailTypeLabel') : getMessage('designer.templateNameInputFieldPlaceholder')
                }
                value={isCore ? getMessage(coreEmailType) : templateData?.name || ''}
              />
            </Box>
            <Button onClick={saveDesign} color="success">
              {getMessage('designer.action.saveTemplate')}
            </Button>
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
                        ref={emailEditorRef}
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