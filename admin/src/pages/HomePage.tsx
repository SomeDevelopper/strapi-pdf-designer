import React, { memo, useState, useEffect, useCallback } from 'react';
import { Plus } from '@strapi/icons';
import { useNavigate } from 'react-router-dom';
import { Tabs, Button, DesignSystemProvider, darkTheme} from '@strapi/design-system';
import { Layouts, Page, useNotification } from "@strapi/admin/strapi-admin";
import { getUrl } from "../constants";
import type { PDFTemplate } from "../types";
import { useTr } from "../hooks/useTr";
import { getMessage } from '../utils/getMessage';
import { getTemplatesData } from "../services";
import CustomEmailTable from '../components/CustomPDFTable';

const HomePage = () => {
  const navigate = useNavigate();
  const translate = useTr();
  const [pdfTemplates, setPdfTemplates] = useState<PDFTemplate[]>([]);
  const [activeTab, setActiveTab] = useState('customEmailTemplates');
  const { toggleNotification } = useNotification();

  const init = useCallback(async () => {
    const data = await getTemplatesData();
    setPdfTemplates(data);
  }, []);

  useEffect(() => {
    init().catch(() => {
      toggleNotification({
        type: "danger",
        title: translate("error"),
        message: translate("error.loadingTemplates"),
      });
    });
  }, []);

  return (
    <Page.Main>
        <DesignSystemProvider theme={darkTheme}>
          <Layouts.Header
            primaryAction={
              <Button startIcon={<Plus />} onClick={() => navigate({ pathname: getUrl(`design/new`) })}>
                {getMessage('newTemplate')}
              </Button>
            }
            title={getMessage('plugin.name')}
            subtitle={getMessage('header.description')}
          />
          <Layouts.Content>
            <Tabs.Root
              value={activeTab}
              onValueChange={(selected: string) => {
                setActiveTab(selected)
              }}
            >
              <Tabs.List>
                <Tabs.Trigger value="customEmailTemplates">
                  {translate("PDFTypes.custom.tab.label")}
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content
                style={{ borderBottomRightRadius: "6px", borderBottomLeftRadius: "6px" }}
                value="customEmailTemplates"
              >
                <CustomEmailTable reload={init} data={pdfTemplates} />
              </Tabs.Content>
            </Tabs.Root>
              
          </Layouts.Content>
        </DesignSystemProvider>
    </Page.Main>
  );
};

export default memo(HomePage);
