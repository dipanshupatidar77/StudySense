import React, { useState } from "react";
import "../styles/NotesPanel.css";

const NotesPanel = ({ show, onClose }) => {
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("my_notes");

  const downloadNotes = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.txt`;
    link.click();
  };

  const clearNotes = () => {
    const confirmClear = window.confirm("Are you sure you want to clear all notes?");
    if (confirmClear) {
      setText("");
    }
  };

  return (
    <div className={`notes-panel ${show ? "open" : ""}`}>
      <div className="notes-header">
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="Enter filename"
        />
        <div className="notes-buttons">
          <button onClick={downloadNotes}>Download</button>
          <button onClick={clearNotes}>Clear</button>
          <button onClick={onClose}>Minimize</button>
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your notes here..."
      />
    </div>
  );
};

export default NotesPanel;

