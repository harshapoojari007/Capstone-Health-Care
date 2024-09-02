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
import LayoutWithNavigation from './LayoutWithNavigation';
import LayoutWithoutNav from './LayoutWithoutNav';
import Home from './Main/Home Page/Home';
import ApointmentForm from './Main/Appointment/ApointmentForm';
<<<<<<< HEAD
import Dashboard from './Main/Dashboard/DashBoard';
=======
import DashBoard from "./Main/DashBoard/DashBoard"

>>>>>>> 812b32d0ae2d3327d98fa2253da12a8fcfd56b5f
function App() {
  return (<Router>
     <Routes>
       {/* Layout with MainNavigation */}
       <Route element={<LayoutWithNavigation />}>
       <Route path="/home" element={<Home/>}/> 
       <Route path="/" element={<Welcome/>} /> 
       <Route path="/appointmentBooking" element={<ApointmentForm/>}/> 
       
        </Route>
        {/* Layout without MainNavigation */}
        <Route path='' element={<LayoutWithoutNav/>}>
       
       <Route path="/login" element={<Login />}/>
       <Route path="/signUp" element={<SignUp/>}/>
       <Route path="/dashboard" element={<DashBoard/>}/>
       </Route>
     </Routes>
    
   </Router>);
}

export default App;
