import * as React  from 'react';
import { ThemeProvider } from '@emotion/react';
import { Chip, Paper,createTheme } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import FaceIcon from '@mui/icons-material/Face';
import Switch from '@mui/material/Switch';
import Login from './formControl/Login';
import SignUp from './formControl/SignUp';

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
function Authentication() {
    const[checked, setSwitchCheck] = React.useState(true);
    const handleSwitchChange = (event) => {
        setSwitchCheck(event.target.checked);
      };
      const switchToLogin = () => {
        setSwitchCheck(true);  // Set to 'true' to display the Login component
    };
  return (
    <ThemeProvider className="App" theme={theme} >
    <div className='App' >
     <Paper  sx={{p:2}  }   elevation={5} >
     <Paper elevation={0} >
     {checked ? (<Chip  icon={<LockIcon/>} variant='outlined' color='primary' label="Login" />)
     : (<Chip  icon={<FaceIcon/>} variant='outlined' color='primary' label="Register" />)
      }
    </Paper>
    <Paper   elevation={0} >
    <Switch checked={checked} onChange={handleSwitchChange} color='primary' />
    
    </Paper>
    <Paper elevation={0}>
        {checked ? (<Login />) : (<SignUp switchToLogin={switchToLogin}  />)}
    </Paper>
    </Paper>
     </div>
    </ThemeProvider>
  )
}

export default Authentication