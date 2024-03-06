import React from 'react';
import { capitalizeFirstLetter } from './utils';

function Table({ files, selectedFiles, toggleFileSelection }) {
  return (
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
                disabled={file.status !== "available"}
              />
            </td>
            <td>{file.name || "N/A"}</td>
            <td>{file.device || "N/A"}</td>
            <td>{file.path || "N/A"}</td>
            <td className={
                file.status
                  ? file.status === "available"
                    ? "status-available"
                    : "status-no-logo"
                  : ""
              }>
              {file.status ? capitalizeFirstLetter(file.status) : "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
      
    </table>
  );
}

export default Table;
