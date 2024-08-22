import './App.css';
import Login from './Main/Login Page/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Main/SignUp Page/Signup';


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Welcome from './Main/Welcome Page/welcome';
import Dashboard from './Main/Appointment/Dashboard';
import LayoutWithNavigation from './LayoutWithNavigation';
import LayoutWithoutNav from './LayoutWithoutNav';

function App() {
  return (<Router>
     <Routes>
       {/* Layout with MainNavigation */}
       <Route element={<LayoutWithNavigation />}>
       <Route path="/home" element={<MyHome/>}/>      
       <Route path="/dashboard" element={<DashBoard/>}/>
        </Route>
        {/* Layout without MainNavigation */}
        {/* <Route element={<LayoutWithoutNav />}> */}
        <Route path="/" element={<Welcome/>} /> 
       <Route path="/login" element={<Login />}/>
       <Route path="/signUp" element={<SignUp/>}/>
       <Route path="/home" element={<App2/>}/>  
       <Route path="/dashboard" element={<Dashboard/>}/>     
     </Routes>
    
   </Router>);
}

export default App;
