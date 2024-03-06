import React from 'react';

function Controls({ selectAllRef, handleSelectAll, selectedFilesCount, handleDownloadSelected }) {
    return (
      <div className="table-controls">

        <input
          type="checkbox"
          id="selectAll"
          ref={selectAllRef}
          onChange={handleSelectAll}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <span>{selectedFilesCount > 0 ? `Selected ${selectedFilesCount}` : "None Selected"}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
        <span className="download-selected" onClick={handleDownloadSelected}>
          &#x1F873; Download Selected
        </span>

      </div>
    );
  }
  

export default Controls;
