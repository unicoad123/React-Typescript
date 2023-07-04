import React from "react";
import { useEffect, useMemo, useState } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Header } from "../components/Layout/Header";
import { Box, Grid } from "@material-ui/core";
import PhoneRenderer from "../components/Grid/CellRenderer";

export const Home: React.FC = () => {
  type userProps = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      city: string;
      zipcode: string;
    };
    phone: number;
    company: {
      name: string;
    };
  };
  const [users, setUsers] = useState<userProps[]>([]);
  const [colDef, setColDef] = useState<any[]>([
    {
      headerName: "User",
      children: [
        { field: "id" },
        { field: "name", minWidth: 250, cellRenderer: PhoneRenderer },
        { field: "email", minWidth: 250 },
        { field: "username" },
        { field: "phone" },
      ],
    },
    {
      headerName: "Address",
      children: [
        { field: "address.city", headerName: "City" },
        { field: "address.zipcode", headerName: "ZipCode" },
      ],
    },
    {
      headerName: "Company",
      children: [
        { field: "company.name", headerName: "Name" },
        {
          field: "company.catchPhrase",
          headerName: "CatchPhrase",
          minWidth: 300,
        },
      ],
    },
  ]);
  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
      });
      const jsonData = await data.json();
      setUsers(jsonData);
    };

    api();
  }, []);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      editable: true,
    }),
    []
  );
  return (
    <div>
      <Header />
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "90vh" }}
      >
        <Box
          flexDirection={"column"}
          style={{ height: 500, width: 900 }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            rowData={users.map((data) => {
              return data;
            })}
            columnDefs={colDef}
            defaultColDef={defaultColDef}
          />
        </Box>
      </Grid>
    </div>
  );
};
