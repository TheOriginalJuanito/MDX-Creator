import React, { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import MDX from '@mdx-js/runtime';
import styled from 'styled-components';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const EditorContent = styled.div`
  display: flex;
  flex: 1;
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
  code: (props: any) => (
    <code style={{ backgroundColor: '#f8f9fa', padding: '2px 4px' }} {...props} />
  ),
  pre: (props: any) => (
    <pre style={{ backgroundColor: '#f8f9fa', padding: '1em', borderRadius: '4px' }} {...props} />
  ),
};

const Editor: React.FC = () => {
  const [mdxContent, setMdxContent] = useState('# Welcome to MDX Editor\n\nStart typing your content here...');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMdxContent(e.target.value);
    setError(null);
  };

  const handleInsertMarkdown = (markdown: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newContent = `${before}${markdown}${selection}${after}`;
    setMdxContent(newContent);
    
    // Set focus back to textarea
    textarea.focus();

    // Calculate new cursor position
    const newPosition = start + markdown.length;
    textarea.selectionStart = newPosition;
    textarea.selectionEnd = newPosition;
  };

  const handleSave = () => {
    const blob = new Blob([mdxContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.mdx';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        setMdxContent(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <EditorContainer>
      <Toolbar>
        <Button onClick={() => handleInsertMarkdown('# ')}>H1</Button>
        <Button onClick={() => handleInsertMarkdown('## ')}>H2</Button>
        <Button onClick={() => handleInsertMarkdown('**')}>Bold</Button>
        <Button onClick={() => handleInsertMarkdown('*')}>Italic</Button>
        <Button onClick={() => handleInsertMarkdown('- ')}>List</Button>
        <Button onClick={() => handleInsertMarkdown('[]()')}>Link</Button>
        <Button onClick={() => handleInsertMarkdown('```\n\n```')}>Code Block</Button>
        <Button onClick={handleSave}>Save</Button>
        <input
          type="file"
          accept=".md,.mdx"
          onChange={handleLoad}
          style={{ display: 'none' }}
          id="file-input"
        />
        <Button onClick={() => document.getElementById('file-input')?.click()}>
          Load
        </Button>
      </Toolbar>
      <EditorContent>
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
              {(() => {
                try {
                  return <MDX>{mdxContent}</MDX>;
                } catch (err) {
                  const error = err as Error;
                  return <div style={{ color: 'red' }}>Error parsing MDX: {error.message}</div>;
                }
              })()}
            </PreviewContent>
          </MDXProvider>
        </PreviewSection>
      </EditorContent>
    </EditorContainer>
  );
};

export default Editor;
