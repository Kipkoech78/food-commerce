import { ThemeProvider } from '@emotion/react';
import { Box, Button, createTheme, Paper,CssBaseline } from '@mui/material'
import React from 'react'


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
    <Paper sx={{m:2}} >
<Button sx={{p:1}} color='primary' variant='outlined'> Button</Button>
    
    </Paper>
    </ThemeProvider> 
  )
}
export default Home