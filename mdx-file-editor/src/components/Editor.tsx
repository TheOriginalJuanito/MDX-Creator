import React, { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import MDX from '@mdx-js/runtime';
import styled from 'styled-components';

const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
  padding: 20px;
`;

const EditorSection = styled.div`
  flex: 1;
  padding: 10px;
`;

const PreviewSection = styled.div`
  flex: 1;
  padding: 10px;
`;

const MdxTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: monospace;
  resize: none;
`;

const PreviewContent = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100%;
  overflow-y: auto;
`;

const components = {
  h1: (props: any) => <h1 style={{ color: '#2c3e50' }} {...props} />,
  h2: (props: any) => <h2 style={{ color: '#34495e' }} {...props} />,
  p: (props: any) => <p style={{ lineHeight: '1.6' }} {...props} />,
};

const Editor: React.FC = () => {
  const [mdxContent, setMdxContent] = useState('# Welcome to MDX Editor\n\nStart typing your content here...');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMdxContent(e.target.value);
  };

  return (
    <EditorContainer>
      <EditorSection>
        <MdxTextarea
          value={mdxContent}
          onChange={handleChange}
          placeholder="Write your MDX content here..."
        />
      </EditorSection>
      <PreviewSection>
        <MDXProvider components={components}>
          <PreviewContent>
            {/* Using try-catch to handle MDX parsing errors */}
            {(() => {
              try {
                return <MDX>{mdxContent}</MDX>;
              } catch (error) {
                return <div style={{ color: 'red' }}>Error parsing MDX: {(error as Error).message}</div>;
              }
            })()}
          </PreviewContent>
        </MDXProvider>
      </PreviewSection>
    </EditorContainer>
  );
};

export default Editor;
