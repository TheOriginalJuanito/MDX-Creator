import React from 'react';
import { MDXProvider } from '@mdx-js/react';

interface MdxViewerProps {
    content: string;
    components?: Record<string, React.ComponentType<any>>;
}

const MdxViewer: React.FC<MdxViewerProps> = ({ content, components }) => {
    return (
        <MDXProvider components={components}>
            <div className="mdx-viewer">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </MDXProvider>
    );
};

export default MdxViewer;