import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
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

function App() {

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

        <Route
           element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
           }
        >
          <Route path="dashboard/my-profile" element={<MyProfile/>} />

        </Route>  

        
      </Routes>
    </div>
    </>
  )
}

export default App
