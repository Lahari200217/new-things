// frontend/src/components/PDFViewer.js
import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = () => {
    const [page, setPage] = useState(1); // Start on the first page

    // Function to handle Next button click
    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    // Function to handle Previous button click
    const handlePrevPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage)); // Prevent going below page 1
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ height: '750px', width: '600px', margin: '0 auto' }}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer
                        fileUrl="/Greedy Method Knapsack job sequence.pdf" // Path to your PDF
                        defaultScale={1.5}
                        pageIndex={page - 1} // Subtract 1 because PDF.js uses 0-based index for pages
                    />
                </Worker>
            </div>

            <div>
                {/* Previous Button */}
                <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                {/* Next Button */}
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default PDFViewer;
