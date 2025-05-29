import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from "./components/Comman/Navbar";
import OpenRoute from './components/core/Auth/OpenRoute';
import LoginForm from './components/core/Auth/LoginForm';

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
            <LoginForm/>
          </OpenRoute>
        }></Route>

        
      </Routes>
    </div>
    </>
  )
}

export default App
