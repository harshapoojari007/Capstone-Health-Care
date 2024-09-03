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
import DashBoard from './Main/Dashboard/DashBoard';
=======
import DashBoard from './Main/DashBoard/DashBoard';
>>>>>>> 463e20bc9b6b873f47ef707e52f221ffc393320c
function App() {
  return (<Router>
     <Routes>
       {/* Layout with MainNavigation */}
       <Route element={<LayoutWithNavigation />}>
       <Route path="/home" element={<Home/>}/> 
       
       <Route path="/appointmentBooking" element={<ApointmentForm/>}/> 
       
        </Route>
        {/* Layout without MainNavigation */}
        <Route path='' element={<LayoutWithoutNav/>}>
        <Route path="/" element={<Welcome/>} /> 
       <Route path="/login" element={<Login />}/>
       <Route path="/signUp" element={<SignUp/>}/>
       <Route path="/dashboard" element={<DashBoard/>}/>
       </Route>
     </Routes>
    
   </Router>);
}

export default App;
