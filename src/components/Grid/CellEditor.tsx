import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useEffect, useMemo, useState } from 'react';



export const CellEditor: React.FC = () => {

    const columnDefs = useMemo(() => [
        {
            headerName: 'Group A',
            children: [
                { field: 'athlete' },
                { field: 'age' },
            ],
        },
        {
            headerName: 'Group B',
            children: [
                { field: 'country' },
                { field: 'year' },
                { field: 'date' },
                { field: 'sport' },
            ],
        },
    ], []);

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
    }), []);

    const [rowData, setRowData] = useState<any[]>([]);

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);

    return (
        <div style={{ height: 400 }}>
            <AgGridReact
                className="ag-theme-alpine"
                animateRows={true}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={rowData}
            />
        </div>
    );
}


