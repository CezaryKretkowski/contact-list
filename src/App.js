import "./App.css"
import Home from './Home/Home';
import AppBar from '@mui/material/AppBar'
import UserComponnet from "./UserComponnents/UserComponnet";
import Add from "./UserComponnents/Registration/Add";
import {Link} from "react-router-dom"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./Login/Login";
import Toolbar from '@mui/material/Toolbar';
import Registration from "./Registration/Registration";
import { Navigate } from "react-router-dom";
import { AuthProvider ,useIsAuthenticated } from 'react-auth-kit'

function App() {

  const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to="/login" />;
};

  return (
    <div className='App' >
      
        <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
       <BrowserRouter> 
      <AppBar className='home' position="static" >
      
      <Toolbar>
      <Link to="/"><h3 style={{marginLeft:30,color:'white'}}>Home</h3></Link>
      <Link to="/login"><h3 style={{marginLeft:30,color:'white'}}>Login</h3></Link>
      <Link to="/userSite"><h3 style={{marginLeft:30,color:'white'}}>UserSite</h3></Link>
      </Toolbar>
      </AppBar>
     
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="Registration" element={<Registration/>}/>
      <Route path="userSite" element={
        <PrivateRoute Component={UserComponnet} />
    }/>
      <Route path="/add" element={
        <PrivateRoute Component={Add} />
        }/>

      </Routes>
      </BrowserRouter>   
      </AuthProvider> 
    
    </div>
  );
}

export default App;
