import { useState } from 'react'
import {Routes,Route} from "react-router-dom";
import { AddProduct } from './Pages/AddProduct';
import { GetProduct } from './Pages/GetProduct';
import { Home } from './Pages/Home';
import { Navbar } from './Component/Navbar';
import { Error } from './Pages/Error';
import { Cart } from './Pages/Cart';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { OpenRoute } from './Component/Auth/OpenRoute';
import { PrivateRoute } from './Component/Auth/PrivateRoute';
import { Profile } from './Pages/Profile';
import { AdminRoute } from './Component/Auth/AdminRoute';
import { UserRoute } from './Component/Auth/UserRoute';
import { Otp } from './Pages/Otp';

function App() {

  return (
    <div className='w-screen min-h-screen bg-slate-700'>
      <Navbar/>
      <Routes>
        <Route path='*' element={<Error/>}/>
        <Route path='/' element={<OpenRoute><Home/></OpenRoute>}/>
        <Route path='/otp' element={<OpenRoute><Otp/></OpenRoute>}/>
        <Route path='/cart' element={<UserRoute><Cart/></UserRoute>}/>
        <Route path='/addProduct' element={<AdminRoute><AddProduct/></AdminRoute>}/>
        <Route path='/updateProduct' element={<AdminRoute><AddProduct/></AdminRoute>}/>
        <Route path='/getProduct/:id' element={<PrivateRoute><GetProduct/></PrivateRoute>}/>
        <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}/>
        <Route path='/register' element={<OpenRoute><Register/></OpenRoute>}/>
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
      </Routes>
    </div>
  )
}

export default App
