import React, { useState } from 'react';
import MdxViewer from './components/MdxViewer';

const App: React.FC = () => {
    const [mdxContent, setMdxContent] = useState<string>('');

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMdxContent(event.target.value);
    };

    return (
        <div>
            <h1>MDX File Editor</h1>
            <textarea
                value={mdxContent}
                onChange={handleContentChange}
                placeholder="Write your MDX content here..."
                rows={10}
                cols={50}
            />
            <MdxViewer content={mdxContent} />
        </div>
    );
};

export default App;