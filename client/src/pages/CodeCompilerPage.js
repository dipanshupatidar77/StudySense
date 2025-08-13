import React, { useState } from 'react';
import CompilerEditor from '../components/CompilerEditor';
import '../styles/compiler.css';

const CodeCompilerPage = () => {
  const [language, setLanguage] = useState('71'); // Default Python
  const [output, setOutput] = useState('');

  return (
    <div className="compiler-container row">
      <div className="col-md-6 p-3">
        <CompilerEditor
          language={language}
          setLanguage={setLanguage}
          setOutput={setOutput}
        />
      </div>

      <div className="col-md-6 p-3">
        <h5>Output:</h5>
        <pre className="output-box">{output}</pre>
      </div>
    </div>
  );
};

export default CodeCompilerPage;
