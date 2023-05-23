import React, {useState} from 'react'
import { Button } from '@mui/material';
import "./Login.css";
import {Link, redirect} from "react-router-dom"
import axios from 'axios';
import { useSignIn } from 'react-auth-kit'

function Login(props) {
  const [ email,setEmail] = useState("");
  const [ password,setPassword] = useState("");
  const signIn = useSignIn()
    
    const handleSubmit=(e)=>{
      e.preventDefault();
      try{
        axios.post("https://localhost:7137/User/login",
        {
          "email": email,
          "passwordHash": password
        }).then(res=>{
          console.log(res);
          if(signIn(
            {
                token: res.data,
                expiresIn:3600,
                tokenType: "Bearer",
                authState: "User",
                // refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                // refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
            }
        )){
          return redirect("/userSite");
        }else {
            //Throw error
        }

      });
        
      }catch(err){
        console.log();
      }
      window.location.reload(true);
      
    }
  
    return (
      <div className='Login'>
        <br/>
        <form onSubmit={(e)=>handleSubmit(e)}>
          
       
        <h2 style={{marginLeft:'10%'}}>Email</h2>
        <input style={{marginLeft:'10%'}} onChange={(e)=>{setEmail(e.target.value)}} 
            type="Email" className='TitleInput' placeholder='Email'/>
        <h2 style={{marginLeft:'10%'}}>Password</h2>
        <input style={{marginLeft:'10%'}} onChange={(e)=>{setPassword(e.target.value)}} 
            type="Password" className='TitleInput' placeholder='Password'/>
        <div style={{clear:'both'}}></div>
        <Button type="submit" style={{marginLeft:'10%',marginTop:'30px'}} variant="contained">Login</Button>
        <Link to="/Registration"><Button style={{marginLeft:'5%',marginTop:'30px'}} variant="contained">Create Account</Button></Link>
        </form>
      </div>
    )
  
}

export default Login
