import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import LoginIcon from '@mui/icons-material/Login';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'
import { Paper } from '@mui/material';
function SignUp({switchToLogin}) {
    const [userName, setUserName] = React.useState('')
    const [emailInput, setEmail] = React.useState('')
    const [passwordInput, setPassword] = React.useState('')
    //error inputs- validations
    const[usernameErr, setUsernameErr]= useState(false)
    const[userEmailErr, setEmailErr]= useState(false)
    const[userPasswordErr, setPasswordErr]= useState(false)
    const[success, setsuccess] = useState("")
   // const navigate = useNavigate();
    //
    axios.defaults.withCredentials = true;
//validation
const [formValid, setFormValid] = useState()
const handleUsername =()=>{
    if(!userName){
        setUsernameErr(true)
        return;
    }
    setUsernameErr(false)
}
// validate Email
const isEmail = (email) =>{
    return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
} 
const handleEmail = ()=>{
    if(!isEmail(emailInput)){
        setEmailErr(true);
        return;
    }
    setEmailErr(false)
}
const handlePassword = ()=>{

    if(!passwordInput || passwordInput.length <6){
        setPasswordErr(true)
        return;
    }
    setPasswordErr(false)
}
    const handlesubmit = (e)=>{
        e.preventDefault();
       
        if(!userName){
            setFormValid("Username is Required");
            return;
        };
        if( !emailInput){
            setFormValid("Please Enter valid Your Email ");
            return;
        };
        if(!passwordInput || passwordInput.length < 6 ){
            setFormValid("Password requires, 6-20 characters!");
            return;
        };
        setFormValid(null)  
        const values ={
            name: userName,
            email: emailInput,
            password: passwordInput
        }
        if(userName || passwordInput || emailInput){
            
            axios.post("http://localhost:5000/register/" ,values, { 
              withCredentials:false,
              headers: {
                "Content-Type": "application/json"
            }
            }
            )
            .then(res =>{
                if(res.data === "email already Exist!"){
                    setFormValid("Email Exist Please Login! ");
                }
                else if (res.data === "User Registered Successfully"){
                  switchToLogin()
                    console.log(res) 
                    setEmail('')
                    setPassword('')
                    setsuccess("sign Up success") 
                }
                else{
                    setFormValid("Try Again ! check Your Credentials")
                }
                
            } )
            .catch((err)=> console.log(err))
        }      
        console.log(values.name)
        console.log(values.email)
        console.log(values.password)
        
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
    <div>

    <form onSubmit={handlesubmit} > 
    <Paper elevation={0} >
    <TextField  error={usernameErr} onBlur={handleUsername} fullWidth  label="Full Name" variant="standard" value={userName}
    onChange={(event)=>setUserName(event.target.value)}
     />
    <TextField onBlur={handleEmail} error={userEmailErr} fullWidth value={emailInput} label="Email" variant="standard" onChange={(event)=> setEmail(event.target.value)}  />
    </Paper>
    <Paper elevation={0} >
    <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel  error={userPasswordErr} htmlFor="standard-adornment-password">Password</InputLabel>
          
          <Input
          onBlur={handlePassword}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value = {passwordInput}
            error= {userPasswordErr}
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
    <Paper elevation={0} ><Button fullWidth type='submit' variant="contained" startIcon={<LoginIcon />}>   SignUp </Button></Paper>
    </form>
    <Paper elevation={0} >{formValid && <Alert variant="outlined" severity="error">  {formValid} </Alert> }  </Paper>
    <Paper elevation={0} >{success && <Alert variant='outlined' severity='success'>{success}</Alert> }  </Paper>
    </div>
  )
}
export default SignUp