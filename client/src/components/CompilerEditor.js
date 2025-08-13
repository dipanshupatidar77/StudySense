import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { boilerplates } from '../utils/boilerplates';

const CompilerEditor = ({ language, setLanguage, setOutput }) => {
  const [code, setCode] = useState(boilerplates[language]);

  useEffect(() => {
    setCode(boilerplates[language]);
  }, [language]);

  const handleRun = async () => {
    try {
      const response = await axios.post('http://localhost:7000/api/compile/code', {
        language_id: language,
        source_code: code
      });

      setOutput(response.data.stdout || response.data.stderr || "No output");
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <>
      <select
        className="form-select mb-2"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="71">Python</option>
        <option value="54">C++</option>
        <option value="63">JavaScript</option>
      </select>

      <textarea
        className="form-control mb-2"
        style={{ height: '300px' }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={handleRun}>
        Run Code
      </button>
    </>
  );
};

export default CompilerEditor;
