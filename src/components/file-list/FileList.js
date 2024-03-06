import React, { useState, useEffect, useRef } from "react";
import "./FileList.css";
import { files as initialFiles } from "./filesData.js";

function FileList() {
  const [files, setFiles] = useState(initialFiles); //initialFiles are from the input file, containing the files list data
  const [selectedFiles, setSelectedFiles] = useState({});
  const selectAllRef = useRef(null);

  const toggleFileSelection = (index) => {
    setSelectedFiles((prevSelected) => {
      const newSelection = { ...prevSelected };
      // Exists in selected -> deselect it
      if (newSelection[index]) {
        delete newSelection[index];
        // Add a newly selected
      } else {
        newSelection[index] = true;
      }
      return newSelection;
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelectedFiles = {};
      files.forEach((file, index) => {
        if (file.status === "available") {
          newSelectedFiles[index] = true;
        }
      });
      setSelectedFiles(newSelectedFiles);
    } else {
      setSelectedFiles({}); // Clear all selections
    }
  };

  const handleDownloadSelected = () => {
    const selectedFilesInfo = files
      .filter((file, index) => selectedFiles[index])
      .map((file) => `Path: ${file.path}\nDevice: ${file.device}`);
  
    if (selectedFilesInfo.length === 0) {
      alert("No files were selected...");
    } else {
      alert(`Downloading files:\n\n${selectedFilesInfo.join("\n\n")}`);
    }
  };
  

  useEffect(() => {
    const totalAvailableFiles = files.filter(
      (file) => file.status === "available"
    ).length;
    const totalSelectedFiles = Object.keys(selectedFiles).length;
    const isSelected = totalSelectedFiles > 0;
    const isAllSelected = totalSelectedFiles === totalAvailableFiles;

    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isSelected && !isAllSelected;
    }
  }, [selectedFiles, files]);

  return (
    <div>
      <div className="table-controls">
        <input
          type="checkbox"
          id="selectAll"
          ref={selectAllRef}
          onChange={handleSelectAll}
          checked={
            Object.keys(selectedFiles).length > 0 &&
            Object.keys(selectedFiles).length ===
              files.filter((file) => file.status === "available").length
          }
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          {Object.keys(selectedFiles).length > 0
            ? `Selected ${Object.keys(selectedFiles).length}`
            : "None Selected"}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="download-selected" onClick={handleDownloadSelected}>
          &#x1F873; Download Selected
        </span>
      </div>

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
          {files.map((file, index) => (
            <tr
              key={index}
              className={selectedFiles[index] ? "selected" : ""}
              onClick={() => toggleFileSelection(index)}
            >
              <td>
                <input
                  type="checkbox"
                  checked={!!selectedFiles[index]}
                  onChange={(e) => {
                    // e.stopPropagation();
                    // toggleFileSelection(index);
                  }}
                  disabled={file.status !== "available"}
                />
              </td>
              <td>{file.name}</td>
              <td>{file.device}</td>
              <td>{file.path}</td>
              <td
                className={
                  file.status === "available"
                    ? "status-available"
                    : "status-no-logo"
                }
              >
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
