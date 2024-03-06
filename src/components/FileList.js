import React, { useState, useEffect, useRef } from "react";
import "./FileList.css";
import { files as initialFiles } from "./filesData";
import Table from "./Table";
import Controls from "./Controls";

function FileList() {
  const [files, setFiles] = useState(initialFiles || []);
  const [selectedFiles, setSelectedFiles] = useState({});
  const selectAllRef = useRef(null);

  useEffect(() => {
    const totalFilesSelectable = files.filter(file => file.status === "available").length;
    const totalSelectedFiles = Object.keys(selectedFiles).filter(key => selectedFiles[key]).length;

    if (selectAllRef.current) {
      selectAllRef.current.checked = totalSelectedFiles === totalFilesSelectable && totalFilesSelectable !== 0;
      selectAllRef.current.indeterminate = totalSelectedFiles > 0 && totalSelectedFiles < totalFilesSelectable;
    }
  }, [selectedFiles, files]);

  const toggleFileSelection = (index) => {
    setSelectedFiles(prevSelected => {
      const newSelection = { ...prevSelected };
      if (newSelection[index]) {
        delete newSelection[index];
      } else {
        newSelection[index] = true;
      }
      return newSelection;
    });
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const newSelectedFiles = {};

    if (isChecked) {
      files.forEach((file, index) => {
        if (file.status === "available") {
          newSelectedFiles[index] = true;
        }
      });
    } else {
      // If deselecting, clear all selections
      files.forEach((file, index) => {
        if (file.status === "available") {
          if (newSelectedFiles[index]) {
            delete newSelectedFiles[index];
          }
        }
      });
    }
    setSelectedFiles(newSelectedFiles);
  };

  const handleDownloadSelected = () => {
    const selectedFilesInfo = files
      .filter((file, index) => selectedFiles[index])
      .map((file) => `Path: ${file.path}, Device: ${file.device}`);

    if (selectedFilesInfo.length === 0) {
      alert("No files were selected...");
    } else {
      alert(`Downloading files:\n\n${selectedFilesInfo.join("\n\n")}`);
    }
  };

  return (
    <div>
      <Controls
        selectAllRef={selectAllRef}
        handleSelectAll={handleSelectAll}
        selectedFilesCount={Object.keys(selectedFiles).filter(key => selectedFiles[key]).length}
        handleDownloadSelected={handleDownloadSelected}
      />
      <Table
        files={files}
        selectedFiles={selectedFiles}
        toggleFileSelection={toggleFileSelection}
      />
    </div>
  );
}

export default FileList;
