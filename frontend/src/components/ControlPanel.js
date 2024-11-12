// frontend/src/components/ControlPanel.js
import React from 'react';

const ControlPanel = ({ page, totalPages, role, onNextPage, onPrevPage }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>Role: {role}</p>
            <button onClick={onPrevPage} disabled={page <= 1 || role !== 'admin'}>
                Previous
            </button>
            <span> Page {page} of {totalPages} </span>
            <button onClick={onNextPage} disabled={page >= totalPages || role !== 'admin'}>
                Next
            </button>
        </div>
    );
};

export default ControlPanel;
