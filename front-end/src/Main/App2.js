
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    RouterProvider,
  } from "react-router-dom";
import Home from "./Home Page/Home";
import MainNavigation from "../Components/navigation/MainNavigation";
import Dashboard from "./Appointment/Dashboard";
  
  function App2() {
    return (
      <>
       <MainNavigation/>
        <main>
       <Routes>
        
         <Route path="/" element={<Home/>}/>  
         
             
       </Routes>
       </main>
     </>
    );
  }
  
  export default App2;
  