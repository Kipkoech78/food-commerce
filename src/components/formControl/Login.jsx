import React, { useState } from 'react'
import { ThemeProvider } from '@emotion/react';
import { Box, TextField,Button, createTheme, Paper,CssBaseline } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import LoginIcon from '@mui/icons-material/Login';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';


function Login() {
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
    const [emailInput, setEmail] = React.useState('')
    const [passwordInput, setPassword] = React.useState('')
    const[success, setsuccess] = useState("")
    const navigate = useNavigate();
   // axios.defaults.withCredentials = true;
   const[loginStatus, setLoginStatus] = useState(false)
    //
//validation
const [formValid, setFormValid] = useState()
    const handlesubmit = async(e)=>{
        e.preventDefault();
        if( !emailInput){
            setFormValid("Please Enter Your Email ");
            return;
        };
        if(!passwordInput  ){
            setFormValid("Password requires, 6-20 characters!");
            return;
        };
        setFormValid(null)  
        if(passwordInput || emailInput){
            const values ={
                email: emailInput,
                password: passwordInput
            }
            try{
             // { withCredentials: true }
            const res = await axios.post("http://localhost:5000/v1/login/", values, {mode:'cors' })
            if (res.data === 'Email doesnt Exist' ){
                setFormValid("User doesnt Exist. Please Register")                   
            }  
            else if(res.data.Error === 'Password did not match'){
              console.log(res.data.Error)
                    setFormValid("Incorrect Password!")
                    setLoginStatus(false)
                }
            else if (res.data.Status === 'login success'){
                    setsuccess("Login success");
                    console.log("else if  message should be succcess ")
                    console.log("token is", res.data.token)
                    setEmail('');
                    setPassword('');
                    setLoginStatus(true)
                    // Inside your login success function
                    localStorage.setItem('token', res.data.token); 
                    userAuthenticated()
                    navigate('/home', {replace: true})
                   // navigate('/home', { replace: true });  // Enable this line to redirect

                }
                 else{
                    setFormValid("Unknown error occurred.");
                    setLoginStatus(false)
                    console.log(res.data)

                }               
            }            
            catch(err) {console.log(err)}       
        }      
    }
    const userAuthenticated =()=>{
      //console.log( localStorage.getItem('token'));
      axios.get("http://localhost:5000/isUserAuth/",{
        headers:{
          "x-access-token":localStorage.getItem("token"),
        }
      }).then((response)=>console.log(response))
      .catch((err)=> console.log(err))
    }
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };
    return (
      <ThemeProvider   theme={theme}>
     <CssBaseline />
        <Paper elevation={0}>
        <form onSubmit={handlesubmit} > 
        <Paper elevation={0}>
       
        <TextField  fullWidth value={emailInput} label="Email" variant="standard" onChange={(event)=> setEmail(event.target.value)}  />
        </Paper>
        <Paper elevation={0}>
        <FormControl sx={{ width: '100%' }} variant="standard">
              <InputLabel  htmlFor="standard-adornment-password">Password</InputLabel>
              
              <Input
       
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value = {passwordInput}
                // error= {userPasswordErr}
                onChange={(event)=> setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
        </Paper>
        <Paper sx={{mt:5}} elevation={0}><Button fullWidth type='submit' variant="contained" startIcon={<LoginIcon />}>   Login </Button></Paper>
        </form>
        <Paper elevation={0}>{formValid && <Alert variant="outlined" severity="error">  {formValid} </Alert> }  </Paper>
        <Paper elevation={0}>{success && <Alert variant='outlined' severity='success'>{success}</Alert> }  </Paper>
        </Paper>
        </ThemeProvider>
      )
}

export default Login