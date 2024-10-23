import React, { memo } from 'react';
import { ArrowLeft } from '@strapi/icons';
import { Box, Typography, Flex } from '@strapi/design-system';
import { Link as RouterLink } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useNavigate } from 'react-router-dom';
// import sunburst from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark';
import { getMessage } from '../utils/getMessage';

const HowToPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };


  const exampleCode = `{
    const templateId = "[GET_THE_TEMPLATE_ID]",
    to = "john@doe.com",
    from = "me@example.com",
    replyTo = "no-reply@example.com",
    subject = "[TEST] This is a test using strapi-email-designer", // If provided here will override the template's subject. Can include variables like "Welcome to {{= project_name }}"
    userData = {
    firstname: "John",
    lastname: "Doe",
    email: "blah@blah.com"
    }
    
    try {
    await strapi.plugins["email-designer"].services.email.send({
        templateId,
        to,
        from,
        replyTo,
        subject,
        data: userData,
    });
    } catch (err) {
    strapi.log.debug('📺: ', err);
    return ctx.badRequest(null, err);
    }
}`;

return (
    <Box background="neutral100" padding={4}>
      {/* Custom Header Layout */}
      <Box paddingBottom={4}>
        <Flex alignItems="center" gap="16px">
          <RouterLink to="#" onClick={handleGoBack} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <ArrowLeft />
            <span style={{ marginLeft: '8px' }}>{getMessage('goBack')}</span>
          </RouterLink>
        </Flex>
        <Typography variant="beta" tag="h2" marginTop={2}>
          {getMessage('howToUse')}
        </Typography>
        <Typography textColor="neutral600">
          {getMessage('howToUse.content')}
        </Typography>
      </Box>

      {/* Main Content */}
      <Box padding={4} background="neutral0" hasRadius shadow="tableShadow">
        <SyntaxHighlighter
          lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
          wrapLines={true}
          language="javascript"
          // style={sunburst}
        >
          {exampleCode}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};

export default memo(HowToPage);