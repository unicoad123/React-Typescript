import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useCallback, useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  Box,
  Grid,
  makeStyles,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { InputLabel } from "@mui/material";

const CustomButtonRenderer: React.FC = () => {
  const gridRef = useRef<any>(null);
  const containerStyle = useMemo(
    () => ({ marginLeft: "20vh", width: "100%", height: "100%" }),
    []
  );
  const onBtnExportDataAsCsv = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api?.exportDataAsCsv();
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
    <div>
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
    </div>
  );
};

export default CustomButtonRenderer;
