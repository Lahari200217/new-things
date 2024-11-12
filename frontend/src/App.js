import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import PDFViewer from './components/PDFViewer';
import ControlPanel from './components/ControlPanel';

const socket = io('http://localhost:5000');

const App = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [role, setRole] = useState('viewer');

    useEffect(() => {
        // Handle socket events
        socket.on('role', (assignedRole) => setRole(assignedRole));
        socket.on('pageChange', (newPage) => setPage(newPage));
        socket.on('adminDisconnected', () => alert('Admin disconnected.'));

        return () => socket.off();
    }, []);

    const onDocumentLoad = (pdf) => {
        setTotalPages(pdf.numPages);
    };

    const handleNextPage = () => {
        if (role === 'admin' && page < totalPages) {
            const nextPage = page + 1;
            setPage(nextPage);
            socket.emit('pageChange', nextPage);
        }
    };

    const handlePrevPage = () => {
        if (role === 'admin' && page > 1) {
            const prevPage = page - 1;
            setPage(prevPage);
            socket.emit('pageChange', prevPage);
        }
    };

    return (
        <div className="App">
            <h1>Collaborative PDF Viewer</h1>
            <PDFViewer page={page} onDocumentLoad={onDocumentLoad} />
            <ControlPanel
                page={page}
                totalPages={totalPages}
                role={role}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
            />
        </div>
    );
};

export default App;
