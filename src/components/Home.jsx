import { ThemeProvider } from '@emotion/react';
import { Box, Button, createTheme, Paper,CssBaseline } from '@mui/material'
import React from 'react'
import PrimarySearchAppBar from './topBar'
import Food from './Food';


function Home() {
    const theme = createTheme({
        palette: {
            mode: 'dark',
          primary: {
            main: '#ff4400',
          },
          secondary: {
            main: '#f50057',
          },
        },
      });
  return (
    <ThemeProvider  theme={theme}>
    
     <CssBaseline />
     <header>
      <PrimarySearchAppBar />
    </header>
    <Paper sx={{m:2}} >
    
    <Food />

    
    </Paper>
    </ThemeProvider> 
  )
}
export default Home