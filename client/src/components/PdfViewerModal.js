import React, { useEffect, useState } from "react";

const PdfViewerModal = ({ file, onClose }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    console.log("File URL in modal:", file.url);
  }, [file]);

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}
    >
      <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: "900px", maxHeight: "90vh" }}>
        <h5 className="mb-3">{file.originalname}</h5>

        <iframe
          src={file.url}
          title="PDF Viewer"
          width="100%"
          height="600px"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            border: "1px solid #ccc"
          }}
        />

        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-secondary"
            onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
          >
            ➖ Zoom Out
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setScale((prev) => Math.min(2, prev + 0.1))}
          >
            ➕ Zoom In
          </button>
          <button className="btn btn-danger" onClick={onClose}>
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfViewerModal;

