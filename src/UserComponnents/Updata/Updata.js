import React, { Component } from 'react'
import "./Updata.css";
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import axios from "axios";
import Cookies from 'js-cookie';



export default class Update extends Component {
    constructor(props){
        super(props);
        
        this.state={
            Id:props.user.id,
            name : props.user.name,
            lastName : props.user.lastName,
            email: props.user.email,
            subCategoryID: 2,
            categoryId: 1,
            passwordHash:props.user.passwordHash,
            subDisebled : true,
            subDisebled1: false,
            birthDayDate:props.user.birthDayDate.substr(0, props.user.birthDayDate.length -19),
            telephon:props.user.telephone,
            subCategoryName:"",
            id:0,
            error:""
        };
       
    }
    
    handleChange = (event)=>{
        this.setState({categoryId : event.target.value});
        if(event.target.value===3){
            this.setState({subDisebled :false ,subDisebled1:true});
        }else if(event.target.value===1){
            this.setState({subDisebled :true ,subDisebled1:false});
        }else{
            this.setState({subDisebled :true ,subDisebled1:true});
        }
    }
    handleChangeSub = (e)=>{
        this.setState({ subCategoryID: e.target.value});
        console.log(this.state.subCategoryID);

    }
    handleDelete =()=>{
      try{      
        const respons = axios.delete("https://localhost:7137/User/DeleteByID?id="+this.state.Id,{
          headers:{Authorization : "bearer "+ Cookies.get('_auth')},
          withCredentials:true,
        });
        console.log(respons);
        window.location.reload(true);

     }catch(err){
       this.setState({error:err})
    }
    }
    handleSubmit =(event)=>{
        console.log(this.state);
        event.preventDefault();
      
        this.setState({id:this.state.categoryId});

        
            
                
        if(this.state.categoryId===3){
            try {
            axios.post("https://localhost:7137/SubCategory/AddSubCategoryName?a="+this.state.subCategoryName).then
            (res=>{
                     
                try{      
                    axios.patch("https://localhost:7137/user/updateuser",
                    { 
                        "id":this.state.Id,
                        "name": this.state.name,
                        "lastName": this.state.lastName,
                        "email": this.state.email,
                        "passwordHash": this.state.passwordHash,
                        "subCategoryId": res.data.id,
                        "subCategory":null,
                        "telephone": this.state.telephon,
                        "birthDayDate": this.state.birthDayDate,

                    },{
                      headers:{Authorization : "bearer "+ Cookies.get('_auth')},
                      withCredentials:true,
                    });
            

                 }catch(err){
                   this.setState({error:err})
                }
            });
            
           
            }catch(err){
                alert(err);
                
            }
        
        }
        if(this.state.categoryId===2){
            try{      
                const respons = axios.patch("https://localhost:7137/user/updateuser",
                { 
                  "id":this.state.Id,
                    "name": this.state.name,
                    "lastName": this.state.lastName,
                    "email": this.state.email,
                    "passwordHash": this.state.passwordHash,
                    "subCategoryId": 1,
                    "subCategory":null,
                    "telephone": this.state.telephon,
                    "birthDayDate": this.state.birthDayDate,

                },{
                  headers:{Authorization : "bearer "+ Cookies.get('_auth')},
                  withCredentials:true,
                });
                console.log(respons);

             }catch(err){
               this.setState({error:err})
            }
        }
        if(this.state.categoryId===1){
            try{      
                const respons = axios.patch("https://localhost:7137/user/updateuser",
                { 
                    "id":this.state.Id,
                    "name": this.state.name,
                    "lastName": this.state.lastName,
                    "email": this.state.email,
                    "passwordHash":this.state.passwordHash,
                    "subCategoryId": this.state.subCategoryID,
                    "subCategory":null,
                    "telephone": this.state.telephon,
                    "birthDayDate": this.state.birthDayDate,

                },{
                  headers:{Authorization : "bearer "+ Cookies.get('_auth')},
                  withCredentials:true,
                });
                console.log(respons);

             }catch(err){
               this.setState({error:err})
            }
              
         }
     
         window.location.reload(true);
    }

    render() {
    return (
      <div className='Registration'>
        <form onSubmit={this.handleSubmit}>
            
      
        <div style={{marginLeft:50,marginTop:20}}><h3 style={{color:"red"}}>{this.state.error}</h3></div>
        <TextField style={{marginLeft:10,marginTop:20,float:'left'}} value={this.state.name} required label="Name" variant="filled" onChange={(e)=>this.setState({ name : e.target.value})} />
        <TextField style={{marginLeft:10,marginTop:20,float:'left'}} value={this.state.lastName} required label="LastName" variant="filled" onChange={(e)=>this.setState({ lastName : e.target.value})}/>
        <TextField style={{marginLeft:10,marginTop:20,float:'left'}} value={this.state.email} required label="Email" variant="filled" onChange={(e)=>this.setState({  email : e.target.value})}/>
        <TextField style={{marginLeft:10,marginTop:20,float:'left'}} value={this.state.birthDayDate} required label="" variant="filled"  type='Date' onChange={(e)=>this.setState({ birthDayDate : e.target.value})}/> 
        <TextField style={{marginLeft:10,marginTop:20,float:'left'}} value={this.state.telephon} required label="Telephon Number" variant="filled"onChange={(e)=>this.setState({  telephon : e.target.value})} />
        <TextField style={{marginLeft:10,marginTop:20,float:'left'}}  label="Subcategory" variant="filled"  disabled = {this.state.subDisebled} onChange={(e)=>this.setState({ subCategoryName : e.target.value})}/>
        <div style={{clear:'both'}}></div>
        <Box style={{marginLeft:10,marginTop:20}}>
          <FormControl style={{width:450}}>
            <InputLabel id="label">Category</InputLabel>
            <Select
              labelId="label"
              value={this.state.categoryId}
              label="CAtegory"
              onChange={this.handleChange}
            >
              <MenuItem value={1}>Służbowy</MenuItem>
              <MenuItem value={2}>Prywatny</MenuItem>
              <MenuItem value={3}>Inny</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box style={{marginLeft:10,marginTop:20}} >
          <FormControl style={{width:450}}>
            <InputLabel id="label1">Category</InputLabel>
            <Select
              labelId="label1"
              value={this.state.subCategoryID}
              label="subCategot"
              onChange={(e)=>this.handleChangeSub(e)}
              disabled = {this.state.subDisebled1}
            >
              <MenuItem value={2}>Szef</MenuItem>
              <MenuItem value={3}>Klient</MenuItem>
              <MenuItem value={4}>Pracownik</MenuItem>
     
            </Select>
          </FormControl>
        </Box>
        <Button style={{marginLeft:'10%',marginTop:'30px',marginBottom:30}} type="submit" variant="contained" onClick={this.submitHandle}>Update</Button>
        <Button style={{marginLeft:'10%',marginTop:'30px',marginBottom:30}}  variant="contained" onClick={this.handleDelete}>Delete</Button>
        
        </form>
      </div>
    )
  }
}
