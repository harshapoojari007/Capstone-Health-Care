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
import DashBoard from './Main/DashBoard/DashBoard';
import LayoutWithNavigation from './LayoutWithNavigation';
import LayoutWithoutNav from './LayoutWithoutNav';
import MyHome from './Main/Home Page/MyHome';

function App() {
  return (
    <Router>
     <Routes>
       {/* Layout with MainNavigation */}
       <Route element={<LayoutWithNavigation />}>
       <Route path="/home" element={<MyHome/>}/>      
       <Route path="/dashboard" element={<DashBoard/>}/>
        </Route>
        {/* Layout without MainNavigation */}
        <Route element={<LayoutWithoutNav />}>
        <Route path="/" element={<Welcome/>} /> 
       <Route path="/login" element={<Login />}/>
       <Route path="/signUp" element={<SignUp/>}/>
        </Route>
    
          
     </Routes>
    
   </Router>
  );
}

export default App;
