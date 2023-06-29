import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export const Header:React.FC=() =>{
  return (
    <Box sx={{ flexGrow: 1 }} bgcolor='white'>
      <AppBar position="static" style={{backgroundColor:'teal'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='center'>
            Home
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}