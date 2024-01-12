import React from "react";
// import { PageLayout } from "../components/page-layout/PageLayout";
// import { useIPFSFilebaseClient } from "../hooks/useIPFSFilebaseClient";

import "./UploadContainer.css";

export const UploadContainer = (props) => {
  const { handleUpload, selectedFile, handleFileChange } = props;
  // const { uploadObject } = useIPFSFilebaseClient();

  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  // const handleUpload = () => {
  //   // You can perform actions with the selected file here
  //   if (selectedFile) {
  //     console.log(`Uploading file: ${selectedFile.name}`);
  //     uploadObject(selectedFile);
  //   } else {
  //     console.log("No file selected.");
  //   }
  // };

  return (
    <div className="upload-container">
      <span>Upload TEI files to IPFS</span>

      <div>
        <input type="file" accept=".xml, .txt" onChange={handleFileChange} />
        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={!selectedFile}>
          Upload
        </button>
      </div>
    </div>
  );
};
