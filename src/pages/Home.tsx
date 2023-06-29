import React from "react";
import { useEffect, useMemo, useState } from 'react';
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Header } from "../components/Layout/Header";
import { Box,Grid } from "@material-ui/core";



export const Home: React.FC=()=>{

    type userProps={
        id:number,
        name:string,
        username:string,
        email:string,
        address:{
            city:string,
            zipcode:string,
        },
        phone:number,
        company:{
            name:string
        }

    }

    const [users,setUsers]=useState<userProps[]>([]);
    useEffect(() => {
        const api = async () => {
          const data = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "GET"
          });
          const jsonData = await data.json();
          setUsers(jsonData);
          console.log(jsonData);
        };

        api();
      }, []);
    // const rowData:{make:string,model:string,price:number}[]=[
    //     {make:"Ford",model:"Focus",price:4000},
    //     {make:"Ford",model:"Focus",price:4000},
    //     {make:"Ford",model:"Focus",price:4000},
    //     {make:"Ford",model:"Focus",price:4000},
    //     {make:"Ford",model:"Focus",price:4000},
    // ]

    // const columnData:{field:any}[]=[
    //     {field:'id'},
    //     {field:'name'},
    //     {field:'username'},
    //     {field:'email'},
    //     {field:'address.city'},
    // ]
    const columnDefs = useMemo(() => [
        {
            headerName: 'User',
            children: [
                { field: 'id' },
                { field: 'name' },
                { field: 'username' },
                { field: 'email' },
                {field:'phone'}
            ],
        },
        {
            headerName: 'Address',
            children: [
                { field: 'address.city' },
                { field: 'address.zipcode' },
            ],
        },
        {
            headerName: 'Company',
            children: [
                { field: 'company.name' },
                { field: 'company.catchPhrase' },
            ],
        },
    ], []);

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
    }), []);
    return(
        <div>
        <Header />
        <Grid  container
    justify="center"
    alignItems="center"
    style={{ height: '90vh' }}>
        <Box flexDirection={"column"} style={{height:500,width:900}} className="ag-theme-alpine">
        <AgGridReact
            rowData={users.map((data)=>{return data;})}
          columnDefs={columnDefs}
        />
        </Box>
        </Grid>
        </div>
    );
}