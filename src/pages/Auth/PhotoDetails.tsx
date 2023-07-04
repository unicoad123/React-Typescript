import React from "react";
import { useEffect, useMemo, useState,useCallback,useRef } from 'react';
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import { Header } from "../../components/Layout/Header";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box, Grid } from "@material-ui/core";
import { ImageCellRenderer } from '../../components/Grid/ImageRenderer'
import '../../styles/pagination.css';
//import { CustomPagination } from "../../components/Grid/CusotmPagination";


interface GridRefType {
    api: {
        paginationSetPageSize: (pageSize: number) => void;
    };
}
export const PhotoDetails: React.FC = () => {
    const gridRef = useRef<GridRefType | null>(null);
    type userProps = {
        id: number,
        title: string,
        url:string

    }
    const containerStyle = useMemo(() => ({ width: '10%', height: '10%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [users, setUsers] = useState<userProps[]>([]);
    const [colDef, setColDef] = useState<any[]>([
        {
            headerName: 'Image Details',
            children: [
                { field: 'id' },
                { field: 'title'},
                { field: 'url', minWidth: 400, cellRenderer: ImageCellRenderer, tooltipField: 'thuumbnailUrl', }
            ],
        },
    ]);
        const onGridReady = useCallback((params:any) => {
            fetch("https://jsonplaceholder.typicode.com/photos")
                .then((resp) => resp.json())
                .then((data) => setUsers(data));
        }, []);
    
    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        filter: true,
        editable:true
    }), []);
    const paginationNumberFormatter = useCallback((params:any) => {
        return '[' + params.value.toLocaleString() + ']';
    }, []);
    // const onFirstDataRendered = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    //     gridRef.current.api.paginationGoToPage(4);
    // }, []);
    const onPageSizeChanged = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const pageSize = Number(event.target.value);
        if (gridRef.current) {
            gridRef.current.api.paginationSetPageSize(pageSize);
        }
    }, []);
    return (
        <div>
            <Header />
            
            <Grid container
                justify="center"
                alignItems="center"
                style={{ height: '90vh' }}>
                <Box flexDirection={"column"} style={{ height: 500, width: 900 }} className="ag-theme-alpine">
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
                        </div>
                    </div>
                    <AgGridReact
                        rowData={users.map((data) => { return data; })}
                        columnDefs={colDef}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                        //pagination={true}
                        paginationPageSize={50}
                        paginationNumberFormatter={paginationNumberFormatter}
                        //onFirstDataRendered={onFirstDataRendered}
                    />
                </Box>
            </Grid>
        </div>
    );
}

// import React, { useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import {ImageCellRenderer} from '../../components/Grid/ImageRenderer'


// const PhotoDetails: React.FC = () => {
//     const columnDefs:any = [
//         { field: 'athlete' },
//         { field: 'year' },
//         { field: 'gold', cellRenderer: ImageCellRenderer },
//         { field: 'silver', cellRenderer: ImageCellRenderer },
//         { field: 'bronze', cellRenderer: ImageCellRenderer },
//         { field: 'total', cellRenderer: ImageCellRenderer},
//     ];

//     const defaultColDef = {
//         editable: true,
//         sortable: true,
//         flex: 1,
//         minWidth: 100,
//         filter: true,
//         resizable: true,
//     };

//     const rowData = [
//         { athlete: 'Michael Phelps', year: '2008', gold: 'image-url-gold', silver: 'image-url-silver', bronze: 'image-url-bronze', total: 'image-url-total' },
//         { athlete: 'Usain Bolt', year: '2008', gold: 'image-url-gold', silver: 'image-url-silver', bronze: 'image-url-bronze', total: 'image-url-total' },
//         // Add more rows as needed
//     ];


//     return (
//         <div className="ag-theme-alpine" style={{ height: '100px', width: '100%' }}>
//             <AgGridReact
//                 rowData={rowData}
//                 columnDefs={columnDefs}
//                 defaultColDef={defaultColDef}
//                 // frameworkComponents ={{
//                 //     imageCellRenderer: ImageCellRenderer,
//                 // }}
//             ></AgGridReact>
//         </div>
//     );
// };

// export default PhotoDetails;
