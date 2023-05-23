import React, { Component } from 'react';
import axios from "axios";
import { IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./Home.css";

export default class Home extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      Users: [],
    };
  }

  componentDidMount(){
    try {
    axios.get('https://localhost:7137/User/GetAllUnregister').then((res) => {
      const data = res.data;
      console.log(data);
      this.setState({ Users: data });
    });
    console.log(this.state.tasks);
    }catch (ex) {
      console.log("error.status:", ex);
    }
  }

  handleClick = (index) =>{
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

  render() {
    return (
      <div>

        <div className='Conteiner' style={{overflow:"auto"}}>
          {this.state.Users.map((x,index)=>(
            <div key={index}>
      
              
              <div className='listElement'>
                <h3 style={{float:'left',marginLeft:30}}>{index+1}. {x.name} {x.lastName}</h3>
              <IconButton aria-label="delete" style={{float:'right',marginTop:10}} onClick={()=>this.handleClick(index+"_"+x.email)} >
                  <KeyboardArrowDownIcon />
              </IconButton>
              <div style={{clear:'both'}}></div>

              
              <div id={index+"_"+x.email} value={'false'} style={{display:'none'}}>
                <h4 style={{marginLeft:10}}>Email: {x.email}</h4>
                <h4 style={{marginLeft:10}}>Telephone: {x.telephone}</h4>
                <h4 style={{marginLeft:10}}>Kategoria: {x.subCategory.name}</h4>
                <h4 style={{marginLeft:10}}>Pod Kategoria: {x.subCategory.name}</h4>
                <h4 style={{marginLeft:10}}>Data urodzin {x.birthDayDate}</h4>

              </div>
              </div>
            </div>
          ))

          }
        </div>
 
      </div>
    )
  }
}
