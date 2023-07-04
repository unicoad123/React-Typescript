import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useCallback, useMemo, useState, useRef } from "react";
import {
  Box,
  Grid,
  Button,
  Menu,
  MenuItem,
  Typography,
  Paper,
  IconButton,
  Container,
  makeStyles,
} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import { Header } from "../Layout/Header";
import InsertDriveFileSharpIcon from "@mui/icons-material/InsertDriveFileSharp";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}));
export const OnScrollPagination: React.FC = () => {
  const classes = useStyles();
  const gridRef = useRef<any>(null);
  const [rowData, setRowData] = useState<any[]>([]);
  const rowCount = `Total Count: ${rowData.length}`;
  console.log(rowCount);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "id",
      cellRenderer: (props: any) => {
        if (props.value !== undefined) {
          return props.value;
        } else {
          return (
            <img src="https://www.ag-grid.com/example-assets/loading.gif" />
          );
        }
      },
    },
    { field: "title" },
    { field: "url", minWidth: 400, tooltipField: "thumbnailUrl" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      minWidth: 100,
    };
  }, []);

  const onGridReady = useCallback((params: any) => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((resp) => resp.json())
      .then((data) => {
        const dataSource = {
          rowCount: undefined,
          getRows: (params: any) => {
            console.log(
              "asking for " + params.startRow + " to " + params.endRow
            );
            setTimeout(function () {
              const rowsThisPage = data.slice(params.startRow, params.endRow);

              let lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }

              params.successCallback(rowsThisPage, lastRow);
            }, 50);
          },
        };
        setRowData(data);
        params.api.setDatasource(dataSource);
      });
  }, []);

  const CustomButtonRenderer: React.FC = () => {
    const onBtnExportDataAsCsv = useCallback(() => {
      if (gridRef.current) {
        gridRef.current.api?.exportDataAsCsv();
      }
      setAnchorElUser(null);
    }, []);
    const onBtnExportDataAsExcel = useCallback(() => {
      if (gridRef.current) {
        gridRef.current.api?.exportDataAsExcel();
      }
      setAnchorElUser(null);
    }, []);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
      null
    );

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
      <Container>
        <Button
          variant="outlined"
          style={{ margin: "10px", marginLeft: "100vh" }}
          onClick={handleOpenUserMenu}
        >
          {" "}
          Export
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          style={{ marginTop: "6vh", marginLeft: "2vh", width: "1000vh" }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Typography style={{ color: "grey" }}>Export Table As</Typography>
          <MenuItem onClick={handleCloseUserMenu}>
            <Button>XLS</Button>
          </MenuItem>
          <MenuItem onClick={onBtnExportDataAsCsv}>
            <Button>CSV</Button>
          </MenuItem>
        </Menu>
      </Container>
    );
  };
  return (
    <div>
      <Header />
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "80vh", marginTop: "3vh",marginLeft:'10vh' }}
      >
        <Box
          flexDirection={"column"}
          style={{ height: 800, width: 900 }}
          className="ag-theme-alpine"
        >
          <Paper
            elevation={3}
            style={{ height: 600, width: 800 }}
            className="ag-theme-alpine"
          >
            <Grid  container
        justify="center"
        alignItems="center"
        style={{ marginTop: "10vh" }} >
            
              <Typography
                style={{ alignItems: "center" }}
              >{`Total Results(${rowData.length})`}</Typography>
              <CustomButtonRenderer />
            </Grid>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowModelType={"infinite"}
              cacheBlockSize={10}
              onGridReady={onGridReady}
            ></AgGridReact>
          </Paper>
        </Box>
      </Grid>
    </div>
  );
};
