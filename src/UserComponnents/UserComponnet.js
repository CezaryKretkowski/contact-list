import { Button} from '@mui/material'
import React, {  useEffect, useState } from 'react'
import "../Home/Home.css"
import axios from "axios";
import { IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSignOut } from 'react-auth-kit'
import Cookies from 'js-cookie';
import {Link} from "react-router-dom"
import Update from './Updata/Updata';


function   UserComponnet (props) {
    const [Users,setUsers] =useState([]);
    const singOut = useSignOut();
    // constructor(props){
    //     super(props);
    //     this.state = {
    //       Users: [],
    //     };
    //   }

      useEffect(()=>{
        console.log( );
        try {
        axios.get('https://localhost:7137/User/GetAll',
        {
           headers:{Authorization : "bearer "+ Cookies.get('_auth')},
           withCredentials:true,
        }
        
        ).then((res) => {
          const data = res.data;
          console.log(data);
          setUsers(data );
        });
        console.log();
        }catch (ex) {
          console.log("error.status:", ex);
        }
      }
    ,[]); 
     const handleClick = (index) =>{
        var section = document.getElementById(index);
        console.log(section.value);
        if(section.value===false){
          section.style = "display:block;";
          section.value = true;
        }
        else{
          section.style = "display:none;";
          section.value = false;
        }
          
      }


    return (
        
      <div className='Conteiner' style={{overflow:'auto'}}>
        <Button variant='contained' onClick={()=>singOut()}>LogOut</Button>
        <Link to="/add" ><Button style={{marginLeft:30}} variant='contained'>Add</Button></Link>
        <h2>UserList</h2>
        <div>
        {Users.map((x,index)=>(
            <div key={index}>
      
              
              <div className='listElement'>
                <h3 style={{float:'left',marginLeft:30}}>{index+1}. {x.name} {x.lastName}</h3>
              <IconButton aria-label="delete" style={{float:'right',marginTop:10}} onClick={()=>handleClick(index+"_"+x.email)} >
                  <KeyboardArrowDownIcon />
              </IconButton>
              <div style={{clear:'both'}}></div>

              
              <div id={index+"_"+x.email} value={'false'} style={{display:'none'}}>
                <Update user={x}/>

              </div>
              </div>
            </div>
          ))

          }
        </div>
      </div>
    )
  
}

export default UserComponnet
