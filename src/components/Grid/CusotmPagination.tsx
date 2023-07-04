'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../style/pagination.css';

var checkboxSelection = function (params:any) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};

var headerCheckboxSelection = function (params:any) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
};

const GridExample: React.FC =() => {
    const gridRef = useRef<any>(0);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'Athlete',
            field: 'athlete',
            minWidth: 170,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);
    const autoGroupColumnDef = useMemo(() => {
        return {
            headerName: 'Group',
            minWidth: 170,
            field: 'athlete',
            valueGetter: (params:any) => {
                if (params.node.group) {
                    return params.node.key;
                } else {
                    return params.data[params.colDef.field];
                }
            },
            headerCheckboxSelection: true,
            cellRenderer: 'agGroupCellRenderer',
            cellRendererParams: {
                checkbox: true,
            },
        };
    }, []);
    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 100,
        };
    }, []);
    const paginationNumberFormatter = useCallback((params:any) => {
        return '[' + params.value.toLocaleString() + ']';
    }, []);

    const onGridReady = useCallback((params:any) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => {
                setRowData(data);
            });
    }, []);

    const onFirstDataRendered = useCallback((params:any) => {
        gridRef.current.api.paginationGoToPage(4);
    }, []);

    const onPageSizeChanged = useCallback((params:any) => {
        var value = (document.getElementById('page-size') as HTMLSelectElement).value;
        gridRef.current.api.paginationSetPageSize(Number(value));
    }, []);

    return (
        <div style={containerStyle}>
            <div className="example-wrapper">
                <div className="example-header">
                    Page Size:
                    <select onChange={onPageSizeChanged} id="page-size">
                        <option value="10">10</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                    </select>
                </div>

                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        autoGroupColumnDef={autoGroupColumnDef}
                        defaultColDef={defaultColDef}
                        suppressRowClickSelection={true}
                        groupSelectsChildren={true}
                        rowSelection={'multiple'}
                        rowGroupPanelShow={'always'}
                        pivotPanelShow={'always'}
                        pagination={true}
                        paginationPageSize={10}
                        paginationNumberFormatter={paginationNumberFormatter}
                        onGridReady={onGridReady}
                        onFirstDataRendered={onFirstDataRendered}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default GridExample;