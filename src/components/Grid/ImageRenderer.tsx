import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface ImageCellRendererProps {
    value: any;
}

export const ImageCellRenderer: React.FC<ImageCellRendererProps> = ({ value }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    const toggleOverlay = (show: boolean) => {
        setShowOverlay(show);
    };

    return (
        <div onMouseEnter={() => toggleOverlay(true)} onMouseLeave={() => toggleOverlay(false)}>
            {value}
            {showOverlay && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img src={value} alt="Image" />
                </div>
            )}
        </div>
    );
};