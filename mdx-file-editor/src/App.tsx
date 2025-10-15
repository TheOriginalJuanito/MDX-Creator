import React from 'react';
import Editor from './components/Editor';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Editor />
      </div>
    </>
  );
}

export default App;
