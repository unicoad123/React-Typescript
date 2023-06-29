import React from "react";
import { useEffect, useMemo, useState } from 'react';
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import { Header } from "../../components/Layout/Header";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box, Grid } from "@material-ui/core";
import { ImageCellRenderer } from '../../components/Grid/ImageRenderer'

export const PhotoDetails: React.FC = () => {

    type userProps = {
        id: number,
        title: string,
        url:string

    }
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
    useEffect(() => {
        const api = async () => {
            const data = await fetch("https://jsonplaceholder.typicode.com/photos", {
                method: "GET"
            });
            const jsonData = await data.json();
            setUsers(jsonData);
            console.log(jsonData);
        };

        api();
    }, []);

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        filter: true
    }), []);
    return (
        <div>
            <Header />
            <Grid container
                justify="center"
                alignItems="center"
                style={{ height: '90vh' }}>
                <Box flexDirection={"column"} style={{ height: 500, width: 900 }} className="ag-theme-alpine">
                    <AgGridReact
                        rowData={users.map((data) => { return data; })}
                        columnDefs={colDef}
                        defaultColDef={defaultColDef}

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
