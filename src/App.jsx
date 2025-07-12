import { useState } from 'react'
import './App.css'
import { Route,Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from "./components/Comman/Navbar";
import OpenRoute from './components/core/Auth/OpenRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import { useDispatch, useSelector } from 'react-redux';
import SettingsComp from './components/core/Dashboard/Settings/SettingsComp';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import CartComp from './components/core/Dashboard/Cart/CartComp';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const { user } = useSelector(state => state.profile);

  //const {token} = useSelector(state => state.auth);
  //const {cart} = useSelector(state => state.cart);
  
  //console.log("Token = " ,token);
  //console.log("User = ",user);
  //console.log("Cart = ",cart);


  return (
    <>
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="login" 
        element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
        }></Route>

        <Route path="signup" 
        element={
          <OpenRoute>
            <Signup/>
          </OpenRoute>
        }></Route>

        <Route path="forgot-password" 
        element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }></Route>

        <Route path="update-password/:id" 
        element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
        }></Route>

        <Route path="verify-email" 
        element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        }></Route>

        <Route path="about" element={<About/>} />
        <Route path="contact" element={<Contact/>} />

        <Route
           element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
           }
        >
          <Route path="dashboard/my-profile" element={<MyProfile/>} />
          <Route path="dashboard/settings" element={<SettingsComp/>} />
          <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
          <Route path="dashboard/cart" element={<CartComp/>}/>

        </Route>  

        
      </Routes>
    </div>
    </>
  )
}

export default App
