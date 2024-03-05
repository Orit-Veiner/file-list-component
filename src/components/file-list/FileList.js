import React, { useState } from "react";
import "./FileList.css";
import { files as initialFiles } from './filesData.js';

function FileList() {
  const [files, setFiles] = useState(initialFiles);     //input file with files data
  const [selectedFiles, setSelectedFiles] = useState({});

  const toggleFileSelection = (name) => {
    setSelectedFiles(prevSelected => ({...prevSelected, [name]: !prevSelected[name]}));
  };

  return (
    <div>
      <table>

        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {files.map((file) => (
          <tr key={file.name} className={selectedFiles[file.name] ? "selected" : ""} onClick={() => toggleFileSelection(file.name)}>
          <td><input type="checkbox" checked={!!selectedFiles[file.name]} onChange={() => {}} disabled={file.status !== 'available'} /></td>
              <td>{file.name}</td>
              <td>{file.device}</td>
              <td>{file.path}</td>
              <td className={file.status === "available" ? "status-available" : "status-no-logo"}>
                {capitalizeFirstLetter(file.status)}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

// Return string with first letter capitalized
function capitalizeFirstLetter(input) {
  if (typeof input !== "string" || input.length === 0) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export default FileList;
